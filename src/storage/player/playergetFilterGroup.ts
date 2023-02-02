import { playerGetByGroup } from "./playerGetByGroup";

export async function playerGetFilterGroup(group: string, team: string) {
  try {
    const storage = await playerGetByGroup(group);

    const filtered = storage.filter((player) => player.team === team);

    return filtered;
  } catch (error) {
    throw error;
  }
}
