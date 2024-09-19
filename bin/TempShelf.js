#!/usr/bin/env node

import { execSync } from "child_process";
import { join, path } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = join(__dirname, "..");

execSync("npm run start", { cwd: projectDir, stdio: "inherit" });
