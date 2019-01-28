import React, { Component } from 'react';
import * as BooksAPI from './api/BooksAPI'
import Book from "./Book";
import {Link} from "react-router-dom";

class Search extends Component {
    state = {
        query:'',
        books:[]
    }

    runQuery = (e) => {
        const val = e.target.value
        this.setState({
            query:val,
            books:[],
        }, () => {
                if (val.trim() !== '') {

                    BooksAPI.search(val).then (
                        (books) => {
                            // could update the book shelve here based on info from the home page - maybe a stripped down map of
                            // book id to shelve numbers
                            this.setState({
                                books: books
                            })
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
                    this.state.books.length > 0 ? this.state.books.map(book => <Book key={book.id} book={book}/>) : <div></div>
                }
            </div>
        </div>
    }
}

export default Search