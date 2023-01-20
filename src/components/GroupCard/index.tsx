import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type IProps = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: IProps) {
  return (
    <S.Container {...rest}>
      <S.Icon />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
