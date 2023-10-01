import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { AppContextProvider } from "./AppContext";
import MyRouter from "./utils/MyRouter"

export const App = () => {  
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <MyRouter/>
      </ChakraProvider>
    </AppContextProvider>
    
  
  )
}

export default App