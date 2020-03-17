import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Title, Button } from "react-native-paper";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const ATHLETE = gql`
  query GetAthlete($id: String!) {
    athlete(id: $id) {
      id
      name
      affiliate
      photo
      countryEmoji
      stats {
        name
        year
        worldWideRank
        affiliateRank
        countryRank
      }
    }
  }
`;

export default function HomeItem({ id, onPress }) {
  const { loading, error, data } = useQuery(ATHLETE, {
    variables: { id }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <TouchableOpacity
      onPress={() => onPress(data.athlete.name, data.athlete.id)}
    >
      <View style={styles.main}>
        <View style={styles.leftContainer}>
          <Avatar.Image source={{ uri: data.athlete.photo }} />
        </View>

        <View style={styles.middleContainer}>
          <Title>{`${data.athlete.name}`}</Title>
          <Text>
            {data.athlete.affiliate}
            <Text
              style={styles.bold}
            >{` #${data.athlete.stats[0].affiliateRank}`}</Text>
          </Text>
          <Text
            style={styles.bold}
          >{`${data.athlete.countryEmoji} #${data.athlete.stats[0].countryRank}`}</Text>
        </View>

        <View style={styles.rightContainer}>
          <Text>Worldwide</Text>
          <Title style={styles.bold}>
            #{data.athlete.stats[0].worldWideRank}
          </Title>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row"
  },
  bold: { fontWeight: "bold" },
  middleContainer: {
    flex: 1,
    marginLeft: 30
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});
