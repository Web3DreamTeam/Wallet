// Import required components from Chakra UI
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
// import axios from "axios";

// CredentialIssuerCard component
const TitleParticipantCard = ({ did, w = "100%" }) => {
  const [verified] = useState(false);
  const [participantInfo] = useState({});

  // const getParticipantInfo = async (_did) => {
  //   let query =
  //     process.env.REACT_APP_CLOUD_API_IP +
  //     "/trust-registry/participant?did=" +
  //     _did +
  //     "&role=" +
  //     role;

  //   if (type !== undefined) query += "&type=" + type;
  //   let res = await axios.get(query);

  //   if (res.data) {
  //     setVerified(true);
  //     setParticipantInfo(res.data);
  //   }
  // };

  // useEffect(() => {
  //   getParticipantInfo(did);
  // }, []);

  return (
    <Box
      w={w}
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
      </VStack>
    </Box>
  );
};

export default TitleParticipantCard;
