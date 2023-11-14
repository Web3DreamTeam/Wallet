import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { Box, Button, VStack, Text, Collapse, Center, Flex, Spacer } from "@chakra-ui/react";
import CredentialPickers from "./CredentialPickers";
import VerifiedParticipantCard from "../cards/participants/VerifiedParticipantCard";
import TitleParticipantCard from "../cards/participants/TitleParticipantCard"
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
  const [claims, setClaims] = useState({});
  const [show, setShow] = useState({});

  const handleToggle = (credential) => {
    setSelectedCredentials((prevSelected) => {
      if (prevSelected.includes(credential)) {
        return prevSelected.filter((cred) => cred !== credential);
      } else {
        claims[credential.jwt] = []
        return [...prevSelected, credential];
      }
    });
  };

  const handleAddClaim = (vc, claim) => {

    let vcClaims = claims[vc]
    if (vcClaims === undefined){
      vcClaims = []
    }
    if (vcClaims.includes(claim)) {
      setClaims(prevClaims => ({
        ...prevClaims,
        [vc]: vcClaims.filter((existingItem) => existingItem !== claim)
      }))
    } else {
      setClaims(prevClaims => ({
        ...prevClaims,
        [vc]: [...vcClaims, claim]
      }));
    }
    console.log(vcClaims);
  };

  const handleCollapseToggle = (type) => {
    setShow((prevShow) => ({
      ...prevShow,
      [type]: !prevShow[type],
    }));
  };

  const titleToCamelCase = (str) => {
    console.log(str)
    return str
        .replace(/^./, firstChar => firstChar.toLowerCase())
        .replace(/ (\w)/g, (_, charAfterSpace) => charAfterSpace.toUpperCase());
  }


  const handleSendPresentation = async () => {
    //props.request.id
    console.log("Selected Credentials:", selectedCredentials);
    console.log("Selected Claims: ", claims);
    let selectedJwts = selectedCredentials.map((cred) => cred.jwt)
    let claimsArray = selectedJwts.map((jwt) => claims[jwt] || [])
    console.log(claimsArray)
    await handlePresentationSubmission(
      did,
      request,
      selectedJwts,
      claimsArray.map((claim) => claim.map(titleToCamelCase))
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

        <TitleParticipantCard
                      did={request.verifier}
                      role={"Verifier"}
                      w={"80%"}
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

        <VStack spacing={4} pb={24} w={"100vw"}>
          {Object.keys(credentialsByType).map((type) => (
            <Box key={type} width="full">
              <Flex onClick={() => handleCollapseToggle(type)} bg="gray.700" align="center" >
              <Text
                ml="1rem"
                as="b"
                color="#E0E0E0"
                p={2}
                cursor="pointer"
              >
                {type}
              </Text>
              <Spacer/>
              <Box mr="1rem">
                  <VerifiedParticipantCard
                      did={request.verifier}
                      role={"Verifier"}
                      type={type}
                      w={"100%"}
                      
                  />
                </Box>


              </Flex>
              
              
              <Collapse
                in={show[type] !== false}
                startingHeight={0}
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
