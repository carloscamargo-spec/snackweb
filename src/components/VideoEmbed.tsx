export default function VideoEmbed() {
  return (
    <section id="manifiesto" className="section embed">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">02</span>
          <span>El manifiesto</span>
        </div>
        <h2 className="title reveal delay-1">
          lo decimos en <em>voz alta.</em>
        </h2>
      </div>
      <div className="embed-meta reveal">
        <span>· Manifesto / 02 · Snack &amp; Soda</span>
        <span>04:21 · YouTube</span>
      </div>
      <div className="embed-frame reveal" style={{ marginTop: 18 }}>
        <iframe
          src="https://www.youtube.com/embed/Ncrsi9qwafE?rel=0&enablejsapi=1&autoplay=0&modestbranding=1&showinfo=0&iv_load_policy=3&color=white"
          title="Snack & Soda Manifesto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}
