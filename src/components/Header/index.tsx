import { BackIcon, Container, Logo, BackButton } from "./styles";
import logoImage from '@assets/logo.png';

type Props = {
  showBackButton?: boolean;
}

export function Header ({ showBackButton = false }: Props) {
  return (
    <Container showBackButton={showBackButton}>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImage} />
    </Container>
  )
}