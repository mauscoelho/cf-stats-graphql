import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Title, Button } from "react-native-paper";
import { followAthlete } from "./store";

export default function QueryItem({
  id,
  name,
  photo,
  countryEmoji,
  affiliate
}) {
  async function onFollow() {
    await followAthlete(id);
  }

  return (
    <View style={styles.container}>
      <Avatar.Image source={{ uri: photo }} />
      <View style={styles.dataContainer}>
        <Title>{name}</Title>
        <Text>{affiliate}</Text>
        <Text>{countryEmoji}</Text>
      </View>
      <Button mode="contained" onPress={onFollow}>
        Follow
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row"
  },
  dataContainer: {
    flex: 1,
    padding: 10
  }
});
