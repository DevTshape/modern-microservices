import Router from "next/router";

export const registerUser = async ( email: string, password: string) => {
    const res = await fetch("http://localhost:5000/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
    const { access_token, refresh_token } = await res.json();
    if(access_token && refresh_token){
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
        return true;
    } else {
        return false
    }
}
export const userLogin = async ( email: string, password: string) => {
    const res = await fetch("http://localhost:5000/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
    const { access_token, refresh_token } = await res.json();
    if(access_token && refresh_token){
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
        return true;
    } else {
        return false
    }
}

export const logout = async () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    Router.push("/")
}