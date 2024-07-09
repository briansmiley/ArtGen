import { Stage, Layer, Rect } from "react-konva";
import { Trapezoid } from "./Trapezoid";
import { Branch, Point } from "./generate";

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
  const treeTotalDims = {
    width: boundaries.bottomRight.x - boundaries.topLeft.x,
    height: boundaries.bottomRight.y - boundaries.topLeft.y
  }; //total size of the tree bounding box
  const xMidpoint = boundaries.topLeft.x + treeTotalDims.width / 2;
  const canvasFitScaleFactor =
    0.9 * Math.min(width / treeTotalDims.width, height / treeTotalDims.height); //scale factor to fit the tree in the canvas
  return (
    <Stage width={width} height={height}>
      <Layer
        scale={{ x: canvasFitScaleFactor, y: canvasFitScaleFactor }}
        offset={{
          x: -width / 2 / canvasFitScaleFactor + xMidpoint,
          y: -height / canvasFitScaleFactor + 1.1 * bottomYPositiveSpace
        }}
      >
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
            x={branch.origin.x}
            y={branch.origin.y}
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
