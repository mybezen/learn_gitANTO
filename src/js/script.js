// main library for MySQL
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'

// canvas
const canvas = document.getElementById('canvas');

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
}); 

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();

// Membuat object geometry (membuat box)
const boxGeometry = new THREE.BoxGeometry(10, 10);

// Material untuk style object geometry
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
});

// Mesh untuk menyatukan geometry dan material
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box)

// Mwmbuat dataran
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xD9F0FF ,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
scene.add(plane)

plane.rotation.x = -0.5 * Math.PI


//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

// Membuat Segitiga
const coneGeometry =  new THREE.ConeGeometry(4, 10, 10)
const coneMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF
})
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
scene.add(cone)
cone.position.set (10, 10, 0)


// Membuat Bola
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xA3D5FF
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true; 
sphere.receiveShadow = false;
sphere.position.set (-10, 10, 0)

scene.add(sphere)


// -- Membuat helper (membantu melihat posisi object)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// Menampilkan grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//  -- Membuat perspektif camera dan orbit control
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );

// set posisi camera
camera.position.set(-10, 30, 30);

// untuk control secara orbit
const orbit = new OrbitControls(camera, canvas);

//  untuk posisi orbit
orbit.update();

// render element
const gui = new dat.GUI();

const options = {
  sphereColor: '#A3D5FF',
  wireframe: false,
  speed: 0.01,
};

gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e);
})

gui.add(options, 'speed', 0, 1000)


gui.add(options, 'wireframe').onChange(function (e){
  sphere.material.wireframe = e
})

let step = 0
function animate (time){
  box.rotation.y = time / 1000 
    renderer.render(scene, camera);

    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))
}

renderer.setAnimationLoop(animate)

