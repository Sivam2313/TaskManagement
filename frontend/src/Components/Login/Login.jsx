import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { token, loginUser} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if(token){
            navigate('/');
        }
    }, [token])
    
    const loginHandler = async ()=>{
        const formData = { email, password };
        const data = await loginUser(formData)
    }
  return (
    <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
    >
        <Stack>
            <TextField id="outlined-basic" onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" />
            <TextField id="outlined-basic" onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" />
            <Button variant="contained" onClick={loginHandler}>Login</Button>
        </Stack>
    </Box>
  )
}

export default Login