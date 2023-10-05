import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import { AppContextProvider } from "./AppContext";
import MyRouter from "./utils/MyRouter"
import axios from "axios";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "black",
      },
    }),
  },
});

export const App = () => {  
  axios.get(process.env.REACT_APP_CLOUD_API_IP+'/health')

  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <MyRouter/>
      </ChakraProvider>
    </AppContextProvider>
    
  
  )
}

export default App