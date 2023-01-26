import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import * as S from "./styles";

export function NewGroup() {
  const navigation = useNavigation();

  function handlePlayers() {
    navigation.navigate("Players", { group: "new" });
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
        <Input placeholder="Nome da turma" />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handlePlayers}
        />
      </S.Content>
    </S.Container>
  );
}
