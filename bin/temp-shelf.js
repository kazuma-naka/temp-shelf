#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync } from "fs";

try {
  if (!existsSync("node_modules/temp-shelf")) {
    console.log("temp-shelf is not installed. Installing...");
    execSync("npm install temp-shelf", { stdio: "inherit" });
    console.log("temp-shelf installed successfully.");
  }
  execSync("cd node_modules/temp-shelf/ && npm start", { stdio: "inherit" });
  console.log("npm start executed successfully in temp-shelf");
} catch (error) {
  console.error("Failed to execute npm start in temp-shelf:", error);
}
