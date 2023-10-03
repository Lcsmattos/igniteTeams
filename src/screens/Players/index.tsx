import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { playersAdd } from "@storage/players/playersAdd";
import { playerRemove } from "@storage/players/playerRemove";
import { PlayersStoredDTO } from "@storage/players/DTO/PlayesStoredDTO";
import { playersListByGroupAndTeam } from "@storage/players/playersListByGroupAndTeam";
import { groupRemove } from "@storage/groups/groupRemove";

import Filter from "@components/Filter";
import Input from "@components/Input";
import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import EmptyList from "@components/EmptyList";
import ButtonIcon from "@components/ButtonIcon";
import PlayerCard from "@components/PlayerCard";

import { AppError } from "@utils/AppError";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
	group: string;
};

export default function Players() {
	const [newPlayerName, setNewPlayerName] = useState<string>("");
	const [team, setTeam] = useState<string>("time a");
	const [players, setPlayers] = useState<PlayersStoredDTO[]>([]);

	const route = useRoute();
	const { group } = route.params as RouteParams;
	const navigate = useNavigation();

	const newPlayerNameInputRef = useRef<TextInput>(null);

	useEffect(() => {
		fetchPlayersByTeam();
	}, [team]);

	async function handleAddPlayer() {
		if (newPlayerName.trim().length < 1) {
			return Alert.alert(
				"Nome do Jogador!",
				"Por Favor, preencha o nome do Jogador."
			);
		}

		const newPlayer: PlayersStoredDTO = {
			name: newPlayerName,
			team,
		};

		try {
			await playersAdd(newPlayer, group);

			newPlayerNameInputRef.current?.blur();

			setNewPlayerName("");

			fetchPlayersByTeam();
		} catch (error) {
			if (error instanceof AppError) {
				return Alert.alert(error.message);
			} else {
				return Alert.alert(
					"Nome do Jogador!",
					"Não foi possível adicionar o jogador."
				);
			}
		}
	}

	async function fetchPlayersByTeam() {
		try {
			const players = await playersListByGroupAndTeam(group, team);

			setPlayers(players);
		} catch (error) {
			if (error instanceof AppError) {
				return Alert.alert(error.message);
			} else {
				return Alert.alert(
					"Jogadores",
					"Não foi possível carregar os jogadores deste time."
				);
			}
		}
	}

	async function handlePlayerRemove(playerName: string) {
		try {
			await playerRemove(playerName, group);

			fetchPlayersByTeam();
		} catch (error) {
			console.log(error);
			Alert.alert(
				"Remover Jogador!",
				"Não foi possível remover este Jogador."
			);
		}
	}

	async function groupRemoveByName(groupName: string) {
		try {
			await groupRemove(groupName);

			navigate.navigate("groups");
			return;
		} catch (error) {
			console.log(error);
			Alert.alert(
				"Remover Grupo!",
				"Não foi possível remover este grupo."
			);
		}
	}

	async function handleGroupRemove() {
		Alert.alert(
			"Remover Grupo",
			"Tem certeza que deseja remover este grupo?",
			[
				{
					text: "Não",
					style: "cancel",
				},
				{
					text: "Sim",
					onPress: () => groupRemoveByName(group),
				},
			]
		);
	}

	return (
		<Container>
			<Header showBackButton />

			<Highlight
				title={group}
				subTitle="adicione a galera e separe os times"
			/>

			<Form>
				<Input
					inputRef={newPlayerNameInputRef}
					placeholder="Nome"
					autoCorrect={false}
					onChangeText={setNewPlayerName}
					value={newPlayerName}
					onSubmitEditing={handleAddPlayer}
					returnKeyType="done"
				/>
				<ButtonIcon icon="add" onPress={handleAddPlayer} />
			</Form>

			<HeaderList>
				<FlatList
					horizontal
					data={["time a", "time b"]}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === team}
							onPress={() => {
								setTeam(item);
							}}
						/>
					)}
				/>
				<NumberOfPlayers>{players.length}</NumberOfPlayers>
			</HeaderList>

			<FlatList
				data={players}
				keyExtractor={(item) => item.name}
				renderItem={(item) => (
					<PlayerCard
						playerName={item.item.name}
						onRemove={() => handlePlayerRemove(item.item.name)}
					/>
				)}
				ListEmptyComponent={() => (
					<EmptyList message="Não há pessoas nesse time." />
				)}
				contentContainerStyle={[
					{ paddingBottom: 100 },
					players.length === 0 && { flex: 1 },
				]}
			/>

			<Button
				title="Excluir Turma"
				type="SECONDARY"
				onPress={handleGroupRemove}
			/>
		</Container>
	);
}
