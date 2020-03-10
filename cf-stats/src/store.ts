import { AsyncStorage } from "react-native";

const STORE_MY_ATHLETES = "@cfstats:athletes";

export async function followAthlete(id) {
  try {
    const jsonIds = await AsyncStorage.getItem(STORE_MY_ATHLETES);

    if (jsonIds) {
      const ids = JSON.parse(jsonIds);
      await AsyncStorage.setItem(
        STORE_MY_ATHLETES,
        JSON.stringify([...ids, id])
      );
    } else {
      await AsyncStorage.setItem(STORE_MY_ATHLETES, JSON.stringify([id]));
    }
  } catch (error) {
    throw new Error(`Error on following new Athlete ${id}`);
  }
}
