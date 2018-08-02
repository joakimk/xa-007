loadModule = (name) => {
  if (!window.releaseBuild) {
    script = document.createElement("script")
    script.src = window.assetServerUrl + "/js/" + name + ".js" + "?cache_buster=" + new Date().getTime()
    document.body.appendChild(script)
  }
}

if (!window.modulesLoaded) {
  console.log("Loading modules...")

  // Load deps and ensure they are loaded
  loadModule("rocket_xml"); setTimeout(() => { if (!window.rocketXML) { throw "failed to load rocket XML" } }, 200)
  loadModule("vendor/jsRocket"); setTimeout(() => { JSRocket }, 200)
  loadModule("vendor/three.min"); setTimeout(() => { THREE }, 200)
  loadModule("vendor/stats.min"); setTimeout(() => { Stats }, 200)
  loadModule("vendor/threex.rendererstats"); setTimeout(() => { THREEx }, 200)
  loadModule("music"); setTimeout(() => { if (!window.musicData) { throw "failed to load music" } }, 400)
  loadModule("music_sync"); setTimeout(() => { MusicSync }, 200)
  loadModule("map"); setTimeout(() => { if (!window.pixelData.map) { throw "failed to load map" } }, 200)
  loadModule("cubemap"); setTimeout(() => { if (!window.cubemapNZ) { throw "failed to load cubemap" } }, 200)
  loadModule("edisonlogo"); setTimeout(() => { if (!window.edisonLogo) { throw "failed to load edisonlogo" } }, 200)
  loadModule("skybox_effect"); setTimeout(() => { if (!window.SkyboxEffect) { throw "failed to load skybox effect" } }, 200)
  loadModule("font"); setTimeout(() => { if (!window.font) { throw "failed to load font" } }, 200)

  window.modulesLoaded = true
  setTimeout(() => {
    window.demoDiv = document.getElementById("demo")
    window.loaderDiv = document.getElementById("loader")

    if (!window.releaseBuild) { window.showRenderStats = true }

    _setUpRendering()
    window.afterFirstLoad()

    if (window.releaseBuild) {
      _setUpFullScreenTrigger()
      _setUpStartDemoTrigger()
    } else {
      window.afterCodeChange()
    }
  }, 500)
}

window.afterFirstLoad = () => {
  let liveCoding = null

  if (!window.releaseBuild) {
    liveCoding = window.afterFirstLoadLive()

    let parent = document.createElement("div")
    parent.style = "margin-top: 75px;" // (600 - 450) / 2
    parent.appendChild(window.renderer.domElement)
    liveCoding.outputElement.appendChild(parent)
  }

  connectToTracker = !window.releaseBuild
  window.musicSync = new MusicSync(connectToTracker)

  if (window.releaseBuild) {
    let initiator = ("ontouchstart" in document.documentElement) ? "Touch" : "Press enter"
    loaderDiv.innerHTML = "<h1>xAngle - xa-007. Made at Edison 2018. Final version.</h1><p>Please use Chrome on desktop or mobile. iOS is not supported.</p><h2>" + initiator + " to start...</h2>"
    document.addEventListener("touchend", touchEndEvent)

    window.onkeyup = function (e) {
      if (e.code == "Enter") {
        window.startDemo()
      }
    }
  }
  else {
    window.musicSync.start()
  }

  if (!window.releaseBuild) {
    liveCoding.saveState({})
  }
}

function touchEndEvent(e) {
  if (e.type == "touchend") {
    window.renderer.setSize(window.resolution.width / 4, window.resolution.height / 4, false)
    window.startDemo()
    e.preventDefault();
  }
}

_setUpFullScreenTrigger = () => {
  window.goFullScreen = () => {
    var propNames = ["webkitRequestFullScreen", "webkitRequestFullscreen", "mozRequestFullScreen", "requestFullScreen", "requestFullscreen"]

    for (prop of propNames) {
      if (document.body[prop]) {
        document.body[prop]();
        break;
      }
    }
  }
}

_setUpStartDemoTrigger = () => {
  window.startDemo = () => {
    window.goFullScreen()
    loaderDiv.innerHTML = "Loading..."

    setTimeout(() => {
      window.afterCodeChange()

      demoDiv.innerHTML = ""
      demoDiv.appendChild(window.renderer.domElement)
      window.musicSync.start()
    }, 1000)
  }
}

window.afterCodeChange = () => {
  let liveCoding = null
  if (!window.releaseBuild) {
    liveCoding = window.afterCodeChangeLive()
  }

  console.log('after code change')
  let scene = new IntroScene()

  animate = () => {
    if (!window.releaseBuild) {
      if (liveCoding.codeHasChanged()) {
        //console.log("Stopping version " + liveCoding.codeVersion);
        return
      }
    }
    requestAnimationFrame(animate)

    sync = window.musicSync.update()

    scene.update(sync)
    scene.render(renderer)

    if (!window.releaseBuild) {
      liveCoding.saveState({})
    }
  }

  //console.log("Loading version " + liveCoding.codeVersion)

  animate()
}

// https://github.com/joakimk/xa-006/blob/master/web/static/js/demo.coffee#L31
let aspectRatio = 16 / 9

window.resolution = {
  aspectRatio: aspectRatio,
  width: window.innerWidth,
  height: (window.innerWidth / aspectRatio)
}

_setUpRendering = () => {
  window.renderer = new THREE.WebGLRenderer({ antialias: true })

  if (window.releaseBuild) {
    window.renderer.setSize(window.resolution.width / 2, window.resolution.height / 2, false)
  } else {
    window.renderer.setSize(window.resolution.width, window.resolution.height)
  }
}

window.buildRandomGenerator = (seed = 123456) => {
  seed = seed % 2147483647

  return () => {
    seed = seed * 16807 % 2147483647
    return (seed - 1) / 2147483646
  }
}

window.times = (times, fun) => {
  for (let i = 0; i < times; i += 1) {
    fun(i)
  }
}