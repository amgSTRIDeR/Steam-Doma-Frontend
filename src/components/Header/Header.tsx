import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import './_header.scss';

export default function Header() {
  return (
    <header className="header">
      <Container>
        <Navigation />
      </Container>
    </header>
  );
}
