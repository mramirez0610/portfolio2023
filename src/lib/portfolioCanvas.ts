import p5 from "p5";
import { createGrowthSettings } from "./differential-growth/settings";
import { DifferentialGrowth } from "./differential-growth/simulation";
import {
  drawGrowthBoundary,
  drawGrowthLine,
} from "./differential-growth/render";

const host = document.querySelector<HTMLElement>("[data-p5-canvas]");

if (host && !host.dataset.p5Mounted) {
  host.dataset.p5Mounted = "true";

  const root = document.documentElement;
  const strokeColorForMode = () =>
    root.dataset.colorMode === "light"
      ? "rgba(163, 159, 159, 0.92)"
      : "rgba(175, 2, 2, 0.92)";

  let growth: DifferentialGrowth;
  let canvasWidth = host.clientWidth;
  let canvasHeight = host.clientHeight;

  const resetGrowth = () => {
    growth = new DifferentialGrowth(
      canvasWidth,
      canvasHeight,
      createGrowthSettings(canvasWidth, canvasHeight, strokeColorForMode()),
    );
  };

  const canvasSketch = new p5((sketch) => {
    sketch.setup = () => {
      sketch.pixelDensity(1);
      sketch.frameRate(30);

      const canvas = sketch.createCanvas(canvasWidth, canvasHeight);
      canvas.parent(host);
      resetGrowth();
    };

    sketch.draw = () => {
      sketch.clear();

      for (let step = 0; step < growth.settings.stepsPerFrame; step += 1) {
        growth.step();
        if (growth.isFinished) break;
      }

      drawGrowthBoundary(sketch, growth.boundary, growth.settings);
      drawGrowthLine(sketch, growth.nodes, growth.settings);

      if (growth.isFinished) sketch.noLoop();
    };
  });

  const resizeObserver = new ResizeObserver(() => {
    const nextWidth = host.clientWidth;
    const nextHeight = host.clientHeight;

    if (
      nextWidth === 0 ||
      nextHeight === 0 ||
      nextWidth === canvasWidth
    ) {
      return;
    }

    // Mobile browsers change the reported viewport height while their address
    // bar opens and closes during scrolling. A width change represents a real
    // layout/orientation change; a height-only change should not restart the
    // simulation.
    canvasWidth = nextWidth;
    canvasHeight = nextHeight;
    canvasSketch.resizeCanvas(canvasWidth, canvasHeight);
    resetGrowth();
    canvasSketch.loop();
  });

  resizeObserver.observe(host);

  const colorModeObserver = new MutationObserver(() => {
    growth.settings.strokeColor = strokeColorForMode();
    canvasSketch.loop();
  });

  colorModeObserver.observe(root, {
    attributes: true,
    attributeFilter: ["data-color-mode"],
  });
}
