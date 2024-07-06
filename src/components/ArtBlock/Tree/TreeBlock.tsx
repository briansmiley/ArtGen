import { TreeBlockParams } from "@/services/ArtBlock.types";
import { useEffect } from "react";
import generateTree from "./generate";

type TreeBlockProps = TreeBlockParams;

const TreeBlock = (params: TreeBlockProps) => {
  const branches = generateTree(params);
  console.log(branches);
  return (
    <div
      className="h-[300px] w-[300px]"
      style={{ backgroundColor: params.backgroundColor }}
    >
      {/*debug: just display all the param values*/}
      {Object.entries(params).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
      Tree Size: {branches.length}
    </div>
  );
};
export default TreeBlock;
