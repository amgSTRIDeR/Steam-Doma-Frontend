import Container from '../../components/Container/Container';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import { genres } from '../../types/genres';
import SidebarGenres from './SidebarGenres';
import SidebarAccount from './SidebarAccount';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Container>
        <SidebarNavigation />
        <SidebarGenres genres={genres} />
        <SidebarAccount />
      </Container>
    </aside>
  );
}
