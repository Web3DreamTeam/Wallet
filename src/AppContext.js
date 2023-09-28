import React, { createContext, useState, useEffect } from 'react';
import { fetchContext } from './utils/ssiService.js';

// Initial Context

let defaultContext = {
    context: {
        credentials: [],
        did: ""
    },
    setContext: (auth) => {}
}

const AppContext = createContext(defaultContext);


const AppContextProvider = ({children}) => {
  const [context, setContext] = useState(defaultContext.context);
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    // Fetch context and set it to state
    const fetchAndSetContext = async () => {
      try {
        const context = await fetchContext();
        setContext(context);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchAndSetContext();
  }, [update]);

  return (
    // Provide the state as context value
    <AppContext.Provider value={{context, setContext, setUpdate}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
