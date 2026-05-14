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
import { ContactShadows, Environment } from "@react-three/drei";
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
      {/* Environment kept LOW — it only provides soft reflections + a
          base ambient term. The explicit key/fill/rim lights below do
          the actual shaping. At high intensity the apartment HDRI just
          washed the whole scene to one flat beige. */}
      <Environment preset="apartment" environmentIntensity={0.25} />

      {/* ---- Deliberate 3-point studio rig ---- */}
      <ambientLight intensity={0.12} color="#f0e4cc" />
      {/* Warm KEY — camera-right, high + strong. The dominant shaper:
          carves the loaf's crust, throws the contact shadow. */}
      <directionalLight
        position={[3.5, 3, 2.5]}
        intensity={3.0}
        color="#f4c576"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      {/* Cool FILL — camera-left, soft. Just lifts the shadow side so
          it doesn't go dead black; the cool tint adds depth. */}
      <directionalLight position={[-3.5, 1.5, 1]} intensity={0.6} color="#a8b8c8" />
      {/* Warm RIM — behind + above, separates the loaf silhouette from
          the paper background so it reads as a distinct specimen. */}
      <directionalLight position={[-1, 2.6, -3]} intensity={0.85} color="#ffcaa0" />
      {/* Baker's-lamp accent — a low warm point glow under the front lip. */}
      <pointLight position={[0, 0.5, 1.7]} intensity={0.35} color="#ffb978" distance={5} />

      {/* Vitrine assembly: plinth + specimen + display frame */}
      <group ref={groupRef}>
        {/* Plinth — a dark stone pedestal. Deliberately much darker than
            the cream paper so the warm loaf has something to sit AGAINST
            instead of dissolving into a same-tone beige field. */}
        <mesh position={[0, -0.48, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.6, 0.16, 1.3]} />
          <meshStandardMaterial color="#3b362f" roughness={0.78} metalness={0.04} />
        </mesh>

        {/* Loaf — Moon #1 specimen. Base sits on the plinth top
            surface (plinth centre -0.48 + half-height 0.08 = -0.40),
            scaled to own the centre of the display frame. */}
        <Loaf position={[0, -0.4, 0]} scale={1.05} warmth={1.15} />

        {/* Display frame — the "vitrine" is now a hairline museum-case
            skeleton, NOT a transmission-glass slab. Cheap glass refraction
            read as a muddy plastic box and buried the specimen; an
            implied case in fine ink lines is more elegant and far
            lighter to render. */}
        <lineSegments position={[0, 0.175, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.7, 1.15, 1.4)]} />
          <lineBasicMaterial color="#161512" transparent opacity={0.85} />
        </lineSegments>
      </group>

      {/* Wheat-grain particle field surrounds the whole composition */}
      <WheatGrains count={profile.particles.wheatGrains} range={sceneRange} />

      {/* Contact shadow — grounds the vitrine in space. Drei renders
          this from below into a low-res buffer, so the loaf + plinth
          cast a soft, real-feeling shadow on the floor. Sits just
          below the plinth's underside (plinth base ≈ y -0.56). */}
      <ContactShadows
        position={[0, -0.57, 0]}
        scale={5}
        resolution={256}
        blur={2.4}
        opacity={0.5}
        far={1.8}
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
