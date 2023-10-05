// Import required components from Chakra UI
import { Box, Text, VStack, HStack, Badge, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

// CredentialIssuerCard component
const ParticipantCard = ({ did, type, role }) => {
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const getParticipantInfo = async (did) => {
    let participantInfo = await axios.get(
      process.env.REACT_APP_CLOUD_API_IP +
        "/trust-registry/participant?did=" +
        did +
        "&type=" +
        type +
        "&role=" +
        role
    );

    if (participantInfo.data) {
      setVerified(true);
      participantInfo = participantInfo.data;
      setName(participantInfo.name);
      setLogo(participantInfo.logo);
    }
  };

  useEffect(() => {
    getParticipantInfo(did);
  }, []);

  return (
    <Box
      w="358px"
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
          <Badge colorScheme={verified ? "green" : "red"}>
            {verified ? "Yes" : "No"}
          </Badge>
        </HStack>
        {verified && (
          <>
            <HStack spacing={2}>
              <Text fontSize="lg" fontWeight="bold">
                Name:
              </Text>
              <Text fontSize="lg">{name}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text fontSize="lg" fontWeight="bold">
                Logo:
              </Text>
              <Image
                boxSize="32px"
                objectFit="cover"
                src={logo}
                alt="Dan Abramov"
              />
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ParticipantCard;
