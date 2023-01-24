import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type IProps = TouchableOpacityProps &
  S.FilterStyleProps & {
    title: string;
  };

export function Filter({ title, isActive = false, ...rest }: IProps) {
  return (
    <S.Container isActive={isActive} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
