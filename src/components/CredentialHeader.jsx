import React, { useState, useRef } from 'react';
import {
  HStack,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const CredentialHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleDelete = () => {
    props.deleteCredential();
    onClose();
  };

  return (
    <HStack alignContent="left">
      

      {/* AlertDialog for deletion confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Credential
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this credential?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Done Button */}
      <Text
        onClick={props.handleBack}
        background="none"
        color="#E0E0E0"
        fontSize='4xl'
        as='b'
        align='left'
        marginLeft='1.5rem'
        marginTop='1rem'
        font-family= '-apple-system-headline'
      >
        Done
      </Text>

      <IconButton
        icon={<FaTrash />}
        w={6}
        h={9}
        isRound // Making the button round
        float='right'
        marginLeft='13.5rem'
        marginTop='1rem'
        bg="#E0E0E0"
        onClick={() => setIsOpen(true)}
      />
    </HStack>
  );
};

export default CredentialHeader;
