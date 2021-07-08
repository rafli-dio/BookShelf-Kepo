const UNCOMPLETED_BOOK_LIST_ID = "bodyUncompletedRead";
const COMPLETED_BOOK_LIST_ID = "bodyCompletedRead";
const BOOK_ID = "bookId";

const getDataBook = () => {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    const completedBookList = document.getElementById(COMPLETED_BOOK_LIST_ID);
    
    const id = new Date().getTime();
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isCompleted = document.getElementById("end-read").checked;

    const bookData = makeBook(title,author,year,isCompleted);

    const bookObject = composeBookObject(title,author,year,isCompleted);

    bookData[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    if(isCompleted) {
        completedBookList.append(bookData);
    }else{
        uncompletedBookList.append(bookData);
    }

    updateDataBook();
}

const makeBook = (title,author,year,isCompleted) => {
    const textTitle = document.createElement("h3");
    textTitle.innerHTML = 'Judul : <b> ' + title + '</b>'

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerHTML = 'Penulis : <i> ' + author + '</i>'

    const textYear = document.createElement("p");
    textYear.classList.add("year")
    textYear.innerHTML = 'Tahun : <b> ' + year + '</b>'

    const containerAksi = document.createElement("div");
    containerAksi.classList.add("aksi");

    if(isCompleted){
        containerAksi.append(createUndoReadButton(), createDeleteBookButton())
    }else{
        containerAksi.append(createCompletedReadButton(), createDeleteBookButton())
    }

    const container = document.createElement("div");
    container.classList.add("item-book");
    container.append(textTitle,textAuthor,textYear,containerAksi);

    return container;
   
}

const createButton = (buttonName,buttonClass,eventListener) => {
    const button = document.createElement("button");
    button.innerText = buttonName;
    button.classList.add(buttonClass);
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}

const createCompletedReadButton = () => {
    return createButton("Selesai dibaca", "green", function(event){
        readBookCompleted(event.target.parentElement.parentElement);
    })
}

const createDeleteBookButton = () => {
    return createButton("Hapus Data Buku", "red", function(event){
        deleteBook(event.target.parentElement.parentElement);
    })
}

const createUndoReadButton = () => {
    return createButton("Baca Ulang","green",function(event){
        undoBook(event.target.parentElement.parentElement);
    })
}

const readBookCompleted = (taskElement) => {
    const bodyCompletedRead = document.getElementById(COMPLETED_BOOK_LIST_ID);

    const title = taskElement.querySelector("h3 b").innerText;
    const author = taskElement.querySelector("p i").innerText;
    const year = taskElement.querySelector("p b").innerText;

    const newBook = makeBook(title,author,year,true);
    bodyCompletedRead.append(newBook);

    const book = findBook(taskElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    taskElement.remove();
    updateDataBook();
}

const deleteBook = (taskElement) => {
    const bookPosition = findBookIndex(taskElement[BOOK_ID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataBook();
}

const undoBook = (taskElement) => {
    const unCompletedRead = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);

    const title = taskElement.querySelector("h3 b").innerText;
    const author = taskElement.querySelector("p i").innerText;
    const year = taskElement.querySelector("p b").innerText;

    const newBook = makeBook(title,author,year,false);
    unCompletedRead.append(newBook);

    const book = findBook(taskElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    taskElement.remove();
    updateDataBook();
}