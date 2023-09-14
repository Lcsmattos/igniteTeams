import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "@components/Input";
import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";

import { Content, Container, Icon } from "./styles";

export default function NewGroups() {
  const [teamName, setTeamName] = useState<string>("");

  const navigate = useNavigation();

  function handleTeams() {
    navigate.navigate("teams", { group: teamName });
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

        <Input placeholder="Nome da Turma" onChangeText={setTeamName} />

        <Button title="Criar" style={{ marginTop: 10 }} onPress={handleTeams} />
      </Content>
    </Container>
  );
}
