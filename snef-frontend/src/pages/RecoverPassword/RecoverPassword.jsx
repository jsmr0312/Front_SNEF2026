// src/pages/RecoverPassword/RecoverPassword.jsx

import { useState } from 'react';

import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import SelectInput from '../../components/ui/SelectInput';
import StepIndicator from '../../components/ui/StepIndicator';
import PasswordInput from '../../components/ui/PasswordInput';

import loginHero from '../../assets/login-hero.png';

const secretQuestionOptions = [
  { label: '¿Cuál es tu película favorita?', value: 'favorite-movie' },
  { label: '¿Cuál fue el nombre de tu primera mascota?', value: 'first-pet' },
  { label: '¿Cuál es tu comida favorita?', value: 'favorite-food' },
  { label: '¿En qué ciudad naciste?', value: 'birth-city' },
  { label: '¿Cuál es tu personaje favorito?', value: 'favorite-character' },
];

const initialForm = {
  username: '',
  secretQuestion: '',
  secretAnswer: '',
  newPassword: '',
};

export default function RecoverPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleValidateData = (event) => {
    event.preventDefault();

    // TODO: conectar con validateRecoveryData() en src/services/api.js
    // El backend debería validar username + pregunta secreta + respuesta.
    setCurrentStep(2);
  };

  const handleCreateNewPassword = (event) => {
    event.preventDefault();

    // TODO: conectar con resetPassword() en src/services/api.js
    console.log('Nueva contraseña:', form);
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
              <RecoveryValidationStep
                form={form}
                onChange={updateField}
                onSubmit={handleValidateData}
              />
            ) : (
              <NewPasswordStep
                form={form}
                onChange={updateField}
                onBack={() => setCurrentStep(1)}
                onSubmit={handleCreateNewPassword}
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

function RecoveryValidationStep({ form, onChange, onSubmit }) {
  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-3xl font-semibold text-white">
          Crea una nueva contraseña
        </h1>

        <p className="text-sm leading-6 text-[#999999]">
          Para recuperar tu cuenta ingresa los siguientes datos y crea una
          nueva contraseña.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <FormInput
          id="recover-username"
          label="Nombre de usuario:"
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          autoComplete="username"
          value={form.username}
          onChange={(event) => onChange('username', event.target.value)}
        />

        <SelectInput
          id="recover-secret-question"
          label="Pregunta secreta:"
          value={form.secretQuestion}
          onChange={(event) => onChange('secretQuestion', event.target.value)}
          placeholder="Selecciona tu pregunta secreta"
          options={secretQuestionOptions}
        />

        <FormInput
          id="recover-secret-answer"
          label="Respuesta:"
          type="text"
          placeholder="Escribe la respuesta de tu pregunta secreta"
          value={form.secretAnswer}
          onChange={(event) => onChange('secretAnswer', event.target.value)}
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

function NewPasswordStep({ form, onChange, onBack, onSubmit }) {
  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-3xl font-semibold text-white">
          Crea una nueva contraseña
        </h1>

        <p className="text-sm leading-6 text-[#999999]">
          Para recuperar tu cuenta ingresa los siguientes datos y crea una
          nueva contraseña.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <PasswordInput
          id="recover-new-password"
          label="Nueva contraseña:"
          placeholder="Escribe tu nueva contraseña"
          autoComplete="new-password"
          value={form.newPassword}
          onChange={(value) => onChange('newPassword', value)}
        />

        <div className="pt-8">
          <StepIndicator totalSteps={2} currentStep={2} />
        </div>

        <div className="space-y-4">
          <Button type="submit" variant="primary" className="w-full">
            Confirmar nueva contraseña
          </Button>

        
        </div>
      </form>
    </>
  );
}