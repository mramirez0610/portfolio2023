# Differential growth canvas

This is a small, original implementation inspired by Jason Webb's
[bounded differential-growth experiment](https://jasonwebb.github.io/2d-differential-growth-experiments/experiments/07%20-%20bounds/)
and its explanation of the underlying rules. The reference project is licensed
under CC BY-NC-SA 4.0; its source was used as a behavioral reference rather than
copied into this implementation.

## Where each idea lives

```text
portfolioCanvas.ts                  creates p5 and runs each frame
  ├── settings.ts                   all visual and physics tuning values
  ├── simulation.ts                coordinates one simulation step
  │     ├── seed.ts                 creates the small starting polygon
  │     ├── spatialHash.ts          finds nearby points efficiently
  │     ├── boundary.ts             defines and enforces the panel bounds
  │     ├── node.ts                 defines one moving point
  │     └── vector.ts               tiny reusable vector operations
  └── render.ts                     turns the points into one smooth p5 curve
```

## What happens during one frame

1. `portfolioCanvas.ts` asks the simulation to take two small steps.
2. `SpatialHash` groups nodes into grid cells so a node only checks nearby cells.
3. Each movable node accumulates four forces:
   - **Attraction:** connected neighbors pull together when their edge is long.
   - **Alignment:** the node moves toward the midpoint of its two neighbors,
     smoothing sharp corners.
   - **Repulsion:** every nearby node pushes it away, producing separated folds.
   - **Brownian motion:** tiny random variations break perfect symmetry.
4. The accumulated force changes velocity, and velocity changes position.
5. Nodes that reach an edge of the rectangular canvas are fixed there.
6. Repulsion stretches the path. When an edge becomes too long, it is split at
   its midpoint so the growing line stays smooth. There is no separate node
   injection pass.
7. `render.ts` draws the updated nodes as one closed p5 path. It can also draw
   the rectangular boundary for debugging, but that is hidden by default.

The browser then starts the next frame and repeats the same loop.

## Easiest values to experiment with

Open `settings.ts` and start with these:

- `repulsionStrength`: increases or reduces the wrinkling.
- `alignmentStrength`: higher values create smoother curves.
- `repulsionRadius`: controls the spacing between neighboring folds.
- `splitDistance`: controls how far an edge stretches before it is subdivided.
- `stepsPerFrame`: controls the simulation speed directly; it does not slow down
  as the node count increases.
- `maximumNodes`: trades detail for performance.
- `showBoundary`, `strokeColor`, and `strokeWidth`: only affect presentation.

The fixed canvas follows the viewport while the portfolio scrolls and restarts
with settings scaled to its new size whenever the viewport changes. It runs at
30 frames per second and stops after its first frame when the visitor has enabled
reduced motion.

Each new simulation chooses `initialNodes`, `repulsionStrength`, and
`alignmentStrength` from small ranges around the existing tuned values.
`Math.floor()` is used only for `initialNodes`, because that value must be a whole
number. Brownian motion also uses `Math.random()` on every step, so reloads do not
follow exactly the same path.

The main files are:

- portfolioCanvas.ts — p5 setup and draw loop
- settings.ts — approachable tuning controls
- simulation.ts — coordinates the physics
- boundary.ts — rectangular constraint
- spatialHash.ts (line 1) — efficient nearby-node lookup
- render.ts (line 13) — draws the line
