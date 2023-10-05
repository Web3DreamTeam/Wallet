import { VStack, Button, Stack, Text, Center } from "@chakra-ui/react";
import { saveCredential } from "../../utils/ssiService";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import jwt_decode from "jwt-decode";
import ParticipantCard from "../cards/ParticipantCard";
import CredentialCard from "../cards/CredentialCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const IssueCredential = ({ request }) => {
  const { did, setUpdate } = useContext(AppContext);
  const toast = useToast();
  const navigate = useNavigate();
  const cred = jwt_decode(request.cred);

  const handleAccept = async () => {
    await saveCredential(did, request.cred);
    setUpdate((upd) => !upd);
    navigate("/home");
    toast({
      title: "Credential Added",
      description: "The credential has been added to your wallet",
      status: "success",
      duration: 5000, // duration of the toast
      isClosable: true,
    });
  };

  const handleReject = () => {
    navigate("/home");
    toast({
      title: "Credential Rejected",
      description: "The credential was not added to your wallet",
      status: "failure",
      duration: 5000, // duration of the toast
      isClosable: true,
    });
  };

  return (
    <Center w="full" h="50rem">
      <VStack>
        <Text
          fontSize="2xl"
          as="b"
          align="left"
          marginLeft="1.5rem"
          marginTop="1rem"
          font-family="-apple-system-headline"
          color="#E0E0E0"
        >
          Issuer
        </Text>

        <ParticipantCard
          did={request.issuer}
          role="Issuer"
          type={cred.vc.type[1]}
        />

        <Text
          fontSize="2xl"
          as="b"
          align="left"
          marginLeft="1.5rem"
          marginTop="1rem"
          font-family="-apple-system-headline"
          color="#E0E0E0"
        >
          Credential Preview
        </Text>

        <CredentialCard cred={cred} />
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" size="md" onClick={handleReject}>
            Reject
          </Button>
          <Button colorScheme="teal" size="md" onClick={handleAccept}>
            Accept
          </Button>
        </Stack>
      </VStack>
    </Center>
  );
};
