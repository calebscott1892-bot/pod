"use client";

import { useEffect, useRef, useState } from "react";

import { Curve } from "@/components/shared/curve";

import { Configurator } from "./configurator";
import { StyleGrid } from "./style-grid";
import { defaultConfig, resolveConfig, type StudioConfig } from "./studio-data";

export type ConfiguratorStep = "style" | "customise" | "review";

const STORAGE_KEY = "ss-studio-config";

/**
 * Client island connecting the product grid to the configurator:
 * "Customise & Buy" on a style card pre-selects that base style and
 * jumps straight to the customise step.
 *
 * Designs are shareable and durable — option ids live in the URL
 * (?style=…&windows=…&doors=…&cladding=…) and in localStorage, so a
 * shared link or a returning visitor restores the exact design.
 */
export function StudiosShell() {
  const [config, setConfig] = useState<StudioConfig>(defaultConfig);
  const [step, setStep] = useState<ConfiguratorStep>("style");
  const dirtyRef = useRef(false);

  function changeConfig(next: StudioConfig) {
    dirtyRef.current = true;
    setConfig(next);
  }

  function handleStyleChosen(next: StudioConfig) {
    changeConfig(next);
    setStep("customise");
    document
      .getElementById("configurator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Restore a design: URL params win, then localStorage.
  useEffect(() => {
    const restore = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const fromUrl: StudioConfig = {
        styleId: params.get("style") ?? defaultConfig.styleId,
        windowId: params.get("windows") ?? defaultConfig.windowId,
        doorId: params.get("doors") ?? defaultConfig.doorId,
        claddingId: params.get("cladding") ?? defaultConfig.claddingId,
      };
      const hasUrlConfig = ["style", "windows", "doors", "cladding"].some(
        (key) => params.has(key),
      );

      if (hasUrlConfig && resolveConfig(fromUrl)) {
        setConfig(fromUrl);
        setStep("review");
        return;
      }

      try {
        const stored = JSON.parse(
          window.localStorage.getItem(STORAGE_KEY) ?? "null",
        ) as StudioConfig | null;
        if (stored && resolveConfig(stored)) {
          setConfig(stored);
        }
      } catch {
        // Corrupt storage — start fresh.
      }
    }, 0);

    return () => window.clearTimeout(restore);
  }, []);

  // After the visitor changes anything, keep URL + storage in sync.
  useEffect(() => {
    if (!dirtyRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Storage unavailable (private mode) — links still work.
    }
    const params = new URLSearchParams(window.location.search);
    params.set("style", config.styleId);
    params.set("windows", config.windowId);
    params.set("doors", config.doorId);
    params.set("cladding", config.claddingId);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}${window.location.hash}`,
    );
  }, [config]);

  return (
    <>
      <StyleGrid selectedStyleId={config.styleId} onChoose={handleStyleChosen} />
      <Curve />
      <Configurator
        config={config}
        onConfigChange={changeConfig}
        step={step}
        onStepChange={setStep}
      />
      <Curve flip />
    </>
  );
}
