import { TreeBlockParams } from "@/services/ArtBlock.types";
import TreeBlock from "./TreeBlock";
import TreeBlockControls from "./TreeBlockControls";
import { BlockInterface } from "../Block.types";

type TreeProps = TreeBlockParams;
export type Tree = BlockInterface<"tree", TreeProps>;

const tree: Tree = {
  artType: "tree",
  Control: TreeBlockControls,
  Display: TreeBlock
};
export default tree;
