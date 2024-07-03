interface ArtBlockProps {
  color: string;
}

export default function ArtBlock({ color }: ArtBlockProps) {
  return (
    <div
      className="h-[300px] w-[300px]"
      style={{ backgroundColor: color }}
    ></div>
  );
}
