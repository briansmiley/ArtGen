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
      <span className="font-semibold">{likesCount}</span>
      <Heart
        className={` cursor-pointer ${
          isLiked ? "text-red-500" : "text-gray-500 hover:text-black"
        }`}
        size={18}
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
          setIsLiked(res.likedStatus);
          setLikesCount(res.likeCount);
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
