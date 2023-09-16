import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayersStoredDTO } from "./DTO/PlayesStoredDTO";
import { playersList } from "./playersList";
import { AppError } from "@utils/AppError";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";

export async function playersAdd(newPlayer: PlayersStoredDTO, group: string) {
	try {
		const playersStored = await playersList(group);

		const playerAlreadyExists = playersStored.filter(
			(item) => item.name === newPlayer.name
		);

		if (playerAlreadyExists.length > 0) {
			throw new AppError("Essa pessoa já está em um time.");
		}

		const store = JSON.stringify([...playersStored, newPlayer]);

		await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, store);
	} catch (error) {
		throw error;
	}
}
