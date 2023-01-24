import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(TextInput)`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    font-family: ${theme.font_family.regular};
    background-color: ${theme.colors.gray_700};
    color: ${theme.colors.white};
  `}
  border-radius: 6px;
  padding: 16px;
`;
