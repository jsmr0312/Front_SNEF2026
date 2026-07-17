// src/pages/Progress/Progress.jsx

import { Film, Trophy, Star } from 'lucide-react';

import Navbar from '../../components/ui/Navbar';

const progressSummary = [
  {
    label: 'Peliculas vistas',
    value: 8,
    total: 20,
    icon: Film,
  },
  {
    label: 'Quizzes completados',
    value: 5,
    total: 15,
    icon: Star,
  },
  {
    label: 'Misiones completadas',
    value: 2,
    total: 6,
    icon: Trophy,
  },
];

const missions = [
  {
    id: 1,
    title: 'Primer maraton financiero',
    description: 'Ve 3 peliculas de cualquier categoria.',
    progress: 2,
    total: 3,
    reward: 40,
  },
  {
    id: 2,
    title: 'Experto en quizzes',
    description: 'Completa 5 quizzes con al menos 2 estrellas.',
    progress: 5,
    total: 5,
    reward: 75,
    completed: true,
  },
  {
    id: 3,
    title: 'Ruta Platinum',
    description: 'Ve 4 peliculas de la seleccion Platinum.',
    progress: 1,
    total: 4,
    reward: 90,
  },
];

export default function Progress() {
  return (
    <main className="snef-page min-h-screen">
      <Navbar />

      <section className="snef-layout-container space-y-8 py-10">
        <section className="grid gap-4 md:grid-cols-3">
          {progressSummary.map((item) => (
            <ProgressSummaryCard key={item.label} {...item} />
          ))}
        </section>

        <section>
          <div className="snef-panel p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Misiones activas
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#999999]">
                  Completa objetivos para ganar Ditas y desbloquear recompensas.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {missions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function ProgressSummaryCard({ label, value, total, icon: Icon }) {
  return (
    <article className="snef-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#0F0F0F]">
          <Icon size={24} className="text-[#6AB439]" />
        </div>

        <p className="text-sm font-medium text-[#999999]">
          {value}/{total}
        </p>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-white">
        {label}
      </h3>

      <ProgressBar value={value} total={total} />
    </article>
  );
}

function MissionCard({ mission }) {
  return (
    <article className="rounded-[10px] border border-[#373737] bg-[#141414] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-white">
              {mission.title}
            </h3>

            {mission.completed && (
              <span className="rounded-full bg-[#6AB439]/15 px-3 py-1 text-xs font-medium text-[#6AB439]">
                Completada
              </span>
            )}
          </div>

          <p className="text-sm leading-6 text-[#999999]">
            {mission.description}
          </p>

          <div className="mt-4">
            <ProgressBar value={mission.progress} total={mission.total} />
          </div>

          <p className="mt-2 text-sm text-[#999999]">
            {mission.progress} de {mission.total} objetivos
          </p>
        </div>

        <div className="rounded-[10px] border border-[#373737] bg-[#1A1A1A] px-5 py-4 text-center">
          <p className="text-sm text-[#999999]">
            Recompensa
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {mission.reward} Ditas
          </p>
        </div>
      </div>
    </article>
  );
}

function ProgressBar({ value, total }) {
  const percentage = Math.min((value / total) * 100, 100);

  return (
    <div className="h-3 overflow-hidden rounded-full bg-[#333333]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#6AB439] to-[#22ADE4] transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
