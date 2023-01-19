import * as S from "./styles";
import LogoImg from "@assets/logo.png";

type IProps = {
  ShowBackButton?: boolean;
};

export function Header({ ShowBackButton = false }: IProps) {
  return (
    <S.Container>
      {ShowBackButton && (
        <S.BackButton>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={LogoImg} />
    </S.Container>
  );
}
