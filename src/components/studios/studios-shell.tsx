"use client";

import { useState } from "react";

import { Configurator } from "./configurator";
import { StyleGrid } from "./style-grid";
import { defaultConfig, type StudioConfig } from "./studio-data";

export type ConfiguratorStep = "style" | "customise" | "review";

/**
 * Client island connecting the product grid to the configurator:
 * "Customise & Buy" on a style card pre-selects that base style and
 * jumps straight to the customise step.
 */
export function StudiosShell() {
  const [config, setConfig] = useState<StudioConfig>(defaultConfig);
  const [step, setStep] = useState<ConfiguratorStep>("style");

  function handleStyleChosen(styleId: string) {
    setConfig((current) => ({ ...current, styleId }));
    setStep("customise");
    document
      .getElementById("configurator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <StyleGrid selectedStyleId={config.styleId} onChoose={handleStyleChosen} />
      <Configurator
        config={config}
        onConfigChange={setConfig}
        step={step}
        onStepChange={setStep}
      />
    </>
  );
}
