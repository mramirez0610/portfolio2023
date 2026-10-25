export interface GrowthSettings {
  initialNodes: number;
  initialRadius: number;
  preferredEdgeLength: number;
  splitDistance: number;
  repulsionRadius: number;
  attractionStrength: number;
  repulsionStrength: number;
  alignmentStrength: number;
  brownianStrength: number;
  damping: number;
  maximumSpeed: number;
  maximumNodes: number;
  stepsPerFrame: number;
  boundaryPadding: number;
  showBoundary: boolean;
  boundaryColor: string;
  strokeColor: string;
  strokeWidth: number;
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const randomWholeNumber = (minimum: number, maximum: number) =>
  Math.floor(randomBetween(minimum, maximum + 1));

export const createGrowthSettings = (
  width: number,
  height: number,
  strokeColor = "rgba(175, 2, 2, 0.92)",
): GrowthSettings => {
  const scale = clamp(width / 400, 0.75, 1.2);

  return {
    initialNodes: randomWholeNumber(3, 6), // Sets how many points form the initial polygon.
    initialRadius: Math.min(width, height) * 0.2, // Sets the starting size relative to the smaller canvas dimension.
    preferredEdgeLength: 2.2 * scale, // Sets the resting distance that connected nodes try to maintain.
    splitDistance: 2.2 * scale, // Sets the edge length that triggers insertion of a new midpoint node.
    repulsionRadius: 15 * scale, // Sets how far each node searches for nearby nodes to push away.
    attractionStrength: 0.5, // Sets how strongly connected nodes pull toward one another.
    repulsionStrength: randomBetween(0.96, 0.98), // Sets how strongly nearby nodes push apart.
    alignmentStrength: randomBetween(0.075, 0.095), // Sets how strongly nodes smooth themselves between their two neighbors.
    brownianStrength: 0.12 * scale, // Sets the amount of random motion applied during each simulation step.
    damping: 0.72, // Reduces velocity each step so node movement settles instead of accelerating forever.
    maximumSpeed: 0.72 * scale, // Caps how far a node can move during one simulation step.
    maximumNodes: Math.round(clamp((width * height) / 70, 9400, 80000)), // Caps line detail and the simulation's processing cost.
    stepsPerFrame: 2, // Sets how many physics updates happen before each frame is drawn.
    boundaryPadding: clamp(width * 0.035, 10, 18), // Insets the growth boundary from the canvas edges.
    showBoundary: false, // Controls whether the simulation's rectangular boundary is drawn.
    boundaryColor: "rgba(242, 245, 234, 0.24)", // Sets the color and opacity of the optional boundary outline.
    strokeColor, // Sets the color and opacity of the growing line.
    strokeWidth: 1, // Sets the thickness of the growing line in pixels.
  };
};
