"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import ClusterRig from "@/components/hero/ClusterRig";
import { SIGNAL_COLOR } from "@/components/hero/cluster-config";
import { prefersReducedMotion } from "@/lib/utils/motion";

/**
 * Floating abstract atom beside the hero copy: an IC-package core with
 * electrons orbiting it, one cyan ring as punctuation, drifting shards and
 * random spark flashes. Abstract geometry is the one style that reads as
 * designed rather than programmer art when built from primitives; swap the
 * <Cluster /> contents for an authored GLB without touching the rig.
 */
const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0.5, 5.6], fov: 30 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
    frameloop={prefersReducedMotion() ? "demand" : "always"}
  >
    <ambientLight intensity={0.7} />
    <directionalLight position={[4, 6, 3]} intensity={1.8} />
    {/* Cool fill from the left keeps the shaded faces from going black. */}
    <directionalLight position={[-5, 2, 2]} intensity={0.7} color="#b8c4d4" />
    <pointLight
      position={[0, 1.2, 2.2]}
      intensity={2}
      color={SIGNAL_COLOR}
      distance={5}
      decay={2}
    />
    <group position={[0, 0.2, 0]}>
      <ClusterRig />
    </group>
    <ContactShadows
      position={[0, -1.35, 0]}
      opacity={0.35}
      scale={7}
      blur={2.8}
      far={2.6}
      color="#000000"
    />
  </Canvas>
);

export default HeroScene;
