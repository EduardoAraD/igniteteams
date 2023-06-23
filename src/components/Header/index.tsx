import { useNavigation } from "@react-navigation/native";

import { BackIcon, Container, Logo, BackButton } from "./styles";
import logoImage from '@assets/logo.png';

type Props = {
  showBackButton?: boolean;
}

export function Header ({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("groups");
  }

  return (
    <Container showBackButton={showBackButton}>
      {showBackButton && (
        <BackButton
          onPress={handleGoBack}
        >
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImage} />
    </Container>
  )
}