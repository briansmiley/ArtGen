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
        scaleFactor: 0.7,
        rootLength: 100,
        rootWeight: 10,
        splitAngle: 30,
        tilt: 0,
        minBranchLength: 10,
        treeColor: "#FFFFFF",
        backgroundColor: "#444444",
        colorStyle: "solid",
        gradientColor: null
      };
    default:
      throw new Error(`Unsupported artType: ${artType}`);
  }
}
