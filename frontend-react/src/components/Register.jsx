import React, { useState } from 'react'
import axios from 'axios'
const register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)

    const userData = {
      username,
      email,
      password
    }

   try{
    const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
    console.log('Registration successful:', response.data)
    setError({})
    setSuccess(true)

   }catch(error){
    setError(error.response.data)
    console.error('Error during registration:', error.response.data)
   } finally {
    setLoading(false)
   }
  }
  
  return (
<> 
<div className='container mt-5'>
  <div className='row justify-content-center'>
    <div className='col-md-100 mt-100 bg-dark p-5 rounded shadow-lg text-light text-center mb-4'>
         <h3 className='text-center text-light'>create account</h3>
         <form onSubmit={handleRegistration}>
              <input type="text" className='form-control mb-3' placeholder="enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <small className='text-danger'>{error.username}</small>
              <input type="email" className='form-control mb-3' placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <small className='text-danger'>{error.email}</small>
              <input type="password" className='form-control mb-3' placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <small className='text-danger'>{error.password}</small>
              {success && <p className='text-success'>Registration successful!</p>}
              {loading ? (
                <button type="submit" className='btn btn-info d-block mx-auto' disabled>Registering...</button>
              ) : (
                <button type="submit" className='btn btn-info d-block mx-auto'>Register</button>
              )}
         </form>
      
    </div>
  </div>
</div>
        
    </>

  )
}

export default register