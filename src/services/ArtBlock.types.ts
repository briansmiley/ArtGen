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
