import Container from '../../components/Container/Container';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import { genres } from '../../types/genres';
import SidebarGenres from './SidebarGenres';
import SidebarAccount from './SidebarAccount';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Container>
        <div className="sidebar__inner">
          <SidebarNavigation />
          <SidebarGenres genres={genres} />
          <SidebarAccount />
        </div>
      </Container>
    </aside>
  );
}
