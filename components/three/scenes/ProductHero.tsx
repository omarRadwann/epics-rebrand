"use client";

/**
 * Product Detail 3D hero — Phase 7.
 *
 * A rotating procedural form unique to each product category, lit
 * warm and presented inside a soft volumetric vignette. For Phase 7
 * we use category-driven shapes (loaf for baking mixes, crystal
 * cluster for sugar/PKU, package box for staples) rather than
 * importing 3D models — keeps the bundle light and the visual
 * coherent with the rest of the moonshot.
 *
 * Drei <Float> + <PresentationControls> let the user nudge the
 * model with the cursor while a gentle bob keeps it alive.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  PresentationControls,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";

import { Loaf } from "./Loaf";
import { usePerfTier } from "@/lib/hooks/usePerfTier";
import type { Product } from "@/lib/catalog";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const profile = usePerfTier();
  return (
    <>
      <Environment preset="apartment" environmentIntensity={0.5} />
      <ambientLight intensity={0.2} color="#f6e9cf" />
      <directionalLight
        position={[2.5, 3.5, 2.2]}
        intensity={1.8}
        color="#f4d5a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 1.5, -2]} intensity={0.4} color="#7a8aa0" />

      <PresentationControls
        global
        cursor
        polar={[-0.25, 0.25]}
        azimuth={[-0.6, 0.6]}
        snap
      >
        <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.45}>
          <ProductGeometry product={product} tier={profile.tier} />
        </Float>
      </PresentationControls>

      {/* Soft ground catch-shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]} receiveShadow>
        <planeGeometry args={[6, 4]} />
        <shadowMaterial transparent opacity={0.16} />
      </mesh>

      {(profile.postprocessing.bloom || profile.postprocessing.grain) && (
        <EffectComposer multisampling={0}>
          {profile.postprocessing.bloom ? (
            <Bloom
              intensity={0.35}
              luminanceThreshold={0.88}
              luminanceSmoothing={0.22}
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
          <Vignette eskil={false} offset={0.22} darkness={0.5} />
        </EffectComposer>
      )}
    </>
  );
}

/* ============================================================
   Category-driven geometry. PKU gets a prismatic crystal,
   baking gets the procedural loaf, packets get a stylised
   package box. All scaled to read inside the PDP viewport.
   ============================================================ */
function ProductGeometry({
  product,
  tier,
}: {
  product: Product;
  tier: ReturnType<typeof usePerfTier>["tier"];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.18;
    }
  });

  // Categorise via the product's free-from + loafNumber prefix
  const isPku = product.category === "pku";
  const isSweet = /^Bake|^Cereal|^Dairy|^Frozen/i.test(product.loafNumber);
  const isStaple = /^P-|^Mill/i.test(product.loafNumber);

  if (isPku) {
    return (
      <group ref={groupRef} scale={1.05}>
        <mesh castShadow>
          <coneGeometry args={[0.55, 1.2, 6, 1]} />
          {/* Low sample/resolution, backside off — single-pass
              transmission disperses convincingly at hero scale and
              keeps the PDP canvas cheap. */}
          <MeshTransmissionMaterial
            samples={tier === "desktop-high" ? 2 : 1}
            resolution={64}
            transmission={0.92}
            roughness={0.05}
            thickness={0.45}
            ior={1.5}
            chromaticAberration={0.14}
            anisotropy={0.25}
            distortion={0.05}
            distortionScale={0.3}
            temporalDistortion={0}
            attenuationColor="#f5efe2"
            attenuationDistance={0.7}
            backside={false}
          />
        </mesh>
      </group>
    );
  }

  if (isStaple) {
    return (
      <group ref={groupRef} scale={0.95}>
        {/* Stylised package box for pantry staples */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.95, 1.2, 0.45]} />
          <meshPhysicalMaterial
            color="#e4d9c0"
            roughness={0.85}
            metalness={0.02}
            clearcoat={0.1}
            clearcoatRoughness={0.7}
          />
        </mesh>
        {/* Label band (cream + saffron stripe) */}
        <mesh position={[0, 0, 0.226]}>
          <planeGeometry args={[0.78, 0.55]} />
          <meshStandardMaterial color="#f2efe7" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.22, 0.227]}>
          <planeGeometry args={[0.78, 0.06]} />
          <meshStandardMaterial color="#e07a1b" roughness={0.6} emissive="#e07a1b" emissiveIntensity={0.1} />
        </mesh>
      </group>
    );
  }

  if (isSweet) {
    return (
      <group ref={groupRef} scale={0.95}>
        {/* Stacked bake form — three layers like the corridor S-01 trio */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.95, 0.28, 0.55]} />
          <meshStandardMaterial color="#b88748" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.0, 0]} castShadow>
          <boxGeometry args={[0.85, 0.25, 0.5]} />
          <meshStandardMaterial color="#c79a5c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.27, 0]} castShadow>
          <boxGeometry args={[0.7, 0.22, 0.42]} />
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

  // Default: a loaf, scaled up for hero. Loaf base sits at y=0, so it's
  // dropped to roughly centre it in the hero frame.
  return (
    <group ref={groupRef} scale={1.15}>
      <Loaf position={[0, -0.4, 0]} scale={1.05} warmth={1.2} />
    </group>
  );
}
