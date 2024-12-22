import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [Name,setName] = useState('');
  const [Price,setPrice] = useState('');
  const [Details,setDetails] = useState([]);
  const [NewName,setNewName] = useState('');
  const [NewPrice,setNewPrice] = useState('');

 
  const addData = () => {
    if(Name!=='' && Price!==''){
    Axios.post('http://localhost:7500/insert',{
      Name:Name,
      Price:Price
    })
    alert("Data inserted")
  }
  else{
  alert("Please enter both fields");
  }
    setName('');
    setPrice('');  
}

    useEffect(()=>{
      Axios.get('http://localhost:7500/read').then((res)=>{setDetails(res.data)})
  },[])
    
    const updated = (id)=>{
      if(NewName!=='' && NewPrice!==''){
      Axios.put('http://localhost:7500/update',{
        id:id,
        NewName:NewName,
        NewPrice:NewPrice
    })
      alert('Details updated');
   }
    else{
      alert('Please update both fields');
    }
 }
  
 const deleted = (id) => {
  Axios.delete(`http://localhost:7500/delete/${id}`)
  alert("Item deleted");
 }
  return (
    <>
    <div className='box'>
      <h1>CRUD operation</h1>
     <div className='box1'>
      <label name='name'>Name</label>
      <input type='text' name='name' value={Name} placeholder='Enter food name' onChange={(e)=>setName(e.target.value)}/>
      <label name='price'>Price</label>
      <input name='price' type='number' value={Price} placeholder='Enter price of food' onChange={(e)=>setPrice(e.target.value)}/>
      <button onClick={addData}>submit</button>
      </div>
      <div className='box2'>
        {Details.map((value,i)=>{
          return(
            <div className='box3'>
              <div className='box4'>
              <h3>Food Name : {value.Name}</h3>
              <h3>Food Price : {value.Price}</h3>
            </div>
            <div className='box4'>
            <input type='text'  placeholder='Edit food name' onChange={(e)=>setNewName(e.target.value)}/>
            <input type='number' placeholder='Edit price' onChange={(e)=>setNewPrice(e.target.value)}/>
              <button onClick={()=>{updated(value._id)}}>Edit</button>
              <button onClick={()=>{deleted(value._id)}}>Delete</button>
            </div>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default App;