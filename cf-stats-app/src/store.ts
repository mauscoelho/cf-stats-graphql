import { AsyncStorage } from "react-native";
import { Item } from "react-native-paper/lib/typescript/src/components/List/List";

const STORE_MY_ATHLETES = "@cf:athletes";

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

export async function unfollowAthlete(id) {
  const jsonIds = await AsyncStorage.getItem(STORE_MY_ATHLETES);
  if (jsonIds) {
    const ids: string[] = JSON.parse(jsonIds);
    const newIds = ids.filter(item => item !== id);
    await AsyncStorage.setItem(STORE_MY_ATHLETES, JSON.stringify([...newIds]));
  } else {
    throw new Error(`Error on unfollowing Athlete ${id}`);
  }
}

export async function getFollowingAthletes() {
  const jsonIds = await AsyncStorage.getItem(STORE_MY_ATHLETES);
  return jsonIds ? JSON.parse(jsonIds) : [];
}
