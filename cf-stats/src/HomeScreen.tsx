import React, { useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import { Searchbar, Title } from "react-native-paper";
import QueryList from "./QueryList";
import { getFollowingAthletes, followAthlete, unfollowAthlete } from "./store";
import HomeItem from "./HomeItem";

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = React.useState("");
  const [followingIds, setFollowingIds] = React.useState<string[]>([]);

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

  function onPress(id) {
    navigation.navigate("Details");
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
        <SafeAreaView style={styles.container}>
          <FlatList
            data={followingIds}
            renderItem={item => (
              <HomeItem id={item.item} onPress={() => onPress(1)} />
            )}
            keyExtractor={item => item}
          />
        </SafeAreaView>
      );
    }

    return (
      <View style={styles.center}>
        <Text>Search and follow an Athlete to start 💪</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
