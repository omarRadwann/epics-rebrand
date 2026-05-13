"use client";

/**
 * Procedural loaf — Moon #1's centrepiece specimen.
 *
 * Geometry: high-poly stretched icosahedron, vertices displaced by 3D
 * simplex noise to produce a believable crust topology.
 * Material: meshPhysicalMaterial with low-strength transmission + a warm
 * emissive layer faking subsurface scattering so the crumb glows when the
 * key light grazes it.
 *
 * The displacement is applied once at construction time, then frozen —
 * no shader cost per frame.
 */
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
// noise function copied inline below — avoids a runtime dep on simplex-noise

interface LoafProps {
  position?: [number, number, number];
  scale?: number;
  /** 0..1 — animated emissive pulse to suggest warmth from a baker's lamp. */
  warmth?: number;
}

export function Loaf({ position = [0, 0, 0], scale = 1, warmth = 1 }: LoafProps) {
  const ref = useRef<THREE.Mesh>(null);

  // ============================================================
  // Geometry — stretched icosahedron with noise-displaced vertices
  // ============================================================
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.5, 6);
    const pos = geo.attributes.position;
    if (!pos) return geo;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);

      // Stretch into a loaf shape (long-axis x, slight squash on y)
      v.x *= 1.7;
      v.y *= 0.9;
      v.z *= 0.95;

      // Multi-octave noise displacement for crust topology
      const n =
        0.04 * noise(v.x * 4.5, v.y * 4.5, v.z * 4.5) +
        0.02 * noise(v.x * 9.0, v.y * 9.0, v.z * 9.0) +
        0.012 * noise(v.x * 18.0, v.y * 18.0, v.z * 18.0);

      v.normalize().multiplyScalar(0.5 + n);
      // restore stretch after re-normalize
      v.x *= 1.7;
      v.y *= 0.9;
      v.z *= 0.95;

      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Slow rotational drift so the loaf reveals every face.
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.06;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#b88748"            // dark wheat crust
        roughness={0.62}
        metalness={0.02}
        clearcoat={0.15}
        clearcoatRoughness={0.85}
        sheen={0.4}
        sheenColor="#e1b271"
        sheenRoughness={0.7}
        // Fake-SSS: a touch of transmission + thickness + warm attenuation
        transmission={0.06}
        thickness={0.5}
        attenuationColor="#d9a35d"
        attenuationDistance={0.6}
        emissive="#f0c989"
        emissiveIntensity={0.12 * warmth}
      />
    </mesh>
  );
}

/* ============================================================
   §1 — Tiny 3D value-noise (good enough for displacement)
   Not Perlin/simplex; produces smooth-enough crust without bringing in
   a simplex-noise dependency or building a worker for it.
   ============================================================ */
function hash3(x: number, y: number, z: number): number {
  const h = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return h - Math.floor(h);
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number, z: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;

  const u = smoothstep(xf);
  const v = smoothstep(yf);
  const w = smoothstep(zf);

  const c000 = hash3(xi, yi, zi);
  const c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi);
  const c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1);
  const c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1);
  const c111 = hash3(xi + 1, yi + 1, zi + 1);

  const x00 = c000 + (c100 - c000) * u;
  const x10 = c010 + (c110 - c010) * u;
  const x01 = c001 + (c101 - c001) * u;
  const x11 = c011 + (c111 - c011) * u;
  const y0 = x00 + (x10 - x00) * v;
  const y1 = x01 + (x11 - x01) * v;
  return y0 + (y1 - y0) * w - 0.5;
}
