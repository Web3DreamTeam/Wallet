import React, {useState} from 'react';
import { Checkbox, Box, Center } from '@chakra-ui/react';
import CredentialCard from '../cards/CollapsableCredentialCard';
import CollapsableCredentialCard from '../cards/CollapsableCredentialCard';

const CredentialPicker = ({ credential, onToggle, handleAddClaim, isChecked }) => {


  return (
    <Center mt={4}>
      <Checkbox isChecked={isChecked} onChange={() => onToggle(credential)} mr={4} />
      <Box width="sm">
        <CollapsableCredentialCard
          myCredential={credential}
          isSelected={true}
          addClaim={handleAddClaim}
        />
      </Box>
    </Center>
  );
};

export default CredentialPicker;
