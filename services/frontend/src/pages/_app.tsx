import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

import Layout from "../components/layout";

import customTheme from "../styles/customTheme";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const [token, setToken] = useState(false)
    useEffect(() => {
    if(localStorage.getItem("access_token")) {
      setToken(true)
    } else {
      setToken(false)
    }
  }, [localStorage.getItem("access_token")])

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset/>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Layout isAuthenticated={token}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
