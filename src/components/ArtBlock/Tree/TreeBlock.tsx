import { TreeBlockParams } from "@/services/ArtBlock.types";
import { useEffect } from "react";
import generateTree from "./generate";
import Konvas from "./Konvas";

type TreeBlockProps = TreeBlockParams;

const TreeBlock = (params: TreeBlockProps) => {
  const { branches, boundaries } = generateTree(params);
  return (
    <div
      className="h-[700px] w-[700px]"
      style={{ backgroundColor: params.backgroundColor }}
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
        width={700}
        height={700}
        backgroundColor={params.backgroundColor}
      />
    </div>
  );
};
export default TreeBlock;
