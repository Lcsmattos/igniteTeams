import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import EmptyList from "@components/EmptyList";
import GroupCard from "@components/GroupCard";

import { Container } from "./styles";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>(["bLA", "bla"]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subTitle="jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <EmptyList message="Ninguem por aqui ainda, inicie a primeira turma ;)" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />
      <Button title="Nova Turma" onPress={handleNewGroup} />
    </Container>
  );
}
