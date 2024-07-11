type ControlProps<AT, S> = {
  artParams: { artType: AT } & S;
  setParams: (params: { artType: AT } & S) => void;
};
type DisplayProps<AT, S> = {
  artParams: { artType: AT } & S;
  size?: number;
  downloadSetter?: (obj: { callback: () => void }) => void;
};

export type BlockInterface<AT, SpecificArtBlockProps> = {
  Control: React.FC<ControlProps<AT, SpecificArtBlockProps>>;
  Display: React.FC<DisplayProps<AT, SpecificArtBlockProps>>;
  artType: AT;
};
