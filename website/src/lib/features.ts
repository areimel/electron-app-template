// Temporary, removed when the pages move to src/config.
import { features as content } from "../config/content";

export const features = content.map((f, i) => ({
  number: String(i + 1).padStart(2, "0"),
  title: f.title,
  copy: f.copy,
  detail: "",
}));
