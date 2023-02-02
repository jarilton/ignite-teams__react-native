import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerGetByGroup(group: string) {
  try {
    const player = await AsyncStorage.getItem(`${PLAYER_COLLECTION}:${group}`);
    return player ? (JSON.parse(player) as PlayerStorageDTO[]) : [];
  } catch (error) {
    throw error;
  }
}
