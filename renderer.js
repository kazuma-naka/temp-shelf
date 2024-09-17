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

function handleDragEnd(_, file) {
  fileList = fileList.filter((f) => f !== file);
  updateFileListUI();
}

function getFileIcon(fileType) {
  const iconMappings = {
    "image/png": "icons/png-icon.png",
    "image/jpeg": "icons/jpeg-icon.png",
    "application/pdf": "icons/pdf-icon.png",
    "text/plain": "icons/text-icon.png",
  };

  const defaultIcon = "icons/default-file-icon.png";
  return iconMappings[fileType] || defaultIcon;
}

function updateFileListUI() {
  filesListElement.innerHTML = "";

  if (fileList.length >= 1) {
    placeHolderImg.style.display = "none";
    fileListContainer.classList.add("show");
    fileList.forEach((file) => {
      // Create a container for each file item
      const fileItem = document.createElement("div");
      fileItem.classList.add("file-item");
      fileItem.draggable = true;

      // Create an image element for the file icon
      const fileIcon = document.createElement("img");
      fileIcon.classList.add("file-icon");
      fileIcon.src = getFileIcon(file.type);

      // Create a div for the file name
      const fileName = document.createElement("div");
      fileName.classList.add("file-name");
      fileName.textContent = file.name;

      // Append the icon and name to the file item container
      fileItem.appendChild(fileIcon);
      fileItem.appendChild(fileName);

      // Add event listeners for drag-and-drop
      fileItem.addEventListener("dragstart", (event) => {
        handleDragStart(event, file);
      });

      fileItem.addEventListener("dragend", (event) => {
        handleDragEnd(event, file);
      });

      // Append the file item to the list
      filesListElement.appendChild(fileItem);
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
