import { TreeBlockParams } from "@/services/ArtBlock.types";
/**
  export interface TreeBlockParams {
  artType: "tree";
  scaleFactor: number;
  splitAngle: number;
  tilt: number;
  minBranchLength: number;
  treeColor: string;
  backgroundColor: string;
  colorStyle: "solid" | "gradient";
  gradientColor: string | null;
} */
interface Branch {
  x: number;
  y: number;
  length: number;
  startWidth: number;
  endWidth: number;
  angle: number;
  color: string;
}
export default function generateTree(params: TreeBlockParams) {
  const {
    scaleFactor,
    splitAngle,
    tilt,
    minBranchLength,
    treeColor,
    backgroundColor,
    colorStyle,
    gradientColor
  } = params;
  //make a series of branches based on the params
  //this will be an array of Branch type objects that contain all the information needed to render the tree to the canvas agnostic of render framework
  const branches: Branch[] = [];

  makeBranch({ branches: branches, x: 0, y: 0, ...params });
}
interface makeBranchArgs {
  branches: Branch[];
  x: number;
  y: number;
  length: number;
  weight: number;
  scaleFactor: number;
  splitAngle: number;
  tilt: number;
  minBranchLength: number;
  treeColor: string;
  backgroundColor: string;
  colorStyle: "solid" | "gradient";
  gradientColor: string | null;
}
//makeBranch recursively adds a branch to the array and calls itself twice to make subsequent left and right branches and add those as well
const makeBranch = (branchParams: makeBranchArgs) => {
  const {
    branches,
    x,
    y,
    length,
    weight,
    scaleFactor,
    splitAngle,
    tilt,
    minBranchLength,
    treeColor,
    backgroundColor,
    colorStyle,
    gradientColor
  } = branchParams;
};
