const searchBook = () => {
    let search = document.getElementById('searchBook').value;

    let getBook = document.getElementsByClassName("item-book");
    for(itemBook of getBook){
        let textBook = itemBook.innerText.toUpperCase();
        let checkSearchBook = textBook.search(search.toUpperCase());

        if(checkSearchBook == -1){
            itemBook.style.display = "none";
        }else{
            itemBook.style.display = "";
        }
    }
}