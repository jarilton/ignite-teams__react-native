import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const groups = await groupsGetAll();

    const filtered = groups.filter((group) => group !== groupDeleted);
    const groupsStorage = JSON.stringify(filtered);

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsStorage);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}:${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
