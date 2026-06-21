// src/Info.jsx
import { useState, useEffect } from 'react';

function Info() {
  // Estado para guardar o texto lido do arquivo
  const [texto, setTexto] = useState('Carregando informações...');
  
  // Estado para capturar algum erro
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // CORREÇÃO AQUI: Sem a barra inicial '/' e com o nome exato do seu arquivo ('informacoes.txt')
    // Isso força o navegador a buscar o arquivo na MESMA pasta onde o index.html está rodando.
    fetch('informacoes.txt')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Não foi possível carregar o arquivo de texto.');
        }
        return resposta.text();
      })
      .then((dados) => {
        setTexto(dados);
        setErro(null); // Limpa o erro caso tenha tido sucesso
      })
      .catch((err) => {
        console.error(err);
        setErro('Erro ao carregar as informações do sistema.');
      });
  }, []);

  if (erro) {
    return <p className="alert" style={{ color: 'red' }}>{erro}</p>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Informações do Sistema</h2>
      
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {texto}
      </p>
    </div>
  );
}

export default Info;