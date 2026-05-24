// src/App.jsx
import { useState, useEffect } from 'react'; // Adicionado o useEffect para monitorar a carga do banco
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Info from './Info.jsx';
import Atrio from './Atrio.jsx'; // Importando a nova página Home
import './App.css';

function App() {
  // 1. ALTERAÇÃO: Estado inicial alterado para 'atrio' para sintonizar as cores do menu superior
  const [paginaAtual, setPaginaAtual] = useState('atrio');

  // 2. Estado para guardar qual grupo o usuário selecionou na combo de estoque
  const [grupoSelecionado, setGrupoSelecionado] = useState('');

  // 3. ALTERAÇÃO: Agora a lista começa vazia e aguarda a resposta do MySQL via PHP
  const [gruposDeProdutos, setGruposDeProdutos] = useState([]);

  /* --- ABAIXO ESTÁ A SUA LISTA ANTIGA FICTÍCIA (COMENTADA PARA REFERÊNCIA) ---
  const gruposDeProdutos = [
    { id: 1, nome: "Vinhos e Espumantes" },
    { id: 2, nome: "Azeites e Vinagres" },
    { id: 3, nome: "Massas e Molhos" },
    { id: 4, nome: "Queijos e Embutidos" },
    { id: 5, nome: "Conservas e Enlatados" }
  ];
  -------------------------------------------------------------------------- */

  // 4. ALTERAÇÃO: Efeito colateral para buscar os dados dinâmicos do banco
  useEffect(() => {
    // IMPORTANTE: Altere 'SUA_PASTA' para o caminho real onde salvou o buscar_grupos.php
    fetch('http://192.168.90.36/roperto.intranet/conn/buscar_grupos.php')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro na rede ou o arquivo PHP não foi encontrado.');
        }
        return resposta.json();
      })
      .then((dados) => {
        setGruposDeProdutos(dados); // injeta os dados da tabela 'estoque' no estado
      })
      .catch((erro) => {
        console.error("Erro ao carregar os dados do MySQL:", erro);
        alert("Não foi possível sincronizar as categorias com o banco de dados.");
      });
  }, []); // Mantém o colchete vazio para rodar apenas uma vez na inicialização

  // Função executada quando o usuário clica no botão para carregar os produtos
  const handleCarregarGrupo = (event) => {
    event.preventDefault(); // Evita que a página recarregue
    if (!grupoSelecionado) {
      alert("Por favor, selecione um grupo primeiro!");
      return;
    }
    
    alert(`Buscando produtos do grupo ID: ${grupoSelecionado} para edição de Entradas/Saídas.`);
    // FUTURAMENTE: Aqui faremos o React chamar o MySQL buscando os produtos do grupo
  };

  return (
    <>
      {/* Enviando o estado real ('atrio') para o Header saber qual página está aberta */}
      <Header paginaAtiva={paginaAtual} /> 

      {/* Menu de navegação ajustado para usar 'atrio' no primeiro botão */}
      <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '10px' }}>
        <button onClick={() => setPaginaAtual('atrio')}>Home React</button>
        <button onClick={() => setPaginaAtual('estoque')}>Controle de Estoque</button>
        <button onClick={() => setPaginaAtual('inforeact')}>Informações</button>
      </nav>

      <main style={{ padding: '20px' }}>
        
        {/* ALTERAÇÃO: Renderiza o Átrio quando a página atual for exatamente 'atrio' */}
        {paginaAtual === 'atrio' && (
          <Atrio />
        )}

        {/* CASO 2: Se a página atual for 'estoque' */}
        {paginaAtual === 'estoque' && (
          <div>
            <h1>Controle de Estoque</h1>
            
            {/* Fieldset estilizado */}
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

                {/* Mensagem de alerta discreta caso nada esteja selecionado */}
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
          </div>
        )}

        {/* CASO 3: Se a página atual for 'inforeact' */}
        {paginaAtual === 'inforeact' && (
          <div>
            <h1>Informações</h1>
            <p>Atualização manual.</p>
            <Info />
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}

export default App;