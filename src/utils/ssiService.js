import axios from "axios";

export const registerOrLogin = async (username, password) => {
    let response = await axios.post(process.env.REACT_APP_CLOUD_API_IP+`/login`, {
        username: username,
        password: password
    })

    return response.data.did
}


export const handleQR = async (decodedText) => {
    let result = await axios.get(decodedText)
    console.log('this was the data ', decodedText)
    console.log('this is the fetch result ', result.data)
    if(result.data.type === "Issue") return await handleIssuance(result.data)
    else if(result.data.type === "PresentationRequest") return await handlePresentationRequest(result.data)
    else throw Error("Invalid QR Code")

}

const handleIssuance = async (qrdata) => {

    // const response = await axios.get(process.env.REACT_APP_CLOUD_API_IP+"/dids/"+qrdata.data.issuer)
    // let res = response.data

    let issuer
    // if (response.status == 400){
        issuer = {
            'did': qrdata.data.issuer,
            'verified': false
        }
    // }else{
    //     issuer = res[0]
    // }

    return {
        issuer: issuer,
        cred: qrdata.data.credential
    }

}

const handlePresentationRequest = async (qrdata) => {

    // const response = await axios.get(process.env.REACT_APP_CLOUD_API_IP+"/dids/"+qrdata.data.verifier)
    // let res = response.data

    let verifier
    // if (response.status == 400){
        verifier = {
            'did': qrdata.data.verifier,
            'verified': false
        }
    // }else{
    //     verifier = res[0]
    // }

    return {
        verifier: verifier,
        credentialTypes: qrdata.data.credentialTypes,
        id: qrdata.data.id
    }

}

export const handlePresentationSubmission = async (did, request, jwts, claims=undefined) => {


    let body = {
        did: did,
        targetDID: request.verifier,
        credentials: jwts,
        claims: claims,
        id: request.id
    }


    const response = await axios.post(process.env.REACT_APP_CLOUD_API_IP+"/present", body)

    const result = response.data
    return result

}

export const getCredentials = async (did) => {
    //TODO
    let path = process.env.REACT_APP_CLOUD_API_IP+`/get-credentials/${did}`
    let response = await axios.get(path)

    let result = response.data
    return result
}

export const saveCredential = async (did, vc) => {

    let path = process.env.REACT_APP_CLOUD_API_IP+`/save`

    let body = {
        'did' : did,
        'vc' : vc
    }
    let response = await axios.post(path, body)

    return response.data
}

export const deleteCredential = async (did, vc) => {

    let path = process.env.REACT_APP_CLOUD_API_IP+`/delete`

    
    let body = {
        'did' : did,
        'vc' : vc
    }
    let response = await axios.post(path, body)

    return response.data
}
