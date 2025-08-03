export const getColorName = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    red: "#FF0000",
    blue: "#0000FF",
    "light blue": "#ADD8E6",
    green: "#008000",
    yellow: "#FFFF00",
    white: "#FFFFFF",
    black: "#000000",
    orange: "#FFA500",
    purple: "#800080",
    brown: "#A52A2A",
    pink: "#FFC0CB",
    gray: "#808080",
    maroon: "#800000",
  };
  return colorMap[color.toLowerCase()] || color;
};

export const getTextColor = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    red: "#FFFFFF",
    blue: "#FFFFFF",
    "light blue": "#000000",
    green: "#FFFFFF",
    yellow: "#000000",
    white: "#000000",
    black: "#FFFFFF",
    orange: "#000000",
    purple: "#FFFFFF",
    brown: "#FFFFFF",
    pink: "#000000",
    gray: "#FFFFFF",
    maroon: "#FFFFFF",
  };
  return colorMap[color.toLowerCase()] || "#000000";
};

export const getColorStyle = (color: string) => ({
  backgroundColor: getColorName(color),
  color: getTextColor(color),
  border: color.toLowerCase() === "white" ? "1px solid #e5e7eb" : "none",
});