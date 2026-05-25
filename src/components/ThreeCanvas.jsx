"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ThreeCanvas({ modelPath }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // 1. Create Scene, Camera and Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Add Premium Bright Studio Lighting
    // Hemisphere Light (Prevents any black silhouette zones by giving uniform sky/ground ambient fill)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111729, 3.2);
    scene.add(hemiLight);

    // Camera-facing Frontal Light (Brightens the center of the curves directly)
    const frontalLight = new THREE.DirectionalLight(0xffffff, 3.5);
    frontalLight.position.set(0, 0, 5);
    scene.add(frontalLight);

    // Key Light (Crisp white from top right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    // Signature Accent Light (Crearena Warm Yellow reflecting from bottom left)
    const accentLight = new THREE.PointLight(0xffd800, 15.0, 15);
    accentLight.position.set(-4, -3, 3);
    scene.add(accentLight);

    // Blue fill light from top left
    const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.2);
    fillLight.position.set(-5, 3, 2);
    scene.add(fillLight);

    // 3. Create High-Reflective Metallic Chrome Material (Silver Chrome)
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, // Pure white for perfect silver/chrome reflection
      metalness: 1.0,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      ior: 1.6
    });

    let mainObject = null;
    let animationFrameId = null;

    // Mouse Tracking Targets
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Vertex displacement parameters (Gooey effect variables)
    let originalVertices = null;
    let posAttribute = null;
    let vertexCount = 0;

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
      // Create a fluid-looking Torus Knot representing Crearena's infinity flow
      const geometry = new THREE.TorusKnotGeometry(1.0, 0.36, 180, 16, 3, 4);
      mainObject = new THREE.Mesh(geometry, chromeMaterial);
      scene.add(mainObject);

      // Cache initial vertex positions for gooey deformation
      posAttribute = geometry.attributes.position;
      vertexCount = posAttribute.count;
      originalVertices = new Float32Array(vertexCount * 3);
      for (let i = 0; i < vertexCount * 3; i++) {
        originalVertices[i] = posAttribute.array[i];
      }

      setLoading(false);
    }

    // 4. Animation Loop with Smooth Mouse Lerping and Gooey Vertex Deformation
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Liquid gooey vertex deformation (only on procedural TorusKnot fallback)
      if (posAttribute && originalVertices) {
        const time = elapsedTime * 1.5;
        
        for (let i = 0; i < vertexCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          const px = originalVertices[ix];
          const py = originalVertices[iy];
          const pz = originalVertices[iz];

          // Gooey displacement: wave frequencies mapped to 3D coordinate space
          const wave = Math.sin(px * 2.0 + time) * Math.cos(py * 2.0 + time) * Math.sin(pz * 1.5 + time) * 0.16;

          // Shift vertex coordinates along the radius vector
          posAttribute.setXYZ(
            i,
            px + wave * (px / 1.0),
            py + wave * (py / 1.0),
            pz + wave * (pz / 1.0)
          );
        }
        
        posAttribute.needsUpdate = true;
        mainObject.geometry.computeVertexNormals(); // Recalculate lighting normals for warping reflections
      }

      if (mainObject) {
        // Slow constant base rotation
        mainObject.rotation.z = elapsedTime * 0.06;

        // Smooth mouse target interpolation (lerp)
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Apply mouse-driven rotation tilt
        mainObject.rotation.y = targetX * 0.7;
        mainObject.rotation.x = targetY * 0.7;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Window Events Listeners (Mouse & Resize)
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
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // 6. Cleanup WebGL Memory & Events
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement) {
        containerRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      }

      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
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
