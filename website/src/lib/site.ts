// Temporary, removed when the pages move to src/config.
import { navigation as nav, installCommand, product } from "../config/site";

export { url, absoluteUrl } from "../config/site";

export const site = {
  name: product.name,
  description: product.description,
  repository: product.repositoryUrl,
  releases: product.releasesUrl,
  issues: product.issuesUrl,
  author: product.author,
  installCommand,
};

export const navigation = nav.map((item, i) => ({ ...item, channel: String(i + 1).padStart(2, "0") }));
