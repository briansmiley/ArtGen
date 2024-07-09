import { ColorBlockParams } from "@/services/ArtBlock.types";

type ColorBlockProps = ColorBlockParams;

export default function ColorBlock(params: ColorBlockProps) {
  const size = 300;
  return (
    <div
      className="h-[350px] w-[350px]"
      style={{ backgroundColor: params.color }}
    ></div>
  );
}
