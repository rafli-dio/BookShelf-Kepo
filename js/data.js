const STORAGE_KEY = "DATA_BOOK";

let books = [];

const storageExist = () => {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung Local Storage");
        return false;
    }
    return true;
}

const saveData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

const getBookFromStorage = () => {
    const dataFromStorage = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(dataFromStorage);

    if(data !== null){
        books = data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

const updateDataBook = () => {
    if(storageExist());
    saveData();
}

const composeBookObject = (title,author,year,isCompleted) => {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

const findBook = (bookId) => {
    for(book of books) {
        if(book.id === bookId)
            return book;
    }
    return null;
}

const findBookIndex = (bookId) => {
    let index = 0;
    for(book of books){
        if(book.id === bookId)
        return index;

        index++
    }
    return -1;
}

const refreshDataFromBook = () => {
    const unCompletedRead = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    let isCompletedRead = document.getElementById(COMPLETED_BOOK_LIST_ID);

    for(book of books){
        const newBook = makeBook(book.title,book.author,book.year,book.isCompleted);
        newBook[BOOK_ID] = book.id;

        if(book.isCompleted){
            isCompletedRead.append(newBook);
        }else{
            unCompletedRead.append(newBook);
        }
    }
}