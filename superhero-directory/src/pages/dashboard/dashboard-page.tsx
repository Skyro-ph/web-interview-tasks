import { DashboardHeader } from './components/dashboard-header';
import { HeroSearch } from './components/hero-search';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <HeroSearch />
    </div>
  );
}
