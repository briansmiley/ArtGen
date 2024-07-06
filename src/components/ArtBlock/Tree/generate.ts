import { TreeBlockParams } from "@/services/ArtBlock.types";

export interface Branch {
  origin: Point;
  length: number;
  angle: number;
  startWidth: number;
  endWidth: number;
  color: string;
}
interface Point {
  x: number;
  y: number;
}

//TreeInfo holds the global info about a tree (its deterministic params plus its array of branches)
//to be passed down the makeBranch recursion
interface TreeInfo extends TreeBlockParams {
  branches: Branch[];
}

/**Takes in the params of a Tree block, returns an array of Branches to render */
export default function generateTree(params: TreeBlockParams) {
  //make a series of branches based on the params
  //this will be an array of Branch type objects that contain all the information needed to render the tree to the canvas agnostic of render framework
  const branches: Branch[] = [];
  const treeInfo: TreeInfo = { ...params, branches: branches };
  const rootArgs = {
    treeInfo: treeInfo,
    branchOrigin: { x: 0, y: 0 },
    branchLength: params.rootLength,
    branchWeight: params.rootWeight,
    branchAngle: 0,
    branchColor: params.treeColor
  };
  makeBranch(rootArgs);
  return branches;
}
interface makeBranchArgs {
  treeInfo: TreeInfo;
  branchOrigin: Point;
  branchLength: number;
  branchWeight: number;
  branchAngle: number;
  branchColor: string;
}
//makeBranch recursively adds a branch to the array and calls itself twice to make subsequent left and right branches and add those as well
const makeBranch = (branchParams: makeBranchArgs) => {
  const {
    treeInfo,
    branchOrigin,
    branchLength,
    branchWeight,
    branchAngle,
    branchColor
  } = branchParams;
  //stop the recursion if we've sunk below the min branch length
  if (branchLength < treeInfo.minBranchLength) return;
  const endWeight = branchWeight * treeInfo.scaleFactor;
  //add the current branch to the branches array
  treeInfo.branches.push({
    origin: branchOrigin,
    length: branchLength,
    angle: branchAngle,
    startWidth: branchWeight,
    endWidth: endWeight,
    color: branchColor
  });

  const branchEnd = {
    x: branchOrigin.x + branchLength * Math.sin((branchAngle * Math.PI) / 180),
    y: branchOrigin.y + branchLength * Math.cos((branchAngle * Math.PI) / 180)
  };
  //right and left branches differ only in whether we add or subtract the split angle
  const branchAngleOffsets = [
    branchAngle + treeInfo.tilt + treeInfo.splitAngle,
    branchAngle + treeInfo.tilt - treeInfo.splitAngle
  ];
  //recursively call makeBranch to make the left and right branches
  branchAngleOffsets.forEach(angle =>
    makeBranch({
      treeInfo, //pass along unchanged global tree info
      branchOrigin: branchEnd, //start the next branch at the end of this one
      branchLength: branchLength * treeInfo.scaleFactor, //scale length down
      branchWeight: endWeight, //next branch thickness starts where this one ends
      branchAngle: angle, //branch splits off at +/- splitAngle
      branchColor: branchColor
    })
  );
};
