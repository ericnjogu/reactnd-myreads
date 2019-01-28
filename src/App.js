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
                                {this.state.books.filter(book => book.shelf === key).map(book => <Book key={book.id} book={book}/>)}
                            </div>
                    )}
                </div>
            }}/>
            <Route path="/search" component={Search}/>

        </div>
      </div>
    );
  }

  componentDidMount () {
    BooksAPI.getAll().then (
        (book) => {
          this.setState((oldState) => ({
            books: oldState.books.concat(book)
          }))
        }
    )
  }
}

export default App;
