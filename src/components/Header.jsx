// src/Header.jsx
import logoEmpresa from '../assets/logo-empresa.png';
import HeaderMenu from './HeaderMenu.jsx';

// Alteração aqui: Recebemos 'paginaAtiva' vinda do componente pai (App.jsx)
export default function Header({ paginaAtiva }) {
  const hoje = new Date().toLocaleDateString('pt-BR');

  return (
    <header>
      {/* Agrupamento da esquerda (Logo + Data) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
        {/* Mudamos de 4% para 4.5vw (4% da largura da tela total), respeitando seu CSS */}
        <img src={logoEmpresa} style={{ width: '4.5vw', height: 'auto' }} alt="Empório Roperto" />
        <span className="old">{hoje}</span> 
      </div>
      
      {/* Ajuste aqui: Passamos a página em tempo real para o HeaderMenu mudar os destaques visuais */}
      <HeaderMenu page={paginaAtiva} />
    </header>
  );
}