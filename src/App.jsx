// src/App.jsx
import Header from './Header.jsx';
import Footer from './Footer.jsx'; // 👈 1. Importa o rodapé novo
import './App.css';

function App() {
  return (
    <>
      {/* Topo */}
      <Header /> 

      {/* Miolo do Sistema (Conteúdo) */}
      <main>
        <h1>Meu Sistema de Estoque</h1>
        <p>Aqui começaremos a construir as tabelas e o controle dos produtos.</p>
      </main>

      {/* Rodapé */}
      <Footer /> {/* 👈 2. Adiciona o rodapé aqui no final */}
    </>
  )
}

export default App;