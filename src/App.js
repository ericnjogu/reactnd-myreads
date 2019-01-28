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
      BooksAPI.update(book, event.target.value).then(
          () => {
              this.fetchBookShelves();
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
                            <div>

                                <h3 style={{clear:'left'}}>{this.state.shelves[key]}</h3>
                                {this.state.books.filter(book => book.shelf === key).map(
                                    book => <Book key={book.id} book={book} shelves={this.state.shelves} bookShelfChanged={this.bookShelfChanged}/>)}
                            </div>
                    )}
                </div>
            }}/>
            <Route path="/search" render={() => {
                return <Search shelves={this.state.shelves} bookShelfChanged={this.bookShelfChanged}/>
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
