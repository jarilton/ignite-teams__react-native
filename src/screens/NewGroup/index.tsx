import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import * as S from "./styles";

export function NewGroup() {
  return (
    <S.Container>
      <Header ShowBackButton />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input />
        <Button title="Criar" style={{ marginTop: 20 }} />
      </S.Content>
    </S.Container>
  );
}
