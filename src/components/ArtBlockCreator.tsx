"use client";

import { useState } from "react";
import ArtBlock, { ArtBlockControls, ArtBlockProps } from "./ArtBlock";
import ArtSubmitButton from "./ArtSubmitButton";
import { ArtBlockParams } from "@/services/ArtBlock.types";

export type ArtCreatorProps = { artType: ArtBlockParams["artType"] };

export default function ArtCreator({ artType }: ArtCreatorProps) {
  const [params, setParams] = useState<ArtBlockProps["artParams"]>();
  return (
    <div className="flex flex-col w-full items-center">
      <ArtBlock artParams={params} />
      <ArtBlockControls artParams={params} setParams={setParams} />
      <ArtSubmitButton artParams={params} />
    </div>
  );
}
