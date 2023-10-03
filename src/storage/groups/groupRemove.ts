import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYERS_COLLECTION } from "@storage/storageConfig";

import { getAllGroups } from "./groupsGetAll";

export async function groupRemove(groupName: string) {
	try {
		const storedGroups = await getAllGroups();

		const groupFilter = storedGroups.filter((group) => group !== groupName);

		const storage = JSON.stringify(groupFilter);

		await AsyncStorage.setItem(GROUP_COLLECTION, storage);
		await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupName}`);
	} catch (error) {
		throw error;
	}
}
