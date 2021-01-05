import React, { useState } from 'react'
import { userLogin } from '../../api/auth'
import LoginForm from '../../components/LoginForm'
import Router from "next/router";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton
  } from "@chakra-ui/react"

export default function Login() {
    const [err, setErr] = useState(null)
    
    const loginUser = async (email: string, password: string) => {
        const isAuthenticated = await userLogin(email, password)
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
        <LoginForm loginUser={loginUser} />        
        </>
    )
}
