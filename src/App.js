import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './api/BooksAPI'
import Book from './Book'
import {Link} from "react-router-dom";
import Search from './Search'
import {Route} from "react-router-dom";

class App extends Component {
  state = {
    books:[],
    shelves:{wantToRead:"Want To Read", currentlyReading: 'Currently Reading', read:'Read'}
  }

  bookShelfChanged = (event, book) => {
      const newShelfId = event.target.value
      const oldShelfId = book.shelf
      BooksAPI.update(book, newShelfId).then(
          () => {
              if (typeof oldShelfId === "undefined" || oldShelfId === 0) {
                  book.shelf = newShelfId
                  this.setState((oldState) => ({books:oldState.books.concat(book)}))
              } else {
                  this.setState((oldState) => ({books:oldState.books.map((bookToUpdate) => {
                      if (bookToUpdate.id === book.id) {bookToUpdate.shelf = newShelfId}
                      return bookToUpdate
                      })}))
              }
              //this.fetchBookShelves();
          }
      )
  }

  render() {
    return (
      <div className="App">
        <h2>My Reads</h2>
        <div>
            <Route exact path='/' render={() => {
                return <div>
                <div><Link to='/search'>Search</Link></div>
                    {Object.keys(this.state.shelves).map(
                    (key) =>
                            <div key={key}>

                                <h3 style={{clear:'left'}}>{this.state.shelves[key]}</h3>
                                {this.state.books.filter(book => book.shelf === key).map(
                                    book => <Book key={book.id} book={book} shelves={this.state.shelves} bookShelfChanged={this.bookShelfChanged}/>)}
                            </div>
                    )}
                </div>
            }}/>
            <Route path="/search" render={() => {
                return <Search shelves={this.state.shelves} bookShelfChanged={this.bookShelfChanged} shelvedBooks={this.state.books}/>
            }}/>

        </div>
      </div>
    );
  }

  componentDidMount () {
    this.fetchBookShelves();
  }

  fetchBookShelves() {
        BooksAPI.getAll().then(
            (books) => {
                this.setState({
                        books: books
                    }
                )
            }
        )
    }
}

export default App;
