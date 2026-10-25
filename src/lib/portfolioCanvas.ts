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

  let growth: DifferentialGrowth;
  let canvasWidth = host.clientWidth;
  let canvasHeight = host.clientHeight;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const resetGrowth = () => {
    growth = new DifferentialGrowth(
      canvasWidth,
      canvasHeight,
      createGrowthSettings(canvasWidth, canvasHeight),
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

      if (reducedMotion || growth.isFinished) sketch.noLoop();
    };
  });

  const resizeObserver = new ResizeObserver(() => {
    const nextWidth = host.clientWidth;
    const nextHeight = host.clientHeight;

    if (
      nextWidth === 0 ||
      nextHeight === 0 ||
      (nextWidth === canvasWidth && nextHeight === canvasHeight)
    ) {
      return;
    }

    canvasWidth = nextWidth;
    canvasHeight = nextHeight;
    canvasSketch.resizeCanvas(canvasWidth, canvasHeight);
    resetGrowth();
    if (!reducedMotion) canvasSketch.loop();
  });

  resizeObserver.observe(host);
}
