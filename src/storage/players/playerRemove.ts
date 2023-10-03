import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersListByGroup } from "./playersListByGroup";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";

export async function playerRemove(playerName: string, group: string) {
	try {
		const playersStored = await playersListByGroup(group);

		const filtered = playersStored.filter(
			(player) => player.name !== playerName
		);

		const storage = JSON.stringify(filtered);

		await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage);
	} catch (error) {
		throw error;
	}
}
