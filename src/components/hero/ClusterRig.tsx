"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import gsap from "gsap";
import Cluster from "@/components/hero/Cluster";
import {
  ELECTRON_A_SPEED,
  ELECTRON_B_SPEED,
  RING_A_RADIUS,
  RING_B_RADIUS,
  SPARK_COUNT,
  SPARK_LIFE_S,
} from "@/components/hero/cluster-config";
import { prefersReducedMotion } from "@/lib/utils/motion";

/**
 * Animation rig around the cluster, applying the interaction grammar from
 * the freeCodeCamp room-portfolio course: staggered pop-in intro, bounce on
 * hover (with killTweensOf so re-entries never glitch), a full spin on
 * click, plus idle bob, orbiting electrons, random sparks, and pointer
 * parallax.
 */
const ClusterRig = () => {
  const introGroup = useRef<THREE.Group>(null);
  const parallaxGroup = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);
  const spinGroup = useRef<THREE.Group>(null);
  const pieceRefs = useRef<THREE.Group[]>([]);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const shardOrbit = useRef<THREE.Group>(null);
  const electronA = useRef<THREE.Mesh>(null);
  const electronB1 = useRef<THREE.Mesh>(null);
  const electronB2 = useRef<THREE.Mesh>(null);
  const electronAngles = useRef({ a: 0, b: Math.PI / 3 });
  const sparkRefs = useRef<THREE.Group[]>([]);
  const sparkLives = useRef<number[]>(Array(SPARK_COUNT).fill(0));
  const sparkTimer = useRef(1);
  const isSpinning = useRef(false);
  const reduceMotion = useRef(prefersReducedMotion());

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useEffect(() => {
    const intro = introGroup.current;
    if (!intro) return;

    const pieceScales = pieceRefs.current.map((group) => group.scale);

    if (reduceMotion.current) {
      intro.position.y = 0;
      pieceScales.forEach((scale) => scale.setScalar(1));
      return;
    }

    const tl = gsap.timeline({ paused: true });

    tl.to(intro.position, { y: 0, duration: 0.9, ease: "power3.out" }).to(
      pieceScales,
      { x: 1, y: 1, z: 1, duration: 0.7, ease: "back.out(2.2)", stagger: 0.09 },
      "<"
    );

    const play = () => tl.play();

    if (document.documentElement.dataset.introDone === "true") play();
    else window.addEventListener("intro:done", play, { once: true });

    return () => {
      window.removeEventListener("intro:done", play);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const intro = introGroup.current;
    const spin = spinGroup.current;

    return () => {
      if (intro) gsap.killTweensOf(intro.scale);
      if (spin) gsap.killTweensOf(spin.rotation);
    };
  }, []);

  const advanceElectrons = (delta: number) => {
    const angles = electronAngles.current;
    angles.a += delta * ELECTRON_A_SPEED;
    angles.b += delta * ELECTRON_B_SPEED;

    electronA.current?.position.set(
      Math.cos(angles.a) * RING_A_RADIUS,
      Math.sin(angles.a) * RING_A_RADIUS,
      0
    );
    electronB1.current?.position.set(
      Math.cos(angles.b) * RING_B_RADIUS,
      Math.sin(angles.b) * RING_B_RADIUS,
      0
    );
    electronB2.current?.position.set(
      Math.cos(angles.b + Math.PI) * RING_B_RADIUS,
      Math.sin(angles.b + Math.PI) * RING_B_RADIUS,
      0
    );
  };

  const advanceSparks = (delta: number) => {
    // Fire an idle spark from the pool at a random spot around the cluster.
    sparkTimer.current -= delta;
    if (sparkTimer.current <= 0) {
      sparkTimer.current = 0.45 + Math.random() * 1.1;
      const idle = sparkLives.current.findIndex((life) => life <= 0);
      const spark = idle !== -1 ? sparkRefs.current[idle] : undefined;
      if (spark) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.1 + Math.random() * 0.6;
        spark.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta) * 0.7,
          radius * Math.cos(phi) * 0.6
        );
        spark.rotation.z = Math.random() * Math.PI;
        sparkLives.current[idle] = SPARK_LIFE_S;
      }
    }

    sparkLives.current.forEach((life, i) => {
      if (life <= 0) return;
      const remaining = life - delta;
      sparkLives.current[i] = remaining;
      const spark = sparkRefs.current[i];
      if (!spark) return;
      // Sine envelope: pops in, peaks mid-life, fades out.
      const progress = 1 - Math.max(0, remaining) / SPARK_LIFE_S;
      spark.scale.setScalar(Math.sin(Math.PI * progress));
    });
  };

  useFrame(({ clock, pointer }, delta) => {
    if (reduceMotion.current) return;

    const float = floatGroup.current;
    const parallax = parallaxGroup.current;
    if (!float || !parallax) return;

    float.position.y = Math.sin(clock.getElapsedTime() * 0.9) * 0.06;
    if (shardOrbit.current) shardOrbit.current.rotation.y += delta * 0.12;

    advanceElectrons(delta);
    advanceSparks(delta);

    parallax.rotation.y = THREE.MathUtils.lerp(
      parallax.rotation.y,
      pointer.x * 0.3,
      0.05
    );
    parallax.rotation.x = THREE.MathUtils.lerp(
      parallax.rotation.x,
      -pointer.y * 0.15,
      0.05
    );
  });

  const bounce = (hovering: boolean) => {
    setHovered(hovering);
    const intro = introGroup.current;
    if (!intro || reduceMotion.current) return;

    gsap.killTweensOf(intro.scale);

    if (hovering) {
      gsap.to(intro.scale, {
        x: 1.08,
        y: 1.08,
        z: 1.08,
        duration: 0.55,
        ease: "bounce.out",
      });
    } else {
      gsap.to(intro.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const roll = () => {
    const spin = spinGroup.current;
    if (!spin || reduceMotion.current || isSpinning.current) return;

    isSpinning.current = true;
    gsap.to(spin.rotation, {
      y: `+=${Math.PI * 2}`,
      duration: 1.2,
      ease: "back.inOut(1.4)",
      onComplete: () => {
        isSpinning.current = false;
      },
    });
  };

  return (
    <group
      ref={introGroup}
      position={[0, -0.45, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        bounce(true);
      }}
      onPointerOut={() => bounce(false)}
      onClick={roll}
    >
      <group ref={parallaxGroup}>
        <group ref={floatGroup}>
          <group ref={spinGroup}>
            <Cluster
              pieceRefs={pieceRefs}
              ringA={ringA}
              ringB={ringB}
              shardOrbit={shardOrbit}
              electronA={electronA}
              electronB1={electronB1}
              electronB2={electronB2}
              sparkRefs={sparkRefs}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default ClusterRig;
