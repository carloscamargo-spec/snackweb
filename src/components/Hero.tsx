import MediaWithFallback from './MediaWithFallback';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <MediaWithFallback
        className="hero-video"
        src="/bear-hero.mp4"
        fallbackBg="#0a0a0a"
        posterGradient="radial-gradient(70% 90% at 70% 60%, rgba(230,253,49,0.06) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0a0a0a 0%, #000 100%)"
        fallbackLabel="bear-hero.mp4 · cinematic loop"
      />
      <div className="hero-vignette" />
      <div className="hero-grid-overlay" />

      <div className="hero-content">
        <div className="hero-meta-top">
          <div>EST. 2024 · BOG / LATAM</div>
          <div>CASE STUDIES <span>↗</span></div>
        </div>

        <div className="hero-bottom">
          <h1 className="hero-headline reveal" style={{ lineHeight: 1 }}>
            snack <span className="amp">&amp;</span> soda<span className="dot">.</span>
          </h1>
          <div className="hero-sub">
            <p className="hero-tagline reveal delay-1">
              <strong>A content agency for ads haters.</strong> Convertimos betting &amp; gaming en
              entretenimiento que la audiencia decide ver — no que tolera.
            </p>
            <div className="hero-index reveal delay-2">
              <span>Issue N° 026</span>
              <span>·</span>
              <span>Vol. IV</span>
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}
