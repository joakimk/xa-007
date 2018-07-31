/* jshint asi:true */
// PixiJS v4 example (WebGL rendering)

window.assetServerUrl = "http://127.0.0.1:5577"

window.DotEffect = class DotEffect {
    constructor(scene, color) {
        this.scene = scene
        this.x = 0
        this.z = 0
        this.destination = new THREE.Vector3(0, 0, 0)

        this.group = new THREE.Group()

        this.light = new THREE.PointLight(color, 4, 5)
        this.group.add(this.light)
        this.counter = 0

        let geometry = new THREE.BoxGeometry(1, 1, 1)
        let material = new THREE.MeshToonMaterial({ color: color })
        this.r = material.color.r
        this.g = material.color.g
        this.b = material.color.b
        this.material = material
        //let material = new THREE.MeshBasicMaterial({ color: color })

        this.box = new THREE.Mesh(geometry, material)
        this.box.scale.set(0.1, 0.1, 0.1)
        this.group.add(this.box)

        scene.add(this.group)
    }

    update(x, z, colorScale) {
        this.counter -= 0.03

        let noTreeToTravelTo = (x == -10000)
        if (!noTreeToTravelTo && !this.traveling && (this.x != x || this.z != z)) {
            this.origin = new THREE.Vector3(this.x, 0, this.z)
            this.destination = new THREE.Vector3(x, 0, z)
            this.curve = new THREE.LineCurve3(this.origin, this.destination)
            this.travel = 0
            this.traveling = true

            //console.log("travel to" + [x, z])
        }

        if (this.traveling) {
            this.travel += 0.02

            if (this.travel > 1.0) {
                this.traveling = false
                this.x = this.destination.x
                this.z = this.destination.z
            } else {
                let point = this.curve.getPointAt(this.travel)
                //console.log("travel" + this.travel)
                //console.log("xin x" + point.x)
                //console.log("xin z" + point.z)
                this.x = point.x
                this.z = point.z
                //console.log("travel x " + this.x + " travel z " + this.z)
            }

        }

        let scale = (1 - Math.sin(Math.PI * this.travel)) * colorScale
        //this.light.distance = colorScale * 0.5
        this.material.color.r = this.r * scale
        this.material.color.g = this.r * scale
        this.material.color.b = this.r * scale
        this.light.color.r = this.r * scale
        this.light.color.g = this.g * scale
        this.light.color.b = this.b * scale

        //this.x = (this.x - x) / 2.0
        //this.x = x
        //        this.z = z

        this.box.rotation.set(this.counter - 0.5, this.counter, this.counter)
        this.box.position.y = 4 + Math.sin(this.counter) * 1.5
        this.box.position.x = this.x + Math.cos(this.counter) * 1.5
        this.box.position.z = this.z + Math.sin(this.counter) * 1.5
        this.light.position.set(
            this.box.position.x,
            this.box.position.y,
            this.box.position.z,
        )
    }
}

window.BlipEffect = class BlipEffect {
    constructor(scene) {
        let geometry = new THREE.BoxGeometry(1, 1, 1)
        let material = new THREE.MeshToonMaterial({ color: 0x5555ff });
        //material.transparent = true
        //material.depthWrite = false

        this.group = new THREE.Group()

        let model = new THREE.Mesh(geometry, material);
        model.scale.set(1, 1, 1)
        this.group.add(model)
        this.model1 = model

        model = new THREE.Mesh(geometry, material);
        model.scale.set(1, 1, 1)
        this.group.add(model)
        this.model2 = model

        model = new THREE.Mesh(geometry, material);
        model.scale.set(1, 1, 1)
        this.group.add(model)
        this.model3 = model
        scene.add(this.group)

        model = new THREE.Mesh(geometry, material);
        model.scale.set(0.1, 0.1, 0.1)
        this.group.add(model)
        this.orbiter1 = model
        scene.add(this.group)

        model = new THREE.Mesh(geometry, material);
        model.scale.set(0.1, 0.1, 0.1)
        this.group.add(model)
        this.orbiter2 = model
        scene.add(this.group)

        model = new THREE.Mesh(geometry, material);
        model.scale.set(0.1, 0.1, 0.1)
        this.group.add(model)
        this.orbiter3 = model
        scene.add(this.group)

        this.light1 = new THREE.PointLight(0xf555ff, 5, 2)
        //this.light1.position.set(0, -2, 0)
        this.group.add(this.light1)

        this.light2 = new THREE.PointLight(0x55f5ff, 5, 2)
        //this.light1.position.set(0, -2, 0)
        this.group.add(this.light2)

        this.light3 = new THREE.PointLight(0x55ff55, 5, 2)
        //this.light1.position.set(0, -2, 0)
        this.group.add(this.light3)

        this.counter = 0
    }

    render(sync) {
        this.counter -= 0.03
        this.model1.rotation.set(this.counter - 0.5, this.counter, this.counter)
        this.model2.rotation.set(-this.counter, this.counter - 0.5, this.counter)
        this.model3.rotation.set(this.counter, -this.counter, this.counter - 0.5)

        this.orbiter1.rotation.set(this.counter - 0.5, this.counter, this.counter)
        this.orbiter1.position.y = Math.sin(this.counter) * 1.5 - 0.5
        this.orbiter1.position.x = Math.cos(this.counter) * 1.5
        this.orbiter1.position.z = Math.cos(this.counter) * 1.5
        this.light1.position.set(this.orbiter1.position.x,
            this.orbiter1.position.y,
            this.orbiter1.position.z,
        )


        this.orbiter2.rotation.set(-this.counter, this.counter - 0.5, this.counter)
        this.orbiter2.position.y = -Math.sin(this.counter) * 1.5
        this.orbiter2.position.x = Math.cos(this.counter) * 1.5 - 0.5
        this.orbiter2.position.z = Math.cos(this.counter) * 1.5
        this.light2.position.set(this.orbiter2.position.x,
            this.orbiter2.position.y,
            this.orbiter2.position.z,
        )


        this.orbiter3.rotation.set(this.counter, -this.counter, this.counter - 0.5)
        this.orbiter3.position.y = Math.sin(this.counter) * 1.5
        this.orbiter3.position.x = -Math.cos(this.counter) * 1.5
        this.orbiter3.position.z = Math.cos(this.counter) * 1.5 - 0.5
        this.light3.position.set(this.orbiter3.position.x,
            this.orbiter3.position.y,
            this.orbiter3.position.z,
        )


        this.group.position.set(sync.blip_pos_x, sync.blip_pos_y, sync.blip_pos_z)
        //this.group.scale.set(Math.sin(sync.cam_pos_x) + 0.5, Math.sin(sync.cam_pos_y) + 0.5, Math.sin(sync.cam_pos_z) + 0.5)
        //this.model.position.y = 3

    }
}

window.GrassEffect = class GrassEffect {
    constructor(scene) {
        this.rand = buildRandomGenerator(1000000)

        let geometry = new THREE.PlaneBufferGeometry(100, 100);

        let texture = new THREE.CanvasTexture(this._generateTexture());

        let materials = []
        for (var i = 0; i < 15; i++) {
            var material = new THREE.MeshToonMaterial({
                color: new THREE.Color().setHSL(0.3, 0.75, (i / 15) * 0.4 + 0.1),
                map: texture,
                depthTest: true,
                depthWrite: false,
                transparent: true
            });

            materials.push(material)
        }

        for (let z = -4; z < 5; z += 1) {
            for (let x = -5; x < 6; x += 1) {
                let grass = new THREE.Group()
                for (var i = 0; i < 15; i++) {
                    var material = materials[i]
                    var mesh = new THREE.Mesh(geometry, material);
                    //mesh.position.y = -6
                    mesh.position.y = i * 0.25;
                    mesh.rotation.x = - Math.PI / 2;
                    grass.add(mesh);
                }

                grass.children.reverse()
                grass.scale.set(0.2, 0.2, 0.2)
                grass.position.y = 1.2
                grass.position.x = x * 20
                grass.position.z = z * 20
                this.grass = grass
                scene.add(this.grass)
            }
        }
    }



    _generateTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;

        let rand = this.rand

        var context = canvas.getContext('2d');
        for (var i = 0; i < 10000; i++) {
            context.fillStyle = 'hsl(0,0%,' + (Math.random() * 50 + 50) + '%)';
            context.beginPath();
            context.arc(rand() * canvas.width * 1, rand() * canvas.height * 1, rand() + 0.1, 0, Math.PI * 2, true);
            context.fill();
        }
        context.globalAlpha = 0.075;
        context.globalCompositeOperation = 'lighter';

        return canvas;
    }
}

window.TreeEffect = class TreeEffect {
    constructor(type, x, y, z) {
        this.treeGeometry = new THREE.BoxGeometry(1, 1, 1)
        this.leafMaterials = [
            new THREE.MeshLambertMaterial({ color: 0x91E56E }),
            new THREE.MeshLambertMaterial({ color: 0x71B356 }),
            new THREE.MeshLambertMaterial({ color: 0x518356 }),
            new THREE.MeshLambertMaterial({ color: 0x406040 }),
            new THREE.MeshLambertMaterial({ color: 0x90AA50 }),
            new THREE.MeshLambertMaterial({ color: 0x90DD00 }),
        ]

        this.x = x
        this.y = y
        this.z = z
        this.rand = buildRandomGenerator(100009)
        this.type = type
    }

    render() {
        let tree = new THREE.Group()
        tree.position.set(this.x, this.y, this.z)

        let rand = this.rand

        let stemMaterial = new THREE.MeshLambertMaterial({ color: 0x7D5A4F });

        if (this.type == "tall") {
            let stem = new THREE.Mesh(this.treeGeometry, stemMaterial)
            stem.scale.set(0.3, 1.5, 0.3)
            tree.add(stem);

            // Body
            times(3, (i) => {
                this._addLeaf(tree, (i % 2),
                    0, i * 1.3 + 1, 0,
                    1.0, 1.0, 1.5)
            })

            times(8, (i) => {
                let sin = Math.sin(i / 2.0) * 0.1 + 0.5 * rand()
                let cos = Math.cos(i / 2.0) * 0.1 + 0.5 * rand()

                this._addLeaf(tree, (i % 3),

                    sin,
                    (i * (0.1 + 0.5 * rand())) + 1,
                    cos,

                    1.0 + 0.2 * rand(),
                    1.0 + 0.2 * rand(),
                    1.0 + 0.2 * rand()
                )
            })
        } else if (this.type == "wide") {
            let stem = new THREE.Mesh(this.treeGeometry, stemMaterial)
            stem.scale.set(0.3, 1.5, 0.3)
            tree.add(stem);

            times(3, (i) => {
                let width = 2.0 * (1 - i / 3)
                this._addLeaf(tree, (i % 5),
                    0, i * 1.3 + 1, 0,
                    width, 1, width)
            })

            times(8, (i) => {
                let sin = Math.sin(i / 2.0) * 0.9 + 0.5 * rand()
                let cos = Math.cos(i / 2.0) * 0.9 + 0.5 * rand()

                this._addLeaf(tree, (i % 5),

                    sin,
                    (i * (0.1 + 0.5 * rand())) + 1,
                    cos,

                    0.8 + 0.5 * rand(),
                    0.8 + 0.5 * rand(),
                    0.8 + 0.5 * rand()
                )
            })

        } else if (this.type == "xwide") {
            let stem = new THREE.Mesh(this.treeGeometry, stemMaterial)
            stem.scale.set(0.5, 1.5, 0.5)
            tree.add(stem);

            times(25, (i) => {
                let sin = (Math.sin(i / 0.05) * 1.0 + 2.0 * rand()) - 1
                let cos = (Math.cos(i / 0.05) * 1.0 + 2.0 * rand()) - 1

                this._addLeaf(tree, (i % 4),

                    sin,
                    (i * (0.028 * rand())) + 1.5,
                    cos,

                    1.3 + 0.7 * rand(),
                    1.0 + 0.7 * rand(),
                    1.3 + 0.7 * rand()
                )
            })

        } else if (this.type == "brush") {
            times(30, (i) => {
                let sin = Math.sin(i / 1) * (0.03 + 2.0 * rand()) - 1
                let cos = Math.cos(i / 1) * (0.03 + 2.0 * rand()) - 1

                this._addLeaf(tree, 2 + (i % 2),
                    sin,
                    (i * (0.04 * rand())) - 1.0,
                    cos,

                    0.5 + 0.3 * rand(),
                    0.5 + 0.3 * rand(),
                    0.5 + 0.3 * rand()
                )
            })
        } else {
            console.log("Unknown type: " + this.type)
        }

        return tree
    }

    _addLeaf(tree, materialIndex, x, y, z, xs, ys, zs) {
        let rand = this.rand
        let material = this.leafMaterials[materialIndex]

        let leaf = new THREE.Mesh(this.treeGeometry, material)

        leaf.position.set(x, y, z);
        leaf.scale.set(xs, ys, zs)

        tree.add(leaf)
    }
}

window.IntroScene = class IntroScene {
    constructor() {
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.FogExp2(0x000000, 0.04)
        this.camera = new THREE.PerspectiveCamera(75, window.resolution.aspectRatio, 0.1, 50)

        this.camera.up = new THREE.Vector3(0, 1, 0)
        this.camera.position.y = 10000
        this.debugMode = false

        this.scene.add(this.camera)

        if (window.showRenderStats) {
            this.rendererStats = new THREEx.RendererStats()
            this.rendererStats.domElement.style.position = "absolute"
            this.rendererStats.domElement.style.left = "0px"
            this.rendererStats.domElement.style.bottom = "0px"
            document.body.appendChild(this.rendererStats.domElement)

            this.frameStats = new Stats()
            this.frameStats.domElement.style.position = "absolute"
            this.frameStats.domElement.style.right = "0px"
            this.frameStats.domElement.style.bottom = "0px"
            document.body.appendChild(this.frameStats.domElement)
        }

        this.rand = buildRandomGenerator(100009)
        let rand = this.rand

        if (!this.debugMode) {
            this.skyboxEffect = new SkyboxEffect(this.scene)
            this.grassEffect = new GrassEffect(this.scene)

            var light = new THREE.AmbientLight(0x223211);
            //var light = new THREE.AmbientLight(0xfffffff);
            this.scene.add(light)

            let groundMaterial = new THREE.MeshLambertMaterial({ color: 0x00AA55 })

            let scene = this.scene
            let camera = this.camera

            let creditText =
                `
  xAngle Presents
          xa-007

         A demo
              @
      Edison 2018

  This demo was so
     late that it did
     not even get a
     name or proper
     credits during
         the party!


    Greets to:
 five finger punch
    booze design
    husvagn crew
             fck
             and
          fairlight



       code:
          trejs
          danter



       gfx:
          trejs



       sync:
          danter


       music:
         Erio &
         Waking
         Dreams






 Anyway, enjoy this
   somewhat fixed
      final version!
`;

            let fontLoader = new THREE.FontLoader();
            fontLoader.load(window.font, function (font) {

                let textGeo = new THREE.TextGeometry(creditText, {
                    font: font,
                    size: 0.17,
                    height: 0.01,
                    curveSegments: 3,
                    bevelThickness: 0.01,
                    bevelSize: 0.001,
                    bevelEnabled: true
                });

                textGeo.computeBoundingBox();
                textGeo.computeVertexNormals();

                var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

                let materials = [
                    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
                    new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
                ];

                let credits = new THREE.Mesh(textGeo, materials);
                credits.rotation.y = Math.PI * 2;
                credits.scale.set(0.5, 0.5, 0.5)

                window.credits = credits;

                camera.add(window.credits);
                credits.position.set(centerOffset + 1.2, -30, -1)
            });


            let geometry = new THREE.BoxGeometry(1, 1, 1)
            let types = ["tall", "wide", "xwide"]

            let map = new THREE.Group()
            this.treeCords = []
            for (let data of window.pixelData.map) {
                let x = data[0][0] - 65
                let z = data[0][1] - 35

                let r = data[1][0]
                let g = data[1][1]
                let b = data[1][2]

                if (g == 255) {
                    let type = types[parseInt(rand() * types.length)]
                    let tree = this._createTree(type, x * 2, 2, -z * 2)
                    map.add(tree)
                    this.treeCords.push(new THREE.Vector3(x * 2, 2, -z * 2))
                } else if (g == 128) {
                    //let type = "brush"
                    //let tree = this._createTree(type, x * 2, 2, -z * 2)
                    //map.add(tree)
                    //this.treeCords.push(new THREE.Vector3(x * 2, 2, -z * 2))
                }
            }
            this.scene.add(map)

            this.dots = [
                new DotEffect(this.scene, 0x55f5ff),
                new DotEffect(this.scene, 0x55ff55),
                new DotEffect(this.scene, 0xf555ff),

                new DotEffect(this.scene, 0x55f5ff),
                new DotEffect(this.scene, 0x55ff55),
                new DotEffect(this.scene, 0xf555ff),
            ]

            let ground = new THREE.Mesh(geometry, groundMaterial)
            ground.position.set(0, 0, 0)
            ground.scale.set(220, 1, 180)
            this.scene.add(ground)

            let debugMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            let debug = new THREE.Mesh(geometry, debugMaterial);
            debug.position.set(0, 0, 0);
            //debug.scale.set(17, 2, 17)
            //this.scene.add(debug)

            var texture = new THREE.TextureLoader().load(window.edisonLogo);
            let signMaterial = new THREE.MeshBasicMaterial({ color: 0xffd000, map: texture });
            signMaterial.transparent = true
            let sign = new THREE.Mesh(geometry, signMaterial);
            sign.position.set(-2.5, 3.5, 0);
            sign.scale.set(5, 0.01, 2)
            sign.rotation.set(1.5, 0, 0)
            this.sign = sign
            this.scene.add(sign)

            //let sign2 = new THREE.Mesh(geometry, signMaterial);
            //sign2.position.set(-2.5, 3.5, 0);
            //sign2.scale.set(5, 1.2, 2)
            //sign2.rotation.set(1.5, 0, 0)
            //this.sign2 = sign2
            //this.scene.add(sign2)


            //this.light1 = new THREE.PointLight(0x5000ff, 2.5, 20)
            this.light1 = new THREE.PointLight(0xffffff, 0.5, 20)
            this.light1.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z)
            this.scene.add(this.light1)

            // this.edisonGeometry = new THREE.BoxGeometry(1, 1, 1)
            // this.edisonTexture = new THREE.CubeTextureLoader().load(window.edisonlogo);
            // this.edisonlogo =new THREE.Mesh(this.edisonGeometry, edisonTexture)
            // this.scene.add.(this.edisonlogo)

            this.blipEffect = new BlipEffect(this.scene)

            //this.dayLight = new THREE.PointLight(0xffffff, 1.7, 100)
            //this.dayLight.position.set(-10, -20, -5)
            //this.scene.add(this.dayLight)


            //let blipMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
            //this.blip = new THREE.Mesh( geometry, blipMaterial );
            //this.blip.position.set( 3, 3, 3 );
            //this.blip.scale.set( 0.1, 0.1, 0.1 );
            //this.scene.add(this.blip)
        } else {
            this.tree1 = this._createTree("tall", 0, 0, 0)
            this.scene.add(this.tree1)
            this.tree2 = this._createTree("wide", 0, 0, 0)
            this.scene.add(this.tree2)
            this.tree3 = this._createTree("xwide", 0, 0, 0)
            this.scene.add(this.tree3)
            this.tree4 = this._createTree("brush", 0, 0, 0)
            this.scene.add(this.tree4)

            this.light1 = new THREE.PointLight(0xffffff, 2, 100)
            this.light1.position.set(5, 10, -5)
            this.scene.add(this.light1)
        }
    }

    update(sync) {
        if (window.releaseBuild && !window.musicPlaying) { return }

        if (!this.debugMode) {
            this.blipEffect.render(sync)
            this.skyboxEffect.render(1.0)

            this.sign.rotation.set(1.5, Math.PI * sync.rotate_sign, 0)

            this.camera.position.set(
                sync.cam_pos_x,
                sync.cam_pos_y,
                sync.cam_pos_z)

            this.camera.lookAt(sync.cam_look_x, sync.cam_look_y, sync.cam_look_z)

            if (window.credits) {
                credits.position.y = sync.credits_position
            }

            if (window.audio != undefined)
                window.audio.volume = sync.volume;
            // var quad = new THREE.Quaternion();
            // quad.setFromAxisAngle( new THREE.Vector3( sync.cam_rot_x, sync.cam_rot_y, sync.cam_rot_z ), Math.PI / 2 );
            // this.camera.applyQuaternion(quad);

            this.light1.position.x = this.camera.position.x
            this.light1.position.y = this.camera.position.y
            this.light1.position.z = this.camera.position.z

            let closeTrees = []
            let camPos = new THREE.Vector3(sync.cam_pos_x, 2, sync.cam_pos_z);
            let lookPos = new THREE.Vector3(sync.cam_look_x, sync.cam_look_y, sync.cam_look_z)
            let camLookDistance = camPos.distanceTo(lookPos)
            for (let c of this.treeCords) {
                let distance = c.distanceTo(camPos)
                let lookDistance = c.distanceTo(lookPos)

                if (camLookDistance > lookDistance) {
                    if (distance > 10 && distance < 40) {
                        closeTrees.push(c)
                    }
                }

            }

            let i = 0
            for (let dot of this.dots) {
                i += 1
                if (closeTrees[i]) {
                    dot.update(closeTrees[i].x, closeTrees[i].z, sync.dot_color_scale)
                } else {
                    dot.update(-10000, -10000, sync.dot_color_scale)
                }
            }
        } else {
            this.camera.position.set(0, 5, -10)
            this.camera.lookAt(0, 2, 0)

            this.tree1.position.z = 0
            this.tree1.position.x = 9
            this.tree1.rotation.y = model.counter

            this.tree2.position.z = 0
            this.tree2.position.x = 4
            this.tree2.rotation.y = model.counter
            //this.tree2.rotation.y -= 0.005

            this.tree3.position.z = 0
            this.tree3.position.x = -3
            this.tree3.rotation.y = model.counter
            //this.tree3.rotation.y -= 0.005

            this.tree4.position.z = 0
            this.tree4.position.x = -11
            this.tree4.rotation.y = model.counter
            //this.tree3.rotation.y -= 0.005

            model.counter -= 0.005
        }

        //this.blip.position.set( this.light1.position.x, this.light1.position.y, 0 );
        //this.camera.rotation.y = -0.2
    }

    render(renderer) {
        //this.cube.rotation.x += 0.008
        //this.cube.rotation.y += 0.008

        if (window.showRenderStats) {
            this.rendererStats.update(renderer)
            this.frameStats.update()
        }

        renderer.render(this.scene, this.camera)
    }

    _createTree(type, x, y, z) {
        return new TreeEffect(type, x, y, z).render()
    }

}

// Helper code below here ------------------------------------------------

window.afterCodeChangeLive = () => {
    return liveCoding
}

window.afterFirstLoadLive = () => {
    return liveCoding
}

// Load the rest of the demo code
if (!window.releaseBuild) {
    if (!window.mainLoaded) {
        script = document.createElement("script")
        script.src = window.assetServerUrl + "/js/main.js" + "?cache_buster=" + new Date().getTime()
        document.body.appendChild(script)
        window.mainLoaded = true
        setTimeout(() => { JSRocket }, 500)
    } else {
        window.afterCodeChange()
    }
}
