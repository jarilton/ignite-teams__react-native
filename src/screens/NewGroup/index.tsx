import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { useState } from "react";
import { Alert } from "react-native";
import * as S from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handlePlayers() {
    if (group.trim().length === 0) {
      return Alert.alert("Novo Grupo", "Informe o nome da turma");
    }

    try {
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
        console.log(error);
      }
    }
  }

  return (
    <S.Container>
      <Header ShowBackButton />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handlePlayers}
        />
      </S.Content>
    </S.Container>
  );
}
