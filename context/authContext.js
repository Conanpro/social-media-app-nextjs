import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider
} from "@apollo/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [authToken, setAuthToken] = useState(Cookie.get("token"));

  const isSignedIn = () => {
    if (!!authToken) {
      return true;
    }
    return false;
  };

  const signOut = () => {
    Cookie.remove("token");
    setAuthToken(Cookie.get("token"));
  };

  useEffect(() => {
    if (!!authToken) {
      Cookie.set("token", authToken || "");
    } else return;
  }, [authToken]);

  const getAuthHeaders = () => {
    if (!!authToken)
      return {
        authorization: authToken
      };

    return null;
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'https://social-media-nextjs-app.herokuapp.com/graphql',
      headers: getAuthHeaders()
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link
    });
  };

  return {
    isSignedIn,
    setAuthToken,
    signOut,
    createApolloClient
  };
};
