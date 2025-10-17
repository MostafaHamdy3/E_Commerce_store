import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");
const DESIGN_WIDTH = 375;

export const scaleFont = (size: number): number => {
  const scale = Math.min(width / DESIGN_WIDTH, 1.5);
  const scaledSize = Math.round(PixelRatio.roundToNearestPixel(size * scale));
  return scaledSize;
};
