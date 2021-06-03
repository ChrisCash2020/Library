let body = document.querySelector('body');
let formTitle = document.querySelector('#title');
let formAuthor = document.querySelector('#author');
let formPage = document.querySelector('#pages');
let formLog = document.querySelector('#log-date');
let formStatus = document.querySelector('#status');
let formSubmit = document.querySelector('#submit');
let form = document.querySelector('form');
let formOpen = document.querySelector('.form-btn');
let formRemove = document.querySelector('.remove');
let ball = document.querySelector('.ball-container');
let card = document.querySelector('.card');
ball.addEventListener('click', (e) => {
  e.preventDefault();
  if (ball.style.justifyContent === 'flex-end') {
    card.style.background = 'var(--orange)';
    ball.style.justifyContent = 'flex-start';
  } else {
    card.style.background = 'var(--grey)';
    ball.style.justifyContent = 'flex-end';
  }
});
formOpen.addEventListener('click', (e) => {
  e.preventDefault();
  if (form.className != 'center') {
    form.className = 'center';
    console.log(form);
    body.style.setProperty('--blur', 'blur(5px)');
  } else {
    form.classList.remove('center');
    body.style.setProperty('--blur', null);
  }
});
console.log(formTitle);
console.log(formAuthor);
console.log(formSubmit);
let myLibrary = [];
class Book {
  constructor(title, author, page, logDate, read) {
    (this.title = title),
      (this.author = author),
      (this.page = page),
      (this.logDate = logDate),
      (this.read = read);
  }
}

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  myLibrary.push(
    new Book(
      formTitle.value,
      formAuthor.value,
      formPage.value,
      formLog.value,
      formStatus.value
    )
  );
  console.log(myLibrary);
  form.reset();
  console.log(addBookToLibrary());
});

function addBookToLibrary() {
  myLibrary.forEach((element) => {
    let keys = Object.keys(element);
    for (key of keys) {
      console.log(element[key]);
    }
  });
}
console.log(addBookToLibrary());

function cardCreator(title, author, page, logDate, read) {
  let cardContainer = document.createElement('div');
  cardContainer.classList.add('column', 'card');
  let removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  let cardTitle = document.createElement('p');
  cardTitle.textContent = `${title}`;
  let cardAuthor = document.createElement('p');
  cardAuthor.textContent = `By: ${author}`;
  let cardPageNum = document.createElement('p');
  cardPageNum.textContent = `Number of page: ${page}`;
  let cardAddDate = document.createElement('p');
  cardAddDate.textContent = `Log date: ${logDate}`;
  let cardReadBtn = document.createElement('div');
  cardReadBtn.className = 'read-btn';
  let markRead = document.createElement('p');
  markRead.textContent = 'Mark as Read';
  let ballContainer = document.createElement('div');
  ballContainer.className = 'ball-container';
  let ballSpan = document.createElement('span');
  ballSpan.className = 'ball';
  ballSpan.addEventListener('click', (e) => {
    e.preventDefault();
    if (ballContainer.style.justifyContent === 'flex-end') {
      ballContainer.style.background = 'var(--orange)';
      ballContainer.style.justifyContent = 'flex-start';
    } else {
      ballContainer.style.background = 'var(--grey)';
      ballContainer.style.justifyContent = 'flex-end';
    }
  });
}
