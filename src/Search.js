import React, { Component } from 'react';
import * as BooksAPI from './api/BooksAPI'
import Book from "./Book";
import {Link} from "react-router-dom";

class Search extends Component {
    state = {
        query:'',
        queriedBooks:[]
    }

    runQuery = (e) => {
        const val = e.target.value
        this.setState({
            query:val,
            queriedBooks:[],
        }, () => {
                if (val.trim() !== '') {

                    BooksAPI.search(val).then (
                        (books) => {
                            // could update the book shelve here based on info from the home page - maybe a stripped down map of
                            // book id to shelve numbers
                            if (books.length > 0) {
                                this.setState({
                                    queriedBooks: books.map(fetchedBook => {
                                        let matches = this.props.shelvedBooks.filter(shelvedBook => shelvedBook.id === fetchedBook.id)
                                        return matches.length > 0 ? matches[0] : fetchedBook
                                    })
                                })
                            }
                        }
                    )
                }
            }
        )

    }

    render() {
        return <div>
            <div><Link to='/'>Back</Link></div>
            <div><input type='text' value={this.state.query} onChange={this.runQuery}/></div>
            <div>
                {
                    this.state.queriedBooks.length > 0 ? this.state.queriedBooks.map(
                        book => <Book key={book.id} book={book} shelves={this.props.shelves} bookShelfChanged={this.props.bookShelfChanged}/>) : <div></div>
                }
            </div>
        </div>
    }
}

export default Search