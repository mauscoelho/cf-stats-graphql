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
      countryEmoji
    }
  }
`;

export default function QueryList({ query, followingIds, onFollow }) {
  const { loading, error, data } = useQuery(ATHLETES, {
    variables: { name: query },
    skip: !query
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  function isFollowing(id) {
    return followingIds.find(item => item === id);
  }

  const athletes =
    data?.athletes.map(item => ({
      ...item,
      following: isFollowing(item.id)
    })) || [];

  return (
    <View style={styles.container}>
      {athletes.map(item => (
        <QueryItem key={item.id} {...item} onFollow={onFollow} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
