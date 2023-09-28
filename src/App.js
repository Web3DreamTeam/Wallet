import {
  Button,
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { AppContextProvider } from "./AppContext";
import { Header } from "./components/Header";
import QrReader from 'react-qr-scanner'
import {useEffect, useState} from "react"
import { handleQR } from "./utils/ssiService";
import { IssueCredential } from "./components/issue/IssueCredential";
import PresentationRequest from "./components/presentation/PresentationRequest"

export const App = () => {
  const [issuer, setIssuer] = useState(undefined)
  const [data, setData] = useState(undefined)
  const [cred, setCred] = useState(undefined)
  const [scanned, setScanned] = useState(false)

  const handleSuccessfulScan = async (result) => {
    if(!scanned && result !== null){
      console.log(result)
      setData(result.text)
      setScanned(true)
    }

  }

  useEffect(() => {
    let updateCreds = async() => {
      let res = setCred(await handleQR(data))
      setScanned(false)
      
    }
    if(data !== undefined) updateCreds()
  }, [data])
  

  const handleError = (err) => {
    console.log("There is an error - ", err)
  }
  
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Header/>
        <div style={{marginTop:500}}>

        { cred === undefined ?
          <QrReader
          delay={100}
          style={{height:240, width:320}}
          onError={handleError}
          onScan={handleSuccessfulScan}
          facingMode={"rear"}
          />
          : <></>}
          {cred !== undefined && cred.hasOwnProperty('issuer') ? <IssueCredential request={cred} setCred={setCred}/> : <></>}
          {cred !== undefined && cred.hasOwnProperty('verifier') ? <PresentationRequest request={cred} setCred={setCred}/>: <></>}
        </div>
        
      </ChakraProvider>
    </AppContextProvider>
    
  
  )
}

export default App