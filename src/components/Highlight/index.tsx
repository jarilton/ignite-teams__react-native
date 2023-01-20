import * as S from "./styles";

type IProps = {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: IProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Container>
  );
}
