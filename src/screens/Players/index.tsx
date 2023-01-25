import { useState } from "react";
import { FlatList } from "react-native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import * as S from "./styles";

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState(["Jamal", "Rodrigo"]);

  const dataFilter = ["Time A", "Time B"];

  return (
    <S.Container>
      <Header ShowBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={dataFilter}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <S.NumberPlayers>{players.length}</S.NumberPlayers>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
      />
    </S.Container>
  );
}
