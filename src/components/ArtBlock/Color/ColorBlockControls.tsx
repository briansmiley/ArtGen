"use client";

import { ColorBlockParams } from "@/services/ArtBlock.types";
import { useState } from "react";
// import ArtBlock from "../../ArtBlock";
export interface ColorBlockControlProps {
  artParams: ColorBlockParams;
  setParams: (params: ColorBlockParams) => void;
}
export default function ColorBlockControls(props: ColorBlockControlProps) {
  //takes in a color from a controlled input and retnders an ArtBlock preview of the resulting color
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex items-center">
        <label htmlFor="color">Color</label>
        <input
          type="color"
          className="w-10 h-10"
          value={props.artParams.color}
          id="color"
          onChange={e =>
            props.setParams({ ...props.artParams, color: e.target.value })
          }
        />
      </div>
    </div>
  );
}
