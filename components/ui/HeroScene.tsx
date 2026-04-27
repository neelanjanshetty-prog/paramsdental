'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const ambientLight = new THREE.AmbientLight('#ffffff', 1.1);
    const directionalLight = new THREE.DirectionalLight('#9cdfff', 2.4);
    directionalLight.position.set(3, 4, 5);
    scene.add(ambientLight, directionalLight);

    const group = new THREE.Group();
    scene.add(group);

    const material = new THREE.MeshPhysicalMaterial({
      color: '#dff5ff',
      roughness: 0.15,
      metalness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transmission: 0.42,
      thickness: 0.9,
    });

    const crownGeometry = new THREE.SphereGeometry(1.05, 48, 48);
    const toothTop = new THREE.Mesh(crownGeometry, material);
    toothTop.scale.set(1.1, 1.0, 0.95);
    toothTop.position.y = 0.65;

    const rootGeometry = new THREE.CapsuleGeometry(0.38, 1.4, 8, 16);
    const leftRoot = new THREE.Mesh(rootGeometry, material);
    leftRoot.position.set(-0.32, -0.8, 0);
    leftRoot.rotation.z = -0.32;

    const rightRoot = new THREE.Mesh(rootGeometry, material);
    rightRoot.position.set(0.32, -0.8, 0);
    rightRoot.rotation.z = 0.32;

    const centerRidge = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), material);
    centerRidge.position.set(0, 0.2, 0.2);
    centerRidge.scale.set(1, 1.2, 0.8);

    const ringGeometry = new THREE.TorusGeometry(1.85, 0.06, 24, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: '#4CB9E7', transparent: true, opacity: 0.45 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = 0.75;
    ring.rotation.y = 0.4;

    const dots = new THREE.Group();
    const dotMaterial = new THREE.MeshBasicMaterial({ color: '#B7E3F6' });
    Array.from({ length: 18 }).forEach((_, index) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), dotMaterial);
      const angle = (index / 18) * Math.PI * 2;
      dot.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 1.4, Math.sin(angle * 1.8) * 0.3);
      dots.add(dot);
    });

    group.add(toothTop, leftRoot, rightRoot, centerRidge, ring, dots);

    const setSize = () => {
      const parent = canvas.parentElement;

      if (!parent) {
        return;
      }

      const { clientWidth, clientHeight } = parent;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    setSize();

    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * 0.35;
      group.rotation.x = Math.sin(elapsed * 0.7) * 0.08;
      group.position.y = Math.sin(elapsed * 1.2) * 0.08;
      ring.rotation.z = elapsed * 0.24;
      dots.rotation.z = -elapsed * 0.32;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => setSize();
    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);
      crownGeometry.dispose();
      rootGeometry.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      dotMaterial.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
