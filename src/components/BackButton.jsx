import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    console.log("clicked back")
    if (location.pathname === '/scan') {
      navigate('/home');
    } else if (location.pathname === '/issuance' || location.pathname === '/presentation') {
      navigate('/home');
    }
  };

  return (
    <IconButton
      icon={<ArrowBackIcon />}
      position="fixed"
      top="2"
      left="2"
      onClick={goBack}
      aria-label="Go Back"
    />
  );
};

export default BackButton;
