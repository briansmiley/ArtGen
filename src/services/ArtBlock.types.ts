//Types of params for different artBlocks

export interface ColorBlockParams {
  artType: "color";
  color: string;
}
export interface TreeBlockParams {
  artType: "tree";
  rootLength: number;
  rootWeight: number;
  scaleFactor: number;
  splitAngle: number;
  tilt: number;
  minBranchLength: number;
  treeColor: string;
  backgroundColor: string;
  colorStyle: "solid" | "gradient";
  gradientColor: string | null;
}
export const TreeParamRanges = {
  rootLength: { min: 50, max: 500, step: 1 },
  rootWeight: { min: 1, max: 50, step: 1 },
  scaleFactor: { min: 0.05, max: 0.8, step: 0.01 },
  splitAngle: { min: 0, max: 180, step: 0.005 },
  tilt: { min: -180, max: 180, step: 0.005 },
  minBranchLength: { min: 1, max: 25, step: 1 }
};
export type ArtBlockParams = ColorBlockParams | TreeBlockParams;

//export a default function to return default values for each block type
export function defaultArtBlockParams(
  artType: "color" | "tree"
): ArtBlockParams {
  switch (artType) {
    case "color":
      return {
        artType: "color",
        color: "#FFFFFF"
      };
    case "tree":
      return {
        artType: "tree",
        scaleFactor: 0.65,
        rootLength: 150,
        rootWeight: 20,
        splitAngle: 30,
        tilt: 0,
        minBranchLength: 8,
        treeColor: "#FFFFFF",
        backgroundColor: "#d1d1d1",
        colorStyle: "solid",
        gradientColor: null
      };
    default:
      throw new Error(`Unsupported artType: ${artType}`);
  }
}
