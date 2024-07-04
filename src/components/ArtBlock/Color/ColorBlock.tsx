import { ColorBlockParams } from "@/services/ArtBlock.types";

type ColorBlockProps = ColorBlockParams;

export default function ColorBlock(params: ColorBlockProps) {
  return (
    <div
      className="h-[300px] w-[300px]"
      style={{ backgroundColor: params.color }}
    ></div>
  );
}
