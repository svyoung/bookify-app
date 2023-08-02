import React, { useState, useEffect } from 'react';
import './App.css';
import SearchField from './components/SearchField';
import BookResult from './components/BookResult';
import { BookModel } from './models/BookModel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

let name: string = "Bookify";
let apiUrl: string = "https://openlibrary.org/search.json?q=";

const App:React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<BookModel[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [tbrList, setTbrList] = useState<BookModel[]>([]);
  const [readList, setReadList] = useState<BookModel[]>([]);

  useEffect(() => {
    // query search results
    const timer = setTimeout(() => {
      if(query.length > 3) {
        fetch(`${apiUrl}${query}`)
        .then(results => results.json())
        .then(res => {
          setResultCount(res.numFound);
          setResults(res.docs);
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const addToTBR = (key: string) => {
    // check if it's already on the list
    if (!tbrList.filter(list => list.key === key).length) {
      // find the book item
      const book = results.filter(res => res.key === key);
      setTbrList([...tbrList, ...book]);
    }
  };
  const onTitleClick = (title: string) => setQuery(`title:${title}`);
  const onSubjectClick = (subject: string) => setQuery(`subject:${subject}`);
  const onAuthorClick = (author: string) => setQuery(`author:${author}`);
  const deleteTBR = (key: string) => setTbrList([...tbrList.filter(b => b.key !== key)]);
  const finishedTBR = (key: string) => {
    // delete from TBR list
    deleteTBR(key);
    // add to read list
    setReadList([...readList, ...results.filter(r => r.key === key)]);
  };
  const deleteRead = (key: string) => setReadList([...readList.filter(rl => rl.key !== key)])

  const reAddToTBR = (key: string) => {
    // add it back to To Read
    addToTBR(key);
    // remove from Read list
    deleteRead(key);
  }
  

  return (
    <div className="App">
      <h1 id="bookify">{name}</h1>
      <SearchField
        query={query} 
        setQuery={setQuery}
      />
      <Tabs>
        <TabList>
          <Tab>Books ({Number(resultCount).toLocaleString()})</Tab>
          <Tab>To Read ({tbrList.length})</Tab>
          <Tab>Read ({readList.length})</Tab>
        </TabList>
        <TabPanel>
          <div className={`book_results`}>
            <div className="result_container">
              {resultCount ?
                results.map((book) => {
                  return (
                    <div className="book_item">
                      <BookResult 
                        key={book.key} 
                        book={book} 
                        buttons={["add"]} 
                        onSubjectClick={onSubjectClick} 
                        onAuthorClick={onAuthorClick} 
                        onTitleClick={onTitleClick}
                        addClick={addToTBR}
                        deleteClick={deleteTBR}
                        finishedClick={finishedTBR}
                      />
                    </div>
                  )
                })
                : <div className="no_results">Search keywords for results</div>
              }
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="to_read_list">
            <div className="result_container">
            {tbrList.length > 0 ?
              tbrList.map((book) => {
                return (
                  <div className="book_item">
                    <BookResult 
                      key={book.key} 
                      book={book} 
                      buttons={["finished", "delete"]} 
                      onSubjectClick={onSubjectClick} 
                      onAuthorClick={onAuthorClick} 
                      onTitleClick={onTitleClick}
                      addClick={() => {}}
                      deleteClick={deleteTBR}
                      finishedClick={finishedTBR}
                    />
                  </div>
                )
              })
              : <div className="no_results">Add books to your To Read list</div>
            }
          </div>
        </div>
        </TabPanel>
        <TabPanel>
          <div className="read_list">
            <div className="result_container">
              {readList.length > 0 ?
                readList.map((book) => {
                  return (
                    <div className="book_item">
                      <BookResult 
                        key={book.key} 
                        book={book} 
                        buttons={["add", "delete"]} 
                        onSubjectClick={onSubjectClick} 
                        onAuthorClick={onAuthorClick} 
                        onTitleClick={onTitleClick}
                        addClick={reAddToTBR}
                        deleteClick={deleteRead}
                        finishedClick={() => {}}
                      />
                    </div>
                  )
                })
                : <div className="no_results">You haven't finished reading any book yet</div>
              }
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;
