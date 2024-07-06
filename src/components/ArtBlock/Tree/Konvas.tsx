import { Stage, Layer, Rect } from "react-konva";
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
const Konvas = (props: KonvasProps) => {
  const { width, height, backgroundColor, branches } = props;
  return (
    <Stage width={width} height={height}>
      <Layer>
        {/* background */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={backgroundColor}
        />
        {/* tree branches */}
        {branches.map((branch, idx) => (
          <Trapezoid
            key={`branches${idx}`}
            x={branch.origin.x + width / 2}
            y={branch.origin.y + height}
            startWidth={branch.startWidth}
            endWidth={branch.endWidth}
            length={branch.length}
            fill={branch.color}
            stroke={branch.color}
            strokeWidth={0}
            rotation={180 + branch.angle}
            roundEnds={true}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Konvas;
