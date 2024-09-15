const dropZone = document.getElementById("drop_zone");



dropZone.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
});

dropZone.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  console.log("");
});
