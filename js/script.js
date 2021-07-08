document.addEventListener("DOMContentLoaded", function(){
    const submitBook = document.getElementById("form-book");
    const submitSearch = document.getElementById("form-search");

    submitBook.addEventListener("submit", function(event){
        event.preventDefault();
        getDataBook();
    });

    submitSearch.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    })

    if(storageExist()) {
        getBookFromStorage();
    }
});

document.addEventListener("ondataloaded", function(){
    refreshDataFromBook();
})

document.addEventListener("ondatasaved", function(){
    console.log("Data Berhasil Disimpan");
});

