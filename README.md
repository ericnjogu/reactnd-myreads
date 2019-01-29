# MyReads Project
 This is the first project in the React Nanodegree. It is meant to 
 * show books that a user has categorized, 
 * allow changes to a book's those category
 * add new books to a category from the search panel
 
The React Front end communicates to an online backend server via [`BooksAPI.js`](src/BooksAPI.js) which contains several methods to perform necessary operations on the backend.

On fetching or refreshing the home page, the list of categorized books are fetched. When a change is made to a book's category, an AJAX call updates the backend while react is made to re-render the lists through a state change.

The search page receives a reference to the categorized books. When a query returns a list of books, each entry in the list that is a categorized book is substituted so that category changes can be seen on search and home pages.

If a new book is categorized, an AJAX call makes an update while it is added to the cached book list.

## Installing

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`


## Contributing
Push requests are most welcome - The CSS could especially do with some improvement!

## Authors

* **Eric Njogu**

## License

This project is licensed under the MIT License

## Acknowledgments

* Various stack overflow questions which I upvoted
* The nanodegree contacts app - https://github.com/kunadawa/reactnd-contacts-app

