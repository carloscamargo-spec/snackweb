import type { CaseStudy } from '../types';

// Copy is based on the clients' own YouTube titles and descriptions.
// `results` is intentionally empty until the team provides real figures:
// the Results block only renders when it has data, so nothing is invented.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'wplay-power',
    client: 'Wplay',
    title: 'Wplay: la casa de apuestas con más power',
    displayTitle: ['wplay: la casa de apuestas con', 'más power.'],
    shortTitle: 'Wplay · POWER',
    market: 'Colombia',
    years: '2019 – 2023',
    category: 'Casa de apuestas deportivas y casino online',
    summary:
      'Una plataforma creativa de largo aliento para Wplay, la primera casa de apuestas deportivas online autorizada por Coljuegos en Colombia: el "power" como actitud de marca, del fútbol al casino en vivo.',
    challenge:
      'Diferenciar a Wplay en una categoría donde todas las casas de apuestas prometen lo mismo — cuotas, bonos y rapidez — y sostener esa diferencia durante varias temporadas.',
    idea:
      'Convertir el "power" en el territorio de marca: una energía de hincha que se reconoce en cada pieza. Con René Higuita como cómplice, el concepto sostuvo campañas de fútbol, el regreso de los hinchas a los estadios y la comunicación del casino en vivo.',
    execution: [
      '"Apuéstale a Higuita" (2019): campaña digital 360 protagonizada por René Higuita, finalista a Mejor Campaña Digital 360 en los 7.º Premios #LatamDigital.',
      'Campaña "Regresan los hinchas, regresa el fútbol, regresa #WplayMasPower" con René Higuita, que vuelve "con exceso de power" para los hinchas del fútbol colombiano.',
      'Spots de fútbol "de película" y del casino en vivo bajo el mismo concepto POWER.',
      'Piezas de producto, como recargar en Wplay "tan fácil como el 1, 2, 3 de tu canción favorita".',
    ],
    results: [],
    videos: [
      { id: '7nA5t5zDr1I', name: 'POWER · campaña Wplay', uploadDate: '2023-09-20', durationSec: 90 },
      { id: 'e29LAtiNDZk', name: 'Regresan los hinchas, regresa el fútbol, regresa #WplayMasPower', uploadDate: '2020-10-16', durationSec: 74 },
      { id: 'rvpzk2FUdow', name: 'Wplay · fútbol de película POWER', uploadDate: '2026-05-03', durationSec: 15 },
      { id: 'BkDf0z8jhRA', name: 'Wplay · el power en vivo del casino online', uploadDate: '2026-05-03', durationSec: 15 },
      { id: 'C7EMU__Rx5w', name: 'Recargar en Wplay es tan fácil como el 1, 2, 3', uploadDate: '2019-07-03', durationSec: 43 },
      { id: 'PuEtmwK2-V4', name: 'Apuéstale a Higuita · 7.º Premios #LatamDigital 2019', uploadDate: '2019-10-10', durationSec: 90 },
    ],
    awards: ['Finalista · Mejor Campaña Digital 360 · 7.º Premios #LatamDigital 2019 ("Apuéstale a Higuita")'],
  },
  {
    slug: 'yajuego-diversion-que-paga',
    client: 'YaJuego',
    title: 'YaJuego: "Diversión que Paga" con Óscar Córdoba',
    displayTitle: ['yajuego × óscar córdoba:', 'diversión que paga.'],
    shortTitle: 'YaJuego · Diversión que Paga',
    market: 'Colombia',
    years: '2026',
    category: 'App de apuestas deportivas y casino',
    summary:
      'Una campaña para que una app de apuestas se sienta parte del parche y no una transacción: Óscar Córdoba, sin guion de celebridad, en los momentos donde la diversión pasa de verdad.',
    challenge:
      'En apuestas, la mayoría de las marcas gritan para ser escuchadas. YaJuego necesitaba conversar: que la app se sintiera cercana y fácil de usar, no solo una pantalla de cuotas.',
    idea:
      '"Diversión que Paga": Óscar Córdoba no como cara que lee un guion, sino como guía. Lo vemos en su salsa — haciendo "21" en el jardín, analizando un partido desde el camerino o registrándose en la app mientras lo maquillan para salir al aire.',
    execution: [
      'Más que una cara, un guía: Óscar comparte su conocimiento, del "ataque frontal" a cómo manejar un "contraataque" en la vida y en la cancha.',
      'La cotidianidad como escenario: rodaje en barberías, talleres mecánicos y salas de casa, donde la diversión ocurre mientras esperas un corte o pides una pizza con amigos.',
      'Tecnología al servicio del usuario: si Óscar libera un bono o recarga con Nequi en segundos mientras se prepara para un show, cualquiera puede.',
      'Pieza mundialista para quienes tienen mala suerte en el amor: "de buenas en el juego".',
    ],
    results: [],
    videos: [
      { id: 'Lz6byCiGmy8', name: '"Diversión que Paga": cómo construimos la apuesta de YaJuego con Óscar Córdoba', uploadDate: '2026-05-03', durationSec: 30 },
      { id: 'ndkx66UTqpo', name: 'Detrás de "Diversión que Paga" con Óscar Córdoba', uploadDate: '2026-05-03', durationSec: 30 },
      { id: 'mp7kDA2-oPI', name: 'YaJuego · Diversión que Paga', uploadDate: '2026-05-03', durationSec: 30 },
      { id: '3uG8IXXAqwE', name: 'YaJuego · de buenas en el juego, de malas en el amor', uploadDate: '2026-05-03', durationSec: 21 },
    ],
  },
  {
    slug: 'luka-app',
    client: 'LUKA',
    title: 'LUKA: plataforma de IA para retención y fidelización en juegos de suerte y azar',
    displayTitle: ['luka: retención con', 'inteligencia artificial.'],
    shortTitle: 'LUKA · IA para retención',
    market: 'LATAM',
    years: '2026',
    category: 'Producto propio · Inteligencia artificial',
    summary:
      'LUKA es una plataforma de inteligencia artificial diseñada por Snack & Soda para generar retención y fidelización en productos de suerte y azar, con puntos y experiencias de juego entretenido.',
    challenge:
      'En la categoría, los usuarios rotan entre operadores porque las cuotas y los bonos se volvieron commodity. Retener exige darles una razón para volver que no sea solo el próximo bono.',
    idea:
      'Una capa de entretenimiento sobre el producto: puntos y experiencias de juego que convierten la relación con el operador en algo que el usuario disfruta, no en una transacción.',
    execution: [
      'Plataforma de inteligencia artificial pensada para productos de suerte y azar.',
      'Sistema de puntos y experiencias de juego entretenido orientado a retención y fidelización.',
    ],
    results: [],
    videos: [
      { id: 'ftPri1Q1a7Q', name: 'LUKA App', uploadDate: '2026-05-03', durationSec: 106 },
    ],
  },
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
