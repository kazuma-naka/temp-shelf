import clipboardy from "clipboardy";

export class TempShelfManager {
  constructor() {
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
  }

  removeFile(file) {
    this.files = this.files.filter((f) => f !== file);
  }

  copyToClipboard(file) {
    clipboardy.writeSync(file);
  }

  getFiles() {
    return this.files;
  }

  clearFiles() {
    this.files = [];
  }
}
