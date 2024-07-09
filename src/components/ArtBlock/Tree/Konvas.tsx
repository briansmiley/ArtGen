import { Stage, Layer, Rect } from "react-konva";
import { Trapezoid } from "./Trapezoid";
import { Branch, Point } from "./generate";
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
  boundaries: {
    topLeft: Point;
    bottomRight: Point;
  };
}
const Konvas = (props: KonvasProps) => {
  const { width, height, backgroundColor, branches, boundaries } = props;

  const leftXNegativeSpace = width / 2 + boundaries.topLeft.x; //after placing the tree in the middle of the canvas, its actual left edge is at half width plus its (negative) leftMost end
  const rightXPositiveSpace = width / 2 - boundaries.bottomRight.x; //for right, rightmost x=0 would mean we have half the width, subtract however far right it reaches
  const topYNegativeSpace = height - boundaries.topLeft.y; //0 height would leave {height} space, any protrusion up subtracts from that negative space
  const bottomYPositiveSpace = boundaries.bottomRight.y; //y=0 maps to bottom, so however high its lowest point isis how high above the bottom of canvas minY is
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
