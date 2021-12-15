import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Heading from './components/Heading';
import AddBook from './components/AddBook';
import EditBook from './EditBook';

function App() {
  const [books, setBooks] = useState([]);
  const [id, setId] = useState();

  const { REACT_APP_API, REACT_APP_DELETE_API } = process.env;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch(`${REACT_APP_API}`)
      .then((response) => response.json())
      .then((data) => addKeys(data))
      .catch((err) => console.error(err));
  };

  // Add keys to the book objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((book, index) =>
      Object.defineProperty(book, 'id', { value: keys[index] })
    );
    setBooks(valueKeys);
  };

  // Post Request for add Book
  const addBook = (newBook) => {
    fetch(`${REACT_APP_API}`, {
      method: 'POST',
      body: JSON.stringify(newBook),
    })
      .then((response) => fetchBooks())
      .catch((err) => console.error(err));
  };

  // Eit Book
  const changeBook = (id,book) => {
    fetch(`REACT_APP_DELETE_API}`,
   {
      method: 'PUT',
      body: JSON.stringify(book)
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  // Post Request to Delete Book

  const deleteBook = (id) => {
    fetch(`${REACT_APP_DELETE_API}`, {
      method: 'DELETE',
    })
      .then((response) => fetchBooks())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Container>
        <Heading />
        <center className="py-5">
          <AddBook addBook={addBook} />
        </center>
        <EditBook id={id} changeBook={changeBook}/>

        <div
          className="ag-theme-material"
          style={{ height: 400, width: 1200, margin: 'auto' }}
        >
          <AgGridReact rowData={books}>
            <AgGridColumn sortable={true} filter={true} field="title" />
            <AgGridColumn sortable={true} filter={true} field="author" />
            <AgGridColumn sortable={true} filter={true} field="year" />
            <AgGridColumn sortable={true} filter={true} field="isbn" />
            <AgGridColumn sortable={true} filter={true} field="price" />

            <AgGridColumn 
            headerName=''
            field='id' 
            width={90}
            cellRendererFramework={ params => 
              <IconButton onClick={() => setId(params.value)} size="small" color="secondary">
                <EditIcon />
              </IconButton>
            }
          /> 

            <AgGridColumn
              headerName=""
              field="id"
              width={90}
              cellRendererFramework={(params) => (
                <IconButton
                  onClick={() => deleteBook(params.value)}
                  size="small"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            />
          </AgGridReact>
        </div>
      </Container>
    </div>
  );
}

export default App;
