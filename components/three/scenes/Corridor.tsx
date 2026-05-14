"use client";

/**
 * Moon #2 — "Three Shelves"
 *
 * The camera flies along a forward path through three illuminated
 * diorama spaces. Each space carries its own gravity-color and a
 * signature particle field:
 *
 *   S-01 Gluten-Free  → wheat-gold key light, flour motes drifting
 *   S-02 Sugar-Free   → cool blue, crystalline sugar shards dissolving
 *   S-03 Crystal·PKU  → prismatic shimmer, refractive crystal forms
 *
 * Scroll progress 0..1 drives the camera along the corridor's z-axis.
 * Per brief §2 Moon #2.
 *
 * Architectural decisions:
 *   - SINGLE canvas, no separate scenes — everything lives in one
 *     three-shelf array, lit and faded by camera proximity.
 *   - Camera path is a Catmull-Rom curve through anchor points; for
 *     this first iteration we use a straight forward-march which we
 *     can swap to a curve later without changing scene structure.
 *   - Particles are computed once at construction (rest positions);
 *     useFrame only updates transforms. No per-frame allocations.
 */
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import { usePerfTier } from "@/lib/hooks/usePerfTier";
import { localProgress, SCENE_RANGES } from "@/lib/three/sceneRanges";

/* ============================================================
   §1 — Corridor layout constants

   The camera flies along a Catmull-Rom curve from CAMERA_START to
   CAMERA_END. Shelves are placed at z positions that roughly line up
   with curve progress so each shelf takes the camera's gaze in turn:

     scroll 0.30 → S-01 in view  (camera near z = -1)
     scroll 0.60 → S-02 in view  (camera near z = -5)
     scroll 0.92 → S-03 in view  (camera near z = -9)

   The camera POSITION uses 85% of the curve length (0..0.85), while
   the look-at uses (positionT + 0.15) so we always look 15% ahead of
   ourselves. At scroll 1.0 the camera lands one notch shy of the last
   anchor and looks at the final anchor — the prismatic crystal.
   ============================================================ */
const SHELF_POSITIONS: ReadonlyArray<readonly [
  number,
  number,
  number,
  string,
  string,
]> = [
  [0, 0, -1.5, "S-01", "GLUTEN-FREE"],
  [0, 0, -5.5, "S-02", "SUGAR-FREE"],
  [0, 0, -9.5, "S-03", "CRYSTAL · PKU"],
];

const CAMERA_START = new THREE.Vector3(0, 1.0, 3);
const CAMERA_END = new THREE.Vector3(0, 0.55, -10.2);

const SHELF_KEY_LIGHT_COLORS = [
  "#e7a857", // S-01 wheat-gold
  "#6f8fa8", // S-02 cool blue
  "#c8b5d8", // S-03 prismatic pale
] as const;

const SHELF_FILL_COLORS = [
  "#f4d5a0", // wheat
  "#a8c3d8", // sky
  "#e6d8e8", // pale lavender prism
] as const;

/* ============================================================
   §2 — Corridor scene component
   ============================================================ */
interface CorridorProps {
  range?: { start: number; end: number };
}

export function Corridor({ range }: CorridorProps = {}) {
  const profile = usePerfTier();
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3());
  const lookVec = useRef(new THREE.Vector3());
  const sceneRange =
    range ?? SCENE_RANGES.corridor ?? { start: 0, end: 1, fadeIn: 0, fadeOut: 1 };

  // Pre-computed camera curve. Anchor points are tuned so each shelf
  // lands centred in the frame at its target scroll position.
  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        CAMERA_START,
        new THREE.Vector3(0.3, 0.92, 0.5),
        new THREE.Vector3(-0.25, 0.82, -2.5),
        new THREE.Vector3(0.2, 0.68, -6.5),
        CAMERA_END,
      ],
      false,
      "catmullrom",
      0.4
    );
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const global = useScrollDirector.getState().progress;
    const progress = localProgress(global, {
      start: sceneRange.start,
      end: sceneRange.end,
      fadeIn: sceneRange.start,
      fadeOut: sceneRange.end,
    });

    // Camera position uses 85% of the curve; lookAt uses (positionT +
    // 0.15) so we always look forward of ourselves. At scroll-end the
    // look-at lands on the final anchor (the S-03 crystal area).
    const positionT = THREE.MathUtils.clamp(progress * 0.85, 0, 1);
    const lookT = THREE.MathUtils.clamp(positionT + 0.15, 0, 1);

    path.getPointAt(positionT, targetVec.current);

    if (profile.animations.handheldCamera) {
      // Subtle handheld jitter — corridor reads more cinematic with
      // organic camera motion than rail-locked.
      targetVec.current.x += Math.sin(t * 0.34) * 0.02;
      targetVec.current.y += Math.sin(t * 0.27 + 1.1) * 0.014;
    }

    camera.position.lerp(targetVec.current, 0.14);

    path.getPointAt(lookT, lookVec.current);
    camera.lookAt(lookVec.current);
  });

  return (
    <>
      {/* HDRI gives soft ambient term; intensity carefully balanced so
          the per-shelf key lights still carry the colour story. */}
      <Environment preset="apartment" environmentIntensity={0.4} />

      {/* Corridor floor + ceiling + walls — long planes along the z-axis.
          Floor reads a touch warmer than ceiling so the corridor has a
          horizon line; the side walls catch shelf key-lights and bleed
          colour back across the scene. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.6, -8]}
        receiveShadow
      >
        <planeGeometry args={[7, 24]} />
        <meshStandardMaterial color="#3a3631" roughness={0.85} metalness={0} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.4, -8]}>
        <planeGeometry args={[7, 24]} />
        <meshStandardMaterial color="#221f1c" roughness={0.95} />
      </mesh>
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-3.5, 0.9, -8]}
      >
        <planeGeometry args={[24, 3]} />
        <meshStandardMaterial color="#2a2724" roughness={0.9} />
      </mesh>
      <mesh
        rotation={[0, -Math.PI / 2, 0]}
        position={[3.5, 0.9, -8]}
      >
        <planeGeometry args={[24, 3]} />
        <meshStandardMaterial color="#2a2724" roughness={0.9} />
      </mesh>

      {/* Three shelves rendered as Shelf instances */}
      {SHELF_POSITIONS.map(([x, y, z, code, label], i) => (
        <Shelf
          key={code}
          index={i}
          position={[x, y, z]}
          code={code}
          label={label}
          tier={profile.tier}
        />
      ))}

      {/* Ambient + low fill so we don't fully black-out the corridor
          between shelves. */}
      <ambientLight intensity={0.18} color="#f6e9cf" />

      {/* Rim light from behind/above the camera — adds a subtle horizon
          glow so the corridor entrance reads against pure-dark walls. */}
      <directionalLight
        position={[1.5, 2.5, 4]}
        intensity={0.45}
        color="#e0d3b8"
      />

      {/* Postprocessing pass — corridor benefits from heavier bloom
          than the vitrine so the chromatic shelf lights bloom into
          the surrounding darkness. */}
      {(profile.postprocessing.bloom ||
        profile.postprocessing.chromaticAberration ||
        profile.postprocessing.grain) && (
        <EffectComposer multisampling={0}>
          {profile.postprocessing.bloom ? (
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.55}
              luminanceSmoothing={0.22}
              mipmapBlur
              kernelSize={KernelSize.LARGE}
            />
          ) : (
            <></>
          )}
          {profile.postprocessing.chromaticAberration ? (
            <ChromaticAberration
              offset={new THREE.Vector2(0.0009, 0.0014)}
              blendFunction={BlendFunction.NORMAL}
              radialModulation
              modulationOffset={0.5}
            />
          ) : (
            <></>
          )}
          {profile.postprocessing.grain ? (
            <Noise opacity={0.05} premultiply />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.12} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

/* ============================================================
   §3 — Shelf — one of the three diorama zones
   ============================================================ */
interface ShelfProps {
  index: 0 | 1 | 2 | number;
  position: [number, number, number];
  code: string;
  label: string;
  tier: ReturnType<typeof usePerfTier>["tier"];
}

function Shelf({ index, position, tier }: ShelfProps) {
  const keyColor = SHELF_KEY_LIGHT_COLORS[index % 3] ?? "#e7a857";
  const fillColor = SHELF_FILL_COLORS[index % 3] ?? "#f4d5a0";

  // The "back wall" of each diorama — a soft glowing plane that
  // catches the key light and reads as the brand monogram tone for
  // that shelf. The S-01/S-02/S-03 letterforms themselves are
  // rendered as floating extruded shapes (see ShelfMonogram).
  return (
    <group position={position}>
      {/* Key light: directional, coming from above-front */}
      <spotLight
        position={[0, 1.6, 0.4]}
        target-position={[0, 0, 0]}
        angle={0.85}
        penumbra={0.75}
        intensity={index === 2 ? 2.2 : 2.0}
        color={keyColor}
        castShadow
        shadow-mapSize={[512, 512]}
        distance={4.5}
      />

      {/* Fill / glow source above the shelf */}
      <pointLight
        position={[0, 0.6, 0.1]}
        intensity={0.6}
        color={fillColor}
        distance={2.6}
      />

      {/* Floor accent — a paler plinth on the corridor floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.59, 0]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshStandardMaterial color="#3a3631" roughness={0.85} />
      </mesh>

      {/* Back wall plane (slightly behind the shelf core) */}
      <mesh position={[0, 0.5, -1.0]}>
        <planeGeometry args={[3.0, 2.0]} />
        <meshStandardMaterial
          color="#1a1817"
          roughness={0.9}
          emissive={fillColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Centerpiece — depends on shelf identity */}
      <ShelfCenterpiece index={index} keyColor={keyColor} tier={tier} />
    </group>
  );
}

/* ============================================================
   §4 — ShelfCenterpiece — the signature object per shelf
   ============================================================ */
function ShelfCenterpiece({
  index,
  keyColor,
  tier,
}: {
  index: number;
  keyColor: string;
  tier: ReturnType<typeof usePerfTier>["tier"];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  if (index === 0) {
    // S-01 Gluten-Free — three stacked loaf-like blocks (a wheat-gold
    // suggestion). The fuller procedural loaf can be ported here later.
    return (
      <group ref={groupRef} position={[0, 0.05, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.85, 0.25, 0.5]} />
          <meshStandardMaterial color="#b88748" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.75, 0.22, 0.45]} />
          <meshStandardMaterial color="#c79a5c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial
            color="#d6ad6f"
            roughness={0.55}
            emissive="#f0c989"
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>
    );
  }

  if (index === 1) {
    // S-02 Sugar-Free — a slowly rotating crystalline sugar cube.
    return (
      <group ref={groupRef} position={[0, 0.1, 0]}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshPhysicalMaterial
            color="#dde7f2"
            roughness={0.18}
            metalness={0.05}
            transmission={0.72}
            thickness={0.6}
            ior={1.46}
            attenuationColor="#c4d9ec"
            attenuationDistance={0.8}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
            emissive={keyColor}
            emissiveIntensity={0.06}
          />
        </mesh>
      </group>
    );
  }

  // S-03 Crystal · PKU — a prismatic refractive crystal, drei's
  // transmission material gives the most convincing dispersion.
  return (
    <group ref={groupRef} position={[0, 0.05, 0]}>
      <mesh castShadow>
        <coneGeometry args={[0.42, 0.85, 6, 1]} />
        {/* Sample/resolution kept low and backside off — a single-pass
            transmission still disperses convincingly at this scale, and
            the multi-sample backside buffer was the corridor's heaviest
            per-frame cost. */}
        <MeshTransmissionMaterial
          samples={tier === "desktop-high" ? 2 : 1}
          resolution={64}
          transmission={0.94}
          roughness={0.06}
          thickness={0.4}
          ior={1.5}
          chromaticAberration={0.12}
          anisotropy={0.2}
          distortion={0.05}
          distortionScale={0.3}
          temporalDistortion={0}
          attenuationDistance={0.7}
          attenuationColor="#f5efe2"
          backside={false}
        />
      </mesh>
    </group>
  );
}
