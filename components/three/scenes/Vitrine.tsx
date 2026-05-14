"use client";

/**
 * Moon #1 — "The Specimen Vitrine"
 *
 * A slowly rotating museum vitrine in negative space. Inside: a
 * procedural loaf rendered with fake subsurface scattering. Behind:
 * a slow-drifting field of ~8000 wheat-grain particles that respond
 * to the cursor and condense toward the "EPICS" wordmark on scroll.
 *
 * The DOM scrolls; this scene reacts. Wired through useScrollDirector.
 */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";

import { Loaf } from "./Loaf";
import { WheatGrains } from "../particles/WheatGrains";
import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import { usePerfTier } from "@/lib/hooks/usePerfTier";
import { SCENE_RANGES, localProgress } from "@/lib/three/sceneRanges";

interface VitrineProps {
  /** Override scroll range. Defaults to SCENE_RANGES.vitrine.
   *  Pass `{ start: 0, end: 1 }` from a playground page to use the full
   *  document scroll. */
  range?: { start: number; end: number };
}

export function Vitrine({ range }: VitrineProps = {}) {
  const profile = usePerfTier();
  const groupRef = useRef<THREE.Group>(null);
  const baseCameraY = useRef(0.2);
  const baseCameraZ = useRef(5);
  const { camera } = useThree();
  const sceneRange =
    range ?? SCENE_RANGES.vitrine ?? { start: 0, end: 1, fadeIn: 0, fadeOut: 1 };

  // ============================================================
  // Camera: cinematic handheld noise + scroll-driven dolly
  // ============================================================
  useEffect(() => {
    baseCameraY.current = camera.position.y;
    baseCameraZ.current = camera.position.z;
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const global = useScrollDirector.getState().progress;
    const progress = localProgress(global, {
      start: sceneRange.start,
      end: sceneRange.end,
      fadeIn: sceneRange.start,
      fadeOut: sceneRange.end,
    });

    if (profile.animations.handheldCamera) {
      // Per brief: amp 0.02, freq 0.3
      camera.position.x = Math.sin(t * 0.3) * 0.02 + Math.cos(t * 0.21) * 0.015;
      camera.position.y =
        baseCameraY.current +
        Math.sin(t * 0.26 + 1.3) * 0.018 +
        // Camera lifts on scroll so the wordmark (which condenses above
        // the vitrine) lands centred in the frame at scroll-end.
        progress * 0.45;
    }

    // Slight dolly-back as we approach scroll-end so the wordmark is fully
    // legible — too much zoom and the letters clip off the sides.
    camera.position.z = baseCameraZ.current + Math.min(progress * 0.6, 0.5);
    camera.lookAt(0, progress * 0.6, 0);

    // Vitrine rotates AND sinks below the camera as the wordmark resolves,
    // ceding focus to the brand mark.
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + progress * 0.55;
      groupRef.current.rotation.x = progress * -0.25;
      groupRef.current.position.y = progress * -0.35;
    }
  });

  return (
    <>
      {/* Warm interior HDRI for reflections + ambient term */}
      <Environment preset="apartment" environmentIntensity={0.55} />

      {/* Key + fill lighting — brand-correct warm bias */}
      <ambientLight intensity={0.18} color="#f6e9cf" />
      <directionalLight
        position={[2.5, 3.5, 2.2]}
        intensity={1.8}
        color="#f4d5a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#7a8aa0" />
      <pointLight position={[0, 1.5, 1.5]} intensity={0.4} color="#ffb064" distance={4.5} />

      {/* Vitrine assembly: plinth + glass shell + specimen */}
      <group ref={groupRef}>
        {/* Plinth — paper-cream pedestal underfoot */}
        <mesh position={[0, -0.65, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.1, 1.1]} />
          <meshStandardMaterial color="#e4d9c0" roughness={0.85} metalness={0} />
        </mesh>

        {/* Loaf — Moon #1 specimen */}
        <Loaf position={[0, -0.1, 0]} scale={0.7} />

        {/* Glass vitrine shell — refraction + thin walls.
            Drei's MeshTransmissionMaterial handles thickness/refraction
            without us writing a custom shader. Sample/resolution kept
            deliberately low: a thin display case doesn't need a heavy
            multi-sample buffer, and the loaf must read CLEARLY through
            it — heavy distortion was muddying the specimen. */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[2.2, 1.3, 0.95]} />
          <MeshTransmissionMaterial
            samples={2}
            resolution={64}
            transmission={0.96}
            roughness={0.03}
            thickness={0.14}
            ior={1.46}
            chromaticAberration={profile.postprocessing.chromaticAberration ? 0.02 : 0}
            anisotropy={0.05}
            distortion={0.02}
            distortionScale={0.2}
            temporalDistortion={0}
            attenuationDistance={0.8}
            attenuationColor="#f5efe2"
            backside={false}
          />
        </mesh>

        {/* Hairline frame around the vitrine — accentuates the catalogue feel */}
        <lineSegments position={[0, 0.05, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.3, 0.95)]} />
          <lineBasicMaterial color="#161512" transparent opacity={0.18} />
        </lineSegments>
      </group>

      {/* Wheat-grain particle field surrounds the whole composition */}
      <WheatGrains count={profile.particles.wheatGrains} range={sceneRange} />

      {/* Contact shadow — grounds the vitrine in space. Drei renders
          this from below into a low-res buffer, so the loaf + plinth
          + glass cast a soft, real-feeling shadow on the floor instead
          of the flat catch-shadow plane that was here before. This is
          one of the cheapest, most reliable "amateur → grounded" wins
          in R3F. Sits just below the plinth's underside (y = -0.7). */}
      <ContactShadows
        position={[0, -0.71, 0]}
        scale={6}
        resolution={256}
        blur={2.6}
        opacity={0.42}
        far={2.2}
        color="#161512"
      />

      {/* ============================================================
          Postprocessing — gated by perf profile.
          Bloom for the warm lamp glow, light grain, soft vignette.
          DepthOfField was dropped: it blurred the specimen the scene
          exists to show, and its per-frame cost was not worth it.
          ============================================================ */}
      {(profile.postprocessing.bloom || profile.postprocessing.grain) && (
        <EffectComposer multisampling={0}>
          {profile.postprocessing.bloom ? (
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.88}
              luminanceSmoothing={0.18}
              mipmapBlur
              kernelSize={KernelSize.MEDIUM}
            />
          ) : (
            <></>
          )}
          {profile.postprocessing.grain ? (
            <Noise opacity={0.05} premultiply />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.2} darkness={0.5} />
        </EffectComposer>
      )}
    </>
  );
}
