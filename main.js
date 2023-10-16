import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let object;
//OrbitControls allow the camera to move around the scene
let controls;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Keep track of the mouse position
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
// make the cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);
// add the light
const light = new THREE.AmbientLight(0x404040, 30); // soft white light
// light.castShadow = true;
scene.add(light);


camera.position.z = 5;
// load my model
const loader = new GLTFLoader();

loader.load('export_yellow_candy.glb',
    function (gltf) {
        object = gltf.scene

        scene.add(object);

    }, undefined, function (error) {

        console.error(error);

    });
//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//This adds controls to the camera, so we can rotate / zoom it with the mouse

controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();