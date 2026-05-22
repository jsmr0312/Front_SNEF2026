// src/components/ui/StepIndicator.jsx

export default function StepIndicator({
  totalSteps = 2,
  currentStep = 1,
  className = '',
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-label={`Paso ${currentStep} de ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;

        return (
          <span
            key={step}
            className={`
              h-3 rounded-full transition-all duration-300 ease-out
              ${isActive ? 'w-8 bg-[#6AB439]' : 'w-3 bg-[#333333]'}
            `}
          />
        );
      })}
    </div>
  );
}