import { useContext, useState } from "react"
import { AppContext } from "../AppContext"
import CredentialCards from "./cards/CredentialCards"

export const Header = () => {
    const { context, setContext } = useContext(AppContext)
    
    return (
        <>
           <h1>{context.did}</h1>
           <CredentialCards credentials={context.credentials}/>
        </>
    )
}