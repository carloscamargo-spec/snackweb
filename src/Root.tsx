import App from './App';
import CaseStudyPage from './pages/CaseStudyPage';
import CasesIndexPage from './pages/CasesIndexPage';
import MarketPage from './pages/MarketPage';
import MarketsIndexPage from './pages/MarketsIndexPage';
import { resolveRoute } from './routes';

interface RootProps {
  path: string;
}

// Static sites only need path-based dispatch: every route is prerendered
// to its own index.html and navigation between pages is a full page load.
export default function Root({ path }: RootProps) {
  const route = resolveRoute(path);
  if (route.kind === 'case') return <CaseStudyPage study={route.study} />;
  if (route.kind === 'cases') return <CasesIndexPage />;
  if (route.kind === 'market') return <MarketPage market={route.market} />;
  if (route.kind === 'markets') return <MarketsIndexPage />;
  return <App />;
}
