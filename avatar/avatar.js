import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AvatarGestures } from './gestures';

// Set up the 3D scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the .glb file for the avatar
const loader = new GLTFLoader();
let avatar;
loader.load('/avatar/avatar.glb', (gltf) => {
    avatar = gltf.scene;
    scene.add(avatar);
    animate();
});

// Handle gestures (animation logic)
function handleGesture(gesture) {
    if (avatar) {
        AvatarGestures.triggerGesture(avatar, gesture); // This calls specific animations
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

camera.position.z = 5;
