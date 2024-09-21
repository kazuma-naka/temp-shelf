import path from "path";
import { fileURLToPath } from "url";
import File from "../File.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("File.isFile", () => {
  test("should return true for a valid file path", () => {
    const filePath = path.join(__dirname, "folder", "png.txt");
    expect(File.isFile(filePath)).toBe(true);
  });

  test("should return false for directory path", () => {
    const dirPath = path.join(__dirname, "folder/");
    expect(File.isFile(dirPath)).toBe(false);
  });
});
