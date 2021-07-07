import { SEO } from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO title="Dev News!" excludeTitleSuffix />
      <main>
        <section>
          <span>Olá Dev!</span>
          <h1>
            Bem-vindo(a)s ao <br />
            <span>Dev</span> News!
          </h1>
          <p>
            Um blog com conteúdos extremamente <br />
            <span>relevantes para o seu aprendizado.</span>
          </p>
        </section>
        <img src="/home.svg" alt="Imagem da página Home" />
      </main>
    </>
  );
}
