const downloadBtn = document.getElementById("download-btn");
const contentTextArea = document.getElementById("content");

downloadBtn.addEventListener("click", async () => {
  const filename = "names_definitions.json";
  const text = contentTextArea.value;
  const blob = new Blob([text], { type: "application/json" });

  try {
    const handle = await window.showDirectoryPicker();
    const writable = await handle.getFileHandle(filename, { create: true });
    const stream = await writable.createWritable();
    await stream.write(blob);
    await stream.close();
    console.log(`File saved to ${writable.name}`);
    alert("Il file names_definitions.json è stato salvato");
  } catch (error) {
    console.error(error);
    alert("Si è verificato un errore");
  }
});






