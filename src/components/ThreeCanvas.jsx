"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThreeCanvas({ modelPath }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // Dynamic base position coordinates (X: 1.2 on desktop to offset to the right column, centered on mobile)
    const basePosition = { x: 1.2, y: 0, z: 0 };
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 900;
      basePosition.x = isMobile ? 0 : 1.2;
      basePosition.y = isMobile ? -0.5 : 0;
      basePosition.z = isMobile ? -1.0 : 0;
    }

    // 1. Create Scene, Camera and Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2; // Move camera slightly closer for a majestic feel

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate Procedural Studio Environment Map
    // This allows physical/metallic materials to reflect light/colors correctly without loading large HDR textures
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    
    // Dark background box to anchor reflections
    const envBgGeom = new THREE.SphereGeometry(12, 16, 16);
    const envBgMat = new THREE.MeshBasicMaterial({ color: 0x070b19, side: THREE.BackSide });
    const envBgMesh = new THREE.Mesh(envBgGeom, envBgMat);
    envScene.add(envBgMesh);

    // Dynamic glowing studio light panels inside environment mapping scene
    const goldSphereGeom = new THREE.SphereGeometry(2.2, 16, 16);
    const goldSphereMat = new THREE.MeshBasicMaterial({ color: 0xffd800 }); // Crearena Gold
    const goldSphere = new THREE.Mesh(goldSphereGeom, goldSphereMat);
    goldSphere.position.set(6, 6, 4);
    envScene.add(goldSphere);

    const blueSphereGeom = new THREE.SphereGeometry(2.8, 16, 16);
    const blueSphereMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 }); // Deep Tech Blue
    const blueSphere = new THREE.Mesh(blueSphereGeom, blueSphereMat);
    blueSphere.position.set(-6, 3, -4);
    envScene.add(blueSphere);

    const pinkSphereGeom = new THREE.SphereGeometry(2.0, 16, 16);
    const pinkSphereMat = new THREE.MeshBasicMaterial({ color: 0xec4899 }); // Accent Magenta
    const pinkSphere = new THREE.Mesh(pinkSphereGeom, pinkSphereMat);
    pinkSphere.position.set(-2, -6, 5);
    envScene.add(pinkSphere);

    const whiteSphereGeom = new THREE.SphereGeometry(3.5, 16, 16);
    const whiteSphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White Highlight
    const whiteSphere = new THREE.Mesh(whiteSphereGeom, whiteSphereMat);
    whiteSphere.position.set(2, 8, -2);
    envScene.add(whiteSphere);

    const envCubeRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envCubeRenderTarget.texture;

    // Dispose PMREM generation resources to free GPU memory
    pmremGenerator.dispose();
    envBgGeom.dispose();
    envBgMat.dispose();
    goldSphereGeom.dispose();
    goldSphereMat.dispose();
    blueSphereGeom.dispose();
    blueSphereMat.dispose();
    pinkSphereGeom.dispose();
    pinkSphereMat.dispose();
    whiteSphereGeom.dispose();
    whiteSphereMat.dispose();

    // 3. Ambient and directional lights to illuminate diffuse components
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111729, 2.0);
    scene.add(hemiLight);

    const frontalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    frontalLight.position.set(0, 0, 5);
    scene.add(frontalLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0xffd800, 8.0, 15);
    accentLight.position.set(-4, -3, 3);
    scene.add(accentLight);

    // Dynamic cursor-tracking spotlight (casts moving highlights on the model)
    const mouseLight = new THREE.PointLight(0x3b82f6, 12.0, 8); // Deep tech blue
    scene.add(mouseLight);

    // Volumetric pulsing light inside the model (shines outward through translucent glass skin)
    const innerLight = new THREE.PointLight(0xffd800, 20.0, 5); // Crearena gold
    scene.add(innerLight);

    // 4. Create Custom Liquid Iridescent Glass-Chrome Material
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.92,             // High metallic value for chrome feel
      roughness: 0.08,             // Smooth polish for sharp reflections
      clearcoat: 1.0,              // Outer shiny lacquer coat
      clearcoatRoughness: 0.02,    // Ultra-smooth clearcoat
      iridescence: 0.85,           // Holographic/Oil-slick rainbow sheen
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [100, 400],
      transmission: 0.25,          // Semitransparent refractive glass quality
      thickness: 1.2,              // Medium thickness for glass refraction
      ior: 1.56,                   // Index of refraction for realistic glass refraction
      side: THREE.DoubleSide
    });

    let mainObject = null;
    let animationFrameId = null;

    // Mouse Tracking Targets
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let smoothMouseSpeed = 0; // Smoothly lerped cursor speed to prevent spiky jumps

    // Vertex displacement parameters (Gooey effect variables)
    let originalVertices = null;
    let originalNormals = null;
    let posAttribute = null;
    let vertexCount = 0;

    // Scroll Animation bindings using GSAP ScrollTrigger
    let scrollTriggerInstance1 = null;
    let scrollTriggerInstance2 = null;

    const setupScrollAnimation = (obj) => {
      if (typeof window === "undefined" || !obj) return;
      
      // Dive position (sink down, slide left behind text)
      scrollTriggerInstance1 = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80px",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const isMobile = window.innerWidth <= 900;
          const startX = isMobile ? 0 : 1.2;
          const startY = isMobile ? -0.5 : 0;
          const startZ = isMobile ? -1.0 : 0;

          basePosition.y = startY - progress * 1.5;
          basePosition.x = startX - progress * 1.5;
          basePosition.z = startZ - progress * 2.0;
        }
      });

      // Dive rotation
      scrollTriggerInstance2 = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80px",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          obj.rotation.x = progress * Math.PI * 0.6;
          obj.rotation.y = progress * Math.PI * 0.3;
        }
      });
    };

    // Load glTF if path is specified, otherwise fallback to premium procedural TorusKnot
    if (modelPath) {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          mainObject = gltf.scene;
          
          // Apply chrome materials to all meshes in the loaded model
          mainObject.traverse((node) => {
            if (node.isMesh) {
              node.material = chromeMaterial;
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });

          // Scale and center the model
          const box = new THREE.Box3().setFromObject(mainObject);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.8 / maxDim;
          mainObject.scale.set(scale, scale, scale);
          
          const center = box.getCenter(new THREE.Vector3());
          mainObject.position.x = -center.x * scale;
          mainObject.position.y = -center.y * scale;
          mainObject.position.z = -center.z * scale;

          // Wrap inside a parent group for easy rotation
          const group = new THREE.Group();
          group.add(mainObject);
          scene.add(group);
          mainObject = group;

          setupScrollAnimation(mainObject);
          setLoading(false);
        },
        null,
        (err) => {
          console.warn("Failed to load custom GLTF, falling back to TorusKnot", err);
          createFallbackTorusKnot();
        }
      );
    } else {
      createFallbackTorusKnot();
    }

    function createFallbackTorusKnot() {
      // Create a fluid-looking Torus Knot representing Crearena's infinity flow (made larger and thicker)
      const geometry = new THREE.TorusKnotGeometry(1.35, 0.4, 180, 16, 3, 4);
      mainObject = new THREE.Mesh(geometry, chromeMaterial);
      scene.add(mainObject);

      // Cache initial vertex positions and normals for smooth gooey deformation along normals
      posAttribute = geometry.attributes.position;
      const normAttribute = geometry.attributes.normal;
      vertexCount = posAttribute.count;
      originalVertices = new Float32Array(vertexCount * 3);
      originalNormals = new Float32Array(vertexCount * 3);
      for (let i = 0; i < vertexCount * 3; i++) {
        originalVertices[i] = posAttribute.array[i];
        originalNormals[i] = normAttribute.array[i];
      }

      setupScrollAnimation(mainObject);
      setLoading(false);
    }

    // 5. Add Premium floating stardust particle cloud
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a spherical shell surrounding the model
      const r = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom glowing circular canvas texture for points
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, 'rgba(255, 216, 0, 1)');      // Accent Gold Core
    pGrad.addColorStop(0.3, 'rgba(255, 110, 0, 0.5)');  // Warm orange halo
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');          // Alpha fadeout
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Animation Loop with Smooth Mouse Lerping and Organic Vertex Wave Deformation
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse target interpolation (lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Update cursor light position in 3D space
      if (mouseLight) {
        mouseLight.position.x = targetX * 4.5;
        mouseLight.position.y = targetY * 3.5;
        mouseLight.position.z = 2.5;
      }

      // Update inner pulsing core light
      if (innerLight) {
        innerLight.intensity = 12.0 + Math.sin(elapsedTime * 3.5) * 8.0;
        if (mainObject) {
          innerLight.position.copy(mainObject.position);
        }
      }

      // Smoothly lerped mouse speed factor to prevent spiky/jittery physics
      const targetMouseSpeed = Math.min(Math.sqrt(targetX * targetX + targetY * targetY), 1.0);
      smoothMouseSpeed += (targetMouseSpeed - smoothMouseSpeed) * 0.05;

      const waveSpeedFactor = 1.0 + smoothMouseSpeed * 0.8;
      const waveAmplitude = 0.12 + smoothMouseSpeed * 0.08;

      // Liquid gooey vertex deformation along normal vectors (TorusKnot fallback)
      if (posAttribute && originalVertices && originalNormals) {
        const time = elapsedTime * 1.0 * waveSpeedFactor;
        const array = posAttribute.array;
        
        for (let i = 0; i < vertexCount; i++) {
          const ix = i * 3;
          const iy = ix + 1;
          const iz = ix + 2;

          const px = originalVertices[ix];
          const py = originalVertices[iy];
          const pz = originalVertices[iz];

          const nx = originalNormals[ix];
          const ny = originalNormals[iy];
          const nz = originalNormals[iz];

          // Wave equation displacing along the normal direction (low frequency 0.6 for smooth swells)
          const wave = Math.sin(px * 0.6 + time) * 
                       Math.cos(py * 0.6 + time) * 
                       Math.sin(pz * 0.5 + time * 0.8) * waveAmplitude;

          array[ix] = px + nx * wave;
          array[iy] = py + ny * wave;
          array[iz] = pz + nz * wave;
        }
        
        posAttribute.needsUpdate = true;
        mainObject.geometry.computeVertexNormals(); // Recalculate lighting normals for warping reflections
      }

      if (mainObject) {
        // Slow constant base rotation
        mainObject.rotation.z = elapsedTime * 0.04;

        // Apply mouse-driven rotation tilt
        mainObject.rotation.y = targetX * 0.6;
        mainObject.rotation.x = targetY * 0.6;

        // Apply mouse position parallax integrated with scroll-driven base positions
        mainObject.position.x = basePosition.x + targetX * 0.8;
        mainObject.position.y = basePosition.y + targetY * 0.6;
        mainObject.position.z = basePosition.z;
      }

      // Breathing scale pulse and rotation on particle cloud
      if (particles) {
        particles.rotation.y = elapsedTime * 0.06;
        particles.rotation.x = elapsedTime * 0.03;
        const pScale = 1 + Math.sin(elapsedTime * 0.6) * 0.04;
        particles.scale.set(pScale, pScale, pScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window Events Listeners (Mouse & Resize)
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Dynamically adjust basePosition coords depending on window resize
      const isMobile = window.innerWidth <= 900;
      basePosition.x = isMobile ? 0 : 1.2;
      basePosition.y = isMobile ? -0.5 : 0;
      basePosition.z = isMobile ? -1.0 : 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // 8. Cleanup WebGL Memory & Events to prevent VRAM and RAM leaks
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement) {
        containerRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      }

      // Dispose PMREM target texture
      if (envCubeRenderTarget) envCubeRenderTarget.dispose();
      particleTexture.dispose();
      if (scrollTriggerInstance1) scrollTriggerInstance1.kill();
      if (scrollTriggerInstance2) scrollTriggerInstance2.kill();

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [modelPath]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      {loading && (
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(17, 23, 41, 0.4)",
          backdropFilter: "blur(4px)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          borderRadius: "8px",
          zIndex: "5"
        }}>
          INITIALIZING WEBGL SCENE...
        </div>
      )}
    </div>
  );
}
