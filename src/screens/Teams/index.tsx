import { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import Filter from "@components/Filter";
import Input from "@components/Input";
import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import EmptyList from "@components/EmptyList";
import ButtonIcon from "@components/ButtonIcon";
import PlayerCard from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export default function Teams() {
  const [team, setTeam] = useState<string>("time a");
  const [players, setPlayers] = useState<string[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <PlayerCard playerName={item.item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Não há pessoas nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Excluir Turma" type="SECONDARY" />
    </Container>
  );
}
