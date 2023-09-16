import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Input from "@components/Input";
import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";

import { AppError } from "@utils/AppError";

import { groupCreate } from "@storage/groups/groupCreate";

import { Content, Container, Icon } from "./styles";

export default function NewGroups() {
	const [teamName, setTeamName] = useState<string>("");

	const navigate = useNavigation();

	async function handlePlayers() {
		try {
			if (teamName.length === 0) {
				return Alert.alert("Novo Grupo", "Informe o nome da turma.");
			}
			await groupCreate(teamName);
			navigate.navigate("players", { group: teamName });
		} catch (error) {
			if (error instanceof AppError) {
				Alert.alert("Novo Grupo", error.message);
			} else {
				Alert.alert(
					"Novo Grupo",
					"Não foi possivel criar um novo grupo."
				);
			}
		}
	}

	return (
		<Container>
			<Header showBackButton />

			<Content>
				<Icon />

				<Highlight
					title="Nova Turma"
					subTitle="crie uma turma para adicionar pessoas"
				/>

				<Input
					placeholder="Nome da Turma"
					onChangeText={setTeamName}
					autoCorrect={false}
				/>

				<Button
					title="Criar"
					style={{ marginTop: 10 }}
					onPress={handlePlayers}
				/>
			</Content>
		</Container>
	);
}
