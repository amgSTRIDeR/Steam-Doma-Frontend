import Container from '../../components/Container/Container';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Container>
        <SidebarNavigation />
      </Container>
    </aside>
  );
}
