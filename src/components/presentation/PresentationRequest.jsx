import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { Box, Button, VStack, Text, Collapse, Center } from "@chakra-ui/react";
import CredentialPickers from "./CredentialPickers";
import ParticipantCard from "../cards/ParticipantCard";
import { handlePresentationSubmission } from "../../utils/ssiService";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const PresentationRequest = ({ request }) => {
  // Aggregate all credentials by type
  const { did, credentials } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();

  let creds = credentials;
  let credentialsByType = {};
  request.credentialTypes.forEach((type) => {
    credentialsByType[type] = creds.filter(
      (cred) => cred.cred.vc.type.indexOf(type) !== -1
    );
  });

  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [claims, setClaims] = useState([]);
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
      setClaims(claims.filter((existingItem) => existingItem !== claim));
    } else {
      setClaims([...claims, claim]);
    }
    console.log(claims);
  };

  const handleCollapseToggle = (type) => {
    setShow((prevShow) => ({
      ...prevShow,
      [type]: !prevShow[type],
    }));
  };

  const handleSendPresentation = async () => {
    //props.request.id
    console.log("Selected Credentials:", selectedCredentials);
    console.log("Selected Claims: ", claims);
    await handlePresentationSubmission(
      did,
      request,
      selectedCredentials.map((cred) => cred.jwt),
      claims
    );
    navigate("/home");
    toast({
      title: "Success",
      description: "Your Presentation has been sent to the verifier",
      status: "success",
      duration: 5000, // duration of the toast
      isClosable: true,
    });
  };

  return (
    <Center w="full" h="full">
      <VStack>
        <Text
          fontSize="2xl"
          as="b"
          marginTop="1rem"
          color="#E0E0E0"
          font-family="-apple-system-headline"
        >
          Verifier
        </Text>

        <ParticipantCard
          did={request.verifier}
          role="Verifier"
          type={credentials[0].cred.vc.type[1]}
        />

        <Text
          fontSize="2xl"
          as="b"
          marginTop="1rem"
          color="#E0E0E0"
          font-family="-apple-system-headline"
        >
          Choose Credentials
        </Text>

        <VStack spacing={4} pb={24}>
          {Object.keys(credentialsByType).map((type) => (
            <Box key={type} width="full">
              <Text
                bg="blue.500"
                color="#E0E0E0"
                p={2}
                textAlign="center"
                onClick={() => handleCollapseToggle(type)}
                cursor="pointer"
              >
                {type}
              </Text>
              <Collapse
                in={show[type] !== false}
                startingHeight={20}
                animateOpacity
              >
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
          colorScheme="teal"
          onClick={handleSendPresentation}
          position="fixed"
          bottom="10"
        >
          Send Presentation
        </Button>
      </VStack>
    </Center>
  );
};

export default PresentationRequest;
