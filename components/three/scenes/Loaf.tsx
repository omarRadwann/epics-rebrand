"use client";

/**
 * Procedural loaf — Moon #1's centrepiece specimen.
 *
 * A scored bâtard, not a blob: elongated body, flattened base, gently
 * domed top, tapered ends, and a single slash groove down the spine.
 * Crust topology is subtle high-frequency value-noise — not the large
 * amplitude lumps that made the old version read as a brown rock.
 *
 * Two-tone vertex colours do the heavy lifting: dark baked crust on the
 * shaded sides, a sun-kissed lighter dome, and pale floury crumb inside
 * the score. Opaque meshStandardMaterial — bread is not translucent, so
 * the old fake-SSS transmission is gone.
 *
 * Geometry + colours are built once in useMemo, then frozen. No per-frame
 * shader cost beyond a slow rotational drift.
 */
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface LoafProps {
  position?: [number, number, number];
  scale?: number;
  /** 0..1 — animated emissive pulse to suggest warmth from a baker's lamp. */
  warmth?: number;
}

// Brand-tuned crust palette — sampled toward warm wheat, away from "mud".
const C_DARK = new THREE.Color("#7c4f25"); // shaded sides + base
const C_TOP = new THREE.Color("#b67f3d"); // sun-kissed dome
const C_SCORE = new THREE.Color("#e8ccA0"); // floury exposed crumb in the slash

export function Loaf({ position = [0, 0, 0], scale = 1, warmth = 1 }: LoafProps) {
  const ref = useRef<THREE.Mesh>(null);

  // ============================================================
  // Geometry — a sphere reshaped into a scored bâtard, with baked
  // vertex colours. detail 5 → ~10k verts: smooth enough for subtle
  // crust, light enough to draw cheaply every frame.
  // ============================================================
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 5);
    const pos = geo.attributes.position;
    if (!pos) return geo;

    const v = new THREE.Vector3();
    const colors = new Float32Array(pos.count * 3);
    const col = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).normalize();
      const dx = v.x;
      const dy = v.y;
      const dz = v.z;
      const ax = Math.abs(dx);

      // --- base dimensions: wider than tall = bread, not a sausage ---
      let X = dx * 1.02;
      let Y = dy * 0.42;
      let Z = dz * 0.5;

      // --- flatten the underside so it sits like a loaf on a board ---
      if (dy < 0) Y *= 0.4;

      // --- dome the top across the middle of the body ---
      Y += Math.max(0, dy) * (1 - dx * dx) * 0.13;

      // --- taper the ends: bâtard ends draw inward, not capsule-round ---
      if (ax > 0.55) {
        const k = (ax - 0.55) / 0.45;
        const pinch = 1 - 0.62 * k * k;
        Y *= pinch;
        Z *= pinch;
      }

      // --- scoring slash: a groove down the spine, fading at the ends ---
      let groove = 0;
      if (dy > 0.1) {
        const d = Math.abs(Z - dx * 0.06); // near-straight slash
        const within = 1 - sstep(0, 0.12, d); // 1 at the centre line
        const bodyMask = 1 - sstep(0.5, 0.92, ax);
        groove = within * bodyMask;
        Y -= groove * 0.07; // carve the groove down
      }

      // --- subtle high-frequency crust topology (no large lumps) ---
      const n =
        0.014 * noise(X * 7.5, Y * 7.5, Z * 7.5) +
        0.007 * noise(X * 19.0, Y * 19.0, Z * 19.0);
      X += dx * n;
      Y += dy * n;
      Z += dz * n;

      pos.setXYZ(i, X, Y, Z);

      // --- vertex colour: dark crust → sun-kissed top → floury score ---
      const topFactor = sstep(-0.25, 0.75, dy);
      col.copy(C_DARK).lerp(C_TOP, topFactor);
      // gentle bake variation so the gradient isn't a flat ramp
      const shade = 0.9 + 0.2 * (noise(X * 5, Y * 5, Z * 5) + 0.5);
      col.multiplyScalar(shade);
      if (groove > 0.02) col.lerp(C_SCORE, Math.min(1, groove * 1.2));
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Slow rotational drift so the loaf reveals every face + the score.
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.06;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale} castShadow receiveShadow>
      <meshStandardMaterial
        vertexColors
        roughness={0.82}
        metalness={0}
        emissive="#7a3d12"
        emissiveIntensity={0.05 * warmth}
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

/** 3-arg smoothstep (edge0, edge1, x) — GLSL-style, clamped. */
function sstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
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
