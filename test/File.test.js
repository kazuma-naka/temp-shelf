import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import File from "../File.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("File.isFile", () => {
  test("should return true for a valid file path", () => {
    const filePath = path.join(__dirname, "folder", "icons", "png-icon.png");
    if (!fs.existsSync(filePath)) {
      throw new Error(`Test file does not exist at path: ${filePath}`);
    }
    console.log(`File path: ${filePath}`);
    expect(File.isFile(filePath)).toBe(true);
  });

  test("should return false for directory path", () => {
    const dirPath = path.join(__dirname, "folder");
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Test directory does not exist at path: ${dirPath}`);
    }
    expect(File.isFile(dirPath)).toBe(false);
  });
});
