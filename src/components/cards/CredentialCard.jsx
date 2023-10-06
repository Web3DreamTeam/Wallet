import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

let width = "358px";
let height = "226px";

const CredentialCard = (props) => {
  return (
    <Box
      mb={4}
      maxW="md"
      width={width}
      minHeight={height}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.600"
      overflow="hidden"
      p={4}
      shadow="xl"
      bgColor="gray.700"
      color="#E0E0E0"
      transform="perspective(500px) rotateX(2deg)"
      _hover={{
        transform: "perspective(500px) rotateX(0deg)",
      }}
    >
      <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold">
          {props.cred.vc.type[1]}
        </Text>
        {Object.keys(props.cred.vc.credentialSubject).map((key, index) => (
          <Text key={index}>
            {/* Convert key from camelCase to Title Case for label */}
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            : {props.cred.vc.credentialSubject[key]}
          </Text>
        ))}
        <Text>
          <Text as="span" fontWeight="bold">
            Expiry Date:{" "}
          </Text>
          {new Date(props.cred.expiryDate).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default CredentialCard;
