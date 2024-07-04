import { TreeBlockParams } from "@/services/ArtBlock.types";

/**export interface TreeBlockParams {
  artType: "tree";
  branches: number;
  tilt: number;
  splitAngle: number;
  minLength: number;
} */
export interface TreeBlockControlProps {
  artParams: TreeBlockParams;
  setParams: (params: TreeBlockParams) => void;
}
export default function TreeBlockControls() {
  return <div>TreeBlockControls</div>;
}
