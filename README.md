# xa-007

A demo made using WebGL (three.js) for Edison 2018.

Made using Google Chrome. May work in other browsers.

Made under a short deadline with no need to create maintainable code.

# Development

How to install dev-deps on OSX

    brew install qt5
    ln -sf /usr/local/Cellar/qt/5.11.1/bin/qmake /usr/local/bin/qmake

    # Sync editor
    download released version from https://github.com/rocket/rocket/releases
    or build git repo
    git clone https://github.com/rocket/rocket.git
    cd rocket
    make
    cp -rf editor/editor.app /Applications/rocket.app

    # HTTP server for assets (js, images, etc)
    npm install http-server -g

How jsRocket.js was built:

    brew install node
    npm install grunt grunt-contrib-concat grunt-contrib-jshint grunt-contrib-uglify
    cd js
    grunt

Development

    # 1) start rocket.app
    # 2) ./start_live_coding_asset_support_server.sh
    # 3) Open demo in https://live-coding.herokuapp.com/

Building music data

    # Not supported on iOS or in Safari
    # echo "window.musicData = \"data:audio/ogg;base64,$(base64 assets/music.ogg)\"" > assets/js/music.js

    echo "window.musicData = \"data:audio/mpeg;base64,$(base64 assets/music.mp3)\"" > assets/js/music.js

Building rocket data for playback from file

    echo "window.rocketXML = \"data:xml;base64,$(base64 assets/demo.rocket)\"" > assets/js/rocket_xml.js

Building edisonlogo (on windows the same line works if placed inside a shell script)

     echo "window.edisonLogo = \"data:image/png;base64,$(node script/encode.js assets/edisonlogo.png)\"" > assets/js/edisonlogo.js

Building font data (on windows the same line works if placed inside a shell script)

    echo "window.font = \"data:application/json;base64,$(node script/encode.js assets/fonts/helvetiker_regular.typeface.json)\"" > assets/js/font.js

Building cubemap for skybox:

     echo "window.cubemapPX = \"data:image/png;base64,$(base64 assets/cubemap/px.png)\";" > assets/js/cubemap.js && echo "window.cubemapPY = \"data:image/png;base64,$(base64 assets/cubemap/py.png)\";" >> assets/js/cubemap.js && echo "window.cubemapPZ = \"data:image/png;base64,$(base64 assets/cubemap/pz.png)\";" >> assets/js/cubemap.js && echo "window.cubemapNX = \"data:image/png;base64,$(base64 assets/cubemap/nx.png)\";" >> assets/js/cubemap.js && echo "window.cubemapNY = \"data:image/png;base64,$(base64 assets/cubemap/ny.png)\";" >> assets/js/cubemap.js && echo "window.cubemapNZ = \"data:image/png;base64,$(base64 assets/cubemap/nz.png)\";" >> assets/js/cubemap.js

Building map data

    npm install get-pixels
    # and then read in scripts/build_pixel_data

# Credits

Skybox from https://www.solarsystemscope.com/textures/ and then converted using https://jonaszeitler.se/cubemap-toastmap-generator/.

Music is "Dualities" by "Erio & Waking Dreams"

  https://www.youtube.com/watch?v=UEW3qtQqbZE&index=63&list=PL2uFx12wz7ZLg8xW8i7SXIcdGhPeXvAgG
  https://soundcloud.com/Waking-Dreams-Moosic
  https://twitter.com/ErioOfficial

# License

This applies to everything we made. Third party code (like three.js), fonts and music have separate licencing.

Copyright (c) 2018 [Joakim Kolsjö](https://twitter.com/joakimk) and [Anders Asplund](https://github.com/danter)

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.