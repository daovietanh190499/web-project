import * as THREE from './build/three.module.js';

class ThreeObject {
    constructor(object, callbackCamera, callbackMaterial, callbackMesh) {
        this.cubeCamera = this.configCubeCamera(callbackCamera);
        this.material = this.configMaterial(callbackMaterial);
        this.mesh = this.configMesh(object, callbackMesh);
        if(this.cubeCamera.position.x === 0 && this.cubeCamera.position.x === 0 && this.cubeCamera.position.x === 0) {
            this.cubeCamera.position.copy(this.mesh.position)
        }
        return this
    }
    configCubeCamera(callbackCamera) {
        let cubeCamera = new THREE.CubeCamera(1, 20000, 1024);
        cubeCamera = callbackCamera(cubeCamera)
        return cubeCamera
    }
    configMaterial(callbackMaterial) {
        let material = new THREE.MeshStandardMaterial();
        material = callbackMaterial(material)
        material.envMap = this.cubeCamera.renderTarget.texture
        return material
    }
    configMesh(object, callbackMesh) {
        let mesh = new THREE.Mesh(object, this.material);
        mesh = callbackMesh(mesh)
        return mesh
    }
    updateConfig(callback) {
        this.mesh = callback(this.mesh);
    }
    getObject() {
        return [this.mesh, this.cubeCamera]
    }
    update(renderer, scene) {
        this.mesh.visible = false;
        this.cubeCamera.update(renderer, scene);
        this.mesh.visible = true;
    }
}

class ThreeModel {
    constructor(loader, url, callbackCamera, callbackChild, callbackModel) {
        this.cubeCamera = this.configCubeCamera(callbackCamera);
        let self = this
        loader.load( url, function ( gltf ) {
            var model = gltf.scene;
            model.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material.envMap = self.cubeCamera.renderTarget.texture;
                    child = callbackChild(child)
                }
            } );
            model = callbackModel(model)
            if(self.cubeCamera.position.x === 0 && self.cubeCamera.position.x === 0 && self.cubeCamera.position.x === 0) {
                self.cubeCamera.position.copy(model.position)
            }
            self.model = model
        }, undefined, function ( e ) {
            console.error( e );
        } );
    }
    configCubeCamera(callbackCamera) {
        let cubeCamera = new THREE.CubeCamera(1, 20000, 1024);
        cubeCamera = callbackCamera(cubeCamera)
        return cubeCamera
    }
    getObject() {
        return [this.model, this.cubeCamera]
    }
    update(renderer, scene) {
        if (this.model) this.model.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.visible = false;
            }
        } );
        this.cubeCamera.update(renderer, scene);
        if (this.model) this.model.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.visible = true;
            }
        } );
    }
}

class ThreeTexture {
    static getTexture(url, callbackTexture) {
        let textureLoader = new THREE.TextureLoader();
		this.texture = textureLoader.load(url);
		this.texture = callbackTexture(this.texture);
		return this.texture
    }
    static getBackground(url, callbackTexture, callback) {
        let textureLoader = new THREE.TextureLoader();
		textureLoader.load(url, texture => {
            texture = callbackTexture(texture);
            callback(texture)
        });
    }
}

class ThreeScene {
    constructor(scene, callbackScene) {
        this.scene = scene
        this.scene = callbackScene(this.scene)
        return this
    }
    add(){
        for(let i = 0; i < arguments.length; i++) {
            if(arguments[i].isMesh) this.scene.add(arguments[i]);
            else if(arguments[i].getObject) this.scene.add(...arguments[i].getObject())
        }
    }
    getScene() {
        return this.scene
    }
}

class ThreeRenderer {
    constructor(renderer, callbackRenderer) {
        this.renderer = renderer
        this.renderer = callbackRenderer(this.renderer)
        return this
    }
    getRenderer() {
        return this.renderer
    }
    updateConfig(callback) {
        this.renderer = callback(this.renderer)
    }
}

class ThreeControls {
    constructor(controls, callbackControls) {
        this.controls = controls
        this.controls = callbackControls(this.controls)
        return this
    }
    getControls() {
        return this.controls
    }
    updateConfig(callback) {
        this.controls = callback(this.controls)
    }
}

class ThreeCamera {
    constructor(camera, callbackCamera) {
        this.camera = camera
        this.camera = callbackCamera(this.camera)
        return this
    }
    getCamera() {
        return this.camera
    }
    updateConfig(callback) {
        this.camera = callback(this.camera)
    }
}

class ThreeLight {

}

export {ThreeObject, ThreeModel, ThreeTexture, ThreeLight, ThreeScene, ThreeRenderer, ThreeControls, ThreeCamera}