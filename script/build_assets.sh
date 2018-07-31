echo "window.edisonLogo = \"data:image/png;base64,$(node script/encode.js assets/edisonlogo.png)\"" > assets/js/edisonlogo.js
echo "window.font = \"data:application/json;base64,$(node script/encode.js assets/fonts/helvetiker_regular.typeface.json)\"" > assets/js/font.js
echo "window.musicData = \"data:audio/ogg;base64,$(node script/encode.js assets/music.ogg)\"" > assets/js/music.js

echo "window.cubemapPX = \"data:image/png;base64,$(node script/encode.js assets/cubemap/px.png)\";" > assets/js/cubemap.js
echo "window.cubemapPY = \"data:image/png;base64,$(node script/encode.js assets/cubemap/py.png)\";" >> assets/js/cubemap.js
echo "window.cubemapPZ = \"data:image/png;base64,$(node script/encode.js assets/cubemap/pz.png)\";" >> assets/js/cubemap.js
echo "window.cubemapNX = \"data:image/png;base64,$(node script/encode.js assets/cubemap/nx.png)\";" >> assets/js/cubemap.js
echo "window.cubemapNY = \"data:image/png;base64,$(node script/encode.js assets/cubemap/ny.png)\";" >> assets/js/cubemap.js
echo "window.cubemapNZ = \"data:image/png;base64,$(node script/encode.js assets/cubemap/nz.png)\";" >> assets/js/cubemap.js
