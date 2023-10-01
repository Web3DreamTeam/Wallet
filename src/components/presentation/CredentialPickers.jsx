import React from 'react';
import CredentialPicker from './CredentialPicker';
import { VStack,Center } from '@chakra-ui/react';

const CredentialPickers = ({ credentials, onToggle, handleAddClaim, selectedCredentials }) => {
  return (
    <Center  w='full' h='full' ml={8} mt={4}>
    <VStack spacing={4}>
      {credentials.map((credential, index) => (
        <CredentialPicker
          key={index}
          credential={credential}
          onToggle={onToggle}
          isChecked={selectedCredentials.includes(credential)}
          handleAddClaim={handleAddClaim}
        />
      ))}
    </VStack>
    </Center>
  );
};

export default CredentialPickers;
