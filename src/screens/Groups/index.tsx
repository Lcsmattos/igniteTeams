import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import EmptyList from "@components/EmptyList";
import GroupCard from "@components/GroupCard";

import { getAllGroups } from "@storage/groups/groupsGetAll";

import { Container } from "./styles";

export default function Groups() {
	const [groups, setGroups] = useState<string[]>([]);

	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			fetchGroups();
		}, [])
	);

	function handleNewGroup() {
		navigation.navigate("new");
	}

	async function fetchGroups() {
		try {
			const data = await getAllGroups();

			setGroups(data);
			return;
		} catch (error) {
			console.log(error);
		}
	}

	function handleOpenGroup(group: string) {
		navigation.navigate("players", { group });
	}

	return (
		<Container>
			<Header />

			<Highlight title="Turmas" subTitle="jogue com a sua turma" />
			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<GroupCard
						title={item}
						onPress={() => handleOpenGroup(item)}
					/>
				)}
				contentContainerStyle={groups.length === 0 && { flex: 1 }}
				ListEmptyComponent={() => (
					<EmptyList message="Ninguem por aqui ainda, inicie a primeira turma ;)" />
				)}
			/>
			<Button title="Nova Turma" onPress={handleNewGroup} />
		</Container>
	);
}
