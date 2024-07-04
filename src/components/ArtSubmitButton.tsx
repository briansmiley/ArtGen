import { ArtBlockParams } from "@/services/ArtBlock.types";
import { useRouter } from "next/navigation";
import { ArtBlockProps } from "./ArtBlock";

//submit function sends just the artParams, backend uses userAuth middleware to get the creating userId
const handleSubmit = async (artParams: ArtBlockParams): Promise<boolean> => {
  let responseStatus: boolean = false;
  try {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ artParams })
    });

    responseStatus = response.ok;

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("ArtBlock created:", data);
  } catch (error) {
    console.error("Error creating ArtBlock:", error);
  } finally {
    return responseStatus;
  }
};

interface ArtSubmitButtonProps {
  artParams: ArtBlockParams;
}

export default function ArtSubmitButton({ artParams }: ArtSubmitButtonProps) {
  const router = useRouter();
  return (
    <button
      className="btn btn-blue mt-3"
      onClick={async () => {
        const ok = await handleSubmit(artParams);
        if (ok) router.push("/");
      }}
    >
      {" "}
      Submit
    </button>
  );
}
