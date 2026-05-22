// src/pages/Register/Register.jsx

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import SelectInput from '../../components/ui/SelectInput';
import OptionSelector from '../../components/ui/OptionSelector';
import StepIndicator from '../../components/ui/StepIndicator';

import loginHero from '../../assets/login-hero.png';

const ageOptions = [
  { label: '12 a 18 años', value: '12-18' },
  { label: '19 a 25 años', value: '19-25' },
  { label: '26 a 49 años', value: '26-49' },
  { label: '+50 años', value: '50-plus' },
];

const genderOptions = [
  { label: 'Mujer', value: 'mujer' },
  { label: 'Hombre', value: 'hombre' },
  { label: 'Prefiero no decirlo', value: 'no-decir' },
];

const entityOptions = [
  { label: 'Aguascalientes', value: 'aguascalientes' },
  { label: 'Baja California', value: 'baja-california' },
  { label: 'Baja California Sur', value: 'baja-california-sur' },
  { label: 'Campeche', value: 'campeche' },
  { label: 'Chiapas', value: 'chiapas' },
  { label: 'Chihuahua', value: 'chihuahua' },
  { label: 'Ciudad de México', value: 'cdmx' },
  { label: 'Coahuila', value: 'coahuila' },
  { label: 'Colima', value: 'colima' },
  { label: 'Durango', value: 'durango' },
  { label: 'Estado de México', value: 'estado-de-mexico' },
  { label: 'Guanajuato', value: 'guanajuato' },
  { label: 'Guerrero', value: 'guerrero' },
  { label: 'Hidalgo', value: 'hidalgo' },
  { label: 'Jalisco', value: 'jalisco' },
  { label: 'Michoacán', value: 'michoacan' },
  { label: 'Morelos', value: 'morelos' },
  { label: 'Nayarit', value: 'nayarit' },
  { label: 'Nuevo León', value: 'nuevo-leon' },
  { label: 'Oaxaca', value: 'oaxaca' },
  { label: 'Puebla', value: 'puebla' },
  { label: 'Querétaro', value: 'queretaro' },
  { label: 'Quintana Roo', value: 'quintana-roo' },
  { label: 'San Luis Potosí', value: 'san-luis-potosi' },
  { label: 'Sinaloa', value: 'sinaloa' },
  { label: 'Sonora', value: 'sonora' },
  { label: 'Tabasco', value: 'tabasco' },
  { label: 'Tamaulipas', value: 'tamaulipas' },
  { label: 'Tlaxcala', value: 'tlaxcala' },
  { label: 'Veracruz', value: 'veracruz' },
  { label: 'Yucatán', value: 'yucatan' },
  { label: 'Zacatecas', value: 'zacatecas' },
];

const secretQuestionOptions = [
  { label: '¿Cuál es tu película favorita?', value: 'favorite-movie' },
  { label: '¿Cuál fue el nombre de tu primera mascota?', value: 'first-pet' },
  { label: '¿Cuál es tu comida favorita?', value: 'favorite-food' },
  { label: '¿En qué ciudad naciste?', value: 'birth-city' },
  { label: '¿Cuál es tu personaje favorito?', value: 'favorite-character' },
];

const initialForm = {
  username: '',
  password: '',
  ageRange: '',
  gender: '',
  state: '',
  secretQuestion: '',
  secretAnswer: '',
};

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const goToNextStep = (event) => {
    event.preventDefault();
    setCurrentStep(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: conectar con registerUser() en src/services/api.js cuando el backend esté listo.
    console.log('Registro:', form);
  };

  return (
    <main className="snef-page flex min-h-screen items-center justify-center p-4 md:p-6">
      <section className="grid w-full max-w-[1440px] gap-6 lg:grid-cols-[1.1fr_0.85fr]">
        <HeroPanel />

        <section
          className="
            flex min-h-[640px] items-center justify-center rounded-[30px]
            border border-[#373737] bg-[#1A1A1A]
            px-6 py-10 md:px-12
          "
        >
          <div className="w-full max-w-[430px]">
            {currentStep === 1 ? (
              <RegisterStepOne
                form={form}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword((current) => !current)}
                onChange={updateField}
                onNext={goToNextStep}
              />
            ) : (
              <RegisterStepTwo
                form={form}
                onChange={updateField}
                onBack={() => setCurrentStep(1)}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function HeroPanel() {
  return (
    <section
      className="
        relative hidden min-h-[640px] overflow-hidden rounded-[30px]
        border border-[#373737] bg-[#1A1A1A]
        lg:block
      "
    >
      <img
        src={loginHero}
        alt="Plataforma virtual SNEF 2026"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/45" />
      <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_0_120px_rgba(0,0,0,0.65)]" />
    </section>
  );
}

function RegisterStepOne({
  form,
  showPassword,
  onTogglePassword,
  onChange,
  onNext,
}) {
  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-3xl font-semibold text-white">
          Regístrate
        </h1>

        <p className="text-sm leading-6 text-[#999999]">
          Ingresa tu información para crear tu cuenta.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onNext}>
        <FormInput
          id="register-username"
          label="Nombre de usuario:"
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          autoComplete="username"
          value={form.username}
          onChange={(event) => onChange('username', event.target.value)}
        />

        <PasswordInput
          value={form.password}
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
          onChange={(value) => onChange('password', value)}
        />

        <OptionSelector
          label="Rango de edad:"
          name="ageRange"
          value={form.ageRange}
          onChange={(value) => onChange('ageRange', value)}
          columns="grid-cols-2 md:grid-cols-4"
          options={ageOptions}
        />

        <OptionSelector
          label="Sexo:"
          name="gender"
          value={form.gender}
          onChange={(value) => onChange('gender', value)}
          columns="grid-cols-1 md:grid-cols-3"
          options={genderOptions}
        />

        <SelectInput
          id="register-state"
          label="Entidad federativa:"
          value={form.state}
          onChange={(event) => onChange('state', event.target.value)}
          placeholder="Selecciona tu entidad federativa"
          options={entityOptions}
        />

        <div className="pt-8">
          <StepIndicator totalSteps={2} currentStep={1} />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Siguiente
        </Button>
      </form>
    </>
  );
}

function RegisterStepTwo({ form, onChange, onBack, onSubmit }) {
  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-3xl font-semibold text-white">
          Regístrate
        </h1>

        <p className="text-sm leading-6 text-[#999999]">
          Con la pregunta secreta y tu nombre de usuario podrás recuperar tu
          cuenta en caso de que olvides tu contraseña.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <SelectInput
          id="secret-question"
          label="Pregunta secreta:"
          value={form.secretQuestion}
          onChange={(event) => onChange('secretQuestion', event.target.value)}
          placeholder="Selecciona tu pregunta secreta"
          options={secretQuestionOptions}
        />

        <FormInput
          id="secret-answer"
          label="Respuesta:"
          type="text"
          placeholder="Escribe la respuesta de tu pregunta secreta"
          value={form.secretAnswer}
          onChange={(event) => onChange('secretAnswer', event.target.value)}
        />

        <div className="pt-8">
          <StepIndicator totalSteps={2} currentStep={2} />
        </div>

        <div className="space-y-4">
          <Button type="submit" variant="primary" className="w-full">
            Crear cuenta
          </Button>

          <button
            type="button"
            onClick={onBack}
            className="
              mx-auto block text-sm font-medium text-[#22ADE4]
              transition-colors duration-300 hover:text-white hover:underline
            "
          >
            Volver al paso anterior
          </button>
        </div>
      </form>
    </>
  );
}

function PasswordInput({
  value,
  showPassword,
  onTogglePassword,
  onChange,
}) {
  return (
    <div className="group w-full">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="
            h-5 w-[3px] rounded-full bg-[#6AB439]
            transition-all duration-300 ease-out
            group-focus-within:h-6 group-focus-within:bg-[#22ADE4]
          "
        />

        <label htmlFor="register-password" className="text-sm font-medium text-white">
          Contraseña:
        </label>
      </div>

      <div className="relative">
        <input
          id="register-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ingresa tu contraseña"
          autoComplete="new-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            w-full rounded-[10px] border border-[#373737]
            bg-transparent px-4 py-3 pr-12 text-white outline-none
            transition-all duration-300 ease-out
            placeholder:text-[#999999]
            hover:border-[#4A4A4A]
            focus:border-[#6AB439]
            focus:bg-white/[0.02]
            focus:shadow-[0_0_0_4px_rgba(106,180,57,0.08)]
          "
        />

        <button
          type="button"
          onClick={onTogglePassword}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="
            absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center
            text-white/80 transition-all duration-300
            hover:scale-110 hover:text-white
            active:scale-95
          "
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={2.2} />
          ) : (
            <Eye size={20} strokeWidth={2.2} />
          )}
        </button>
      </div>
    </div>
  );
}