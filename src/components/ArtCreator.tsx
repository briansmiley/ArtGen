"use client";

import { useState } from "react";
import ArtBlock from "./ArtBlock";
import prisma from "../app/client";
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

  return (
    <div>
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <ArtBlock color={color} />
      <button onClick={() => handleSubmit(color)}>Submit</button>
    </div>
  );
}
