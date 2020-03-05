import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const ATHLETES = gql`
  query GetAthletes($name: String!) {
    athletes(name: $name) {
      id
      name
      affiliate
    }
  }
`;

export default function QueryList({ query }) {
  const { loading, error, data } = useQuery(ATHLETES, {
    variables: { name: query },
    skip: !query
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      {data &&
        data.athletes.map(item => <Text key={item.id}>{item.name}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
