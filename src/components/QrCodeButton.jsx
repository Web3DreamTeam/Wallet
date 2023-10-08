import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, HStack, Text } from '@chakra-ui/react';
import { FaQrcode } from 'react-icons/fa';
import { AppContext } from '../AppContext';

const QRCodeButton = () => {
  const navigate = useNavigate();
  const { setUpdate } = useContext(AppContext);

  const navigateToScan = () => {
    navigate('/scan');
  };

  return (
    <HStack>


      <Text
        fontSize='4xl'
        as='b'
        color="#E0E0E0"
        align='left'
        marginLeft='1.5rem'
        marginTop='1rem'
        font-family= '-apple-system-headline'
        onClick={() => setUpdate(upd => !upd)}
      >Wallet</Text>


      <IconButton 
        onClick={navigateToScan}
        icon={<FaQrcode />} // Using the QR code icon here
        isRound // Making the button round
        float='right'
        marginLeft='12.5rem'
        bg="#E0E0E0"
        marginTop='1rem'
        aria-label="Open QR Scanner" 
      />
    </HStack>
    
  );
};

export default QRCodeButton;
