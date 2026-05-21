// src/App.jsx
import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './App.css';

function App() {
  // Estado para guardar qual grupo o usuário selecionou na combo
  const [grupoSelecionado, setGrupoSelecionado] = useState('');

  // Lista de grupos (fictícios por enquanto, futuramente virá do MySQL)
  const gruposDeProdutos = [
    { id: 1, nome: "Vinhos e Espumantes" },
    { id: 2, nome: "Azeites e Vinagres" },
    { id: 3, nome: "Massas e Molhos" },
    { id: 4, nome: "Queijos e Embutidos" },
    { id: 5, nome: "Conservas e Enlatados" }
  ];

  // Função executada quando o usuário clica no botão para carregar
  const handleCarregarGrupo = (event) => {
    event.preventDefault(); // Evita que a página recarregue
    if (!grupoSelecionado) {
      alert("Por favor, selecione um grupo primeiro!");
      return;
    }
    
    // Provisório: mostra o que foi selecionado
    alert(`Buscando produtos do grupo ID: ${grupoSelecionado} para edição de Entradas/Saídas.`);
    
    // FUTURAMENTE: Aqui faremos o React chamar o MySQL buscando os produtos do grupo
  };

  return (
    <>
      <Header /> 

      <main>
        <h1>Controle de Estoque</h1>
        
        {/* Usando o fieldset que você já estilizou no seu style.css */}
        <fieldset style={{ maxWidth: '500px', margin: '20px 0', padding: '20px' }}>
          <legend className="fieldset-title">C a t e g o r i a</legend>
          
          <form onSubmit={handleCarregarGrupo} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label htmlFor="combo-grupo" style={{ fontWeight: 'bold' }}>
              Escolha o grupo de produtos para movimentação:
            </label>
            
            {/* Combo Box (Select) */}
            <select 
              id="combo-grupo"
              value={grupoSelecionado} 
              onChange={(e) => setGrupoSelecionado(e.target.value)}
              style={{
                padding: '8px',
                fontFamily: 'inherit', /* Herda a fonte Verdana do seu CSS */
                fontSize: '1em',
                borderRadius: '5px',
                border: '1px solid var(--basB)'
              }}
            >
              <option value="">-- Selecione um Grupo --</option>
              {gruposDeProdutos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nome}
                </option>
              ))}
            </select>

            {/* Mensagem de alerta discreta usando sua classe .alert caso nada esteja selecionado */}
            {!grupoSelecionado && (
              <span className="alert">* É necessário escolher um grupo para listar os itens.</span>
            )}

            <button 
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: 'var(--navA)', /* Usa o vermelho padrão da sua marca */
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Carregar Produtos
            </button>
          </form>
        </fieldset>
      </main>

      <Footer />
    </>
  );
}

export default App;