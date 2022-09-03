import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
