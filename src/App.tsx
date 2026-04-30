import { useEffect } from 'react';
import { useReveal } from './hooks/useReveal';
import { useTweaks } from './hooks/useTweaks';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Problem from './components/Problem';
import VideoEmbed from './components/VideoEmbed';
import Truth from './components/Truth';
import Solution from './components/Solution';
import Framework from './components/Framework';
import Cases from './components/Cases';
import BearMascot from './components/BearMascot';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakColor } from './components/TweaksPanel';
import type { TweakValues } from './types';

const TWEAK_DEFAULTS: TweakValues = {
  labelGap: 10,
  displayWeight: 900,
  displayTracking: -45,
  displayLeading: 88,
  brand: '#e6fd31',
  showMarquee: true,
  showHeroMeta: true,
};

export default function App() {
  useReveal();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--brand', t.brand);
    r.setProperty('--label-gap', `${t.labelGap}px`);
    r.setProperty('--display-weight', String(t.displayWeight));
    r.setProperty('--display-tracking', `${t.displayTracking / 1000}em`);
    r.setProperty('--display-leading', String(t.displayLeading / 100));
  }, [t]);

  return (
    <>
      <Nav />
      <Hero />
      {t.showMarquee && <Marquee />}
      <Problem />
      <VideoEmbed />
      <Truth />
      <Solution />
      <Framework />
      <Cases />
      <Contact />
      <Footer />
      <BearMascot />

      <TweaksPanel>
        <TweakSection label="Pairing" />
        <TweakSlider label="Eyebrow ↔ headline gap" value={t.labelGap} min={2} max={32} unit="px"
          onChange={(v) => setTweak('labelGap', v)} />
        <TweakSection label="Display type" />
        <TweakSlider label="Weight" value={t.displayWeight} min={600} max={900} step={100}
          onChange={(v) => setTweak('displayWeight', v)} />
        <TweakSlider label="Tracking" value={t.displayTracking} min={-80} max={0} unit="‰"
          onChange={(v) => setTweak('displayTracking', v)} />
        <TweakSlider label="Leading" value={t.displayLeading} min={80} max={110} unit="%"
          onChange={(v) => setTweak('displayLeading', v)} />
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.brand} onChange={(v) => setTweak('brand', v)} />
        <TweakToggle label="Marquee strip" value={t.showMarquee}
          onChange={(v) => setTweak('showMarquee', v)} />
        <TweakToggle label="Hero meta (top-right)" value={t.showHeroMeta}
          onChange={(v) => setTweak('showHeroMeta', v)} />
      </TweaksPanel>
    </>
  );
}
