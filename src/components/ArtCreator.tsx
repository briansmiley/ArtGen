"use client";

import { useState } from "react";
import ArtBlock from "./ArtBlock";
import prisma from "../app/client";
import { useRouter } from "next/navigation";
const handleSubmit = async (color: string) => {
  try {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ color })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("ArtBlock created:", data);
  } catch (error) {
    console.error("Error creating ArtBlock:", error);
  }
};
export default function ArtCreator() {
  //takes in a color from a controlled input and retnders an ArtBlock preview of the resulting color
  const [color, setColor] = useState("#000000");
  const router = useRouter();
  return (
    <div className="flex flex-col w-full items-center">
      <ArtBlock color={color} />
      <div className="flex items-center">
        <label htmlFor="color">Color</label>
        <input
          type="color"
          className="w-10 h-10"
          value={color}
          id="color"
          onChange={e => setColor(e.target.value)}
        />
      </div>
      <button
        className="btn btn-blue mt-3"
        onClick={() => {
          handleSubmit(color);
          router.push("/");
        }}
      >
        Submit
      </button>
    </div>
  );
}
