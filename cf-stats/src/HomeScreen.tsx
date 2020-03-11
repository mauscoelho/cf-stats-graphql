import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Searchbar, Title } from "react-native-paper";
import QueryList from "./QueryList";
import { getFollowingAthletes, followAthlete, unfollowAthlete } from "./store";
import Athlete from "./Athlete";

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

  async function onUnfollow(id) {
    const newIds = followingIds.filter(item => item !== id);
    setFollowingIds([...newIds]);
    await unfollowAthlete(id);
  }

  function renderContainer() {
    if (query) {
      return (
        <QueryList
          query={query}
          followingIds={followingIds}
          onFollow={id => onFollow(id)}
        ></QueryList>
      );
    }
    if (followingIds.length) {
      return (
        <View>
          <Title>My Athletes</Title>
          {followingIds.map(id => (
            <Athlete id={id} onUnfollow={onUnfollow} />
          ))}
        </View>
      );
    }

    return (
      <View style={styles.center}>
        <Text>Search and follow an Athlete to start 💪</Text>
      </View>
    );
  }

  return (
    <View style={styles.home}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setQuery(query)}
        value={query}
      />
      {renderContainer()}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  home: {
    flex: 1
  }
});
