import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayersStoredDTO } from "./DTO/PlayesStoredDTO";
import { playersListByGroup } from "./playersListByGroup";
import { AppError } from "@utils/AppError";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";

export async function playersAdd(newPlayer: PlayersStoredDTO, group: string) {
	try {
		const playersStored = await playersListByGroup(group);

		const playerAlreadyExists = playersStored.filter(
			(item: PlayersStoredDTO) => item.name === newPlayer.name
		);

		if (playerAlreadyExists.length > 0) {
			throw new AppError("Essa pessoa já está em um time.");
		}

		const storage = JSON.stringify([...playersStored, newPlayer]);

		await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage);
	} catch (error) {
		throw error;
	}
}
