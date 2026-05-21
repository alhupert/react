// src/Header.jsx
import logoEmpresa from './assets/logo-empresa.png';
import HeaderMenu from './HeaderMenu.jsx';

export default function Header() {
  const hoje = new Date().toLocaleDateString('pt-BR');
  const paginaAtual = "estoque"; 

  return (
    <header>
      {/* Agrupamento da esquerda (Logo + Data) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
        {/* Mudamos de 4% para 4vw (4% da largura da tela total), respeitando seu CSS */}
        <img src={logoEmpresa} style={{ width: '4vw', height: 'auto' }} alt="Empório Roperto" />
        <span className="old">{hoje}</span> 
      </div>
      
      {/* O HeaderMenu agora injeta o <nav> e a <ul> perfeitamente */}
      <HeaderMenu page={paginaAtual} />
    </header>
  );
}