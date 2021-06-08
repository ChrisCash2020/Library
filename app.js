let fastAppend = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};
let body = document.querySelector('body');
let inputs = document.querySelectorAll('input');
let formTitle = document.querySelector('#title');
let formAuthor = document.querySelector('#author');
let formPage = document.querySelector('#pages');
let formLog = document.querySelector('#log-date');
let formStatus = document.querySelector('#status');
let formSubmit = document.querySelector('#submit');
let form = document.querySelector('form');
let formClose = form.children[0];
let formOpen = document.querySelector('.form-btn');
let mainContainer = document.querySelector('.main');
let darkMode = document.querySelector('.dark-mode');
let logContainer = document.querySelector('.log-container');
let bookCount = document.querySelector('.count');
let isDark = true;
document.addEventListener('DOMContentLoaded', getBooks);
formSubmit.addEventListener('click', (e) => {
  let test = () => {
    let returnVal;
    inputs.forEach((input, index) => {
      if (index < 4) {
        let val = input.value;
        if (val.length > 0) {
          returnVal = true;
          input.classList.remove('invalid');
        } else {
          returnVal = false;
          input.classList.add('invalid');
        }
      }
    });
    return returnVal;
  };
  e.preventDefault();
  if (test() == true) {
    let newBook = new Book(
      formTitle.value,
      formAuthor.value,
      formPage.value,
      formLog.value,
      formStatus.value
    );
    storeTaskInLocalStorage(newBook);
    form.reset();
    form.classList.remove('center');
    body.style.setProperty('--blur', null);
    return newBook.addBookToLibrary();
  }
});
function storeTaskInLocalStorage(book) {
  let myLibrary;
  if (localStorage.getItem('myLibrary') === null) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function removeTaskFromLocalStorage(bookItem) {
  let myLibrary;
  if (localStorage.getItem('myLibrary') === null) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
  myLibrary.map((element, index) => {
    if (element.title == bookItem.title) {
      myLibrary.splice(index, 1);
    }
  });
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function getBooks() {
  let myLibrary;
  if (localStorage.getItem('myLibrary') === null) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary.forEach(function (book) {
      Object.setPrototypeOf(book, Book);
      book.prototype.addBookToLibrary(book);
    });
  }
}
formOpen.addEventListener('click', (e) => {
  e.preventDefault();
  if (form.className != 'center') {
    form.className = 'center';
    body.style.setProperty('--blur', 'blur(5px)');
  }
});
formClose.addEventListener('click', (e) => {
  e.preventDefault;
  inputs.forEach((input, index) =>
    index < 4 ? input.classList.remove('invalid') : input
  );
  form.reset();
  form.classList.remove('center');
  body.style.setProperty('--blur', null);
});
inputs[5].addEventListener('click', (e) => {
  inputs.forEach((input, index) =>
    index < 4 ? input.classList.remove('invalid') : input
  );
});
class Book {
  constructor(title, author, page, logDate, read) {
    (this.title = title),
      (this.author = author),
      (this.page = page),
      (this.logDate = logDate),
      (this.read = read);
  }
  addBookToLibrary(x) {
    const d = new Date(x == undefined ? this.logDate : x.logDate);
    let dateFormat = d.toDateString('default', { month: 'long' });
    dateFormat = dateFormat.slice(4);
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('column', 'card');
    let removeBtn = document.createElement('button');
    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt');
    removeBtn.classList.add('remove');
    removeBtn.appendChild(trashIcon);
    let cardTitle = document.createElement('p');
    cardTitle.style.fontSize = '1.2rem';
    cardTitle.textContent = `${x == undefined ? this.title : x.title}`;
    let cardAuthor = document.createElement('p');
    cardAuthor.textContent = `By: ${x == undefined ? this.author : x.author}`;
    let cardPageNum = document.createElement('p');
    cardPageNum.textContent = `Number of pages: ${
      x == undefined ? this.page : x.page
    }`;
    let cardAddDate = document.createElement('p');
    cardAddDate.textContent = `Log date: ${dateFormat}`;
    let markRead = document.createElement('p');
    markRead.textContent = 'Mark as Read';
    markRead.className = 'read';
    let ballContainer = document.createElement('div');
    ballContainer.className = 'ball-container';
    let ballSpan = document.createElement('span');
    ballSpan.className = 'ball';
    let myLibrary;
    if (localStorage.getItem('myLibrary') === null) {
      myLibrary = [];
    } else {
      myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    bookCount.textContent = `${myLibrary.length}`;
    if (x != undefined ? x.read === 'read' : this.read === 'read') {
      ballContainer.style.justifyContent = 'flex-start';
      cardContainer.style.background = 'var(--orange)';
    } else if (
      x != undefined ? x.read === 'not-read' : this.read == 'not-read'
    ) {
      ballContainer.style.justifyContent = 'flex-end';
      cardContainer.style.background = 'var(--grey)';
    }

    darkMode.addEventListener('click', (e) => {
      e.preventDefault();
      if (isDark == true) {
        body.style.backgroundColor = '#181A1B';
        body.style.color = 'white';
        logContainer.style.color = 'white';
        logContainer.children[0].style.borderColor = 'white';
        mainContainer.style.color = '#707070';
        ballSpan.style.backgroundColor = '#707070';
        form.style.color = 'white';
        darkMode.style.borderColor = 'white';
        isDark = false;
      } else if (isDark == false) {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        logContainer.style.color = 'black';
        logContainer.children[0].style.borderColor = 'black';
        mainContainer.style.color = 'black';
        ballSpan.style.backgroundColor = 'black';
        form.style.color = 'black';
        darkMode.style.borderColor = 'black';
        isDark = true;
      }
    });
    ballContainer.appendChild(ballSpan);
    fastAppend(
      cardContainer,
      removeBtn,
      cardTitle,
      cardAuthor,
      cardPageNum,
      cardAddDate,
      markRead,
      ballContainer
    );
    mainContainer.appendChild(cardContainer);
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let parent = cardContainer;
      if (x === undefined) {
        removeTaskFromLocalStorage(this);
      } else {
        removeTaskFromLocalStorage(x);
      }
      if (localStorage.getItem('myLibrary') === null) {
        myLibrary = [];
      } else {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
      }
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      bookCount.textContent = `${myLibrary.length}`;
      parent.remove();
    });
    ballContainer.addEventListener('click', (e) => {
      e.preventDefault();
      let parent = cardContainer;
      if (ballContainer.style.justifyContent == 'flex-end') {
        ballContainer.style.justifyContent = 'flex-start';
        parent.style.background = 'var(--orange)';
      } else {
        ballContainer.style.justifyContent = 'flex-end';
        parent.style.background = 'var(--grey)';
      }
    });
  }
}
const harryPotter = new Book(
  'Harry Potter',
  'J.k Rowling',
  '223',
  'May 31, 2021',
  'not-read'
);

let sendHarryPotterOnce = (function () {
  let myLibrary;
  if (localStorage.getItem('myLibrary') === null) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  if (myLibrary.length === 0) {
    storeTaskInLocalStorage(harryPotter);
  }
})();
