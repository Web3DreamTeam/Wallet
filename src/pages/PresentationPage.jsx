import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PresentationRequest from "../components/presentation/PresentationRequest"
import { HStack} from '@chakra-ui/react';

const PresentationPage = () => {
    const location = useLocation();
    const res = location.state.data;

    return (
        <HStack h="full" w="full" overflow={"hidden"}>
            <BackButton/>
            <PresentationRequest request={res}/>
        </HStack>
        
    )


}

export default PresentationPage