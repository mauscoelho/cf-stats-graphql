import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Searchbar, Title } from "react-native-paper";
import QueryList from "./QueryList";
import { getFollowingAthletes, followAthlete } from "./store";

export default function HomeScreen() {
  const [query, setQuery] = React.useState("");
  const [followingIds, setFollowingIds] = React.useState([]);

  useEffect(() => {
    async function getData() {
      const ids = await getFollowingAthletes();
      setFollowingIds(ids);
    }
    getData();
  }, []);

  async function onFollow(id) {
    setFollowingIds([id, ...followingIds]);
    await followAthlete(id);
  }

  return (
    <View style={styles.home}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setQuery(query)}
        value={query}
      />
      {query ? (
        <QueryList
          query={query}
          followingIds={followingIds}
          onFollow={id => onFollow(id)}
        ></QueryList>
      ) : (
        <View>
          <Title>My Athletes</Title>
          {followingIds.map(id => (
            <Text>{id}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1
  }
});
