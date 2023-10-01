import { useLocation } from 'react-router-dom';
import { IssueCredential } from '../components/issue/IssueCredential';
import BackButton from '../components/BackButton';
import { HStack} from '@chakra-ui/react';

const IssuancePage = () => {
    const location = useLocation();
    const res = location.state.data;

    return (
        <HStack>
            <BackButton/>
            <IssueCredential request={res}/>
        </HStack>
    )

}

export default IssuancePage