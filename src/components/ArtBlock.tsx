//info about creation/ownership is handled at the FEED BLOCK level

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import color from "./ArtBlock/Color";
import tree from "./ArtBlock/Tree";
import { ComponentProps } from "react";
import useTap from "@/app/hooks/useTap";

const SupportedArtBlocks = [color, tree];

// we want to set artParams to be a union of all the possible params for each supported art block
type SupportedDisplayParams = ComponentProps<
  (typeof SupportedArtBlocks)[number]["Display"]
>;

export interface ArtBlockProps {
  artParams: SupportedDisplayParams["artParams"];
  size?: SupportedDisplayParams["size"];
  onTap?: (e?: React.TouchEvent<HTMLDivElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

// union of types and params for the supported art blocks
// if tree block, we want treeblock component and treeblock params

export default function ArtBlock(props: ArtBlockProps) {
  const artType = props.artParams.artType;
  const { handleTouchMove, handleTouchEnd } = useTap();
  switch (artType) {
    case "color":
      return (
        <div
          onClick={props.onClick}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd(props.onTap)}
        >
          <color.Display artParams={props.artParams} size={props.size || 350} />
        </div>
      );
    case "tree":
      return (
        <div
          onClick={props.onClick}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd(props.onTap)}
        >
          <tree.Display artParams={props.artParams} size={props.size || 350} />
        </div>
      );
    default:
      throw new Error(`No art block found for artType: ${artType}`);
  }
}

export type ArtBlockControlsProps = {
  artParams: SupportedDisplayParams["artParams"];
  setParams: (params: SupportedDisplayParams["artParams"]) => void;
};
export function ArtBlockControls(props: ArtBlockControlsProps) {
  const artType = props.artParams.artType;

  switch (artType) {
    case "color":
      return (
        <color.Control
          artParams={props.artParams}
          setParams={props.setParams}
        />
      );
    case "tree":
      return (
        <tree.Control artParams={props.artParams} setParams={props.setParams} />
      );
    default:
      throw new Error(`No art block found for artType: ${artType}`);
  }
}
