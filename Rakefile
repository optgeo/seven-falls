require 'fileutils'
#FILES = %w{a/08OF4060 a/08OF4061 a/08OF4050 a/08OF4051 b/08OF4060 b/08OF4061 b/08OF4050 m/08OF4060 m/08OF4050}
FILES = %w{a/08OF4060 b/08OF4060 m/08OF4060}
#FILES = %w{m/08OF4060 m/08OF4050}
#FILES = %w{a/08OF4060 a/08OF4061 a/08OF4050 a/08OF4051 b/08OF4060 b/08OF4061 b/08OF4050}
#FILES = %w{a/08OF4050 b/08OF4050 m/08OF4050}
#FILES = %w{a/08OF4050 b/08OF4050}
MAXZOOM = 24
EXPANDZOOM = 24
DETAIL = 32 - MAXZOOM

desc 'produce tiles'
task :tiles do
  cmds = []
  FILES.each {|fn|
    cmds << "(las2txt --extent 40000,-134100,40275,-133780 --keep-classes 2 3 4 5 11 -i src/#{fn}.las --parse xyzRGBc --stdout | LAYER=#{fn.split('/')[0]} node index.js)"
  }
  #sh "(#{cmds.join('&&')}) | tippecanoe --no-feature-limit --no-tile-size-limit --drop-densest-as-needed --full-detail=#{DETAIL} --low-detail=#{DETAIL} --base-zoom=#{MAXZOOM} --minimum-zoom=12 --maximum-zoom=#{MAXZOOM} -f -o tiles.mbtiles"
  sh "(#{cmds.join('&&')}) | tippecanoe --no-feature-limit --drop-densest-as-needed --full-detail=#{DETAIL} --low-detail=#{DETAIL} --base-zoom=#{MAXZOOM} --minimum-zoom=12 --maximum-zoom=#{MAXZOOM} -f -o tiles.mbtiles"
end

desc 'expand to the filesystem'
task :expand do
  sh "tile-join --force --no-tile-compression\
    --output-to-directory=docs/zxy --maximum-zoom=#{EXPANDZOOM}\
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
