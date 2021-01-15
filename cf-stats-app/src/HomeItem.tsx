import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Title, Button } from "react-native-paper";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import AthleteHeader from "./AthleteHeader";

const HOME_ITEM = gql`
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
  const { loading, error, data } = useQuery(HOME_ITEM, {
    variables: { id }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <TouchableOpacity
      onPress={() => onPress(data.athlete.name, data.athlete.id)}
    >
      <View style={styles.main}>
        <AthleteHeader athlete={data.athlete}></AthleteHeader>
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
  }
});
