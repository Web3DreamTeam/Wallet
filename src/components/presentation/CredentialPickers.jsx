import React from 'react';
import CredentialPicker from './CredentialPicker';
import { VStack } from '@chakra-ui/react';

const CredentialPickers = ({ credentials, onToggle, handleAddClaim, selectedCredentials }) => {
  return (
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
  );
};

export default CredentialPickers;
