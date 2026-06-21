// src/Footer.jsx
export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer>
      <p>
        © {anoAtual} Empório Roperto — Informações confidenciais e só poderão ser usadas com o consentimento dos proprietários.
      </p>
    </footer>
  );
}