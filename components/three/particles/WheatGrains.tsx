"use client";

/**
 * Wheat-grain particle field — 8000 instanced specks (3200 on mobile).
 *
 * Each grain has a randomized resting position around the vitrine,
 * a slow drift, cursor-aware displacement, and — driven by scroll
 * progress 0..1 — condenses toward sample points along the "EPICS"
 * wordmark, painting the brand mark out of grains.
 *
 * Per brief §2 Moon #1: "particles condense into the form of the
 * brand wordmark 'EPICS'."
 *
 * Implementation: a single InstancedMesh + per-instance Float32 arrays
 * for rest/target positions. Drift + lerp in useFrame.
 */
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import { usePerfTier } from "@/lib/hooks/usePerfTier";
import { localProgress, SCENE_RANGES } from "@/lib/three/sceneRanges";

interface WheatGrainsProps {
  count: number;
  range?: { start: number; end: number };
}

// Sample points that, when filled, read as the letters E-P-I-C-S.
// Coordinates are in scene-units, centred on the origin. The vitrine
// occupies roughly [-1, 1] x [-0.6, 0.6] x [-0.5, 0.5], so we paint
// the wordmark behind it at z ~ -1.2.
const WORDMARK_SAMPLES: ReadonlyArray<readonly [number, number]> = (() => {
  const pts: Array<[number, number]> = [];
  const stroke = (x0: number, y0: number, x1: number, y1: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0 : i / (n - 1);
      pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
    }
  };

  // Each glyph fits in roughly a 0.45 x 0.6 box. We lay out E-P-I-C-S
  // with 0.55 spacing across x.
  const xs = [-1.6, -0.9, -0.2, 0.45, 1.2];
  const glyphHeight = 0.7;
  const top = glyphHeight / 2;
  const bot = -glyphHeight / 2;
  const mid = 0;
  const glyphW = 0.35;

  // E
  {
    const x = xs[0]!;
    stroke(x, bot, x, top, 12);                      // vertical
    stroke(x, top, x + glyphW, top, 10);            // top bar
    stroke(x, mid, x + glyphW * 0.85, mid, 8);      // mid bar
    stroke(x, bot, x + glyphW, bot, 10);            // bottom bar
  }
  // P
  {
    const x = xs[1]!;
    stroke(x, bot, x, top, 14);                      // vertical
    const bowlR = glyphHeight * 0.27;
    for (let i = 0; i < 14; i++) {
      const a = -Math.PI / 2 + (Math.PI * i) / 13;
      pts.push([x + glyphW * 0.7 - bowlR + Math.cos(a) * bowlR, top - bowlR + Math.sin(a) * bowlR]);
    }
  }
  // I
  {
    const x = xs[2]!;
    stroke(x - glyphW * 0.3, top, x + glyphW * 0.3, top, 6);
    stroke(x - glyphW * 0.3, bot, x + glyphW * 0.3, bot, 6);
    stroke(x, bot, x, top, 14);
  }
  // C
  {
    const x = xs[3]!;
    const r = glyphHeight * 0.42;
    for (let i = 0; i < 22; i++) {
      const a = Math.PI * 0.25 + (Math.PI * 1.5 * i) / 21;
      pts.push([x + glyphW * 0.5 + Math.cos(a) * r, Math.sin(a) * r]);
    }
  }
  // S
  {
    const x = xs[4]!;
    const r = glyphHeight * 0.22;
    // Upper bowl
    for (let i = 0; i < 12; i++) {
      const a = Math.PI * 0.5 + (Math.PI * 1.2 * i) / 11;
      pts.push([x + glyphW * 0.5 + Math.cos(a) * r, r + Math.sin(a) * r]);
    }
    // Lower bowl (mirrored)
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI * 0.5 + (Math.PI * 1.2 * i) / 11;
      pts.push([x + glyphW * 0.5 + Math.cos(a) * r, -r + Math.sin(a) * r]);
    }
  }

  return pts;
})();

const SCRATCH_OBJ = new THREE.Object3D();
const SCRATCH_V = new THREE.Vector3();
const SCRATCH_CURSOR = new THREE.Vector3();

export function WheatGrains({ count, range }: WheatGrainsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const profile = usePerfTier();
  const { size } = useThree();
  const sceneRange =
    range ?? SCENE_RANGES.vitrine ?? { start: 0, end: 1, fadeIn: 0, fadeOut: 1 };

  // Rest positions (where particles drift around when scroll = 0)
  const restPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a thick volume behind+around the vitrine
      const radius = 1.4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.6;
      arr[i * 3 + 2] = -0.5 + radius * Math.cos(phi) * 0.6 - 0.6;
    }
    return arr;
  }, [count]);

  // Target positions = wordmark glyph samples, repeated to fill count.
  // Lifted in Y (+1.05) so the wordmark resolves ABOVE the vitrine at
  // scroll-end, free of occlusion.
  const targetPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const samples = WORDMARK_SAMPLES;
    for (let i = 0; i < count; i++) {
      const s = samples[i % samples.length]!;
      // Slight jitter so the wordmark doesn't look stamped
      const jx = (Math.random() - 0.5) * 0.04;
      const jy = (Math.random() - 0.5) * 0.04;
      arr[i * 3 + 0] = s[0] * 1.1 + jx;
      arr[i * 3 + 1] = s[1] * 0.85 + 1.05 + jy;
      arr[i * 3 + 2] = -0.6 + (Math.random() - 0.5) * 0.08;
    }
    return arr;
  }, [count]);

  // Per-instance drift phase + speed
  const phases = useMemo(() => {
    const arr = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      arr[i * 2 + 0] = Math.random() * Math.PI * 2;
      arr[i * 2 + 1] = 0.4 + Math.random() * 0.9;
    }
    return arr;
  }, [count]);

  // Cursor in normalized device coords, smoothed
  const cursor = useRef(new THREE.Vector2(0, 0));
  const cursorWorld = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!profile.animations.cursorPull) return;
    const onMove = (e: PointerEvent) => {
      cursor.current.x = (e.clientX / size.width) * 2 - 1;
      cursor.current.y = -((e.clientY / size.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [profile.animations.cursorPull, size.width, size.height]);

  // Initialize all instance matrices once
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = SCRATCH_OBJ;
    for (let i = 0; i < count; i++) {
      dummy.position.set(restPositions[i * 3]!, restPositions[i * 3 + 1]!, restPositions[i * 3 + 2]!);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const s = 0.4 + Math.random() * 0.7;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, restPositions]);

  useFrame((state, dt) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const global = useScrollDirector.getState().progress;
    const progress = localProgress(global, {
      start: sceneRange.start,
      end: sceneRange.end,
      fadeIn: sceneRange.start,
      fadeOut: sceneRange.end,
    });
    // Condensation begins at local 0.22 and is complete by 0.88 of
    // this scene's slice — so on the home page (range 0..0.18) the
    // wordmark fully forms by scroll ~0.16, the corridor handoff point.
    const condense = THREE.MathUtils.clamp((progress - 0.22) / 0.66, 0, 1);
    const condenseEased = condense * condense * (3 - 2 * condense); // smoothstep

    // Cursor in world: project from screen NDC onto plane z = -1.0
    if (profile.animations.cursorPull) {
      SCRATCH_CURSOR.set(cursor.current.x, cursor.current.y, -1.0).unproject(state.camera);
      cursorWorld.current.lerp(SCRATCH_CURSOR, Math.min(1, dt * 6));
    }

    const dummy = SCRATCH_OBJ;
    for (let i = 0; i < count; i++) {
      const rx = restPositions[i * 3]!;
      const ry = restPositions[i * 3 + 1]!;
      const rz = restPositions[i * 3 + 2]!;
      const tx = targetPositions[i * 3]!;
      const ty = targetPositions[i * 3 + 1]!;
      const tz = targetPositions[i * 3 + 2]!;
      const phase = phases[i * 2]!;
      const speed = phases[i * 2 + 1]!;

      // Drift (subtle sinusoidal)
      const drift = profile.animations.particleDrift
        ? Math.sin(t * speed + phase) * 0.06
        : 0;

      // Cursor pull: particles bow AWAY from cursor with falloff
      let px = rx;
      let py = ry + drift;
      let pz = rz;

      if (profile.animations.cursorPull && condenseEased < 0.6) {
        const dx = rx - cursorWorld.current.x;
        const dy = ry - cursorWorld.current.y;
        const dist = Math.hypot(dx, dy);
        const falloff = Math.max(0, 1 - dist / 1.5);
        const push = falloff * falloff * 0.25;
        px += (dx / (dist + 1e-3)) * push;
        py += (dy / (dist + 1e-3)) * push;
      }

      // Mix toward wordmark targets by condense factor
      const fx = px + (tx - px) * condenseEased;
      const fy = py + (ty - py) * condenseEased;
      const fz = pz + (tz - pz) * condenseEased;

      dummy.position.set(fx, fy, fz);

      // Spin slows as the particles lock into the wordmark
      const spin = (1 - condenseEased) * 0.3;
      dummy.rotation.set(
        phase + t * spin,
        phase * 0.5 + t * spin * 0.7,
        phase * 0.7 + t * spin * 0.4
      );

      // Shrink slightly when locked (crisper wordmark)
      const sBase = 0.012 + 0.018 * (0.5 + Math.sin(phase * 3) * 0.5);
      const s = sBase * (1 - condenseEased * 0.45);
      dummy.scale.setScalar(s);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      {/* Tiny stretched icosahedron = wheat-grain shape, low-poly */}
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#c9a86b"
        roughness={0.55}
        metalness={0.0}
        emissive="#7a5c2c"
        emissiveIntensity={0.18}
      />
    </instancedMesh>
  );
}
