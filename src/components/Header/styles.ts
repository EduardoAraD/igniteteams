import { CaretLeft } from 'phosphor-react-native';
import styled from 'styled-components/native';

interface ContainerProps {
  showBackButton: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ showBackButton }) => showBackButton ? 'space-between' : 'center'};
`;

export const Logo  = styled.Image`
  width: 46px;
  height: 55px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 46px;
  height: 55px;
  justify-content: center;
  align-items: center;
`

export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``;
