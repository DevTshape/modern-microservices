import React, { useState } from 'react'
import { registerUser } from '../../api/auth'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton
  } from "@chakra-ui/react"
import RegisterForm from '../../components/RegisterForm';

export default function Register() {
    const [err, setErr] = useState(null)
    const registerHandler = async (email: string, password: string) => {
        const isAuthenticated = await registerUser(email, password)
        if(!isAuthenticated){
            setErr("Invalid username or password. Please try again.")
        }
    }
    return (
        <>
        {err ? 
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{err}</AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setErr(null)} />
            </Alert>
        : <></>}
        <RegisterForm onSubmit={registerHandler} />
        </>
    )
}
