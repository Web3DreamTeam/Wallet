import axios from "axios";


export const MY_DID = "did:ethr:maticmum:0x185A63F51cbE788FaDb2992e73113B0bF1F56344"

export const fetchContext = async () => {
    let credentials = await getCredentials()

    return {
        credentials: credentials.credentials,
        did: MY_DID
    }
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

export const handlePresentationSubmission = async (request, jwts, claims=undefined) => {


    let body = {
        did: MY_DID,
        targetDID: request.verifier,
        credentials: jwts,
        claims: claims,
        id: request.id
    }


    const response = await axios.post(process.env.REACT_APP_CLOUD_API_IP+"/present", body)

    const result = response.data
    return result

}

export const handleIssuanceSubmission = async (request) => {

    let body = {
        did: MY_DID,
        vc: request.cred,
    }


    const response = await axios.post(process.env.REACT_APP_CLOUD_API_IP+"/save", body)

    const result = response.data
    return result
}

export const getCredentials = async () => {
    //TODO
    let path = process.env.REACT_APP_CLOUD_API_IP+`/get-credentials/${MY_DID}`
    console.log(path)
    let response = await axios.get(path)

    let result = response.data
    return result
}

export const saveCredential = async (vc) => {

    let path = process.env.REACT_APP_CLOUD_API_IP+`/save`

    let body = {
        'did' : MY_DID,
        'vc' : vc
    }
    let response = await axios.post(path, body)

    return response.data
}
