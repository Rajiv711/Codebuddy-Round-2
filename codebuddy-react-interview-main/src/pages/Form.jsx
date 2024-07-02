import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Form1 from '../components/Form1';
import Form2 from '../components/Form2';
import Form3 from '../components/Form3';
const Form = () => {
 
  const navigate=useNavigate();
  useEffect(()=>{
    navigate("/form1")
  },[])
 
  return (
    <>
    {false&&
    <><Form1 />
      <Form2  />
     <Form3  />
     </>
     }
   
     </>
  )
}

export default Form