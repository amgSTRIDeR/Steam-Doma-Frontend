import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './_header.scss';

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <Navigation />
    </header>
  );
}
