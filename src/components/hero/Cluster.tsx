"use client";

import * as THREE from "three";
import {
  CHIP_HALF,
  CORE_COLOR,
  CORE_TOP_COLOR,
  PIN_COLOR,
  PIN_TRANSFORMS,
  RING_A_RADIUS,
  RING_B_RADIUS,
  RING_COLOR,
  SHARDS,
  SIGNAL_COLOR,
  SPARK_COUNT,
} from "@/components/hero/cluster-config";

export interface ClusterProps {
  pieceRefs: React.RefObject<THREE.Group[]>;
  core: React.RefObject<THREE.Group | null>;
  ringA: React.RefObject<THREE.Group | null>;
  ringB: React.RefObject<THREE.Group | null>;
  shardOrbit: React.RefObject<THREE.Group | null>;
  electronA: React.RefObject<THREE.Mesh | null>;
  electronB1: React.RefObject<THREE.Mesh | null>;
  electronB2: React.RefObject<THREE.Mesh | null>;
  sparkRefs: React.RefObject<THREE.Group[]>;
}

/**
 * The hero atom: an IC-package core with electrons orbiting it on two rings,
 * loose shards drifting around, and a pool of spark flashes. Pieces register
 * themselves into pieceRefs (core, rings, shards, in that order) so the
 * intro can pop them in with one staggered tween; the ring, orbit, electron
 * and spark refs are animated by the rig's frame loop.
 */
const Cluster = ({
  pieceRefs,
  core,
  ringA,
  ringB,
  shardOrbit,
  electronA,
  electronB1,
  electronB2,
  sparkRefs,
}: ClusterProps) => {
  let piece = 0;
  const register = (el: THREE.Group | null, index: number) => {
    if (el) pieceRefs.current[index] = el;
  };

  return (
    <group>
      {/* Core: an IC package — the hardware the electrons orbit. */}
      <group ref={(el) => register(el, piece++)} scale={0}>
        <group ref={core} rotation={[0.5, 0.7, 0.08]}>
          <mesh>
            <boxGeometry args={[CHIP_HALF * 2, 0.2, CHIP_HALF * 2]} />
            <meshStandardMaterial color={CORE_COLOR} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.101, 0]}>
            <boxGeometry args={[0.72, 0.012, 0.72]} />
            <meshStandardMaterial color={CORE_TOP_COLOR} roughness={0.55} />
          </mesh>
          {/* Pin-1 marker, the one cyan detail on the package. */}
          <mesh position={[-0.28, 0.115, -0.28]}>
            <cylinderGeometry args={[0.035, 0.035, 0.012, 16]} />
            <meshBasicMaterial color={SIGNAL_COLOR} toneMapped={false} />
          </mesh>
          {PIN_TRANSFORMS.map((pin, i) => (
            <mesh key={i} position={pin.position} rotation={[0, pin.rotationY, 0]}>
              <boxGeometry args={[0.05, 0.04, 0.1]} />
              <meshStandardMaterial color={PIN_COLOR} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      <group ref={(el) => register(el, piece++)} scale={0}>
        <group ref={ringA} rotation={[1.15, 0.2, 0]}>
          <mesh>
            <torusGeometry args={[RING_A_RADIUS, 0.045, 12, 64]} />
            <meshStandardMaterial color={RING_COLOR} roughness={0.35} />
          </mesh>
          {/* Cyan electron riding the white orbit. */}
          <mesh ref={electronA} position={[RING_A_RADIUS, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={SIGNAL_COLOR} toneMapped={false} />
          </mesh>
        </group>
      </group>

      <group ref={(el) => register(el, piece++)} scale={0}>
        <group ref={ringB} rotation={[1.9, -0.45, 0.3]}>
          <mesh>
            <torusGeometry args={[RING_B_RADIUS, 0.016, 8, 80]} />
            <meshBasicMaterial color={SIGNAL_COLOR} toneMapped={false} />
          </mesh>
          {/* Two white electrons opposite each other on the cyan orbit. */}
          <mesh ref={electronB1} position={[RING_B_RADIUS, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={RING_COLOR} toneMapped={false} />
          </mesh>
          <mesh ref={electronB2} position={[-RING_B_RADIUS, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={RING_COLOR} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Spark pool: crossed slivers scaled to zero until the rig fires one. */}
      {Array.from({ length: SPARK_COUNT }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) sparkRefs.current[i] = el;
          }}
          scale={0}
        >
          <mesh>
            <boxGeometry args={[0.2, 0.02, 0.02]} />
            <meshBasicMaterial color={SIGNAL_COLOR} toneMapped={false} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.02, 0.2, 0.02]} />
            <meshBasicMaterial color={SIGNAL_COLOR} toneMapped={false} />
          </mesh>
        </group>
      ))}

      <group ref={shardOrbit}>
        {SHARDS.map((shard) => (
          <group
            key={shard.position.join()}
            ref={(el) => register(el, piece++)}
            position={shard.position}
            scale={0}
          >
            <mesh rotation={[0.4, 0.8, 0.2]}>
              <octahedronGeometry args={[shard.size, 0]} />
              <meshStandardMaterial color={shard.color} roughness={0.4} flatShading />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export default Cluster;
