// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";

// const RingAnimation = () => {
//   const canvasRef = useRef();

//   useEffect(() => {
//     let scene, camera, renderer, ring;

//     const init = () => {
//       // Scene
//       scene = new THREE.Scene();

//       // Camera
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       camera.position.z = 5;

//       // Renderer
//       renderer = new THREE.WebGLRenderer({
//         canvas: canvasRef.current,
//         antialias: true,
//       });
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       renderer.setClearColor(0xffffff);

//       // Ring geometry
//       const geometry = new THREE.TorusGeometry(1, 0.2, 16, 100);
//       const material = new THREE.MeshBasicMaterial({ color: 0x67a9db });
//       ring = new THREE.Mesh(geometry, material);
//       scene.add(ring);

//       // Animation loop
//       const animate = () => {
//         requestAnimationFrame(animate);
//         ring.rotation.x += 0.01;
//         ring.rotation.y += 0.01;
//         renderer.render(scene, camera);
//       };

//       animate();
//     };

//     init();

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // return <canvas ref={canvasRef} />;

//   return (
//     <div class="sketchfab-embed-wrapper">
//       <iframe
//         title="Diamond"
//         frameborder="0"
//         allowfullscreen
//         mozallowfullscreen="true"
//         webkitallowfullscreen="true"
//         allow="autoplay; fullscreen; xr-spatial-tracking"
//         xr-spatial-tracking
//         execution-while-out-of-viewport
//         execution-while-not-rendered
//         web-share
//         src="https://sketchfab.com/models/1ab1e8de5a604b4081c15326eaa5682b/embed"
//       >
//       </iframe>
//       <Canvas>
//       {/* Use <primitive> component directly */}
//       <primitive object="https://sketchfab.com/models/1ab1e8de5a604b4081c15326eaa5682b/embed" />
//     </Canvas>
//     </div>
//   );
// };

// export default RingAnimation;

import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Loader from './Loader';
import { Suspense } from 'react';

const RingAnimation = () => {
  const canvasRef = useRef();

  const [objectVisible, setObjectVisible] = useState(false);

  // useEffect(() => {
  //   // Set a delay before showing the 3D object (for demonstration purposes)
  //   const timeout = setTimeout(() => {
  //     setObjectVisible(true);
  //   }, 2000); // Adjust the delay time as needed

  //   // Clean up the timeout to prevent memory leaks
  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    let scene, camera, renderer, ring;

    const init = () => {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Load ring model
      const loader = new GLTFLoader();
      loader.load('./src/assets/diamond.glb', (gltf) => {
        ring = gltf.scene;
        scene.add(ring);
      });

      console.log(scene);

      // renderer.setClearColor(0xffffff);

      renderer.setClearColor(0x000000, 0); // Set clear color to transparent

    // Append the renderer to the DOM
    // mountRef.current.appendChild(renderer.domElement);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (ring) {
          ring.rotation.x += 0.01;
          ring.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
      };

      animate();
    };

    init();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   return (
    <div>
    <canvas ref={canvasRef} >
     {/* {objectVisible && <Primitive ref={canvasRef} />} */}
      {/* <Suspense fallback={<Loader />}>
      
      </Suspense> */}
   </canvas>
   
   </div>
   );
};

export default RingAnimation;


