// Import required components from Chakra UI
import {
  Box,
  Text,
  Flex,
  VStack,
  IconButton,
  Circle,
  HStack,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import ParticipantCard from "./ParticipantCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

// WalletCard component
const CollapsableCredentialCard = (props) => {
  const [showAll, setShowAll] = useState(false);
  const [verified, setVerified] = useState(false);
  const [participantInfo, setParticipantInfo] = useState({});

  if (!props.isSelected && showAll) setShowAll(false);

  let width = "358px";
  let height = "226px";
  if (Object.prototype.hasOwnProperty.call(props, "presentation")) {
    width = "320px";
    height = "202px";
  }

  const getParticipantInfo = async (did) => {
    let res = await axios.get(
      process.env.REACT_APP_CLOUD_API_IP +
        "/trust-registry/participant?did=" +
        did +
        "&type=" +
        props.myCredential.cred.vc.type[1] +
        "&role=Issuer"
    );

    if (res.data) {
      setVerified(true);
      setParticipantInfo(res.data);
    }
  };

  useEffect(() => {
    getParticipantInfo(props.myCredential.cred.iss);
  }, []);

  const fields = Object.keys(props.myCredential.cred.vc.credentialSubject).map(
    (key, index) => {
      if (key == "_sd") {
        return Object.keys(props.myCredential.disclosed).map((_key, _index) => {
          return (
            <HiddenField
              key={_index}
              fieldName={_key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              fieldValue={props.myCredential.disclosed[_key]}
              isDisabled={!props.isSelected}
              addClaim={
                Object.prototype.hasOwnProperty.call(props, "addClaim")
                  ? props.addClaim
                  : () => {}
              }
            />
          );
        });
      } else {
        return (
          <Field
            key={index}
            fieldName={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            fieldValue={props.myCredential.cred.vc.credentialSubject[key]}
          />
        );
      }
    }
  );

  fields.push(
    <Text>
      <Text as="span" fontWeight="bold">
        Expiry Date:{" "}
      </Text>
      {new Date(props.myCredential.cred.expiryDate).toLocaleDateString()}
    </Text>
  );

  fields.push(
    <>
      <Text
        fontSize="l"
        fontWeight="bold"
        font-family="-apple-system-headline"
        color="#E0E0E0"
      >
        Issued By:
      </Text>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          color="#E0E0E0"
          justifyContent="center"
          w="90%"
        >
          <ParticipantCard
            did={props.myCredential.cred.iss}
            verified={verified}
            participantInfo={participantInfo}
          />
        </Box>
      </div>
    </>
  );

  return (
    <Box
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
      transition="transform 0.3s ease-in-out"
      _hover={{
        transform: "perspective(500px) rotateX(0deg)",
      }}
    >
      <VStack spacing={4} align="start">
        <HStack justifyContent="space-between" w="100%">
          <Text
            fontSize="xl"
            fontWeight="bold"
            font-family="-apple-system-headline"
            color="#E0E0E0"
          >
            {props.myCredential.cred.vc.type[1]}
          </Text>

          <Circle size="20px" bg={verified ? "green.500" : "red.500"} />
        </HStack>

        {showAll ? fields : fields.slice(0, 2)}

        {props.isSelected ? (
          <Flex justify="center" width="full" mt={2}>
            <IconButton
              aria-label="Toggle Fields"
              size="sm"
              variant="ghost"
              color="#E0E0E0"
              _hover={{ bg: "none" }}
              onClick={(e) => {
                setShowAll(!showAll);
                e.stopPropagation();
                // if(Object.prototype.hasOwnProperty.call(props,'onlyCard')){
                //   if(props.onlyCard !== props.index) props.setOnlyCard(props.index)
                // }
              }}
              icon={showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
            />
          </Flex>
        ) : (
          <></>
        )}
      </VStack>
    </Box>
  );
};

const HiddenField = ({ fieldName, fieldValue, isDisabled, addClaim }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleEyeClick = (e) => {
    // Stop event propagation here
    console.log(e);
    addClaim(fieldName);
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <HStack width="full" justifyContent="space-between">
      <Text wordWrap="break-word" font-family="-apple-system-headline">
        {isVisible ? `${fieldName}:  ` : "••••••••:  \n"}
        {isVisible ? fieldValue : "••••••••"}
      </Text>
      <IconButton
        aria-label="Toggle Field Visibility"
        size="sm"
        icon={isVisible ? <ViewIcon /> : <ViewOffIcon />}
        onClick={handleEyeClick}
        variant="ghost"
        color="#E0E0E0"
        _hover={{ bg: "none" }}
        isDisabled={isDisabled}
      />
    </HStack>
  );
};

const Field = ({ fieldName, fieldValue }) => {
  return (
    <VStack width="full" justifyContent="space-between" align="left">
      <Text wordWrap="break-word" font-family="-apple-system-headline">
        {fieldName}:{"  "}
        {fieldValue}
      </Text>
    </VStack>
  );
};

export default CollapsableCredentialCard;
