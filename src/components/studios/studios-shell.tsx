"use client";

import { useEffect, useRef, useState } from "react";

import { Curve } from "@/components/shared/curve";

import { Configurator } from "./configurator";
import { StyleGrid } from "./style-grid";
import {
  defaultConfig,
  optionGroups,
  resolveConfig,
  type GroupId,
  type StudioConfig,
} from "./studio-data";

export type ConfiguratorStep =
  | "structure"
  | "openings"
  | "colours"
  | "extras"
  | "review";

const STORAGE_KEY = "ss-studio-config-v2";
const groupIds = optionGroups.map((g) => g.id);

/**
 * Client island connecting the preset grid to the configurator. Choosing a
 * signature style pre-fills the whole build and jumps into the steps.
 *
 * Designs are shareable and durable — every option id lives in the URL and
 * localStorage, so a shared link or a returning visitor restores the exact
 * build.
 */
export function StudiosShell() {
  const [config, setConfig] = useState<StudioConfig>(defaultConfig);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [step, setStep] = useState<ConfiguratorStep>("structure");
  const dirtyRef = useRef(false);

  function changeConfig(next: StudioConfig) {
    dirtyRef.current = true;
    setSelectedPreset(null);
    setConfig(next);
  }

  function handlePresetChosen(presetId: string, next: StudioConfig) {
    dirtyRef.current = true;
    setSelectedPreset(presetId);
    setConfig(next);
    setStep("structure");
    document
      .getElementById("configurator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Restore a build: URL params win, then localStorage.
  useEffect(() => {
    const restore = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const hasUrlConfig = groupIds.some((id) => params.has(id));
      if (hasUrlConfig) {
        const fromUrl = { ...defaultConfig };
        for (const id of groupIds) {
          const value = params.get(id);
          if (value) fromUrl[id as GroupId] = value;
        }
        if (resolveConfig(fromUrl)) {
          setConfig(fromUrl);
          setStep("review");
          return;
        }
      }
      try {
        const stored = JSON.parse(
          window.localStorage.getItem(STORAGE_KEY) ?? "null",
        ) as StudioConfig | null;
        if (stored && resolveConfig({ ...defaultConfig, ...stored })) {
          setConfig({ ...defaultConfig, ...stored });
        }
      } catch {
        // Corrupt storage — start fresh.
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  // Keep URL + storage in sync after any change.
  useEffect(() => {
    if (!dirtyRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Storage unavailable — links still work.
    }
    const params = new URLSearchParams(window.location.search);
    for (const id of groupIds) params.set(id, config[id as GroupId]);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}${window.location.hash}`,
    );
  }, [config]);

  return (
    <>
      <StyleGrid selectedPresetId={selectedPreset} onChoose={handlePresetChosen} />
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
