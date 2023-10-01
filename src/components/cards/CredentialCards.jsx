// Import required components from Chakra UI
  import {useState, useContext} from "react"
  import React from 'react';
  import CollapsableCredentialCard from './CollapsableCredentialCard';
  import { Flex } from "@chakra-ui/react"
  import { AppContext } from '../../AppContext';
  import CredentialHeader from "../CredentialHeader"
  import { deleteCredential as delCred } from "../../utils/ssiService";

  
  // WalletCards component
  const CredentialCards = (props) => {
    if(props.credentials.length == 0) return <></>
    const { did, setUpdate } = useContext(AppContext)
    
    const [selectedCard, setSelectedCard] = useState(null);
    const [onlyCard, setOnlyCard] = useState(null)

    const handleSetOnlyCard = (idx) => {
      setOnlyCard(idx)
    }

    const handleBack = () => {
      setSelectedCard(null)
      setOnlyCard(null)
      props.setHeader(null)
    }

    const deleteCredential = async () => {
      await delCred(did, props.credentials[onlyCard].jwt)
      setOnlyCard(null)
      props.setHeader(null)
      setUpdate(upd => !upd)
    }

    let showableCreds = props.credentials
    // if (onlyCard !== null){
    //   console.log("we're cutting down ", onlyCard)
    //   showableCreds = props.credentials.slice(onlyCard, props.credentials.length)
    // }

    //marginTop: onlyCard !== null ? max(-200 - index*5, -220) : selectedCard === null ? index * -(increment) : selectedCard <= index ? max(-200 - index*5, -220) : 0,
    
    let increment = 80 //spacing between cards
    if (props.credentials.length > 5) increment*Math.log(props.credentials.length)
    const calcMargin = (index) => {
      //When we have selected a card
      if(selectedCard !== null){
        //Push all cards above it up
        if (selectedCard <= index){
          return -(index*5)+30
          //Push all cards below it down
        } else {
          return -(index*5)+500
        }
      } else {
        return -(index * increment)-60+increment*props.credentials.length
      }
    }

    return (
        <Flex direction="column" align="center">

        {/* {onlyCard !== null ? 
          <div 
            key={-onlyCard} 
            style={{ 
                position: 'absolute',
                marginTop: -(onlyCard*5)+40,
                transition: 'margin-top 0.4s ease',
            }}>
            
            <CollapsableCredentialCard
              key={-onlyCard}
              index={onlyCard}
              myCredential={props.credentials[onlyCard]}
              onlyCard={onlyCard}
              setOnlyCard={handleSetOnlyCard}
              isSelected={true} 
            />
            </div>
        
        : }*/

        showableCreds.map((credential, index) => {
            console.log(index)
            console.log('card', selectedCard)

            return (<div 
                key={index} 
                style={{ 
                    position: 'absolute',
                    zIndex: props.credentials.length - index,
                    marginTop: calcMargin(index),
                    transition: 'margin-top 0.4s ease',
                }}
                onClick={() => {
                  if(onlyCard === null){
                    console.log("clicking card with onlyCard ", onlyCard)
                    if(selectedCard === index){
                      setSelectedCard(null)
                      props.setHeader(null)
                    }else {
                      props.setHeader(<CredentialHeader handleBack={handleBack} deleteCredential={deleteCredential} />)
                      setSelectedCard(index)
                    }
                  }
                  
                }}
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
        </Flex>
    );
  };
  
  export default CredentialCards;
  