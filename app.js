//#region variables
const selectednotesForm = document.querySelector("#noteFormId");
const selectedNotesList = document.querySelector("#listNoteCardsId");
let notesList = [];
//#endregion

//#region intialize
onInit();

function onInit() {
  selectednotesForm.addEventListener("submit", addNote);
  document.addEventListener("DOMContentLoaded", () => {
    notesList = JSON.parse(localStorage.getItem("notes")) || [];
    createHtml();
  });
}
//#endregion

//#region functions
function addNote(e) {
  e.preventDefault();
  const newNoteText = document.getElementById("newNoteTextId").value;

  if (newNoteText === "") {
    showErrorMessage("Nota vacía, añade tu mensaje");
    return;
  }

  const newNoteObj = {
    id: Date.now(),
    text: newNoteText,
  };

  notesList = [newNoteObj,...notesList];

  createHtml();

  selectednotesForm.reset();
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("p");
  errorDiv.textContent = message;
  errorDiv.classList.add("error");
  const container = document.querySelector(".noteForm");
  container.appendChild(errorDiv);
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

function createHtml() {
  cleanHtml();
  if (notesList.length > 0) {
    notesList.forEach((note) => {

      const noteHtml = document.createElement("li");
      noteHtml.innerHTML = note.text;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.innerHTML = "Borrar";
      deleteButton.onclick = () => {
        deleteNote(note.id);
      }

      noteHtml.appendChild(deleteButton);

      selectedNotesList.appendChild(noteHtml);
    });
  }
  saveLocalStorage();
}

//Delete note
function deleteNote(id) {
  const noteId = parseInt(id);
  notesList = notesList.filter((note) => note.id !== noteId);
  createHtml();
}

//Save in local storage
function saveLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notesList));
}

//Clean html
function cleanHtml() {
  while (selectedNotesList.firstChild) {
    selectedNotesList.removeChild(selectedNotesList.firstChild);
  }
}

//#endregion

