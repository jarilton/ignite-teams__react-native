import { ButtonIcon } from "@components/ButtonIcon";
import * as S from "./styles";

type IProps = {
  name: string;
  onRemove: () => void;
};

export function PlayerCard({ name, onRemove }: IProps) {
  return (
    <S.Container>
      <S.Icon name="person" />
      <S.Name>{name}</S.Name>
      <ButtonIcon icon="close" type="secondary" onPress={onRemove} />
    </S.Container>
  );
}
