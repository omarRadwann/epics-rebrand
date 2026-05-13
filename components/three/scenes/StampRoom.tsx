"use client";

/**
 * Moon #5 — "The Stamp Room"
 *
 * Three embossed seals — ISO 22000, ISO 9001, Halal — floating in a
 * dark room with a single key light. As scroll progress moves through
 * the scene's local range, each seal rotates to face the camera in
 * turn. Below each, the certification number types out monospace
 * teletype style.
 *
 * Per Moonshot Brief §2 Moon #5.
 */
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import { usePerfTier } from "@/lib/hooks/usePerfTier";
import { localProgress, SCENE_RANGES } from "@/lib/three/sceneRanges";

interface StampRoomProps {
  range?: { start: number; end: number };
}

const SEALS = [
  {
    code: "X-01-A",
    label: "ISO 22000",
    detail: "FOOD SAFETY · BUREAU VERITAS · 2024-1138",
    color: "#7a2e1f",
    x: -1.5,
  },
  {
    code: "X-01-B",
    label: "ISO 9001",
    detail: "QUALITY · BUREAU VERITAS · 2024-0944",
    color: "#7a2e1f",
    x: 0,
  },
  {
    code: "X-01-C",
    label: "HALAL",
    detail: "EGYPTIAN HALAL · EHA-2025-0061",
    color: "#5a6e58",
    x: 1.5,
  },
] as const;

export function StampRoom({ range }: StampRoomProps = {}) {
  const profile = usePerfTier();
  const { camera } = useThree();
  const sceneRange =
    range ??
    SCENE_RANGES.stamps ?? {
      start: 0,
      end: 1,
      fadeIn: 0,
      fadeOut: 1,
    };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const global = useScrollDirector.getState().progress;
    const progress = localProgress(global, {
      start: sceneRange.start,
      end: sceneRange.end,
      fadeIn: sceneRange.start,
      fadeOut: sceneRange.end,
    });

    // Slow lateral camera glide as scroll advances — each seal centres
    // in turn at progress 0.16 / 0.50 / 0.84.
    const x = (progress - 0.5) * 2.8;
    if (profile.animations.handheldCamera) {
      camera.position.x = x + Math.sin(t * 0.3) * 0.02;
      camera.position.y = 0.15 + Math.sin(t * 0.26 + 1.1) * 0.015;
    } else {
      camera.position.set(x, 0.15, 0);
    }
    camera.position.z = 3.5;
    camera.lookAt(x, 0, 0);
  });

  return (
    <>
      <Environment preset="city" environmentIntensity={0.25} />
      {/* Single key light from front-top, very directional — gives the
          seal embossing its catch-and-shadow. */}
      <ambientLight intensity={0.08} color="#1d1c1a" />
      <spotLight
        position={[0, 2.5, 3]}
        target-position={[0, 0, 0]}
        angle={0.7}
        penumbra={0.85}
        intensity={2.8}
        color="#f4d5a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* The dark room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#161512" roughness={0.92} />
      </mesh>

      {/* Three embossed seals */}
      {SEALS.map((seal, i) => (
        <Seal key={seal.code} seal={seal} index={i} />
      ))}

      {(profile.postprocessing.bloom || profile.postprocessing.grain) && (
        <EffectComposer multisampling={0}>
          {profile.postprocessing.bloom ? (
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.75}
              luminanceSmoothing={0.18}
              mipmapBlur
              kernelSize={KernelSize.LARGE}
            />
          ) : (
            <></>
          )}
          {profile.postprocessing.grain ? (
            <Noise opacity={0.07} premultiply />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.16} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

function Seal({
  seal,
  index,
}: {
  seal: (typeof SEALS)[number];
  index: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    // Each seal does a slow turn-toward-camera as scroll progresses
    // through its share of the scene. Use a phase offset per seal so
    // they don't all rotate together.
    const global = useScrollDirector.getState().progress;
    const range = SCENE_RANGES.stamps;
    const p = range
      ? localProgress(global, range)
      : 0.5;
    // Each seal's centre moment is at progress 0.16 / 0.5 / 0.84
    const centre = 0.16 + index * 0.34;
    const dist = Math.abs(p - centre);
    const facing = Math.max(0, 1 - dist * 3.5); // 1 when centred, 0 when 0.28 away
    // Idle slow rotation, sped up + cleaned at the centre moment
    const idleSpin = t * 0.15;
    ref.current.rotation.y = THREE.MathUtils.lerp(idleSpin, 0, facing);
    // Subtle bob
    ref.current.position.y = Math.sin(t * 0.7 + index) * 0.04;
  });

  return (
    <group ref={ref} position={[seal.x, 0, 0]}>
      {/* The seal disc — embossed metallic feel via clearcoat */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 64, 1, false]} />
        <meshPhysicalMaterial
          color={seal.color}
          roughness={0.55}
          metalness={0.4}
          clearcoat={0.9}
          clearcoatRoughness={0.3}
          anisotropy={0.6}
          anisotropyRotation={Math.PI * 0.25}
          sheen={0.6}
          sheenColor="#f0c989"
        />
      </mesh>
      {/* Inner ring (raised) */}
      <mesh position={[0, 0.045, 0]}>
        <ringGeometry args={[0.34, 0.42, 64]} />
        <meshStandardMaterial
          color="#f0c989"
          roughness={0.55}
          metalness={0.7}
          emissive="#f0c989"
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* Label etched on the face */}
      <Text
        position={[0, 0.046, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.12}
        color="#f5efe2"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        {seal.label}
      </Text>
      {/* Caption under the seal */}
      <Text
        position={[0, -0.78, 0]}
        fontSize={0.06}
        color="#b6b0a6"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.4}
        textAlign="center"
        letterSpacing={0.06}
      >
        {seal.detail}
      </Text>
    </group>
  );
}
