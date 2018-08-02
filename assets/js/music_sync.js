// This class talks to "GNU rocket", both getting the latest values
// and updating the tracker based on the current position in the music.
this.MusicSync = class MusicSync {
  constructor(connectToTracker) {
    this.bpm = 140
    this.rows_per_beat = 8
    this.row_rate = (this.bpm / 60) * this.rows_per_beat

    this.audio = new Audio()

    this.syncDevice = new JSRocket.SyncDevice()

    this.demoMode = (window.location.href.indexOf("tracker") === -1) && !connectToTracker

    if (this.demoMode) {
      console.log("MusicSync: Setting to file mode.")
      this.syncDevice.setConfig({ rocketXML: window.rocketXML })
    } else {
      console.log("MusicSync: Setting to tracker mode.")
      if (navigator.userAgent.indexOf("Macintosh") != -1) {
        this.syncDevice.setConfig({ socketURL: `ws://localhost:1338` })
      } else {
        this.syncDevice.setConfig({ socketURL: `ws://localhost:1339` })
      }
      //this.syncDevice.setConfig({ socketURL: `ws://${window.location.hostname}:1338` })
    }

    this.row = "not yet set"
    this.tracks = {}

    window.musicPlaying = false
  }

  start() {
    const device = this.syncDevice

    if (this.demoMode) {
      console.log("MusicSync: Running from file")
      device.init("demo")
    } else {
      console.log("MusicSync: Connecting to tracker...")
      device.init()
    }

    device.on("ready", () => {
      this._setUpTracks()
      console.log("DEBUG: Musicready")

      this.audio.src = window.musicData
      this.audio.load()
      this.audio.preload = true
      window.audio = this.audio

      if (this.demoMode) {
        return this.audio.addEventListener("canplay", () => {
          console.log("DEBUG: canplay")
          window.musicPlaying = true

          // This does not work, try something else
          document.addEventListener("touchend", () => {
            this.audio.play()
          })
        })
      } else {
        return this.audio.addEventListener("ended", () => {
          console.log("MusicSync: ended")
          this.audio.currentTime = 0
          return this.audio.play()
        })
      }
    })

    device.on("update", row => {
      console.log("MusicSync: row")
      this.row = row

      const newTime = this.row / this.row_rate
      const oldTime = this.audio.currentTime
      this.audio.currentTime = newTime
      return this.data = this._getDataForCurrentRow()
    })

    device.on("play", () => {
      console.log("MusicSync: Playing")
      window.musicPlaying = true
      return this.audio.play()
    })
    return device.on("pause", () => {
      console.log("MusicSync: Pausing")
      window.musicPlaying = false
      return this.audio.pause()
    })
  }

  update() {
    console.log("MusicSync: update")
    this.data = this._getDataForCurrentRow()

    console.log(this.audio.paused)
    if (!this.audio.paused) {
      this.row = this.audio.currentTime * this.row_rate

      if ((this.audio.currentTime > 15) && (window.location.href.indexOf("reset_music") !== -1)) {
        console.log("MusicSync: This is as far as we've gotten, resetting music to the start")
        this.audio.currentTime = 0
      }

      this.syncDevice.update(this.row)
    }

    return this.data
  }

  _setUpTracks() {
    this.tracks.cam_pos_x = this.syncDevice.getTrack("cam_pos_x")
    this.tracks.cam_pos_y = this.syncDevice.getTrack("cam_pos_y")
    this.tracks.cam_pos_z = this.syncDevice.getTrack("cam_pos_z")
    this.tracks.cam_look_x = this.syncDevice.getTrack("cam_look_x")
    this.tracks.cam_look_y = this.syncDevice.getTrack("cam_look_y")
    this.tracks.cam_look_z = this.syncDevice.getTrack("cam_look_z")
    this.tracks.blip_pos_x = this.syncDevice.getTrack("blip_pos_x")
    this.tracks.blip_pos_y = this.syncDevice.getTrack("blip_pos_y")
    this.tracks.blip_pos_z = this.syncDevice.getTrack("blip_pos_z")
    this.tracks.rotate_sign = this.syncDevice.getTrack("rotate_sign")
    this.tracks.credits_position = this.syncDevice.getTrack("credits_position")
    this.tracks.volume = this.syncDevice.getTrack("volume")
    this.tracks.dot_color_scale = this.syncDevice.getTrack("dot_color_scale")
    this.tracks.active_logo_index = this.syncDevice.getTrack("active_logo_index")
  }

  _getDataForCurrentRow() {
    return {
      cam_pos_x: this.tracks.cam_pos_x != null ? this.tracks.cam_pos_x.getValue(this.row) : undefined || 0,
      cam_pos_y: this.tracks.cam_pos_y != null ? this.tracks.cam_pos_y.getValue(this.row) : undefined || 0,
      cam_pos_z: this.tracks.cam_pos_z != null ? this.tracks.cam_pos_z.getValue(this.row) : undefined || 0,
      cam_look_x: this.tracks.cam_look_x != null ? this.tracks.cam_look_x.getValue(this.row) : undefined || 0,
      cam_look_y: this.tracks.cam_look_y != null ? this.tracks.cam_look_y.getValue(this.row) : undefined || 0,
      cam_look_z: this.tracks.cam_look_z != null ? this.tracks.cam_look_z.getValue(this.row) : undefined || 0,
      blip_pos_x: this.tracks.blip_pos_x != null ? this.tracks.blip_pos_x.getValue(this.row) : undefined || 0,
      blip_pos_y: this.tracks.blip_pos_y != null ? this.tracks.blip_pos_y.getValue(this.row) : undefined || 0,
      blip_pos_z: this.tracks.blip_pos_z != null ? this.tracks.blip_pos_z.getValue(this.row) : undefined || 0,
      dot_color_scale: this.tracks.dot_color_scale != null ? this.tracks.dot_color_scale.getValue(this.row) : undefined || 0,
      credits_position: this.tracks.credits_position != null ? this.tracks.credits_position.getValue(this.row) : undefined || 0,
      rotate_sign: this.tracks.rotate_sign != null ? this.tracks.rotate_sign.getValue(this.row) : undefined || 0,
      volume: this.tracks.volume != null ? this.tracks.volume.getValue(this.row) : undefined || 0,
      active_logo_index: this.tracks.active_logo_index != null ? this.tracks.active_logo_index.getValue(this.row) : undefined || 0,
    }
  }
}