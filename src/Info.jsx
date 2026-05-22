// src/Info.jsx
import { useState, useEffect } from 'react';

function Info() {
  // Estado para guardar o texto lido do arquivo
  const [texto, setTexto] = useState('Carregando informações...');
  
  // Estado para capturar algum erro (ex: se o arquivo sumir ou mudar de nome)
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // O fetch busca direto da pasta public (a barra '/' já aponta para lá)
    fetch('/informacoes.txt')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Não foi possível carregar o arquivo de texto.');
        }
        return resposta.text(); // Avisa o React que o retorno é um texto puro, não JSON
      })
      .then((dados) => {
        setTexto(dados); // Salva o texto no nosso estado
      })
      .catch((err) => {
        console.error(err);
        setErro('Erro ao carregar as informações do sistema.');
      });
  }, []); // [] garante que a leitura aconteça apenas UMA vez quando a página abrir

  if (erro) {
    return <p className="alert" style={{ color: 'red' }}>{erro}</p>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Informações do Sistema</h2>
      
      {/* O style 'whiteSpace: pre-wrap' é o truque de mágica aqui: 
          ele respeita as quebras de linha e parágrafos do seu arquivo .txt */}
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {texto}
      </p>
    </div>
  );
}

export default Info;