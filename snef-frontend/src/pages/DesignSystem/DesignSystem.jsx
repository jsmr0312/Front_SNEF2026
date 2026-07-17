// src/pages/DesignSystem/DesignSystem.jsx

import {
  Play,
  Star,
  Trophy,
  Film,
  Gamepad2,
  Lock,
  Check,
  ArrowRight,
} from 'lucide-react';

import { useState } from 'react';

import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import SelectInput from '../../components/ui/SelectInput';
import OptionSelector from '../../components/ui/OptionSelector';
import StepIndicator from '../../components/ui/StepIndicator';
import Navbar from '../../components/ui/Navbar';

export default function DesignSystem() {
    const [previewState, setPreviewState] = useState({
    entidad: '',
    edad: '',
    sexo: '',
    pregunta: '',
    step: 1,
  });

  return (
    <main className="snef-page px-4 py-8 md:px-8 md:py-12">
      <div className="snef-container space-y-10">
        <header className="snef-panel p-6 md:p-8">
          <p className="mb-3 text-sm font-medium text-[#22ADE4]">
            SNEF 2026 / Design System Preview
          </p>

          <h1 className="mb-4 text-3xl font-semibold text-white md:text-5xl">
            Plataforma cinematográfica de educación financiera
          </h1>

          <p className="max-w-3xl text-base leading-7 text-[#999999] md:text-lg">
            Esta página sirve para validar los estilos base, componentes,
            botones, formularios, tarjetas, iconografía y colores antes de
            construir las pantallas reales de producción.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="snef-panel p-6 md:p-8">
            <SectionTitle
              title="Tipografía"
              description="Poppins como fuente principal. Títulos semibold en blanco y textos secundarios en gris."
            />

            <div className="mt-6 space-y-4">
              <div>
                <h1 className="text-4xl font-semibold text-white">
                  Heading 1 / Título principal
                </h1>
                <p className="mt-2 text-[#999999]">
                  Usado para títulos de página o secciones principales.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-white">
                  Heading 2 / Título de sección
                </h2>
                <p className="mt-2 text-[#999999]">
                  Usado para bloques importantes dentro de una vista.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Heading 3 / Título de card
                </h3>
                <p className="mt-2 text-sm text-[#999999]">
                  Texto de soporte, subtítulos, descripciones y metadatos.
                </p>
              </div>
            </div>
          </div>

          <div className="snef-panel p-6 md:p-8">
            <SectionTitle
              title="Colores"
              description="Paleta base para tema oscuro, superficies, bordes y acentos dinámicos."
            />

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <ColorSwatch name="Background" hex="#141414" className="bg-[#141414]" />
              <ColorSwatch name="Surface" hex="#1A1A1A" className="bg-[#1A1A1A]" />
              <ColorSwatch name="Border" hex="#373737" className="bg-[#373737]" />
              <ColorSwatch name="Primary" hex="#6AB439" className="bg-[#6AB439]" />
              <ColorSwatch name="Secondary" hex="#22ADE4" className="bg-[#22ADE4]" />
              <ColorSwatch
                name="Gradient"
                hex="#6AB439 → #22ADE4"
                className="bg-gradient-to-r from-[#6AB439] to-[#22ADE4]"
              />
            </div>
          </div>
        </section>

        <section className="snef-panel p-6 md:p-8">
          <SectionTitle
            title="Botones"
            description="Todos los botones usan texto medium. Hay variantes principales, secundarias, complementarias y con icono."
          />

          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="primary">
              Botón primario
            </Button>

            <Button variant="secondary">
              Botón secundario
            </Button>

            <Button variant="primaryGreen">
              Verde complementario
            </Button>

            <Button variant="primaryBlue">
              Azul complementario
            </Button>

            <Button variant="ghost">
              Botón tipo enlace
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" icon={Play}>
              Ver película
            </Button>

            <Button variant="primaryGreen" icon={Star}>
              Ganar Ditas
            </Button>

            <Button variant="primaryBlue" icon={Trophy}>
              Ver misión
            </Button>

            <Button variant="secondary" icon={ArrowRight}>
              Continuar
            </Button>
          </div>
          
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="snef-panel p-6 md:p-8">
            <SectionTitle
              title="Formularios"
              description="Inputs con label blanca, línea verde superior y campo transparente con borde gris."
            />

            <form className="mt-6 space-y-5">
              <FormInput
                id="preview-username"
                label="Usuario"
                type="text"
                placeholder="Ej. visitante2026"
              />

              <FormInput
                id="preview-password"
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
              />

              <FormInput
                id="preview-secret"
                label="Pregunta secreta"
                type="text"
                placeholder="¿Cuál es tu película favorita?"
              />
            </form>
          </div>

          <div className="snef-panel p-6 md:p-8">
            <SectionTitle
              title="Cards"
              description="Contenedores para películas, misiones, recompensas y elementos del cine virtual."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PreviewCard
                icon={Film}
                title="Película Platinum"
                description="Card para contenido destacado de patrocinadores principales."
                badge="Platinum"
              />

              <PreviewCard
                icon={Gamepad2}
                title="Cine virtual"
                description="Acceso al mundo 3D de Unity WebGL usando Ditas."
                badge="Unity"
              />

              <PreviewCard
                icon={Trophy}
                title="Misión activa"
                description="Completa quizzes para desbloquear recompensas."
                badge="Misión"
              />

              <PreviewCard
                icon={Lock}
                title="Quiz bloqueado"
                description="El quiz se desbloquea después de ver la película."
                badge="Bloqueado"
              />
            </div>
          </div>
        </section>

        <section className="snef-panel p-6 md:p-8">
  <SectionTitle
    title="Componentes de registro"
    description="Selectores, dropdowns y step indicator para el flujo de registro."
  />

  <div className="mt-6 grid gap-8 lg:grid-cols-2">
    <div className="space-y-6">
      <SelectInput
        id="preview-entity"
        label="Entidad federativa:"
        value={previewState.entidad}
        onChange={(event) =>
          setPreviewState((current) => ({
            ...current,
            entidad: event.target.value,
          }))
        }
        placeholder="Selecciona tu entidad federativa"
        options={[
          { label: 'Aguascalientes', value: 'aguascalientes' },
          { label: 'Ciudad de México', value: 'cdmx' },
          { label: 'Estado de México', value: 'edomex' },
          { label: 'Jalisco', value: 'jalisco' },
          { label: 'Nuevo León', value: 'nuevo-leon' },
        ]}
      />

      <SelectInput
        id="preview-secret-question"
        label="Pregunta secreta:"
        value={previewState.pregunta}
        onChange={(event) =>
          setPreviewState((current) => ({
            ...current,
            pregunta: event.target.value,
          }))
        }
        placeholder="Selecciona tu pregunta secreta"
        options={[
          { label: '¿Cuál es tu película favorita?', value: 'favorite-movie' },
          { label: '¿Cuál fue tu primera mascota?', value: 'first-pet' },
          { label: '¿Cuál es tu comida favorita?', value: 'favorite-food' },
        ]}
      />
    </div>

    <div className="space-y-6">
      <OptionSelector
        label="Rango de edad:"
        name="preview-age"
        value={previewState.edad}
        onChange={(value) =>
          setPreviewState((current) => ({
            ...current,
            edad: value,
          }))
        }
        columns="grid-cols-2 md:grid-cols-4"
        options={[
          { label: '12 a 18 años', value: '12-18' },
          { label: '19 a 25 años', value: '19-25' },
          { label: '26 a 49 años', value: '26-49' },
          { label: '+50 años', value: '50-plus' },
        ]}
      />

      <OptionSelector
        label="Sexo:"
        name="preview-gender"
        value={previewState.sexo}
        onChange={(value) =>
          setPreviewState((current) => ({
            ...current,
            sexo: value,
          }))
        }
        columns="grid-cols-1 md:grid-cols-3"
        options={[
          { label: 'Mujer', value: 'mujer' },
          { label: 'Hombre', value: 'hombre' },
          { label: 'Prefiero no decirlo', value: 'no-decir' },
        ]}
      />

      <div className="rounded-[10px] border border-[#373737] p-5">
        <p className="mb-4 text-sm font-medium text-white">
          Step Indicator
        </p>

        <StepIndicator
          totalSteps={2}
          currentStep={previewState.step}
        />

        <div className="mt-5 flex justify-center gap-3">
          <Button
            variant="primaryGreen"
            onClick={() =>
              setPreviewState((current) => ({
                ...current,
                step: 1,
              }))
            }
          >
            Paso 1
          </Button>

          <Button
            variant="primaryBlue"
            onClick={() =>
              setPreviewState((current) => ({
                ...current,
                step: 2,
              }))
            }
          >
            Paso 2
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>

        <section className="snef-panel overflow-hidden p-6 md:p-8">
          <SectionTitle
            title="Ejemplo de bloque destacado"
            description="Este tipo de componente puede usarse para hero sections, banners de patrocinadores o acceso al cine virtual."
          />

          <div className="mt-6 rounded-[30px] border border-[#373737] bg-[#1A1A1A] p-6 md:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                  <Check size={18} color="#6AB439" />
                  <span className="text-sm font-medium text-white">
                    Plataforma gamificada
                  </span>
                </div>

                <h2 className="mb-4 max-w-2xl text-3xl font-semibold text-white md:text-4xl">
                  Ve películas, responde quizzes y gana Ditas para el cine virtual.
                </h2>

                <p className="max-w-2xl text-base leading-7 text-[#999999]">
                  Este bloque prueba el uso combinado de cards, textos,
                  gradientes, botones e iconos dentro de una sección responsive.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Button variant="primary" icon={Play}>
                    Comenzar experiencia
                  </Button>

                  <Button variant="secondary" icon={Film}>
                    Ver catálogo
                  </Button>
                </div>
              </div>

              <div className="rounded-[30px] bg-gradient-to-r from-[#6AB439] to-[#22ADE4] p-[1px]">
                <div className="rounded-[29px] bg-[#141414] p-6">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#6AB439] to-[#22ADE4]">
                    <Film size={44} color="white" />
                  </div>

                  <h3 className="mb-2 text-2xl font-semibold text-white">
                    SNEF Cinema
                  </h3>

                  <p className="text-sm leading-6 text-[#999999]">
                    Preview visual para validar cómo se sentirán los módulos
                    principales antes de conectar datos reales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="snef-panel overflow-hidden p-6 md:p-8">
  <SectionTitle
    title="Navbar"
    description="Barra principal de navegación para usuarios autenticados e invitados. Incluye logo, navegación principal, accesos a Unity y datos del usuario."
  />

  <div className="mt-6 rounded-[30px] border border-[#373737] bg-[#141414] p-4">
    <Navbar />
  </div>
</section>
      </div>
    </main>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#999999]">
        {description}
      </p>
    </div>
  );
}

function ColorSwatch({ name, hex, className }) {
  return (
    <div className="snef-card overflow-hidden">
      <div className={`h-20 ${className}`} />

      <div className="p-4">
        <h3 className="text-sm font-semibold text-white">
          {name}
        </h3>

        <p className="mt-1 text-xs text-[#999999]">
          {hex}
        </p>
      </div>
    </div>
  );
}

function PreviewCard({ icon: Icon, title, description, badge }) {
  return (
    <article className="snef-card p-5 transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#6AB439] to-[#22ADE4]">
          <Icon size={22} color="white" />
        </div>

        <span className="rounded-full border border-[#373737] px-3 py-1 text-xs font-medium text-[#999999]">
          {badge}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm leading-6 text-[#999999]">
        {description}
      </p>
    </article>
  );
}