import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const AvatarModel = ({ animationSequence }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const initialize = async () => {
      // Scene setup
      sceneRef.current = new THREE.Scene();
      sceneRef.current.background = new THREE.Color(0x000000);

      // Camera setup
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      cameraRef.current.position.set(0, 1.5, 2);

      // Renderer setup
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(rendererRef.current.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      sceneRef.current.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 1, 1);
      sceneRef.current.add(directionalLight);

      // Load avatar model
      const loader = new GLTFLoader();
      try {
        const gltf = await loader.loadAsync('/models/avatar.glb');
        modelRef.current = gltf.scene;
        sceneRef.current.add(modelRef.current);

        // Setup animation mixer
        mixerRef.current = new THREE.AnimationMixer(modelRef.current);
        
        // Add initial pose animation
        if (gltf.animations.length > 0) {
          const action = mixerRef.current.clipAction(gltf.animations[0]);
          action.play();
        }
      } catch (error) {
        console.error('Error loading avatar model:', error);
      }

      // Add controls
      const controls = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement
      );
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 5;
      controls.minDistance = 1;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        if (mixerRef.current) {
          mixerRef.current.update(0.016); // Update animations
        }
        
        controls.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      animate();
    };

    initialize();

    // Cleanup
    return () => {
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, []);

  // Handle animation sequence updates
  useEffect(() => {
    if (mixerRef.current && animationSequence) {
      // Play animation sequence
      animationSequence.forEach((animation, index) => {
        setTimeout(() => {
          // Apply animation keyframes to the model
          if (modelRef.current) {
            // Update model pose based on animation keyframes
          }
        }, index * animation.duration);
      });
    }
  }, [animationSequence]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}