import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import * as S from "./styles";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetFilterGroup } from "@storage/player/playergetFilterGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type IRouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dataFilter = ["Time A", "Time B"];

  const router = useRoute();
  const navigation = useNavigation();

  const { group } = router?.params as IRouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

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

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName("");
      fetchPlayersTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert("Nova pessoa", "N??o foi poss??vel adicionar a pessoa");
      }
    }
  }

  async function fetchPlayersTeam() {
    try {
      setIsLoading(true);
      const playersTeam = await playerGetFilterGroup(group, team);

      setPlayers(playersTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Nova pessoa", "N??o foi poss??vel carregar as pessoas");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Remover pessoa", error.message);
      } else {
        Alert.alert("Remover pessoa", "N??o foi poss??vel remover a pessoa");
      }
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Remover grupo", error.message);
      } else {
        Alert.alert("Remover grupo", "N??o foi poss??vel remover o grupo");
      }
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover grupo", "Deseja realmente remover a turma?", [
      {
        text: "N??o",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
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
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </S.Form>

      <S.HeaderList>
        {isLoading ? (
          <Loading />
        ) : (
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
        )}

        <S.NumberPlayers>{players.length}</S.NumberPlayers>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="N??o h?? pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover turma"
        type="secondary"
        onPress={handleRemoveGroup}
      />
    </S.Container>
  );
}
