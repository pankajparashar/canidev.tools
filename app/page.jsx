import * as fs from "fs";
import path from "path";

import { FeatureLayout } from "../components/feature-layout"

export default function HomePage() {
  const features = [];
  fs.readdirSync("features").forEach((name) => {
    const filename = path.join("features", name);
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);

    features.push(feature);
  });

  return (
    <FeatureLayout features={features}></FeatureLayout>
  )
}
