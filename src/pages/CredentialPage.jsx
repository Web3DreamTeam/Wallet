import QRCodeButton from '../components/QrCodeButton';
import CredentialCards from '../components/cards/CredentialCards';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

const CredentialPage = () => {
    const { credentials, setUpdate } = useContext(AppContext);
    const [ counter, setCounter] = useState(1)
    const [ header, setHeader ] = useState(null)

    useEffect(() => {
        setInterval(setUpdate(upd => !upd), 5000*counter);
        setCounter(cntr => cntr*1.2)
      }, []);


    return (
        <div>
            {header === null ? <QRCodeButton /> : header}
            <CredentialCards credentials={credentials} setHeader={setHeader} />
        </div>
    );
};

export default CredentialPage 
