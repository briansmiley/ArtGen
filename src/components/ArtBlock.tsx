interface ArtBlockProps {
  color: string;
}

export default function ArtBlock({ color }: ArtBlockProps) {
  return (
    <div className="h-[550px] w-[550px]" style={{ backgroundColor: color }}>
      Art.
    </div>
  );
}
