
const butOpenFile = document.getElementById("openFile")
const fileContentTextArea = document.getElementById("fileContentTextArea");
const filename = document.getElementById("filename");
const lastModified = document.getElementById("lastModified");

let fileHandle;

butOpenFile.addEventListener('click', async () => {
    // Destructure the one-element array.
    [fileHandle] = await window.showOpenFilePicker();
    // Do something with the file handle.
    const file = await fileHandle.getFile();
    filename.innerText = file.name;
    lastModified.innerText = file.lastModifiedDate;
    fileContentTextArea.value = await file.text();
});

const butSaveFile = document.getElementById('butSaveFile');
butSaveFile.addEventListener('click', async () => {
    if (!fileHandle) {
        console.warn("No file to save");
        alert('Select file to edit first')
        return;
    }
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(fileContentTextArea.value);
    // Close the file and write the contents to disk.
    await writable.close();
    alert("File saved")
});


const butSaveNewFile = document.getElementById('addNewFile');
butSaveNewFile.addEventListener('click', async () => {
    const options = {
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt'],
                },
                content: fileContentTextArea.value
            },
        ],
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(fileContentTextArea.value);
    await writable.close();
    alert("File saved")
});

const butDir = document.getElementById('butDirectory');
const listParent = document.getElementById("filesList");
butDir.addEventListener('click', async () => {
    const dirHandle = await window.showDirectoryPicker();
    for await (const entry of dirHandle.values()) {
        const liElement = document.createElement("LI");
        const typeText = document.createTextNode(`Type: ${entry.kind}, `);
        const nameText = document.createTextNode(`Name: ${entry.name}`);
        liElement.appendChild(typeText);
        liElement.appendChild(nameText);
        listParent.appendChild(liElement);
    }
});