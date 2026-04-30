const items = ['betting', '&', 'gaming', '·', 'narrativa', '·', 'espectáculo', '·', 'latam', '·', 'fidelidad', '·', 'no ads', '·'];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
