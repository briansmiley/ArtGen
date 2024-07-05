import ArtFeed from "@/components/ArtFeed";
import CreateButton from "@/components/CreateButton";
import Image from "next/image";

export default function Feed() {
  return (
    <div>
      Feed
      <ArtFeed />
      <div className="fixed bottom-5 right-5">
        <CreateButton />
      </div>
    </div>
  );
}
