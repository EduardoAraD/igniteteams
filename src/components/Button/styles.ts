import styled from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
  type: ButtonTypeStyleProps;
}

export const Container = styled.TouchableOpacity<Props>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;

  background-color: ${props => props.type === 'PRIMARY' ? props.theme.COLORS.GREEN_700 : props.theme.COLORS.RED_DARK};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${props => props.theme.FONT_SIZE.MD}px;
  color: ${props => props.theme.COLORS.WHITE};
  font-family: ${props => props.theme.FONT_FAMILY.BOLD};
`;
