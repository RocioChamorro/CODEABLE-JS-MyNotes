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
    showErrorMessage("Nota vacía");
    return;
  }

  const newNoteObj = {
    id: Date.now(),
    text: newNoteText,
  };

  notesList = [...notesList, newNoteObj];

  createHtml();

  selectednotesForm.reset();
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("p");
  errorDiv.textContent = message;
  errorDiv.classList.add("error");
  const container = document.querySelector(".container");
  container.appendChild(errorDiv);
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

function createHtml() {
  cleanHtml();
  if (notesList.length > 0) {
    notesList.forEach((note) => {
      const noteHtml = document.createElement("div");
      noteHtml.classList.add("note");

      const noteText = document.createElement("textarea");
      noteText.classList.add("noteText");
      noteText.innerHTML = note.text;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.innerHTML = "Eliminar";
      deleteButton.onclick = () => {
        deleteNote(note.id);
      }

      noteHtml.appendChild(noteText);
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

// const listNotes = () => {
//   const notes = localStorage.getItem("notes")
//     ? JSON.parse(localStorage.getItem("notes"))
//     : [];
//   notes.map((note, index) => {
//     listNoteCards.innerHTML += `
//         <div class="card">
//           <div class="card-body">
//             <h5 class="card-title">${note.title}</h5>
//             <p class="card-text">${note.text}</p>
//             <button class="btn btn-danger" onclick="deleteNote(${index})">Delete</button>
//           </div>
//         </div>
//       `;
//   });
// };


// function createNoteCard(title, description) {
//   const div = document.createElement("div");
//   div.className = "card";
//   div.innerHTML = `
//         <div class="card-header">
//             <h2>${title}</h2>
//         </div>
//         <div class="card-body">
//             <p>${description}</p>
//         </div>
//     `;
//   listNoteCards.appendChild(div);
// }
