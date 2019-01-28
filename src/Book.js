import React from 'react';

function Book(props) {
    return <div className="book" >
        <p><img src={props.book.imageLinks? props.book.imageLinks.smallThumbnail : ''} alt="Book Cover"/></p>
        <p>{props.book.title}</p>
        <p>{props.book.authors ? props.book.authors.join() : ''}</p>
    </div>
}

export default Book