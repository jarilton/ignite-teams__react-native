import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import * as S from "./styles";

type IProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: IProps) {
  const { colors } = useTheme();

  return (
    <S.Container
      ref={inputRef}
      placeholderTextColor={colors.gray_300}
      {...rest}
    />
  );
}
