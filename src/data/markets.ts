import type { Market } from '../types';

// Regulatory notes are deliberately high level and dated: they summarise public
// sources as of October 2026 and are not legal advice. Where a country has no
// settled framework (El Salvador, Honduras) the copy says so instead of guessing.
export const MARKETS_REVIEWED = 'octubre de 2026';

export const MARKETS: Market[] = [
  {
    slug: 'colombia',
    country: 'Colombia',
    countryCode: 'CO',
    displayTitle: ['publicidad para casas de apuestas en', 'colombia.'],
    summary:
      'Nuestra casa. Desde Bogotá hacemos contenido y publicidad para operadores de apuestas e iGaming: campañas para Wplay y YaJuego con René Higuita y Óscar Córdoba.',
    audience:
      'El fútbol manda la conversación: Liga BetPlay, Selección y clásicos como Millonarios–Santa Fe o Nacional–Medellín. La audiencia reconoce al instante a la marca que habla como hincha y castiga a la que suena a comercial.',
    regulation:
      'Coljuegos autoriza y fiscaliza a los operadores de juegos en línea. Colombia fue el primer mercado regulado de apuestas online en Latinoamérica, y la comunicación tiene que hacerse solo para operadores autorizados y con mensajes de juego responsable.',
    approach: [
      'Territorios de marca de largo aliento, como el "power" de Wplay.',
      'Talento deportivo con guion propio: Higuita y Óscar Córdoba como cómplices, no como caras que leen un texto.',
      'Contenido de producto que se siente cotidiano: recargas, bonos y registro contados como entretenimiento.',
    ],
    caseSlugs: ['wplay-power', 'yajuego-diversion-que-paga', 'luka-app'],
  },
  {
    slug: 'mexico',
    country: 'México',
    countryCode: 'MX',
    displayTitle: ['publicidad para casas de apuestas en', 'méxico.'],
    summary:
      'Contenido y publicidad para operadores de apuestas e iGaming en México: campañas que entran en la conversación del fútbol y del entretenimiento sin sonar a anuncio.',
    audience:
      'Liga MX, el Clásico Nacional entre América y Chivas, la NFL y el boxeo comparten pantalla con una audiencia enorme y muy digital. Con más de un centenar de sitios de apuestas autorizados compitiendo, la diferencia no está en la cuota: está en la marca que la gente elige ver.',
    regulation:
      'Las apuestas en línea operan con permisos de la Secretaría de Gobernación (SEGOB) bajo la Ley Federal de Juegos y Sorteos, y cada sitio web debe estar autorizado. En el Congreso hay iniciativas para limitar la publicidad de apuestas en horario familiar, así que conviene diseñar campañas que funcionen en digital, redes y contenido propio.',
    approach: [
      'Plataformas creativas pensadas para digital y redes, menos dependientes de la TV abierta.',
      'Contenido con talento y creadores locales, con lenguaje mexicano y no "neutro".',
      'Comunicación solo para operadores con permiso vigente y mensajes de juego responsable.',
    ],
    caseSlugs: ['wplay-power', 'yajuego-diversion-que-paga'],
  },
  {
    slug: 'peru',
    country: 'Perú',
    countryCode: 'PE',
    displayTitle: ['publicidad para casas de apuestas en', 'perú.'],
    summary:
      'Contenido y publicidad para operadores de apuestas deportivas y casino online en Perú, un mercado regulado que premia a las marcas que saben conversar.',
    audience:
      'La Liga 1 y el clásico Alianza Lima–Universitario mueven la pasión; la Selección une al país. Con decenas de operadores autorizados desde 2024, la audiencia ya conoce los bonos: lo que recuerda es la historia.',
    regulation:
      'La Ley 31557, modificada por la Ley 31806, regula los juegos y apuestas deportivas a distancia, con el MINCETUR como autoridad que autoriza y fiscaliza. El mercado regulado arrancó en febrero de 2024 y solo se puede publicitar a plataformas autorizadas.',
    approach: [
      'Narrativa de temporada alrededor de la Liga 1 y la Selección.',
      'Contenido de producto y retención para diferenciarse en un mercado con muchos operadores autorizados.',
      'Piezas que cumplen las reglas del mercado regulado desde el guion.',
    ],
    caseSlugs: ['yajuego-diversion-que-paga', 'luka-app'],
  },
  {
    slug: 'argentina',
    country: 'Argentina',
    countryCode: 'AR',
    displayTitle: ['publicidad para casas de apuestas en', 'argentina.'],
    summary:
      'Contenido y publicidad para operadores de apuestas e iGaming en Argentina: campañas para una de las audiencias más futboleras y exigentes del continente.',
    audience:
      'El Superclásico, la Liga Profesional y la Selección campeona del mundo convierten cada fin de semana en conversación. La audiencia detecta al instante lo impostado: el humor y la autenticidad pesan más que el presupuesto.',
    regulation:
      'El juego online se regula provincia por provincia, con licencias propias en jurisdicciones como Ciudad y Provincia de Buenos Aires, Córdoba o Santa Fe. A nivel nacional, la publicidad de apuestas online debe incluir advertencias obligatorias, y hay proyectos en el Congreso y en varias legislaturas para restringirla aún más.',
    approach: [
      'Campañas adaptadas a cada jurisdicción donde el operador tiene licencia.',
      'Contenido de entretenimiento y humor por encima de la promo directa.',
      'Advertencias y mensajes de juego responsable integrados en la creatividad, no pegados al final.',
    ],
    caseSlugs: ['wplay-power', 'yajuego-diversion-que-paga'],
  },
  {
    slug: 'ecuador',
    country: 'Ecuador',
    countryCode: 'EC',
    displayTitle: ['publicidad para casas de apuestas en', 'ecuador.'],
    summary:
      'Contenido y publicidad para operadores de pronósticos deportivos y juego en línea en Ecuador, un mercado que se está ordenando y donde la marca hace la diferencia.',
    audience:
      'La LigaPro, el Clásico del Astillero entre Barcelona SC y Emelec y la Selección concentran la conversación. Es una audiencia joven, móvil y muy de redes.',
    regulation:
      'El reglamento de la Ley del Deporte establece una licencia del ente rector del deporte como título habilitante para ofrecer pronósticos deportivos y juego en línea, y el país ya grava la actividad de las plataformas. Es un marco reciente que sigue ajustándose, así que la comunicación debe hacerse solo para operadores con licencia.',
    approach: [
      'Construcción de marca desde cero para operadores que llegan a un mercado en formalización.',
      'Contenido para redes y móvil antes que medios tradicionales.',
      'Mensajes de juego responsable y foco en operadores licenciados.',
    ],
    caseSlugs: ['wplay-power', 'luka-app'],
  },
  {
    slug: 'el-salvador',
    country: 'El Salvador',
    countryCode: 'SV',
    displayTitle: ['publicidad para casas de apuestas en', 'el salvador.'],
    summary:
      'Contenido y publicidad para operadores de apuestas e iGaming que quieren crecer en El Salvador y Centroamérica.',
    audience:
      'El fútbol local, con clásicos como Alianza–FAS, la Selección y las grandes ligas internacionales marcan la conversación de una audiencia digital y muy conectada.',
    regulation:
      'El marco específico para las apuestas en línea todavía está en discusión, con la Lotería Nacional de Beneficencia como actor central. Mientras se define, recomendamos comunicar con prudencia, con mensajes de juego responsable y revisando cada campaña con asesoría legal local.',
    approach: [
      'Estrategia de marca regional para Centroamérica, adaptada a cada país.',
      'Contenido digital y de redes con talento local.',
      'Revisión legal local de cada campaña mientras el marco se define.',
    ],
    caseSlugs: ['wplay-power', 'yajuego-diversion-que-paga'],
  },
  {
    slug: 'honduras',
    country: 'Honduras',
    countryCode: 'HN',
    displayTitle: ['publicidad para casas de apuestas en', 'honduras.'],
    summary:
      'Contenido y publicidad para operadores de apuestas e iGaming que quieren crecer en Honduras y Centroamérica.',
    audience:
      'La Liga Nacional y el clásico capitalino entre Olimpia y Motagua, junto a la Selección, concentran la pasión de una audiencia que vive el fútbol en el celular.',
    regulation:
      'Los establecimientos físicos tienen un marco propio, pero las reglas para las apuestas en línea siguen sin definirse y hay proyectos de ley en preparación. Recomendamos comunicar con prudencia, con mensajes de juego responsable y revisando cada campaña con asesoría legal local.',
    approach: [
      'Estrategia de marca regional para Centroamérica, adaptada a cada país.',
      'Contenido digital y de redes con talento local.',
      'Revisión legal local de cada campaña mientras el marco se define.',
    ],
    caseSlugs: ['wplay-power', 'yajuego-diversion-que-paga'],
  },
];

export function findMarket(slug: string): Market | undefined {
  return MARKETS.find((m) => m.slug === slug);
}
