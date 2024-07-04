//Types of params for different artBlocks

export interface ColorBlockParams {
  artType: "color";
  color: string;
}
export interface TreeBlockParams {
  artType: "tree";
  branches: number;
  tilt: number;
  splitAngle: number;
  minLength: number;
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
        branches: 5,
        tilt: 0,
        splitAngle: 30,
        minLength: 10
      };
    default:
      throw new Error(`Unsupported artType: ${artType}`);
  }
}
