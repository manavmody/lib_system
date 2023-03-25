import React,{useState,useEffect} from "react";
import APIService from "./APIService";

function Form (props){
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')

    useEffect(()=>{
        setName(props.member.name)
        setDescription(props.member.description)
    },[props.member])

    const updateMember = () => {
        APIService.updateMember(props.member.id,{name,description})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))

    }

    const insertMember =() =>{
        APIService.insertMember({name,description})
        .then(resp => props.insertedMember(resp))
        .catch(error => console.log(error))

    }
    
    return(
        <div>
            {props.member ? (
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" placeholder="enter name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" placeholder="enter name" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
            ) :null}
            {props.member.id ? <button onClick={updateMember}>Update</button> : 
                                <button onClick={insertMember}>Insert</button>}
            
            
           
        </div>
    )

}
export default Form