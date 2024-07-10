import { Color } from ".";

const ColorBlock: Color["Display"] = params => {
  return (
    <div
      style={{
        width: params.size,
        height: params.size,
        backgroundColor: params.artParams.color
      }}
    ></div>
  );
};
export default ColorBlock;
