import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import * as S from "./styles";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetFilterGroup } from "@storage/player/playergetFilterGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type IRouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const dataFilter = ["Time A", "Time B"];

  const router = useRoute();

  const { group } = router?.params as IRouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova pessoa", "Digite o nome do jogador");
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      fetchPlayersTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert("Nova pessoa", "Não foi possível adicionar a pessoa");
      }
    }
  }

  async function fetchPlayersTeam() {
    try {
      const playersTeam = await playerGetFilterGroup(group, team);

      setPlayers(playersTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Nova pessoa", "Não foi possível carregar as pessoas");
    }
  }

  useEffect(() => {
    fetchPlayersTeam();
  }, [team]);

  return (
    <S.Container>
      <Header ShowBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="secondary" />
    </S.Container>
  );
}
