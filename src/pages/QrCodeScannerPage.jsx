import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner'
import { useState } from "react"
import { handleQR } from "../utils/ssiService";
import BackButton from '../components/BackButton';
import { VStack } from '@chakra-ui/react';

const QrCodeScannerPage = () => {
    const navigate = useNavigate();
    const [scanned, setScanned] = useState(false)

    const handleSuccessful = async (result) => {
        if (!scanned && result !== null) {
            let res = await handleQR(result.text)
            if (Object.prototype.hasOwnProperty.call(res, 'issuer')) navigate('/issuance', {state:{ data: res }});
            if (Object.prototype.hasOwnProperty.call(res, 'verifier')) navigate('/presentation', {state:{ data: res }});
            setScanned(true)
        }
    }

    const handleError = (err) => {
        console.log("There is an error - ", err)
    }

    return (
        <VStack>
        <BackButton />
        <QrReader
            delay={100}
            style={{ height: 500, width: 500, align: "center", marginTop: 100 }}
            onError={handleError}
            onScan={handleSuccessful}
            facingMode={"rear"}
        />
        </VStack>
        
    )

}

export default QrCodeScannerPage