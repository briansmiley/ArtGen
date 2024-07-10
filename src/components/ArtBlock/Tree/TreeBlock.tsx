import { TreeBlockParams } from "@/services/ArtBlock.types";
import { useEffect, useMemo } from "react";
import generateTree from "./generate";
import Konvas from "./Konvas";
import { Tree } from ".";

const TreeBlock: Tree["Display"] = params => {
  const { branches, boundaries } = useMemo(
    () => generateTree(params.artParams),
    [params]
  );
  return (
    <div
      style={{
        backgroundColor: params.artParams.backgroundColor
        // width: params.size,
        // height: params.size
      }}
    >
      {/*debug: just display all the param values*/}
      {/* {Object.entries(params).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
      Tree Size: {branches.length} */}
      <Konvas
        branches={branches}
        boundaries={boundaries}
        width={params.size}
        height={params.size}
        backgroundColor={params.artParams.backgroundColor}
      />
    </div>
  );
};
export default TreeBlock;
