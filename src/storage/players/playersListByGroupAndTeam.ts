import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayersStoredDTO } from "./DTO/PlayesStoredDTO";

export async function playersListByGroupAndTeam(group: string, team: string) {
	try {
		const stored = await AsyncStorage.getItem(
			`${PLAYERS_COLLECTION}-${group}`
		);

		const players: PlayersStoredDTO[] = stored ? JSON.parse(stored) : [];

		const filter = players.filter((item) => item.team === team);

		return filter;
	} catch (error) {
		throw error;
	}
}
