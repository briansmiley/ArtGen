import { ArtBlockDataLocal } from "@/services/ArtBlock";
import { Download, X } from "lucide-react";
import ArtBlock from "./ArtBlock";
import { useEffect, useMemo, useState } from "react";

const modalSize = () => {
  const minDimension = Math.min(window.innerWidth, window.innerHeight);
  return Math.floor(minDimension * 0.9); // 90% of the smaller dimension
};

interface ArtBlockModalProps {
  blockData: ArtBlockDataLocal;
  closeOnClick: () => void;
}
const ArtBlockModal = ({ blockData, closeOnClick }: ArtBlockModalProps) => {
  const [size, setSize] = useState(() => modalSize());
  const [downloadCallback, setDownloadCallback] = useState({
    callback: () => {}
  });
  useEffect(() => {
    const resizeCallback = () => setSize(modalSize());
    window.addEventListener("resize", resizeCallback);
    return () => window.removeEventListener("resize", resizeCallback);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg">
        <ArtBlock
          {...blockData}
          size={size}
          onTap={closeOnClick}
          downloadSetter={setDownloadCallback}
        />
        <X
          className="absolute top-2 right-2 cursor-pointer hover:bg-slate-600 hover:text-slate-200 rounded-full"
          size={size / 20}
          onClick={closeOnClick}
        />
        <Download
          className="absolute bottom-2 right-2 cursor-pointer  hover:text-slate-900"
          size={size / 20}
          onClick={downloadCallback.callback}
        />
      </div>
    </div>
  );
};

export default ArtBlockModal;
