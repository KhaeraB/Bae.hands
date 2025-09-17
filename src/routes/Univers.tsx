export default function Univers() {
  return (
    <div className="container">
      <section className="univers-hero">
        <h1>bae.bohemian chic</h1>
        <p className="lead">Un univers doré, bohème et moderne — pensée pour sublimer chaque geste du quotidien.</p>
      </section>

      <section className="univers-grid">
        <div className="card">
          <h2>Philosophie</h2>
          <p>
            Nos créations marient lignes épurées et textures organiques. Elles célèbrent la liberté,
            la douceur et la singularité. Chaque pièce est conçue pour traverser les saisons sans se démoder.
          </p>
        </div>
        <div className="card">
          <h2>Matières</h2>
          <p>
            Doré lumineux, argent patiné, pierres naturelles choisies avec soin. Nous privilégions les
            approvisionnements responsables et des finitions durables.
          </p>
        </div>
        <div className="card">
          <h2>Savoir-faire</h2>
          <p>
            Assemblés en petites séries, nos bijoux passent par des mains expertes. Les irrégularités subtiles
            signent un charme artisanal authentique.
          </p>
        </div>
      </section>

      <section className="univers-cta">
        <a href="/categorie/bracelets" className="btn">Découvrir la collection</a>
      </section>
    </div>
  );
}


