window.SkyboxEffect = class SkyboxEffect {
  constructor(scene, intensity) {
    this.skybox = new THREE.CubeTextureLoader()
      //.setPath( window.assetServerUrl + '/cubemap/' )
      .load([
        window.cubemapPX,
        window.cubemapNX,
        window.cubemapPY,
        window.cubemapNY,
        window.cubemapPZ,
        window.cubemapNZ
      ]);

    this.scene = scene
  }

  render() {
    this.scene.background = this.skybox
  }
}