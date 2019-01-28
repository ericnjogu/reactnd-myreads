import React from 'react';

function Book(props) {
    return <div className="book" >
        <p><img src={props.book.imageLinks? props.book.imageLinks.smallThumbnail : ''} alt="Book Cover"/></p>
        <p>{props.book.title}</p>
        <p>{props.book.authors ? props.book.authors.join() : ''}</p>
        <p>
            <label>
                Move to...
            <select value={typeof props.book.shelf === 'undefined' ? '' : props.book.shelf} onChange={(event) => props.bookShelfChanged(event, props.book)}>
                {Object.keys(props.shelves).map(
                    (key) =>
                        <option value={key}>{props.shelves[key]}</option>
                )}
                <option value=''>None</option>
            </select>
            </label>
        </p>
    </div>
}

export default Book