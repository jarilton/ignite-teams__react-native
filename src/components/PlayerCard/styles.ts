import styled, { css } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const Name = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.sm}px;
    color: ${theme.colors.gray_200};
  `};
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.gray_200,
}))`
  margin-left: 16px;
  margin-right: 4px;
`;
