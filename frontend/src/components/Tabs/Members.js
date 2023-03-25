import React,{useEffect, useState} from "react";
import Form from "../Form";
import APIService from "../APIService";
const Members = () => {
    const[members,setMembers] = useState([])
    const[editedMember,setEditedMember] = useState(null)
    

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/get', {
            'method' : 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp => setMembers(resp))
        .catch(error => console.log(error))
    },[])

    const editMember = (member) =>{
        
        setEditedMember(member)

    }

    const updatedData =(member) =>{
        const new_member = members.map(my_member =>{
            if(my_member.id===member.id){
                return member

            }else{
                return my_member
            }        
        })
        setMembers(new_member)
    }
    //for inserting new member we need to set name,description,,so <Form/> will be available on ui
    const openForm =()=>{
        setEditedMember({name:'',description:''})
    }

    const insertedMember=(member)=>{
        const new_member = [...members,member]
        setMembers(new_member)

    }
    
    const deleteMember= (member) =>{
        
            APIService.deleteMember(member.id)
            .then(() =>deletedMember(member))
    }
    const deletedMember =(member)=>{
        const new_member= members.filter(my_member =>{
            if(my_member.id === member.id){
                return false;
            }
            return true
            
        })
        setMembers(new_member)

    }

    

    return(
        <div>
            <h2>These are Members: <button onClick={openForm}> New member</button></h2>
            {members.map(member =>{
                return(
                    <div key ={member.id} >
                    <p>
                    {member.name} : {member.description}     
                    
                    </p>
                    <button onClick={() => editMember(member)}>Edit</button>
                    <button onClick={() => deleteMember(member)} >Delete</button>
                    
                    </div>
                    
                )
            })}
            {editedMember ? <Form member = {editedMember} updatedData={updatedData} insertedMember={insertedMember} /> : null}
         
        </div>
    )
}
export default Members