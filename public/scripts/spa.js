//Jokes

async function loadJoke() {
  return fetch("https://api.chucknorris.io/jokes/random")
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      console.log("received this joke from api", response);
      return response.value;
    });
}

function displayJoke(joke) {
  console.log("Should display: ", joke);
  const blockQuoteElement = document.querySelector("#js-blockquote");
  blockQuoteElement.innerHTML = `<p>${joke}</p>`;
}

async function initJoke() {
  const joke = await loadJoke();
  displayJoke(joke);
}

//Notes

let notes = [];

async function loadNotes() {
  return fetch("/api/notes").then(function (response) {
    return response.json();
  });
}

function displayNotes(notesToDisplay) {
  const listElement = document.querySelector("#js-search-list-container");
  const noteTemplateElement = document.querySelector("#js-note-template");
  const searchInputElement = document.querySelector("#js-search-input");
  //
  listElement.innerHTML = "";
  notesToDisplay.forEach((note) => {
    const clone = document.importNode(noteTemplateElement.content, true);
    clone.querySelector(".js-note-template-title").textContent = note.content;
    clone.querySelector(".js-note-template-date").textContent = note.date;
    listElement.appendChild(clone);
  });
}

function updateMeta(notes, term) {
  const metaElement = document.querySelector("#js-search-meta");
  const searchInputElement = document.querySelector("#js-search-input");
  //
  searchInputElement.value = term;
  if (!term) return (metaElement.textContent = "");
  metaElement.innerHTML = `<p><i>Affichage de ${notes.length} ${
    notes.length > 1 ? "notes" : "note"
  } correspondant au terme: "${term}"</i></p>`;
}

function onSearchFormSubmit(e) {
  e.preventDefault();
  const searchInputElement = e.target.querySelector("#js-search-input");
  const searchTerm = searchInputElement.value;
  const filteredNotes = notes.filter((note) =>
    note.content.includes(searchTerm)
  );
  displayNotes(filteredNotes);
  updateMeta(filteredNotes, searchTerm);
}

function initSearchForm() {
  const formElement = document.querySelector("#js-search-form");
  formElement.addEventListener("submit", onSearchFormSubmit);
}

async function insertNote(content) {
  const rawResponse = await fetch("/api/notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  const createdNote = await rawResponse.json();
  notes = [...notes, createdNote];
  displayNotes(notes);
  updateMeta(notes, null);
  return createdNote;
}

function onCreationFormSubmit(e) {
  e.preventDefault();
  const contentInputElement = e.target.querySelector("#content");
  const content = contentInputElement.value;
  insertNote(content).then(() => {
    contentInputElement.value = "";
  });
}

function initCreationForm() {
  const formElement = document.querySelector("#js-create-form");
  formElement.addEventListener("submit", onCreationFormSubmit);
}

async function initNotes() {
  notes = await loadNotes();
  console.log("received this list of notes from API : ", notes);
  displayNotes(notes);
  initSearchForm();
  initCreationForm();
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded");
  initJoke().then(() => console.log("Joke is OK."));
  initNotes().then(() => console.log("Notes are OK."));
});
console.log("spa.js is loaded");
