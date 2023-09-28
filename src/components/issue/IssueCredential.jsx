
import { Box, Button, Stack } from '@chakra-ui/react';
import { saveCredential } from "../../utils/ssiService"
import { useContext, useState } from "react"
import { AppContext } from "../../AppContext"
import jwt_decode from "jwt-decode";
import ParticipantCard from "../cards/ParticipantCard";
import CredentialCard from "../cards/CredentialCard";

export const IssueCredential = ({request, setCred}) => {
    const { context, setContext, setUpdate } = useContext(AppContext)

    const handleAccept = async () => {
        await saveCredential(request.cred)
        setCred(undefined)
        setUpdate(upd => !upd)
        

    }

    const handleReject = () => {
        setCred(undefined)
    }

    return (
        <Box>
            <h1>ISSUER</h1>
            <ParticipantCard props = {request.issuer}/>
            <h1>Credential Preview</h1>
            <CredentialCard cred={jwt_decode(request.cred)} />
            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='md' onClick={handleReject}>
                    Reject
                </Button>
                <Button colorScheme='teal' size='md' onClick={handleAccept}>
                    Accept
                </Button>
            </Stack>
        
        </Box>
    )

}