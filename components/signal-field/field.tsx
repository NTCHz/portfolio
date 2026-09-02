"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FRAGMENT, VERTEX } from "./shaders";

// Cyan phosphor from DESIGN.md's signal-field entry. One constant: the whole
// layer's colour lives here.
const COLOR = "#00e5ff";

// Additive blending stacks overlapping points, so this is a per-point ceiling,
// not the brightest pixel. See the PR for the measured worst-case contrast.
const OPACITY = 0.22;

const CAMERA_Z = 8;
const FOV = 60;
const DEPTH = 3;

const SMALL_VIEWPORT = 820;
const COUNT_DESKTOP = 9000;
const COUNT_SMALL = 4000;
const DPR_MAX_DESKTOP = 2;
const DPR_MAX_SMALL = 1.5;

/** Deterministic stand-in for Math.random: the field is identical on every
 *  load, and building the buffers stays a pure render-time computation. */
function hash01(n: number): number {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

function buildGeometry(count: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (hash01(i * 4) - 0.5) * 17;
    positions[i * 3 + 1] = (hash01(i * 4 + 1) - 0.5) * 12;
    positions[i * 3 + 2] = (hash01(i * 4 + 2) - 0.5) * 2 * DEPTH;
    seeds[i] = hash01(i * 4 + 3) * 100;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

function Points({ count }: { count: number }) {
  const { size } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(1e3, 1e3));
  const smoothed = useRef(new THREE.Vector2(1e3, 1e3));

  const geometry = useMemo(() => buildGeometry(count), [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(1e3, 1e3) },
      uPointerRadius: { value: 2.6 },
      uPointerPush: { value: 0.7 },
      uSize: { value: 45 },
      uPixelRatio: { value: 1 },
      uDepth: { value: DEPTH },
      uColor: { value: new THREE.Color(COLOR) },
      uOpacity: { value: OPACITY },
    }),
    [],
  );

  useEffect(() => {
    // The canvas is pointer-events:none so it never eats a click, which also
    // means R3F's own pointer never updates — read it off the window instead.
    const onMove = (e: PointerEvent) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    const onLeave = () => pointer.current.set(1e3, 1e3);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const u = material.current?.uniforms;
    if (!u) return;

    u.uTime.value = state.clock.elapsedTime;
    u.uPixelRatio.value = state.viewport.dpr;

    // NDC -> world on the z=0 plane. Points sit within ±DEPTH of it, close
    // enough for a repulsion this weak.
    const halfH = Math.tan((FOV * Math.PI) / 360) * CAMERA_Z;
    smoothed.current.lerp(pointer.current, Math.min(1, delta * 6));
    u.uPointer.value.set(
      smoothed.current.x * halfH * (size.width / size.height),
      smoothed.current.y * halfH,
    );
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Field() {
  const small = useMemo(
    () => window.matchMedia(`(max-width: ${SMALL_VIEWPORT}px)`).matches,
    [],
  );

  return (
    <div className="signal-field" aria-hidden>
      <Canvas
        dpr={[1, small ? DPR_MAX_SMALL : DPR_MAX_DESKTOP]}
        camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Points count={small ? COUNT_SMALL : COUNT_DESKTOP} />
      </Canvas>
    </div>
  );
}
