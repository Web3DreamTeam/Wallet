// Import required components from Chakra UI
import { Box, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import React, { useState } from "react";
// import axios from "axios";

// CredentialIssuerCard component
const VerifiedParticipantCard = ({ w = "100%" }) => {
  const [verified] = useState(false);

  // const getParticipantInfo = async (_did) => {
  //   let res = await axios.get(
  //     process.env.REACT_APP_CLOUD_API_IP +
  //       "/trust-registry/participant?did=" +
  //       _did +
  //       "&type=" +
  //       type +
  //       "&role=" +
  //       role
  //   );

  //   if (res.data) {
  //     setVerified(true);
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

export default VerifiedParticipantCard;
