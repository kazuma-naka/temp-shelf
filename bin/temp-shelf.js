#!/usr/bin/env node

import { execSync } from "child_process";

try {
  execSync("cd node_modules/temp-shelf/ && npm start", { stdio: "inherit" });
  console.log("npm start executed successfully in temp-shelf");
} catch (error) {
  console.error("Failed to execute npm start in temp-shelf:", error);
}
