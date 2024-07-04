//this page is the create page for the user to create their artblocks

import { ArtBlockProps } from "@/components/ArtBlock";
import ArtCreator from "@/components/ArtBlock/Color/ColorBlockControls";

type CreateProps = {
  params: { artType: ArtBlockProps["artParams"]["artType"] }; //derive the possible valies for artType from the ArtBlock component
};
export default function Create({ params }: CreateProps) {
  return (
    <div>
      <ArtCreator artType={params.artType} />
    </div>
  );
}
