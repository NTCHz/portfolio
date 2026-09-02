"use client";

import { Component, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";

const Field = dynamic(() => import("./field"), { ssr: false });

let webglSupported: boolean | undefined;

function hasWebGL(): boolean {
  if (webglSupported === undefined) {
    try {
      const probe = document.createElement("canvas");
      webglSupported = Boolean(
        probe.getContext("webgl2") ?? probe.getContext("webgl"),
      );
    } catch {
      webglSupported = false;
    }
  }
  return webglSupported;
}

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return !window.matchMedia(REDUCED).matches && hasWebGL();
}

/** Context creation can still fail after the probe succeeds (driver blocklist,
 *  lost context on mount). Swallow it: the page is complete without this layer. */
class Quiet extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function SignalField() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (!enabled) return null;
  return (
    <Quiet>
      <Field />
    </Quiet>
  );
}
