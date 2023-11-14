import React from 'react';
import { Checkbox, Box, HStack } from '@chakra-ui/react';
import CollapsableCredentialCard from '../cards/credentials/CollapsableCredentialCard';

const CredentialPicker = ({ credential, onToggle, handleAddClaim, isChecked }) => {


  const innerHandleAddClaim = (claim) => {
    console.log(credential.jwt, claim)
    handleAddClaim(credential.jwt, claim)
  }

  return (

      <HStack>
        <Checkbox isChecked={isChecked} onChange={() => onToggle(credential)} p={4}/>
        <Box width="sm">
          <CollapsableCredentialCard
            myCredential={credential}
            isSelected={true}
            addClaim={innerHandleAddClaim}
            presentation={true}
          />
        </Box>

      </HStack>
  );
};

export default CredentialPicker;
