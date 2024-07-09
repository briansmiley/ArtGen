import { Circle, Line } from "react-konva";
interface TrapezoidProps {
  x: number;
  y: number;
  startWidth: number;
  endWidth: number;
  length: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  rotation: number;
  roundEnds?: boolean;
  offsetX?: number;
  offsetY?: number;
}
export const Trapezoid = (props: TrapezoidProps) => {
  return (
    <div>
      <Line
        x={props.x}
        y={props.y}
        points={[
          -props.startWidth / 2,
          0,
          -props.endWidth / 2,
          props.length,
          props.endWidth / 2,
          props.length,
          props.startWidth / 2,
          0
        ]}
        closed
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        rotation={props.rotation}
        offsetX={props.offsetX}
        offsetY={props.offsetY}
      />
      {props.roundEnds && (
        <Circle
          x={props.x}
          y={props.y}
          radius={props.endWidth / 2}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
          rotation={props.rotation}
          offsetY={-props.length}
        />
      )}
    </div>
  );
};
