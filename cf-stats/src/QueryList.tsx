import React from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import QueryItem, { QueryItemProps } from "./QueryItem";

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

  const athletes: QueryItemProps[] =
    data?.athletes.map(item => ({
      ...item,
      following: isFollowing(item.id)
    })) || [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={athletes}
        renderItem={item => (
          <QueryItem key={item.item.id} {...item.item} onFollow={onFollow} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10
  },
  container: {
    flex: 1
  }
});
