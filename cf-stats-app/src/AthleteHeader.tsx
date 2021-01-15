import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Title } from "react-native-paper";

interface Props {
  athlete: any;
}

export default function AthleteHeader({ athlete }: Props) {
  return (
    <View style={styles.main}>
      <View style={styles.leftContainer}>
        <Avatar.Image source={{ uri: athlete.photo }} />
      </View>

      <View style={styles.middleContainer}>
        <Title>{`${athlete.name}`}</Title>
        <Text>
          {athlete.affiliate}
          <Text
            style={styles.bold}
          >{` #${athlete.stats[0].affiliateRank}`}</Text>
        </Text>
        <Text
          style={styles.bold}
        >{`${athlete.countryEmoji} #${athlete.stats[0].countryRank}`}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text>Worldwide</Text>
        <Title style={styles.bold}>#{athlete.stats[0].worldWideRank}</Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
  },
  bold: { fontWeight: "bold" },
  middleContainer: {
    marginLeft: 30,
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
