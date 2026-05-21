// src/HeaderMenu.jsx
export default function HeaderMenu({ page }) {
  return (
    <nav> {/* 👈 Essa tag garante que o 'nav ul li' do seu CSS funcione! */}
      <ul>
        <li>
          <a href="/index.asp" className={page === 'home' ? 'active' : ''}>Home</a>
        </li>
        <li>
          <a href="/util/menu-util.asp" className={page === 'util' ? 'active' : ''}>Agenda</a>
        </li>
        <li>
          <a href="/info/menu-info.asp" className={page === 'info' ? 'active' : ''}>Informações</a>
        </li>
        <li>
          <a href="/adm/menu-adm.asp" className={page === 'adm' ? 'active' : ''}>Administrativa</a>
        </li>
        <li>
          <a href="/x/pass.asp" className={page === 'x' ? 'active' : ''}>Restrita</a>
        </li>
      </ul>
    </nav>
  );
}