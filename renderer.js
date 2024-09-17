let fileList = [];

const minimizeButton = document.getElementById("minimize");
const closeButton = document.getElementById("close");
const dropZone = document.getElementById("drop_zone");
const filesListElement = document.getElementById("files");
const fileListContainer = document.getElementById("file_list");
const placeHolderImg = document.getElementById("place_holder_img");

function handleDragStart(event, file) {
  if (file.path) {
    const filePath = file.path;
    const mimeType = file.type || "application/octet-stream";
    const fileName = file.name;
    const downloadURL = `${mimeType}:${fileName}:file://${filePath}`;
    event.dataTransfer.setData("DownloadURL", downloadURL);
  } else {
    if (window.electron && window.electron.saveFileToTemp) {
      window.electron
        .saveFileToTemp(file)
        .then((tempFilePath) => {
          const mimeType = file.type || "application/octet-stream";
          const fileName = file.name;
          const downloadURL = `${mimeType}:${fileName}:file://${tempFilePath}`;
          event.dataTransfer.setData("DownloadURL", downloadURL);
        })
        .catch((err) => {
          console.error("Error saving file to temp:", err);
        });
    } else {
      console.error("Electron API not found");
    }
  }
}

function handleDragEnd(event, file) {
  if (event.dataTransfer.dropEffect !== "none") {
    fileList = fileList.filter((f) => f !== file);
    updateFileListUI();
  }
}

function updateFileListUI() {
  filesListElement.innerHTML = "";

  if (fileList.length >= 1) {
    placeHolderImg.style.display = "none";
    fileListContainer.classList.add("show");
    fileList.forEach((file) => {
      const li = document.createElement("li");
      li.textContent = `File: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`;
      li.draggable = true;

      li.addEventListener("dragstart", (event) => {
        handleDragStart(event, file);
      });

      li.addEventListener("dragend", (event) => {
        handleDragEnd(event, file);
      });

      filesListElement.appendChild(li);
    });
  } else {
    placeHolderImg.style.display = "block";
    fileListContainer.classList.remove("show");
  }
}

minimizeButton.addEventListener("click", () => {
  console.log("Minimize button clicked");
  if (window.electron && window.electron.minimizeWindow) {
    window.electron.minimizeWindow();
    console.log("Minimize function called");
  } else {
    console.error("electron API not found");
  }
});

closeButton.addEventListener("click", () => {
  console.log("Close button clicked");
  if (window.electron && window.electron.closeApp) {
    window.electron.closeApp();
    console.log("closeApp function called");
  } else {
    console.error("electron API not found");
  }
});

dropZone.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  console.log("Dragover event detected.");
});

dropZone.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();

  const files = event.dataTransfer.files;

  if (files.length > 0) {
    const fileArray = Array.from(files);
    const newFiles = fileArray.filter(
      (file) =>
        !fileList.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
    );
    if (newFiles.length > 0) {
      fileList = [...fileList, ...newFiles];
      updateFileListUI();
    }
  }
});

updateFileListUI();
