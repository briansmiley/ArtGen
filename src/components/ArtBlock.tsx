interface ArtBlockProps {
  color: string;
}

export default function ArtBlock({ color }: ArtBlockProps) {
  return (
    <div className="h-10 w-10" style={{ backgroundColor: color }}>
      Art.
    </div>
  );
}
