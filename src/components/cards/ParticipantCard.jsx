// Import required components from Chakra UI
import {
    Box,
    Text,
    VStack,
    HStack,
    Badge,
  } from '@chakra-ui/react';
  import React from 'react';
  
  // CredentialIssuerCard component
  const ParticipantCard = ({ did, verified }) => {
    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        shadow="lg"
      >
        <VStack spacing={2} align="start">
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              DID:
            </Text>
            <Text fontSize="lg">{did}</Text>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Verified:
            </Text>
            <Badge colorScheme={verified ? 'green' : 'red'}>
              {verified ? 'Yes' : 'No'}
            </Badge>
          </HStack>
        </VStack>
      </Box>
    );
  };
  
  export default ParticipantCard;
  