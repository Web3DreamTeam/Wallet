import React, { createContext, useState, useEffect } from 'react';
import { getCredentials } from './utils/ssiService.js';

// Initial Context

let defaultContext = {
        credentials: [],
        did: ""
}

const AppContext = createContext(defaultContext);

const AppContextProvider = ({children}) => {
  const [did, setDid] = useState(localStorage.getItem('userDid') || "")
  const [credentials, setCredentials] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    // Fetch context and set it to state
    const fetchAndSetCredentials = async () => {
      try {
          let creds = (await getCredentials(did)).credentials
          console.log("trying to grab creds", creds)
          setCredentials(creds)
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchAndSetCredentials();
  }, [update, did]);


  return (
    // Provide the state as context value
    <AppContext.Provider value={{did, setDid, credentials, setCredentials, setUpdate}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
