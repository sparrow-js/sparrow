import { LabelData } from "../types/LabelData";
import nonNullable from "./nonNullable";

export function deduplicateLabels(labels: LabelData[]): LabelData[] {
  const labelsIds: { [key: string]: true } = {};
  return labels
    .map((label) => {
      const id = JSON.stringify(label);
      if (labelsIds[id]) {
        return null;
      }
      labelsIds[id] = true;
      return label;
    })
    .filter(nonNullable);
}
