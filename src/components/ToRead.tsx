import React from 'react';
import { BookModel } from '../models/BookModel';
import BookResult from './BookResult';

type Props = {
    book: BookModel
}

const ToRead: React.FC<Props> = ({ book }) => {
  return (
    <div>
      {/* <BookResult book={book} /> */}
    </div>
  )
}

export default ToRead
