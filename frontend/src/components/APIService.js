export default class APIService{
    static updateMember(id,body){
        return fetch(`http://127.0.0.1:5000/update/${id}/`, {
            'method' : 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
       
    }

    static insertMember(body){
        return fetch(`http://127.0.0.1:5000/add`, {
            'method' : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
       
    }
    static deleteMember(id){
        return fetch(`http://127.0.0.1:5000/delete/${id}/`, {
            'method' : 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },  
        })
       
    }
    static updateStock(id,body){
        return fetch(`http://127.0.0.1:5000/update/books/${id}/`, {
            'method' : 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
       
    }
    static insertBook(body){
        return fetch(`http://127.0.0.1:5000/add/books`, {
            'method' : 'POST',
             
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
       
    }
    static deleteBooks(id){
        return fetch(`http://127.0.0.1:5000/delete/books/${id}/`, {
            'method' : 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },  
        })
       
    }
   
    

}