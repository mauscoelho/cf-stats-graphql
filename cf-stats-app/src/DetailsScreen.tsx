import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import AthleteHeader from "./AthleteHeader";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

type Props = {
  route: DetailsScreenRouteProp;
};

const ATHLETE_DETAIL = gql`
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

export default function DetailsScreen(props: Props) {
  const { loading, error, data } = useQuery(ATHLETE_DETAIL, {
    variables: { id: props.route.params.id }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={styles.main}>
      <AthleteHeader athlete={data.athlete}></AthleteHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 20
  }
});
