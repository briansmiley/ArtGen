import { TreeBlockParams } from "@/services/ArtBlock.types";
import React, { useEffect, useMemo, useRef } from "react";
import generateTree from "./generate";
import Konvas from "./Konvas";
import { Tree } from ".";
import Konva from "konva";

const downloadCallback = (canvasRef: React.RefObject<Konva.Stage>) => {
  return () => {
    if (!canvasRef.current) {
      console.error("canvasRef is null");
    }
    const link = document.createElement("a");
    link.download = "tree.png";
    link.href = canvasRef.current.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
};

const TreeBlock: Tree["Display"] = params => {
  const { branches, boundaries } = useMemo(
    () => generateTree(params.artParams),
    [params]
  );
  const canvasRef = useRef<Konva.Stage>(null);
  useEffect(() => {
    if (!params.downloadSetter) {
      console.log(params.downloadSetter);
      return;
    }
    params.downloadSetter({ callback: downloadCallback(canvasRef) });
  }, [canvasRef.current]);

  return (
    <div
      style={{
        backgroundColor: params.artParams.backgroundColor
      }}
    >
      <Konvas
        branches={branches}
        boundaries={boundaries}
        width={params.size}
        height={params.size}
        backgroundColor={params.artParams.backgroundColor}
        canvasRef={canvasRef}
      />
    </div>
  );
};
export default TreeBlock;
