import {
  BookOpen,
  MapPin,
  User,
  Shield,
  Briefcase,
  Link as LinkIcon,
  Edit3,
  ArrowLeft,
} from 'lucide-react';

import { useNavigate, useParams } from 'react-router-dom';

import { useSuperheroByIdQuery } from '~entities/superhero';
import type { Superhero } from '~entities/superhero/types';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" fill="%23262626"><rect width="100%25" height="100%25"/></svg>';

function getSubtitle(hero: Superhero): string {
  const fullName = hero.biography?.['full-name'];
  const publisher = hero.biography?.publisher;

  if (fullName && fullName !== '-' && fullName !== hero.name) {
    return fullName;
  }

  if (publisher && publisher !== '-') {
    return publisher;
  }

  return 'Unknown Origin';
}

function hasValidData(value: string | undefined | null): boolean {
  return !!value && value !== 'null' && value !== '-';
}

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) {
  if (!value || value === 'null') return null;
  const numValue = parseInt(value, 10);
  const percent = isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue));

  return (
    <div className="flex flex-col rounded-xl border border-white/5 bg-[#202125] p-4 text-center shadow-inner">
      <span className="mb-2 text-xs font-bold tracking-widest text-white/40 uppercase">
        {label}
      </span>
      <span className="mb-3 text-2xl font-bold text-white">{value}</span>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string | string[];
}) {
  if (!value || value === 'null' || value === '-') return null;

  const displayValue = Array.isArray(value) ? value.join(' / ') : value;

  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col pt-0.5">
        <span className="mb-1 text-xs font-bold tracking-wider text-white/40 uppercase">
          {title}
        </span>
        <span className="text-sm leading-relaxed font-medium text-white/90">
          {displayValue}
        </span>
      </div>
    </div>
  );
}

function AlignmentBadge({ alignment }: { alignment?: string }) {
  if (!alignment || alignment === 'null' || alignment === '-') return null;

  const isGood = alignment.toLowerCase() === 'good';
  const isBad = alignment.toLowerCase() === 'bad';

  let colorClasses = 'bg-gray-500/10 text-gray-400 ring-gray-400/30';

  if (isGood) {
    colorClasses = 'bg-green-500/10 text-green-400 ring-green-500/30';
  } else if (isBad) {
    colorClasses = 'bg-red-500/10 text-red-400 ring-red-500/30';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase ring-1 ring-inset ${colorClasses}`}
    >
      {alignment}
    </span>
  );
}

export function SuperheroByIdPage() {
  const { id } = useParams();
  const { data: superhero, isLoading, error } = useSuperheroByIdQuery(id);
  const navigate = useNavigate();

  function onGoBack() {
    navigate(-1);
  }

  function onImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !superhero) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl text-red-500">
            Failed to load superhero data.
          </p>
          <button
            onClick={onGoBack}
            className="font-medium text-orange-500 underline underline-offset-4 hover:text-orange-400"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const subtitle = getSubtitle(superhero);
  const { powerstats, biography, appearance, work, connections } = superhero;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      <button
        type="button"
        className="group mb-6 flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-white/50 transition-all active:scale-95 active:text-white/80 lg:mb-8 [@media(hover:hover)]:hover:text-white"
        onClick={onGoBack}
      >
        <ArrowLeft className="h-5 w-5 transition-transform active:-translate-x-1 [@media(hover:hover)]:group-hover:-translate-x-1" />
        Back
      </button>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="w-full shrink-0 lg:sticky lg:top-8 lg:w-[420px] lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#1a1b20] bg-[#131418] shadow-2xl">
            <img
              src={superhero.image?.url || FALLBACK_IMAGE}
              alt={superhero.name}
              onError={onImageError}
              className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-[600px]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#131418] via-[#131418]/90 to-transparent p-6 lg:hidden">
              <h1 className="font-bangers text-5xl tracking-wide text-white drop-shadow-md">
                {superhero.name}
              </h1>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
                  {subtitle}
                </span>
                <AlignmentBadge alignment={biography.alignment} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8 lg:py-6">
          <div className="hidden lg:block">
            <h1 className="font-bangers text-6xl tracking-wide text-white drop-shadow-md">
              {superhero.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-lg font-bold tracking-widest text-orange-500 uppercase">
                {subtitle}
              </span>
              <AlignmentBadge alignment={biography.alignment} />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/5 bg-[#1a1b20] p-6 lg:p-8">
            <h2 className="mb-6 text-sm font-bold tracking-widest text-orange-500 uppercase">
              Power Stats
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard
                label="INT"
                value={powerstats.intelligence}
                colorClass="bg-sky-500"
              />
              <StatCard
                label="STR"
                value={powerstats.strength}
                colorClass="bg-red-500"
              />
              <StatCard
                label="SPD"
                value={powerstats.speed}
                colorClass="bg-yellow-500"
              />
              <StatCard
                label="DUR"
                value={powerstats.durability}
                colorClass="bg-green-500"
              />
              <StatCard
                label="PWR"
                value={powerstats.power}
                colorClass="bg-purple-500"
              />
              <StatCard
                label="CMB"
                value={powerstats.combat}
                colorClass="bg-orange-500"
              />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/5 bg-[#1a1b20] p-6 lg:p-8">
            <h2 className="mb-6 text-sm font-bold tracking-widest text-orange-500 uppercase">
              Biography
            </h2>
            <div className="flex flex-col gap-6">
              <InfoRow
                icon={BookOpen}
                title="First Appearance"
                value={biography['first-appearance']}
              />
              <InfoRow icon={User} title="Aliases" value={biography.aliases} />
              <InfoRow
                icon={MapPin}
                title="Place of Birth"
                value={biography['place-of-birth']}
              />
            </div>
          </div>

          {appearance && hasValidData(appearance.gender) && (
            <div className="rounded-[1.5rem] border border-white/5 bg-[#1a1b20] p-6 lg:p-8">
              <h2 className="mb-6 text-sm font-bold tracking-widest text-orange-500 uppercase">
                Appearance
              </h2>
              <div className="flex flex-col gap-6">
                <InfoRow
                  icon={User}
                  title="Gender & Race"
                  value={`${appearance.gender}, ${appearance.race === 'null' ? 'Unknown' : appearance.race}`}
                />
                <InfoRow
                  icon={Edit3}
                  title="Physical"
                  value={`${appearance.height[1]} / ${appearance.weight[1]}`}
                />
              </div>
            </div>
          )}

          {work && hasValidData(work.occupation) && (
            <div className="rounded-[1.5rem] border border-white/5 bg-[#1a1b20] p-6 lg:p-8">
              <h2 className="mb-6 text-sm font-bold tracking-widest text-orange-500 uppercase">
                Work & Connections
              </h2>
              <div className="flex flex-col gap-6">
                <InfoRow
                  icon={Briefcase}
                  title="Occupation"
                  value={work.occupation}
                />
                <InfoRow icon={Shield} title="Base" value={work.base} />
                <InfoRow
                  icon={LinkIcon}
                  title="Group Affiliation"
                  value={connections['group-affiliation']}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
