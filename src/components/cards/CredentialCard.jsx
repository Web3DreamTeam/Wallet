import React from 'react';
import { Box, Text, VStack, } from '@chakra-ui/react';

const CredentialCard = (props) => {

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      p={4}
      mb={4}
      width="full"
    >
    <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold">
            {props.cred.vc.type[1]}
        </Text>
      {Object.keys(props.cred.vc.credentialSubject).map((key, index) => (
        <Text key={index}>
          {/* Convert key from camelCase to Title Case for label */}
          {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:{' '}
          {props.cred.vc.credentialSubject[key]}
        </Text>
      ))}
      <Text>Expiry Date: {props.cred.expiryDate}</Text>
    </VStack>  
    </Box>
  );
};

export default CredentialCard;
