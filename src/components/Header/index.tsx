import * as S from "./styles";
import LogoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type IProps = {
  ShowBackButton?: boolean;
};

export function Header({ ShowBackButton = false }: IProps) {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <S.Container>
      {ShowBackButton && (
        <S.BackButton onPress={handleBack}>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={LogoImg} />
    </S.Container>
  );
}
