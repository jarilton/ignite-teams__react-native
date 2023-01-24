import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type IProps = TouchableOpacityProps & {};

export function ButtonIcon({}: IProps) {
  return (
    <S.Container>
      <S.Icon name="home" type="primary" />
    </S.Container>
  );
}
