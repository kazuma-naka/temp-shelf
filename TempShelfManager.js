import { createWriteStream, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import electron from "electron";
const { ipcRenderer } = electron;
import clipboardy from "clipboardy";

class TempShelfManager {
  constructor(dropArea, maxStorageTime = 600000, storageSizeLimit = 500) {
    this.dropArea = dropArea;
    this.maxStorageTime = maxStorageTime;
    this.storageSizeLimit = storageSizeLimit;
    this.shelf = new Map();

    // ドロップエリアでドラッグ＆ドロップを処理
    this.initDragAndDrop();
  }

  initDragAndDrop() {
    this.dropArea.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    this.dropArea.addEventListener("drop", (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        this.storeFile(files[i]);
      }
    });
  }

  storeFile(file) {
    const filePath = join(tmpdir(), file.name);
    const writeStream = createWriteStream(filePath);

    const reader = new FileReader();
    reader.onload = () => {
      writeStream.write(new Uint8Array(reader.result));
      writeStream.end();
    };
    reader.readAsArrayBuffer(file);

    const expiration = new Date(Date.now() + this.maxStorageTime);
    this.shelf.set(filePath, { filePath, expiration });

    this.autoRemoveExpiredFiles();
  }

  async copyFileToClipboard(fileId) {
    const fileInfo = this.shelf.get(fileId);
    if (fileInfo) {
      await clipboardy.write(fileInfo.filePath);
      console.log(
        "ファイルがクリップボードにコピーされました:",
        fileInfo.filePath
      );
    } else {
      console.log("指定されたファイルが見つかりません。");
    }
  }

  removeFile(fileId) {
    const fileInfo = this.shelf.get(fileId);
    if (fileInfo) {
      unlinkSync(fileInfo.filePath);
      this.shelf.delete(fileId);
      console.log("ファイルが削除されました:", fileId);
    }
  }

  autoRemoveExpiredFiles() {
    const now = new Date();
    this.shelf.forEach((fileInfo, fileId) => {
      if (fileInfo.expiration < now) {
        this.removeFile(fileId);
      }
    });
  }

  getStorageSize() {
    let totalSize = 0;
    this.shelf.forEach((fileInfo) => {
      totalSize += fileInfo.size;
    });
    return totalSize;
  }

  // Electron用に、ファイルをファイルエクスプローラーにドラッグする処理を追加
  startDragAndDrop(filePath) {
    ipcRenderer.send("ondragstart", filePath);
  }
}

export default TempShelfManager;
