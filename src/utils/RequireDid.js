import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext'; 

export function RequireDid() {
    const { did } = useContext(AppContext);
    const navigate = useNavigate();

    console.log(did)
    if (did === "") {
      navigate('/');
      return null;
    }
}
