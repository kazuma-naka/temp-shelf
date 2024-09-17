let fileList = [];

const minimizeButton = document.getElementById("minimize");
const closeButton = document.getElementById("close");
const dropZone = document.getElementById("drop_zone");
const filesListElement = document.getElementById("files");
const fileListContainer = document.getElementById("file_list");
const placeHolderImg = document.getElementById("place_holder_img");

function updateFileListUI() {
  filesListElement.innerHTML = "";

  if (fileList.length === 0) {
    placeHolderImg.style.display = "block";
    fileListContainer.classList.remove("show");
  } else {
    placeHolderImg.style.display = "none";
    fileListContainer.classList.add("show");
    fileList.forEach((file) => {
      const li = document.createElement("li");
      li.textContent = `File: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`;
      filesListElement.appendChild(li);
    });
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
