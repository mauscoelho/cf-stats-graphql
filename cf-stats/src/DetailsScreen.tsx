import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function DetailsScreen() {
  return (
    <View style={styles.center}>
      <Text>Hello 💪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
