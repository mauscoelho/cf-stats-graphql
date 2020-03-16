import React from "react";
import ApolloClient from "apollo-boost";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/react-hooks";
import HomeScreen from "./src/HomeScreen";
import DetailsScreen from "./src/DetailsScreen";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: "https://yb6kxdnd81.execute-api.us-east-1.amazonaws.com/dev/graphql"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
