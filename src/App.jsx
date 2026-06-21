// src/App.jsx

import { useState, useEffect } from 'react';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Info from './components/Info.jsx';
import Atrio from './components/Atrio.jsx';

import './App.css';

function App() {

  // ==========================================
  // CONTROLE DE PÁGINAS
  // ==========================================

  const [paginaAtual, setPaginaAtual] = useState('atrio');

  // ==========================================
  // ESTADOS
  // ==========================================

  const [grupoSelecionado, setGrupoSelecionado] = useState('');

  const [gruposDeProdutos, setGruposDeProdutos] = useState([]);

  const [produtos, setProdutos] = useState([]);

  // ==========================================
  // CARREGA OS GRUPOS DO MYSQL
  // ==========================================

  useEffect(() => {

    fetch('http://192.168.90.36/roperto.intranet/conn/buscar_grupos.php')

      .then((resposta) => {

        if (!resposta.ok) {
          throw new Error('Erro ao carregar grupos.');
        }

        return resposta.json();
      })

      .then((dados) => {

        setGruposDeProdutos(dados);

      })

      .catch((erro) => {

        console.error(erro);

        alert('Falha ao carregar grupos.');

      });

  }, []);

  // ==========================================
  // BUSCA PRODUTOS DO GRUPO
  // ==========================================

  const handleCarregarGrupo = async (event) => {

    event.preventDefault();

    if (!grupoSelecionado) {

      alert('Selecione um grupo.');

      return;
    }

    try {

      const resposta = await fetch(
        `http://192.168.90.36/roperto.intranet/conn/buscar_produtos.php?grupoId=${grupoSelecionado}`
      );

      if (!resposta.ok) {
        throw new Error('Erro ao buscar produtos.');
      }

      const dados = await resposta.json();

      // adiciona campos auxiliares no React
      const produtosPreparados = dados.map((produto) => ({
        ...produto,
        movimento: '',
        tipo: 'entrada'
      }));

      setProdutos(produtosPreparados);

    } catch (erro) {

      console.error(erro);

      alert('Falha ao carregar produtos.');
    }
  };

  // ==========================================
  // ALTERA QUANTIDADE DIGITADA
  // ==========================================

  const atualizarMovimento = (idproduto, valor) => {

    setProdutos((listaAtual) =>

      listaAtual.map((produto) =>

        produto.idproduto === idproduto

          ? { ...produto, movimento: valor }

          : produto
      )
    );
  };

  // ==========================================
  // ALTERA TIPO
  // ==========================================

  const atualizarTipo = (idproduto, valor) => {

    setProdutos((listaAtual) =>

      listaAtual.map((produto) =>

        produto.idproduto === idproduto

          ? { ...produto, tipo: valor }

          : produto
      )
    );
  };

  // ==========================================
  // SALVA MOVIMENTAÇÃO
  // ==========================================

  const salvarMovimento = async (produto) => {

    if (!produto.movimento || produto.movimento <= 0) {

      alert('Informe uma quantidade válida.');

      return;
    }
    
    try {

      const resposta = await fetch(
        'http://192.168.90.36/roperto.intranet/conn/movimentar_estoque.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            idproduto: produto.idproduto,

            movimento: Number(produto.movimento),

            tipo: produto.tipo
          })
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {

        alert(resultado.erro || 'Erro na movimentação.');

        return;
      }

      // atualiza a tabela visualmente

      setProdutos((listaAtual) =>

        listaAtual.map((item) => {

          if (item.idproduto === produto.idproduto) {

            return {

              ...item,

              quantidade: resultado.dados.quantidade_nova,

              movimento: '',
              tipo: 'entrada'
            };
          }

          return item;
        })
      );

      alert('Estoque atualizado com sucesso.');

    } catch (erro) {

      console.error(erro);

      alert('Erro ao salvar movimentação.');
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <Header paginaAtiva={paginaAtual} />

      {/* MENU */}

      <nav
        style={{
          padding: '10px',
          background: '#eee',
          display: 'flex',
          gap: '10px'
        }}
      >
        <button onClick={() => setPaginaAtual('atrio')}>
          Home React
        </button>

        <button onClick={() => setPaginaAtual('estoque')}>
          Controle de Estoque
        </button>

        <button onClick={() => setPaginaAtual('inforeact')}>
          Informações
        </button>
      </nav>

      {/* MAIN */}

      <main style={{ padding: '20px' }}>

        {/* ATRIO */}

        {paginaAtual === 'atrio' && (
          <Atrio />
        )}

        {/* ESTOQUE */}

        {paginaAtual === 'estoque' && (

          <div>

            <h1>Controle de Estoque</h1>

            <fieldset
              style={{
                maxWidth: '500px',
                margin: '20px 0',
                padding: '20px'
              }}
            >

              <legend className="fieldset-title">
                C a t e g o r i a
              </legend>

              <form
                onSubmit={handleCarregarGrupo}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >

                <label
                  htmlFor="combo-grupo"
                  style={{ fontWeight: 'bold' }}
                >
                  Escolha o grupo:
                </label>

                <select
                  id="combo-grupo"

                  value={grupoSelecionado}

                  onChange={(e) =>
                    setGrupoSelecionado(e.target.value)
                  }

                  style={{
                    padding: '8px',
                    fontFamily: 'inherit',
                    fontSize: '1em',
                    borderRadius: '5px',
                    border: '1px solid var(--basB)'
                  }}
                >

                  <option value="">
                    -- Selecione um Grupo --
                  </option>

                  {gruposDeProdutos.map((grupo) => (

                    <option
                      key={grupo.id}
                      value={grupo.id}
                    >
                      {grupo.nome}
                    </option>

                  ))}

                </select>

                {!grupoSelecionado && (
                  <span className="alert">
                    * Escolha um grupo.
                  </span>
                )}

                <button
                  type="submit"

                  style={{
                    padding: '10px',
                    backgroundColor: 'var(--navA)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Carregar Produtos
                </button>

              </form>

            </fieldset>

            {/* TABELA */}

            {produtos.length > 0 && (

              <table
                style={{
                  width: '50%',
                  borderCollapse: 'collapse',
                  marginTop: '20px'
                }}
              >

                <thead>

                  <tr
                    style={{
                      backgroundColor: 'var(--navA)',
                      color: 'white'
                    }}
                  >

                    <th style={estiloTh}>Produto</th>

                    <th style={estiloTh}>Estoque</th>

                    <th style={estiloTh}>Quantidade</th>

                    <th style={estiloTh}>Tipo</th>

                    <th style={estiloTh}>Ação</th>

                  </tr>

                </thead>

                <tbody>

                  {produtos.map((produto) => (

                    <tr key={produto.idproduto}>

                      <td style={estiloTd}>
                        {produto.produto}
                      </td>

                      <td style={estiloTd}>
                        {produto.quantidade}
                      </td>

                      <td style={estiloTd}>

                        <input
                          type="number"

                          min="1"

                          value={produto.movimento}

                          onChange={(e) =>
                            atualizarMovimento(
                              produto.idproduto,
                              e.target.value
                            )
                          }

                          style={{
                            width: '80px',
                            padding: '5px'
                          }}
                        />

                      </td>

                      <td style={estiloTd}>

                        <select
                          value={produto.tipo}

                          onChange={(e) =>
                            atualizarTipo(
                              produto.idproduto,
                              e.target.value
                            )
                          }
                        >

                          <option value="entrada">
                            Entrada
                          </option>

                          <option value="saida">
                            Saída
                          </option>

                        </select>

                      </td>

                      <td style={estiloTd}>

                        <button
                          onClick={() =>
                            salvarMovimento(produto)
                          }

                          style={{
                            padding: '6px 10px',
                            cursor: 'pointer'
                          }}
                        >
                          Salvar
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        )}

        {/* INFO */}

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

// ==========================================
// ESTILOS AUXILIARES
// ==========================================

const estiloTh = {
  padding: '10px',
  border: '1px solid #ccc'
};

const estiloTd = {
  padding: '8px',
  border: '1px solid #ccc'
};

export default App;