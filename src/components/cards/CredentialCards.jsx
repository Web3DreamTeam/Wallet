// Import required components from Chakra UI
import {useState, useEffect} from "react"
import {
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import CollapsableCredentialCard from './CollapsableCredentialCard';

  
  // WalletCards component
  const CredentialCards = (props) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [onlyCard, setOnlyCard] = useState(null)


    let maxheight = 200
    let increment = maxheight/(props.credentials.length-1)

    const max = (a,b) => {
      if(a>b) return a
      return b
    }

    const handleSetOnlyCard = (idx) => {
      setSelectedCard(null)
      setOnlyCard(idx)
    }

    

    return (
        <div style={{ position: 'relative', marginTop: 200, border:5}}>
        {props.credentials.map((credential, index) => {
            console.log(index)
            console.log('card', onlyCard)
            if(onlyCard !== null && onlyCard !== index) return <div key={index}/>

            return (<div 
                key={index} 
                style={{ 
                    position: 'absolute',
                    zIndex: props.credentials.length - index,
                    marginTop: onlyCard !== null ? max(-200 - index*5, -220) : selectedCard === null ? index * -(increment) : selectedCard <= index ? max(-200 - index*5, -220) : 0,
                    transition: 'margin-top 0.4s ease',
                    width: 300
                }}
                onClick={() => {if(onlyCard === null) setSelectedCard(selectedCard === index ? null : index)}}
                >
            <CollapsableCredentialCard
                key={index}
                index={index}
                myCredential={credential}
                onlyCard={onlyCard}
                setOnlyCard={handleSetOnlyCard}
                isSelected={index === selectedCard || index == onlyCard} 
            />
          </div>)
        })}
      </div>
    );
  };
  
  export default CredentialCards;
  