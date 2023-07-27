import React, { useState, useEffect } from 'react';
import { BookModel } from '../models/BookModel';
import { FaPlus, FaTrashCan, FaCheck } from "react-icons/fa6";

type Props = {
    book: BookModel,
    buttons: string[],
    onSubjectClick: (val: string) => void,
    onAuthorClick: (val: string) => void,
    onTitleClick: (val: string) => void,
    addToTBR: (val: string) => void,
    deleteTBR:  (val: string) => void,
    finishedTBR:  (val: string) => void,
}

let coverUrl = "https://covers.openlibrary.org/b/id/";

const BookResult: React.FC<Props> = ({ 
    book, 
    buttons,
    onSubjectClick, 
    onAuthorClick, 
    onTitleClick,
    addToTBR,
    deleteTBR,
    finishedTBR
}) => {
    const [pulseActive, setPulseActive] = useState<string>("");
    const subjects: string[] = [];
    let uniqueSubs: string[] = [];
    book.subject?.map((s: string, i) => {
        if(i < 4) {
            const allSub = s.split(",").map(s => s.trim().toLowerCase());
            uniqueSubs = [...new Set(allSub)]
        }
    });
    
    const addTBR = (key: string) => {
            addToTBR(key);
            setPulseActive("added")
    };

    useEffect(() => {
        // remove pulse animation
        setTimeout(() => setPulseActive(""), 1000);
      }, [addTBR]);

  return (
    <div className="book_container">
      <div className="book_image">
        {book.cover_i ? 
            (<img src={`${coverUrl}${book.cover_i}.jpg`} width="97px" />)
            : (<img src="https://openlibrary.org/images/icons/avatar_book-sm.png"  width="97px" />)
        }
      </div>
      <div className="book_info">
        <span className="book_title" onClick={() => onTitleClick(book.title?.toLowerCase())}>{book.title}</span>
        <span className="book_author" onClick={() => onAuthorClick(book.author_name[0]?.toLowerCase())}>{book.author_name}</span>
        <span className="book_subjects">{uniqueSubs.map(s => (<span onClick={() => onSubjectClick(s)}>{s.trim()}</span>))}</span>
      </div>
      <div className="buttons_container">
        {buttons.length > 0 && buttons.map(button => {
            if(button === "add") {
                return (
                    <div className={`button_action ${pulseActive}`} onClick={() => addTBR(book.key)}>
                        <FaPlus size={20} color="#6aa84f" />
                    </div>
                )
            }
            if(button === "finished") {
                return (
                    <div className="button_action" onClick={() => finishedTBR(book.key)}>
                        <FaCheck size={20} color="#6aa84f" />
                    </div>
                )
            }
            if(button === "delete") {
                return (
                    <div className="button_action" onClick={() => deleteTBR(book.key)}>
                        <FaTrashCan size={20} color="#6aa84f" />
                    </div>
                )
            }
        })}
      </div>
    </div>
  )
};

export default BookResult;
