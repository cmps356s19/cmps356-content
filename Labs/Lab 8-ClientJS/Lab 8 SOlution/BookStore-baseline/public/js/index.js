document.addEventListener("DOMContentLoaded", async () => {
    // await handleLoadListValues();
    await handleLoadBookCards(await getBooks('/api/books'))
    // await loadPage("book-editor.html")
})


async function loadPage(pageName) {
    const page = await fetch(pageName)
    document.querySelector("#main-content").innerHTML = await page.text();
}

async function getBooks(url) {
    try {
        const data = await fetch(url)
        return await data.json()
    } catch (e) {
        console.log(e);
    }
}

async function handleLoadBookSummary() {
    try {
        const url = `/api/books/summary`
        const data = await fetch(url)

        const summary = await data.json();
        console.log(summary);
        let innerHTMLRows = '';
        for (let authorName in summary)
            innerHTMLRows +=
                `<tr>
                    <td>${authorName}</td>
                    <td>${summary[authorName]}</td>
                </tr>`;
        console.log(innerHTMLRows);
        await loadPage('books-summary.html')
        document.querySelector("table").innerHTML += innerHTMLRows;
    }
    catch (e) {
        console.log(e);
    }
}

async function handleBookSearch(event) {
    try {
        event.preventDefault();
        const form = event.target.form;
        const query = form2Object(form)
        console.log(query);
        if (!query.search) return;
        const url =
            `/api/books?${query.search}=${query.searchValue}`

        console.log(url);
        const books = await getBooks(url);
        console.log(books);
        handleLoadBookCards(books)


    } catch (e) {
        console.log(e);
    }
}

function form2Object(form) {
    const formData = new FormData(form);
    const data = {}
    for (let [key, value] of formData)
        data[key] = value

    return data;

}

function handleLoadBookCards(books) {
    console.log(books);
    const innerHTMLContent = Array.isArray(books)?
         books.map(book => book2HTMLCard(book)).join(''):
         book2HTMLCard(books)

    document.querySelector("#book-cards").innerHTML = innerHTMLContent;
}

async function handleDeleteBook(isbn) {
    try {
        await fetch(
            `/api/books/${isbn}`
            , {method: 'DELETE'})
        document.querySelector(
            `#card-${isbn}`
        ).remove();
    } catch (e) {
        console.log(e);
    }
}

async function handleUpdateBook(isbn) {
    try {
        const url = `/api/books?isbn=${isbn}`;
        console.log(url);
        const book = await getBooks(url)

        await loadPage('book-editor.html')
        console.log(book);

        document.querySelector("#page-title").innerText = "Edit Book";
        document.querySelector("#name").value = book.title;
        document.querySelector("#pageCount").value = book.pageCount;
        document.querySelector("#isbn").value = book.isbn;
        document.querySelector("#publishedDate").value = book.publishedDate;
        document.querySelector("#status").value = book.status;
        document.querySelector("#thumbnailUrl").value = book.thumbnailUrl;
        document.querySelector("#shortDescription").value = book.shortDescription;
        document.querySelector("#longDescription").value = book.longDescription;
        document.querySelector("#authors").value = book.authors.join(' ; ');
        document.querySelector("#categories").value = book.categories.join(' ; ');


    } catch (e) {
        console.log(e);
    }
}

async function handleShowBookDetails(isbn) {
    try {
        alert(isbn + '')
        // await loadPage('book-editor.html')
        // document.querySelector("#page-title").innerText = "Edit Book" + book.title


    } catch (e) {
        console.log(e);
    }
}

function book2HTMLCard(book) {
    return ` 
         <li class="cards__item" id="card-${book.isbn}">
            <div class="card">
                <img class="card__image" src="${book.thumbnailUrl}" alt="">
                <div class="card__content">
                    <div id="book-title" class="card__title">${book.title}</div>
                    <p id="book-desc" class="card__text">${book.shortDescription ? book.shortDescription.trim() : 'Not Available'}</p>
                    <div class="btn--options">

                        <button class="btn btn--details" onclick="handleShowBookDetails(${book.isbn})">Details</button>
                        <button class="btn btn--update" onclick="handleUpdateBook(${book.isbn})">Update</button>
                        <button class="btn btn--delete" onclick="handleDeleteBook(${book.isbn})">Delete</button>
            
                    </div>
                </div>
            </div>
        </li>
        `
}


//This function will populate data list values depending on the users selection
async function handleLoadListValues(filter) {
    let innerHTMLContent = '';
    const books = await getBooks('/api/books');
    const searchBox = document.querySelector("#search-box");
    searchBox.value = '';
    const dataList = document.querySelector("datalist#list");

    searchBox.type = list;

    switch (filter) {
        case 'name':
            searchBox.placeholder = 'Enter Book Title/Name'
            innerHTMLContent = books.map(book => `<option value="${book.title}">`).join(' ')
            break;
        case 'category':
            searchBox.placeholder = 'Enter Book Category'
            //Some books have the same name but different format like "Java" and "java"
            const catagories = books
                .map(book => book.categories).flat(Infinity)
                .map(catagory => catagory.toLowerCase());
            const uniqueCatagories = Array.from(new Set(catagories));
            innerHTMLContent = uniqueCatagories.map(category => `<option value="${category}">`)
            break;
        case 'author':
            searchBox.placeholder = 'Enter Author Name'
            //Some books have the same name but different format like "Java" and "java"
            const authors = books
                .map(book => book.authors).flat(Infinity)
                .map(author => author.toLowerCase());

            const uniqueAuthors = Array.from(new Set(authors));
            innerHTMLContent = uniqueAuthors.map(author => `<option value="${author}">`)
            break;
        case 'isbn':
            searchBox.placeholder = 'Enter Book ISPN'
            innerHTMLContent = books.map(book => `<option value="${book.isbn}">`).join(' ')
            break;
        case 'pageCount':
            innerHTMLContent = ''
            searchBox.placeholder = 'Enter Min Page Number'
            searchBox.type = "number";
            break;
        default:
            innerHTMLContent = books.map(book => `<option value="ISBN: ${book.isbn} - Title: ${book.title}">`).join(' ')

    }
    dataList.innerHTML = innerHTMLContent;
}