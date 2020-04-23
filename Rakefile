require 'fileutils'
FILES = %w{a/08OF4060 a/08OF4061 a/08OF4050 a/08OF4051 b/08OF4060 b/08OF4061 b/08OF4050 m/08OF4060 m/08OF4050}
MAXZOOM = 24
DETAIL = 32 - MAXZOOM
GEOJSONSEQ = 'src/geojsonseq.gz'

desc 'produce'
task :produce do
  cmds = []
  FILES.each {|fn|
    cmds << "(las2txt -i src/#{fn}.las --parse xyzRGBc --stdout | LAYER=#{fn.split('/')[0]} node index.js)"
  }
  sh "(#{cmds.join('&&')}) | tippecanoe --no-feature-limit --no-tile-size-limit --drop-densest-as-needed --full-detail=#{DETAIL} --low-detail=#{DETAIL} --base-zoom=#{MAXZOOM} --minimum-zoom=12 --maximum-zoom=#{MAXZOOM} -f -o tiles.mbtiles"
end

desc 'geojsonseq'
task :geojsonseq do
  FileUtils.rm(GEOJSONSEQ) if File.exist?(GEOJSONSEQ)
  FILES.each {|fn|
    sh "las2txt -i src/#{fn}.las --parse xyzRGBc --stdout | LAYER=#{fn.split('/')[0]} node index.js | gzip -9 >> #{GEOJSONSEQ}" 
  }
end

desc 'create mbtiles from a geojsonseq'
task :tippecanoe do
  sh "gzcat #{GEOJSONSEQ} | tippecanoe --no-feature-limit --no-tile-size-limit --drop-densest-as-needed --full-detail=#{DETAIL} --low-detail=#{DETAIL} --base-zoom=#{MAXZOOM} --minimum-zoom=12 --maximum-zoom=#{MAXZOOM} -f -o tiles.mbtiles"
end

desc 'expand to the filesystem'
task :expand do
  sh "tile-join --force --no-tile-compression\
    --output-to-directory=docs/zxy --maximum-zoom=#{MAXZOOM}\
    --no-tile-size-limit tiles.mbtiles"
end

desc 'build the style'
task :style do
  sh 'parse-hocon hocon/style.conf > docs/style.json'
  sh 'gl-style-validate docs/style.json'
end

desc 'host the site'
task :host do
  sh "budo -d docs"
end
