import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const navigate = useNavigate()
    
    // console.log(name)
      const handleSubmit = ()=>{

        let userData = {
            name,
            email,
            password,
            username,
            mobile: "98765xxxxx",
            description: "A Transformation in education!" 
          }
        fetch(`https://masai-api-mocker.herokuapp.com/auth/register`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-Type": "application/json"}
        }).then((res) => navigate('/login'))
            // .then((res) => res.json())
            // .then((res) => console.log(res))
        .catch((err) => console.log(err))
      }
    return (
        <>
        <div>
        <br /> 
            <hr />
            <label><input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Your Name"/></label>
            <br /> <br />
            <label><input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email"/></label>
            <br /> <br />
            <label><input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"/></label>
            <br /> <br />
            <label><input type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter Your Username"/></label>
            <br /><br />
            <button onClick={handleSubmit}>Register</button>
            
        </div>
        
        </>
    )
}