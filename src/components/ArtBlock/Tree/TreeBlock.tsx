import { TreeBlockParams } from "@/services/ArtBlock.types";

type TreeBlockProps = TreeBlockParams;

export default function TreeBlock(params: TreeBlockProps) {
  return (
    <div className="h-[300px] w-[300px]">
      {Object.entries(params).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}
