import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { Container, ButtonIconTypeStyleProps, Icon } from "./styles";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon ({ type = 'PRIMARY', icon, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon
        type={type}
        name={icon}
      />
    </Container>
  )
}
