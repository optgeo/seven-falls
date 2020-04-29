const proj4 = require('proj4')

proj4.defs("EPSG:6676","+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs");


console.log(proj4('EPSG:4326', 'EPSG:6676', [138.9371444, 34.7904122]))
console.log(proj4('EPSG:4326', 'EPSG:6676', [138.9401294, 34.7932354]))
