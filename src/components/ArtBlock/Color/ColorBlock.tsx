import { ColorBlockParams } from "@/services/ArtBlock.types";

type ColorBlockProps = ColorBlockParams;

export default function ColorBlock(params: ColorBlockProps) {
  return (
    <div
      className="h-[500px] w-[500px]"
      style={{ backgroundColor: params.color }}
    ></div>
  );
}
