import React from 'react';
import { Checkbox, Box, HStack } from '@chakra-ui/react';
import CollapsableCredentialCard from '../cards/CollapsableCredentialCard';

const CredentialPicker = ({ credential, onToggle, handleAddClaim, isChecked }) => {


  return (

      <HStack>
        <Checkbox isChecked={isChecked} onChange={() => onToggle(credential)} p={4}/>
        <Box width="sm">
          <CollapsableCredentialCard
            myCredential={credential}
            isSelected={true}
            addClaim={handleAddClaim}
            presentation={true}
          />
        </Box>

      </HStack>
  );
};

export default CredentialPicker;
