import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import QueryItem from "./QueryItem";

const ATHLETES = gql`
  query GetAthletes($name: String!) {
    athletes(name: $name) {
      id
      name
      affiliate
      photo
      country
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
      {data?.athletes.map(item => (
        <QueryItem key={item.id} {...item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});
