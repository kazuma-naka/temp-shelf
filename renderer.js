const dropZone = document.getElementById("drop_zone");

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
    Array.from(files).forEach((file) => {
      console.log("File Path:", file.path);
      console.log("File Name:", file.name);
      console.log("File Size:", file.size);
      console.log("File Type:", file.type);
    });
  }
});
