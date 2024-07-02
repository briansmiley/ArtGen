import Image from "next/image";

export default function Feed() {
  return (
    <div>
      Feed
      <div className="fixed bottom-5 right-5">
        <a href="/create">
          <button className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl border-none cursor-pointer hover:shadow-lg pb-0.5">
            +
          </button>
        </a>
      </div>
    </div>
  );
}
