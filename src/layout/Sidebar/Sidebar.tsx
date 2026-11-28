import Container from '../../components/Container/Container';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import SidebarAccount from './SidebarAccount';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Container>
        <SidebarNavigation />
        <SidebarAccount />
      </Container>
    </aside>
  );
}
