// Import required components from Chakra UI
import { Box, Text, VStack, HStack, Badge, Image } from "@chakra-ui/react";
import React from "react";

// CredentialIssuerCard component
const ParticipantCard = ({ did, verified, participantInfo }) => {
  console.log(did);
  console.log(participantInfo);

  return (
    <Box
      w="100%"
      alignSelf="center"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="lg"
      color="#E0E0E0"
      bgColor="gray.700"
    >
      <VStack spacing={2} align="start">
        {!verified ? (
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              DID:
            </Text>
            <Text fontSize="lg">
              {did.split(":").pop().slice(0, 6) +
                "..." +
                did.split(":").pop().slice(-6)}
            </Text>
          </HStack>
        ) : (
          <HStack
            spacing={2}
            justifyContent="space-between"
            alignContent="center"
            w="100%"
          >
            <Text fontSize="lg" maxWidth={"70%"}>
              {participantInfo?.name}
            </Text>
            <Image
              boxSize="32px"
              objectFit="cover"
              src={participantInfo?.logo}
              alt="Dan Abramov"
            />
          </HStack>
        )}
        <HStack spacing={2}>
          <Text fontSize="lg" fontWeight="bold">
            Verified:
          </Text>
          <Badge colorScheme={verified ? "green" : "red"}>
            {verified ? "Yes" : "No"}
          </Badge>
        </HStack>
        {verified && <></>}
      </VStack>
    </Box>
  );
};

export default ParticipantCard;
