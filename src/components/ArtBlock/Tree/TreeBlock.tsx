import { TreeBlockParams } from "@/services/ArtBlock.types";
import { useEffect } from "react";
import generateTree from "./generate";
import Konvas from "./Konvas";

type TreeBlockProps = TreeBlockParams;

const TreeBlock = (params: TreeBlockProps) => {
  const { branches, boundaries } = generateTree(params);
  const size = 350;
  return (
    <div
      style={{
        backgroundColor: params.backgroundColor,
        width: size,
        height: size
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
        width={size}
        height={size}
        backgroundColor={params.backgroundColor}
      />
    </div>
  );
};
export default TreeBlock;
