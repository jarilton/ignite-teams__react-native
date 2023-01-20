import * as S from "./styles";

type IProps = {
  message: string;
};

export function ListEmpty({ message }: IProps) {
  return (
    <S.Container>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}
