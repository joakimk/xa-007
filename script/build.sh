echo "; window.releaseBuild = true;" > build.js
[ $DEBUG ] && echo "; window.showRenderStats = true;" >> build.js
cat assets/js/vendor/* >> build.js
echo ";" >> build.js
cat assets/js/cubemap.js >> build.js
echo ";" >> build.js
cat assets/js/edisonlogo.js >> build.js
echo ";" >> build.js
cat assets/js/map.js >> build.js
echo ";" >> build.js
cat assets/js/music.js >> build.js
echo ";" >> build.js
cat assets/js/music_sync.js >> build.js
echo ";" >> build.js
cat assets/js/rocket_xml.js >> build.js
echo "window.rocketXML = \"data:xml;base64,$(node script/encode.js assets/demo.rocket)\"" >> build.js
echo ";" >> build.js
cat assets/js/skybox_effect.js >> build.js
echo ";" >> build.js
cat assets/js/font.js >> build.js
echo ";" >> build.js
cat assets/js/main.js >> build.js
echo ";" >> build.js
cat demo.js >> build.js

echo "<html><head><style>body { width: 100%; color: white; background: black; position: relative; } #loader { margin-left: 20px; } #demo { position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 100%; } canvas { width: 100%; height: 100%; } }</style></head><body><div id='demo'><div id='loader'></div></div><script type=\"text/javascript\">$(cat build.js)</script></body></html>" > build.html

rm build.js
