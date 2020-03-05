import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import QueryList from "./QueryList";

export default function HomeScreen() {
  const [query, setQuery] = React.useState("");

  return (
    <View style={styles.home}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setQuery(query)}
        value={query}
      />
      <QueryList query={query}></QueryList>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1
  }
});
