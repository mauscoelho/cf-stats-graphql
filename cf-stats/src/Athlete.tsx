import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

export default function Athlete({ id, onUnfollow }) {
  const { loading, error, data } = useQuery(ATHLETE, {
    variables: { id }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Avatar.Image source={{ uri: data.athlete.photo }} />
        <View style={styles.dataContainer}>
          <Title>{data.athlete.name}</Title>
          <Text>{data.athlete.affiliate}</Text>
          <Text>{data.athlete.countryEmoji}</Text>
        </View>
        <Button mode="outlined" onPress={() => onUnfollow(id)}>
          Unfollow
        </Button>
      </View>
      <View style={styles.overviewContainer}>
        {data.athlete.stats.map(stat => (
          <View style={styles.overview}>
            <Text>{`${stat.name} ${stat.year}`}</Text>
            <Text>{`🌎 ${stat.worldWideRank}`}</Text>
            <Text>
              {stat.countryRank
                ? `${data.athlete.countryEmoji} ${stat.countryRank}`
                : `🤔`}
            </Text>
            <Text>
              {stat.affiliateRank ? `📦 ${stat.affiliateRank}` : `🤔`}
            </Text>
            <Button>Workouts</Button>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  },
  container: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row"
  },
  dataContainer: {
    flex: 1,
    padding: 10
  },
  overviewContainer: {},
  overview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  }
});
