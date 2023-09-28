// Import required components from Chakra UI
import {
    Box,
    Text,
    Flex,
    VStack,
    IconButton,
    Tooltip,
    Circle,
    HStack
  } from '@chakra-ui/react';
  import { ChevronDownIcon, ChevronUpIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import ParticipantCard from './ParticipantCard';
  import React, {useState} from 'react';
  
  // WalletCard component
  const CollapsableCredentialCard = (props) => {
    const [showAll, setShowAll] = useState(false);

    const fields = Object.keys(props.myCredential.cred.vc.credentialSubject).map((key, index) => {
      if(key == '_sd'){
        return Object.keys(props.myCredential.disclosed).map((_key,_index) => {
          return <HiddenField 
          key={_index} 
          fieldName={_key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} 
          fieldValue={props.myCredential.disclosed[_key]}
          isDisabled={!props.isSelected}
          addClaim={props.hasOwnProperty('addClaim') ? props.addClaim : ()=>{}}
          /> 
        })
      
      }else{
        return <Field
          key={index} 
          fieldName={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} 
          fieldValue={props.myCredential.cred.vc.credentialSubject[key]}
          />
      }
      
    });

    fields.push(<Text>
      <Text as="span" fontWeight="bold">Expiry Date: </Text>
      {new Date(props.myCredential.cred.expiryDate).toLocaleDateString()}
    </Text>)

    let did = props.myCredential.cred.iss
    let verified = true

    return (
      <Box
      maxW="md"
      width="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="xl"
      bgColor="gray.700"
      color="white"
      transform="perspective(500px) rotateX(2deg)"
      transition="transform 0.3s ease-in-out"
      _hover={{
        transform: "perspective(500px) rotateX(0deg)"
      }}
      >
        <VStack spacing={4} align="start">
          <Text fontSize="xl" fontWeight="bold">
            {props.myCredential.cred.vc.type[1]}
          </Text>

          <Box position="absolute" right="2" top="2">
          <Tooltip label={<ParticipantCard did={did} verified={verified}/>} placement="left-start" hasArrow>
            <Circle size="20px" bg={verified ? 'green.500' : 'red.500'} />
          </Tooltip>
        </Box>
          {showAll ? fields : fields.slice(0, 2)}
          <Flex justify="center" width="full" mt={2}>
          <IconButton 
            aria-label="Toggle Fields"
            size="sm" 
            variant="ghost"
            color="white"
            _hover={{bg:'none'}}
            onClick={() => {
              setShowAll(!showAll)
              if(props.hasOwnProperty('onlyCard')) props.setOnlyCard(props.onlyCard === props.index ? null : props.index)
            }}
            icon={showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
          />
          </Flex>
          
        </VStack>
      </Box>
    );
  };

  const HiddenField = ({ fieldName, fieldValue, isDisabled, addClaim }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleEyeClick = (e) => {
      // Stop event propagation here
      console.log(e)
      addClaim(fieldName)
      e.stopPropagation();
      setIsVisible(!isVisible);
    };
  
    return (
        <HStack width="full" justifyContent="space-between">
          <Text wordWrap="break-word">
            {isVisible ? `${fieldName}:  ` : '••••••••:  \n'}
            {isVisible ? fieldValue : '••••••••'}
          </Text>
          <IconButton
            aria-label="Toggle Field Visibility"
            size="sm"
            icon={isVisible ? <ViewIcon /> : <ViewOffIcon />}
            onClick={handleEyeClick}
            variant="ghost"
            color="white"
            _hover={{ bg: 'none' }}
            isDisabled={isDisabled}
          />
        </HStack>
      );
    };

    const Field = ({ fieldName, fieldValue }) => {
  
    
      return (
          <VStack width="full" justifyContent="space-between" align="left">
            <Text wordWrap="break-word">
              {fieldName}:{'  '}{fieldValue}
            </Text>
          </VStack>
        );
      };
  
  export default CollapsableCredentialCard;
  