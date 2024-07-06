import { TreeBlockParams, TreeParamRanges } from "@/services/ArtBlock.types";

export interface TreeBlockControlProps {
  artParams: TreeBlockParams;
  setParams: (params: TreeBlockParams) => void;
}
export default function TreeBlockControls({
  artParams,
  setParams
}: TreeBlockControlProps) {
  return (
    <div>
      {Object.entries(artParams).map(([key, value]) => {
        if (typeof value === "number") {
          return (
            <ParamSlider
              key={key}
              label={key}
              value={value}
              setter={newValue => setParams({ ...artParams, [key]: newValue })}
              min={TreeParamRanges[key].min}
              max={TreeParamRanges[key].max}
              step={TreeParamRanges[key].step}
            />
          );
        }
      })}
      {["treeColor", "backgroundColor"].map(colorKey => (
        <div key={colorKey}>
          <label htmlFor={colorKey}>{colorKey}</label>
          <input
            type="color"
            id={colorKey}
            value={artParams[colorKey]}
            onChange={e =>
              setParams({ ...artParams, [colorKey]: e.target.value })
            }
          />
        </div>
      ))}
    </div>
  );
}

interface ParamSliderProps {
  label: string;
  value: number;
  setter: (value: number) => void;
  min: number;
  max: number;
  step: number;
}
/**Slider component for controlling a state variable
 */
const ParamSlider = ({
  label,
  value,
  setter,
  min,
  max,
  step
}: ParamSliderProps) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type="range"
        id={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => setter(e.target.valueAsNumber)}
      />
      <span>{value}</span>
    </div>
  );
};
