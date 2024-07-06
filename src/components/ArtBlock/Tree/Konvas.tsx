import { Stage, Layer } from "react-konva";
import { Trapezoid } from "./Trapezoid";
import { Branch } from "./generate";
import { K } from "vitest/dist/reporters-yx5ZTtEV.js";

/**
   interface TrapezoidProps {
    x: number;
    y: number;
    startWidth: number;
    endWidth: number;
    length: number;
    angle: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    rotation: number;
  }
  */
interface KonvasProps {
  width: number;
  height: number;
  backgroundColor: string;
  branches: Branch[];
}
export const Konvas = (props: KonvasProps) => {
  const { width, height, backgroundColor, branches } = props;
  return (
    <Stage width={width} height={height}>
      <Layer>
        {branches.map((branch, idx) => (
          <Trapezoid
            key={`branches${idx}`}
            x={branch.origin.x}
            y={branch.origin.y}
            startWidth={branch.startWidth}
            endWidth={branch.endWidth}
            length={branch.length}
            angle={branch.angle}
            fill={branch.color}
            stroke={branch.color}
            strokeWidth={0}
            rotation={branch.angle}
          />
        ))}
      </Layer>
    </Stage>
  );
};
