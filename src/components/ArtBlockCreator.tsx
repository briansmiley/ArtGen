"use client";

import { useState } from "react";
import ArtBlock, { ArtBlockControls, ArtBlockProps } from "./ArtBlock";
import ArtSubmitButton from "./ArtSubmitButton";
import {
  ArtBlockParams,
  defaultArtBlockParams
} from "@/services/ArtBlock.types";

export type ArtCreatorProps = { artType: ArtBlockParams["artType"] };

export default function ArtCreator({ artType }: ArtCreatorProps) {
  const [params, setParams] = useState<ArtBlockProps["artParams"]>(
    defaultArtBlockParams(artType)
  ); //set the initial params to the default values for the artType
  return (
    <div className="flex flex-col w-full items-center">
      <ArtBlock artParams={params} />
      <ArtBlockControls artParams={params} setParams={setParams} />
      <ArtSubmitButton artParams={params} />
    </div>
  );
}
