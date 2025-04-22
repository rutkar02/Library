const myLibrary = [];

function Book(title, author, pages, completed) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

Book.prototype.toggleRead = function () {
  this.completed = !this.completed;
};

function addBookToLibrary(title, author, pages, completed) {
  const newBook = new Book(title, author, pages, completed);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
      <p><b>${book.title}</b> by ${book.author}, ${book.pages} pages</p>
      <p>Status: ${book.completed ? "Read" : "Not read yet"}</p>
      <button onclick="toggleRead('${book.id}')">Toggle Read</button>
      <button onclick="removeBook('${book.id}')">Remove</button>
    `;
    container.appendChild(div);
  });
}

function toggleRead(id) {
  const book = myLibrary.find((b) => b.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

function removeBook(id) {
  const index = myLibrary.findIndex((b) => b.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

const showFormBtn = document.getElementById("showFormBtn");
const bookForm = document.getElementById("bookForm");

showFormBtn.addEventListener("click", () => {
  bookForm.style.display = bookForm.style.display === "none" ? "block" : "none";
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10);
  const completed = bookForm.completed.checked;

  addBookToLibrary(title, author, pages, completed);
  bookForm.reset();
  bookForm.style.display = "none";
});
