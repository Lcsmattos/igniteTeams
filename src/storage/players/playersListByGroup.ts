import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayersStoredDTO } from "./DTO/PlayesStoredDTO";

export async function playersListByGroup(group: string) {
	try {
		const stored = await AsyncStorage.getItem(
			`${PLAYERS_COLLECTION}-${group}`
		);

		const players: PlayersStoredDTO[] = stored ? JSON.parse(stored) : [];

		return players;
	} catch (error) {
		throw error;
	}
}
