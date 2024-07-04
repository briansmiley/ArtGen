//info about creation/ownership is handled at the FEED BLOCK level

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import color from "./ArtBlock/Color";
import tree from "./ArtBlock/Tree";
import { ComponentProps } from "react";

const SupportedArtBlocks = [color, tree];

// we want to set artParams to be a union of all the possible params for each supported art block
type SupportedArtBlocksParams = ComponentProps<
  (typeof SupportedArtBlocks)[number]["Display"]
>;

export interface ArtBlockProps {
  artParams: SupportedArtBlocksParams;
}
// union of types and params for the supported art blocks
// if tree block, we want treeblock component and treeblock params

export default function ArtBlock(props: ArtBlockProps) {
  const artType = props.artParams.artType;

  switch (artType) {
    case "color":
      return <color.Display {...props.artParams} />;
    case "tree":
      return <tree.Display {...props.artParams} />;
    default:
      throw new Error(`No art block found for artType: ${artType}`);
  }
}

export interface ArtBlockControlsProps extends ArtBlockProps {
  setParams: (params: SupportedArtBlocksParams) => void;
}
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
