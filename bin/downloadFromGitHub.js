#!/usr/bin/env node

import simpleGit from "simple-git";
import { fileURLToPath } from "url";
import path from "path";
import { resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const git = simpleGit();
const repoUrl = "https://github.com/kazuma-naka/temp-shelf.git";
const localPath = resolve(__dirname, "../temp-shelf");

git.clone(repoUrl, localPath, (err) => {
  if (err) {
    console.error("Failed to clone repository:", err);
  } else {
    console.log("Repository cloned successfully");
  }
});
11;
