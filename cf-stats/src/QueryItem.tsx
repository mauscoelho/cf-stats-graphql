import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Title } from "react-native-paper";

export default function QueryItem({ id, name, photo, country, affiliate }) {
  return (
    <View style={styles.container}>
      <Avatar.Image source={{ uri: photo }} />
      <View style={styles.right}>
        <Title>{name}</Title>
        <Text>{affiliate}</Text>
        <Text>{country}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row"
  },
  right: {
    padding: 10
  }
});
