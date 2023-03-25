import React,{useState,useEffect} from "react";
import APIService from "../APIService";

const BooksAdded = () => {
    const [books,setBooks] = useState([])
    const [stock,setStock] = useState('')
    const [bookId,setBookId] = useState(null)
    
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/get/books', {
            'method' : 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp => setBooks(resp)) //console.log(resp)
        .catch(error => console.log(error))
    },[])

    const deleteBook= (book) =>{
        
        APIService.deleteBooks(book.id)
        .then(() =>deletedBook(book))
    }
    const deletedBook =(book)=>{
    const rem_book= books.filter(deleted_book =>{
        if(deleted_book.id === book.id){
            return false;
        }
        return true
    })
    setBooks(rem_book)
    }
    const editStock = (stocks,bookIds) =>{
        setStock(stocks)
        setBookId(bookIds)
        console.log(stocks)
    }
   
    const handleSubmit=(event,id)=>{
        event.preventDefault();
        APIService.updateStock(id,{stock})
        .then(resp => updatedStock(resp))
        setBookId(null)
            
    }
    const updatedStock =(book) =>{
        const new_book = books.map(my_book =>{
            if(my_book.id===book.id){
                return book

            }else{
                return my_book
            }        
        })
        setBooks(new_book)
    }
    

    

    return(
        <div>
            <p>These are addedBooks:</p>
            {books.map(book =>{
                return(
                    <div key ={book.id} >
                    <p>
                    {book.title} : {book.author}     
                    </p>
                    <p>stock: {book.stock}</p>
                    {bookId===book.id ?  
                        <form onSubmit={(event) => handleSubmit(event, book.id,book.isbn)}>
                            <label>
                            Enter an integer:
                            <input
                            type="number"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                            />
      </label>
      <button type="submit">Submit</button>
    </form>: 
                    null }
                    <button onClick={() => editStock(book.stock,book.id)}>Edit</button>
                    <button onClick={() => deleteBook(book)} >Delete</button>
                    
                    </div>
                    
                )
            })}
        </div>
    )
}
export default BooksAdded