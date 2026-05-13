"use client";

/**
 * Moon #4 — "On The Record"
 *
 * The manifesto's anchor phrase ("On the record.") rendered as 3D
 * extruded type using troika-three-text. It rotates from edge-on
 * (entering frame) to face-on (peak readability) to edge-on (exiting)
 * across the scene's local scroll range. Behind it: a slowly pulsing
 * caustic GLSL shader pattern in brand-paper warmth.
 *
 * Per Moonshot Brief §2 Moon #4.
 */
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Text3D, Center } from "@react-three/drei";

import { useScrollDirector } from "@/lib/hooks/useScrollDirector";
import { usePerfTier } from "@/lib/hooks/usePerfTier";
import { localProgress, SCENE_RANGES } from "@/lib/three/sceneRanges";

interface ManifestoTextProps {
  range?: { start: number; end: number };
}

export function ManifestoText({ range }: ManifestoTextProps = {}) {
  const profile = usePerfTier();
  const { camera } = useThree();
  const textRef = useRef<THREE.Group>(null);
  const causticRef = useRef<THREE.ShaderMaterial>(null);
  const sceneRange =
    range ?? SCENE_RANGES.manifesto ?? { start: 0, end: 1, fadeIn: 0, fadeOut: 1 };

  /* ============================================================
     §1 — Caustic backdrop shader
     A cheap "light through water" pattern: stacked sinusoids
     modulated by smooth noise, tinted to the brand paper. Runs at
     low cost — the entire computation is in the fragment shader
     and only on a single plane.
     ============================================================ */
  const causticUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#f2efe7") }, // paper
      uColorB: { value: new THREE.Color("#dbb88a") }, // warm saffron tint
      uIntensity: { value: 0.55 },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const global = useScrollDirector.getState().progress;
    const progress = localProgress(global, {
      start: sceneRange.start,
      end: sceneRange.end,
      fadeIn: sceneRange.start,
      fadeOut: sceneRange.end,
    });

    // Caustic time uniform — keep it slow (max ~0.6Hz visual freq)
    const u = causticRef.current?.uniforms.uTime;
    if (u) u.value = t * 0.35;

    // Text rotation: edge-on → face-on → edge-on across local progress
    //  0.0  → -π/2 (edge, looking thin)
    //  0.5  →  0   (face-on, peak readability)
    //  1.0  → +π/2 (edge again, exiting)
    if (textRef.current) {
      const rot = (progress - 0.5) * Math.PI;
      textRef.current.rotation.y = rot;
      // Slight breathing scale so the moment of face-on lingers visually
      const breathe = 1 + Math.sin(progress * Math.PI) * 0.05;
      textRef.current.scale.setScalar(breathe);
    }

    // Camera holds still but adds the same handheld subtle motion as
    // the other scenes for continuity.
    if (profile.animations.handheldCamera) {
      camera.position.x = Math.sin(t * 0.3) * 0.025;
      camera.position.y = 0.2 + Math.sin(t * 0.26 + 1.3) * 0.018;
      camera.position.z = 3.5;
    } else {
      camera.position.set(0, 0.2, 3.5);
    }
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Dim ambient + a single key light to model the extruded face */}
      <ambientLight intensity={0.4} color="#f6e9cf" />
      <directionalLight
        position={[2, 3, 2.5]}
        intensity={1.6}
        color="#f4d5a0"
        castShadow
      />
      <directionalLight position={[-3, 1, -2]} intensity={0.3} color="#c8b8a0" />

      {/* Caustic backdrop — a single plane far behind the text */}
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[16, 9]} />
        <shaderMaterial
          ref={causticRef}
          uniforms={causticUniforms}
          transparent
          vertexShader={CAUSTIC_VERT}
          fragmentShader={CAUSTIC_FRAG}
        />
      </mesh>

      {/* The extruded headline. Drei's <Text3D> uses troika-three-text
          under the hood. Font is loaded from the public folder — we
          serve a default JSON font from drei's CDN for the playground;
          production should self-host a brand font (Newsreader JSON
          will be added in Phase 11 alongside the font license work). */}
      <Center ref={textRef}>
        <Text3D
          font="https://threejs.org/examples/fonts/optimer_regular.typeface.json"
          size={0.62}
          height={0.16}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.012}
          bevelSize={0.008}
          bevelSegments={4}
        >
          On the record.
          <meshPhysicalMaterial
            color="#161512"
            roughness={0.45}
            metalness={0.15}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            sheen={0.3}
            sheenColor="#e1b271"
          />
        </Text3D>
      </Center>

      {/* Postprocessing — restrained on this scene to keep the type
          legible. Bloom kept very low, vignette deeper. */}
      {(profile.postprocessing.bloom || profile.postprocessing.grain) && (
        <EffectComposer multisampling={0}>
          {profile.postprocessing.bloom ? (
            <Bloom
              intensity={0.22}
              luminanceThreshold={0.92}
              luminanceSmoothing={0.2}
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
          <Vignette eskil={false} offset={0.2} darkness={0.55} />
        </EffectComposer>
      )}
    </>
  );
}

/* ============================================================
   §2 — Caustic shader (stored as TS template strings, no .glsl
   files needed — Next.js Webpack handles imports natively)
   ============================================================ */

const CAUSTIC_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CAUSTIC_FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensity;

  // 2D hash
  float h21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Smooth value noise
  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = h21(i);
    float b = h21(i + vec2(1.0, 0.0));
    float c = h21(i + vec2(0.0, 1.0));
    float d = h21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2 uv = vUv * 4.0;
    // Two layers of slowly drifting noise — a faked caustic feel
    float n1 = noise2(uv + vec2(uTime * 0.6, uTime * 0.4));
    float n2 = noise2(uv * 1.7 - vec2(uTime * 0.45, -uTime * 0.6));
    float n3 = noise2(uv * 0.6 + vec2(uTime * 0.2, uTime * 0.3));

    // Compress the bright filaments — pow > 1 keeps them thin
    float caustic = pow((n1 + n2) * 0.5, 2.4) * 1.6 + n3 * 0.18;

    // Soft vignette so the backdrop fades toward the corners
    vec2 v = vUv - 0.5;
    float vig = smoothstep(0.85, 0.15, length(v));

    vec3 col = mix(uColorA, uColorB, caustic * uIntensity);
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;
