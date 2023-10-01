import React, { useContext, useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import { registerOrLogin } from '../utils/ssiService';

const LoginPage = () => {
  const { did, setDid } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    let did = await registerOrLogin(username, password); // Replace with real username and password
    setDid(did)
    navigate('/home');
  };

  if (did) {
    navigate('/home');
    return null;
  }

  return (
    <Box p={4}>
      <FormControl id="username" mb={4}>
        <FormLabel>Username</FormLabel>
        <Input 
          type="text" 
          placeholder="Enter your username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} // Update username state variable on change
        />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input 
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state variable on change
        />
      </FormControl>
      <Button onClick={handleLogin} colorScheme="blue">
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
