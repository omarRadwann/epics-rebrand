"use client";

/**
 * Loaf — Moon #1's centrepiece specimen.
 *
 * A real CC0 bread model (Quaternius · Public Domain · ~29KB GLB, 412
 * tris) rather than procedural geometry. Three procedural rebuilds all
 * read as a smooth orange dome — never as bread — because the failure
 * was the generated SHAPE, not the surface. A genuine modelled loaf
 * reads instantly.
 *
 * On load the model is normalised: re-centred on X/Z, sat with its base
 * at y = 0, and scaled so its longest axis is a known length — so the
 * `position` / `scale` props callers already pass keep behaving
 * predictably regardless of how the GLB was authored.
 */
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { asset } from "@/lib/asset";

interface LoafProps {
  position?: [number, number, number];
  scale?: number;
  /** 0..1 — warm emissive lift, suggests heat from a baker's lamp. */
  warmth?: number;
}

const MODEL_PATH = asset("/models/loaf.glb");

// Longest axis, in scene units, after normalisation. Matches the
// footprint the old procedural loaf occupied so existing callers frame
// it correctly.
const TARGET_LENGTH = 2.0;

export function Loaf({ position = [0, 0, 0], scale = 1, warmth = 1 }: LoafProps) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const model = useMemo(() => {
    const root = scene.clone(true);

    // Measure the GLB (native size + pivot are unknown), then re-centre
    // X/Z, drop the base to y = 0, and scale the longest axis to a
    // known length.
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const norm = TARGET_LENGTH / maxDim;

    root.scale.setScalar(norm);
    root.position.set(-center.x * norm, -box.min.y * norm, -center.z * norm);

    // Tune materials: matte crust, faint warm emissive. Clone first so
    // we never mutate the shared useGLTF cache.
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const src = mesh.material as THREE.MeshStandardMaterial;
      if (src && "roughness" in src) {
        const mat = src.clone();
        mat.roughness = 0.86;
        mat.metalness = 0;
        mat.emissive = new THREE.Color("#7a3d12");
        mat.emissiveIntensity = 0.05 * warmth;
        mesh.material = mat;
      }
    });

    return root;
  }, [scene, warmth]);

  // Slow rotational drift so the loaf reveals its score + every face.
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.06;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
