import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, HStack, Text } from '@chakra-ui/react';
import { FaQrcode } from 'react-icons/fa';

const QRCodeButton = () => {
  const navigate = useNavigate();

  const navigateToScan = () => {
    navigate('/scan');
  };

  return (
    <HStack>


      <Text
        fontSize='4xl'
        as='b'
        align='left'
        marginLeft='1.5rem'
        marginTop='1rem'
        font-family= '-apple-system-headline'
      >Wallet</Text>


      <IconButton 
        onClick={navigateToScan}
        icon={<FaQrcode />} // Using the QR code icon here
        isRound // Making the button round
        float='right'
        marginLeft='12.5rem'
        marginTop='1rem'
        aria-label="Open QR Scanner" 
      />
    </HStack>
    
  );
};

export default QRCodeButton;
