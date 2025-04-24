
import { StyleCategory } from '@/types/quiz';

export function getFallbackStyle(styleCategory: string): React.CSSProperties {
  const colors: Record<string, { bg: string; text: string }> = {
    "Natural": { bg: "#E0D6C2", text: "#6B5D4D" },
    "Clássico": { bg: "#C4CBDC", text: "#3A4B71" },
    "Contemporâneo": { bg: "#BFD4E0", text: "#406D8C" },
    "Elegante": { bg: "#D4BFCE", text: "#845675" },
    "Romântico": { bg: "#F2D5DB", text: "#C2717E" },
    "Sexy": { bg: "#F2B8C6", text: "#A84F68" },
    "Dramático": { bg: "#C5C5C5", text: "#414141" },
    "Criativo": { bg: "#F2E2B8", text: "#A88B4F" },
  };

  const style = colors[styleCategory] || { bg: "#F0F0F0", text: "#666666" };

  return {
    backgroundColor: style.bg,
    color: style.text,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: "500",
    borderRadius: "0.25rem",
  };
}

export function getStyleCategoryColor(styleCategory: StyleCategory): string {
  const colors: Record<StyleCategory, string> = {
    "Natural": "#E0D6C2",
    "Clássico": "#C4CBDC",
    "Contemporâneo": "#BFD4E0",
    "Elegante": "#D4BFCE",
    "Romântico": "#F2D5DB",
    "Sexy": "#F2B8C6",
    "Dramático": "#C5C5C5",
    "Criativo": "#F2E2B8",
  };

  return colors[styleCategory] || "#F0F0F0";
}
