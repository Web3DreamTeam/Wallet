import QRCodeButton from '../components/QrCodeButton';
import CredentialCards from '../components/cards/credentials/CredentialCards';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { RequireDid } from '../utils/RequireDid';

const CredentialPage = () => {
    const { credentials, setUpdate } = useContext(AppContext);
    const [ counter, setCounter] = useState(1)
    const [ header, setHeader ] = useState(null)

    RequireDid()

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
