import React, { useContext, useState } from 'react';
import { AppContext } from "../../AppContext"
import { Box, Button, VStack, Text, Collapse } from '@chakra-ui/react';
import CredentialPickers from './CredentialPickers';
import ParticipantCard from '../cards/ParticipantCard';
import { handlePresentationSubmission } from '../../utils/ssiService';

const PresentationRequest = ({request, setCred}) => {
  // Aggregate all credentials by type
  const { context, setContext, setUpdate } = useContext(AppContext)

  let creds = context.credentials
  let credentialsByType = {}
  request.credentialTypes.forEach(type => {
    credentialsByType[type] = creds.filter((cred) => cred.cred.vc.type.indexOf(type) !== -1)
  });

  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [claims, setClaims] = useState([])
  const [show, setShow] = useState({});


  const handleToggle = (credential) => {
    setSelectedCredentials((prevSelected) => {
      if (prevSelected.includes(credential)) {
        return prevSelected.filter((cred) => cred !== credential);
      } else {
        return [...prevSelected, credential];
      }
    });
  };

  const handleAddClaim = (claim) => {
    if (claims.includes(claim)) {
      setClaims(claims.filter(existingItem => existingItem !== claim));
    } else {
      setClaims([...claims, claim]);
    }
    console.log(claims)
  }

  const handleCollapseToggle = (type) => {
    setShow((prevShow) => ({
      ...prevShow,
      [type]: !prevShow[type],
    }));
  };

  const handleSendPresentation = async () => {
    //props.request.id
    console.log('Selected Credentials:', selectedCredentials);
    console.log('Selected Claims: ', claims)
    await handlePresentationSubmission(request, selectedCredentials.map((cred)=> cred.jwt), claims)
    setCred(undefined)
  };

  return (
     <Box>
    <h1>VERIFIER</h1>
    <ParticipantCard props = {request.verifier}/>
      <VStack spacing={4}>
        {Object.keys(credentialsByType).map((type) => (
            <Box key={type} width="full">
            <Text
                bg="blue.500"
                color="white"
                p={2}
                textAlign="center"
                onClick={() => handleCollapseToggle(type)}
                cursor="pointer"
            >
                {type}
            </Text>
            <Collapse in={show[type] !== false} startingHeight={20} animateOpacity>
                <CredentialPickers
                credentials={credentialsByType[type]}
                onToggle={handleToggle}
                selectedCredentials={selectedCredentials}
                handleAddClaim={handleAddClaim}
                />
            </Collapse>
            </Box>
        ))}
    </VStack>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleSendPresentation}
        position="fixed"
        bottom="0"
        right="0"
      >
        Send Presentation
      </Button>
    </Box>
  );
};

export default PresentationRequest;
