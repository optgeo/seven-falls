const csv = require('csv')
const proj4 = require('proj4')

proj4.defs("EPSG:6676","+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs");

process.stdin.pipe(
csv.parse()).pipe(
csv.transform(r => {
  const coords = proj4('EPSG:6676', 'EPSG:4326', 
    [parseFloat(r[0]), parseFloat(r[1])])
  const rgb = '#' + [r[3], r[4], r[5]].map(v => {
    return (parseInt(v) >> 12).toString(16)
  }).join('')
  let f = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coords 
    },
    properties: {
      height: parseFloat(r[2]),
      rgb: rgb
    },
    tippecanoe: {
      layer: process.env.LAYER
    }
  }
  return `\x1e${JSON.stringify(f)}\n`
})).pipe(process.stdout)

