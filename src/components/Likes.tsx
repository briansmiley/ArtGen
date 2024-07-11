import { LikeRequestBody } from "@/app/api/like/route";
import { LikeActionResponse } from "@/services/ArtBlock";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const handleLikeClick = async (
  body: LikeRequestBody
): Promise<LikeActionResponse> => {
  const response = await fetch("/api/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return response.json();
};

interface LikesProps {
  count: number;
  artId: string;
  liked: boolean;
}
export const Likes = (props: LikesProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  useEffect(() => {
    setLikesCount(props.count);
    setIsLiked(props.liked);
  }, []);
  return (
    <div className="flex flex-row gap-1 items-center">
      <span className="font-semibold text-xs md:text-s">{likesCount}</span>
      <Heart
        className={` cursor-pointer w-3 h-3 md:w-4 md:h-4 ${
          isLiked ? "text-red-500" : "text-slate-700 hover:text-black"
        }`}
        fill={isLiked ? "red" : "none"}
        onClick={async () => {
          //instantaneous optimistic update
          setIsLiked(!isLiked);
          setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
          //...then make the actual like query and update accordingly
          const res = await handleLikeClick({
            artId: props.artId,
            adding: !isLiked
          });
          if (res.success) {
            setIsLiked(res.likedStatus);
            setLikesCount(res.likeCount);
          }
        }}
        /**export interface LikeActionResponse {
  success: boolean;
  likeCount: number;
  likedStatus: boolean;
} */
      />
    </div>
  );
};

export default Likes;
