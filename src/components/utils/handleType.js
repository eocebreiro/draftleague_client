// Get color
export const handleColorType = (color) => {
  switch (color) {
    case "primary":
      return "#17a2b8";
    case "dark":
      return "#343a40";
    case "light":
      return "#f4f4f4";
    case "danger":
      return "#dc3545";
    case "success":
      return "#28a745";
    default:
      return "none";
  }
};

export const handleMarginType = (margin) => {
  //Desktop
  switch (margin) {
    case "center":
      return "auto";
    default:
      return "0";
  }
};

export const handleDesktopSizeType = (size) => {
  //Desktop
  switch (size) {
    case "XL":
      return "4rem";
    case "L":
      return "3rem";
    case "lead":
      return "1.5rem";
    case "S":
      return ".75rem";
    default:
      return "1.15rem";
  }
};

export const handleMediaSizeType = (size) => {
  //Media
  switch (size) {
    case "XL":
      return "3rem";
    case "L":
      return "2rem";
    case "lead":
      return "1.25rem";
    case "S":
      return ".75rem";
    default:
      return "1rem";
  }
};
