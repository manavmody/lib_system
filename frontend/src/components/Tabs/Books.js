import React,{useEffect, useState} from "react";
import APIService from "../APIService";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState(''); //input of the normal search bar
  const [suggestions, setSuggestions] = useState([]); //suggestion from search bar
  const[data,setData] = useState([]); //data obtained from api using normal search bar
  const[queryResults,setQueryResults] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    page: '',
    isbn: '',
    publisher:'',
    author: ''
  });

  const query_search=()=>{
    const queries = {
      title: formData.title,
      page : formData.page,
      isbn: formData.isbn,
      publisher:formData.publisher,
      author:formData.author
    }
    fetch('/api/data/query',{
      method : 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(queries)
    })
    .then(resp =>{
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return resp.json()
    } )
    .then(result => {
      setQueryResults(result.message);
    })
    .catch(error => {
      console.error('error', error);
    });

  }
  

  useEffect(() => {
    const fetchSuggestions =  () => {
      fetch('http://127.0.0.1:5000/api/data', {
            'method' : 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp =>setData(resp.message))
        const filteredData = data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setSuggestions(filteredData);
    };

    if (searchQuery !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery,data]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // form data which will give query based results
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);
    query_search()
  };

  //add a book to database
  const addToDatabase = (title,author) =>{
    const stock =1;
    APIService.insertBook({title,author,stock})
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
  }

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.bookID}>{suggestion.title}</li>
        ))}
      </ul>
      <p>form below</p>
      <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="name" name="title" value={formData.title} onChange={handleChange} /><br />

      <label htmlFor="page">Page:</label>
      <input type="page" id="page" name="page" value={formData.page} onChange={handleChange} /><br />

      <label htmlFor="phone">ISBN:</label>
      <input type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} /><br />

      <label htmlFor="publisher">Publisher:</label>
      <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} /><br />

      <label htmlFor="name">Author:</label>
      <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} /><br />

      <button type="submit">Get Data</button>
    </form>
    <p>data obtained from above search: </p>
    <ul>
        {queryResults.map(queryResult => {
          return(<div key={queryResult.bookID}>

            <li >{queryResult.title}</li>
            <button onClick={() => addToDatabase(queryResult.title,queryResult.authors)}>add to database</button>
  

          </div>
              
                )
        })}
        
      </ul>
    </div>
  );
} 
export default Books