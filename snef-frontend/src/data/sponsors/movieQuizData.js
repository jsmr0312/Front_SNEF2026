const defaultQuizQuestions = [
  {
    id: 'q1',
    prompt: '¿Cuál es la misión de la CONDUSEF como institución pública?',
    options: [
      {
        id: 'a',
        text: 'Supervisar a las instituciones financieras del país.',
        color: 'green',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Que inviertas dinero.',
        color: 'blue',
        isCorrect: false,
        incorrectExplanation:
          'La CONDUSEF no tiene como función pedirte que inviertas dinero. Su misión principal es proteger y orientar a las personas usuarias de servicios financieros.',
      },
      {
        id: 'c',
        text: 'Otorgar créditos y financiamientos a la ciudadanía.',
        color: 'pink',
        isCorrect: false,
        incorrectExplanation:
          'La CONDUSEF no otorga créditos. Su labor se enfoca en orientación, educación financiera y defensa de usuarios.',
      },
      {
        id: 'd',
        text: 'Administrar los recursos de las AFORES y fondos de inversión.',
        color: 'orange',
        isCorrect: false,
        incorrectExplanation:
          'La CONDUSEF no administra recursos de AFORES ni fondos; su papel es de orientación, defensa y apoyo al usuario financiero.',
      },
    ],
  },
  {
    id: 'q2',
    prompt: '¿Qué hábito ayuda a tomar mejores decisiones financieras?',
    options: [
      {
        id: 'a',
        text: 'Comparar opciones antes de contratar un producto.',
        color: 'green',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Aceptar la primera oferta disponible.',
        color: 'blue',
        isCorrect: false,
        incorrectExplanation:
          'Aceptar la primera oferta puede impedirte ver costos, comisiones o condiciones más convenientes. Comparar te ayuda a decidir con más información.',
      },
      {
        id: 'c',
        text: 'Firmar contratos sin leerlos para ahorrar tiempo.',
        color: 'pink',
        isCorrect: false,
        incorrectExplanation:
          'Leer los contratos es clave para entender obligaciones, costos y riesgos antes de aceptar un producto financiero.',
      },
      {
        id: 'd',
        text: 'Usar todo el crédito disponible cada mes.',
        color: 'orange',
        isCorrect: false,
        incorrectExplanation:
          'Usar todo el crédito disponible puede afectar tu capacidad de pago. Conviene planear gastos y mantener un uso responsable.',
      },
    ],
  },
  {
    id: 'q3',
    prompt: '¿Para qué sirve un presupuesto personal?',
    options: [
      {
        id: 'a',
        text: 'Para identificar ingresos, gastos y metas de ahorro.',
        color: 'green',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Para eliminar todos los gastos de entretenimiento.',
        color: 'blue',
        isCorrect: false,
        incorrectExplanation:
          'Un presupuesto no busca eliminar todo disfrute, sino ayudarte a distribuir tu dinero de forma consciente y sostenible.',
      },
      {
        id: 'c',
        text: 'Para gastar sin revisar el saldo disponible.',
        color: 'pink',
        isCorrect: false,
        incorrectExplanation:
          'El presupuesto sirve precisamente para conocer tu dinero disponible y evitar gastos que pongan en riesgo tus metas.',
      },
      {
        id: 'd',
        text: 'Para sustituir el ahorro con deuda.',
        color: 'orange',
        isCorrect: false,
        incorrectExplanation:
          'La deuda no sustituye el ahorro. Un presupuesto te ayuda a separar recursos para metas y emergencias.',
      },
    ],
  },
  {
    id: 'q4',
    prompt: '¿Qué debes revisar antes de contratar un servicio financiero?',
    options: [
      {
        id: 'a',
        text: 'Comisiones, tasas, plazos y condiciones.',
        color: 'green',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Solo el color de la tarjeta o la app.',
        color: 'blue',
        isCorrect: false,
        incorrectExplanation:
          'La apariencia puede ser atractiva, pero la decisión debe considerar costos, condiciones y beneficios reales.',
      },
      {
        id: 'c',
        text: 'Únicamente la recomendación de una amistad.',
        color: 'pink',
        isCorrect: false,
        incorrectExplanation:
          'Una recomendación puede orientar, pero cada persona tiene necesidades distintas. Conviene revisar información oficial y comparar.',
      },
      {
        id: 'd',
        text: 'Nada, todos los productos funcionan igual.',
        color: 'orange',
        isCorrect: false,
        incorrectExplanation:
          'Los productos financieros tienen diferencias importantes. Revisar sus condiciones evita costos inesperados.',
      },
    ],
  },
];

export function createMovieQuiz({ rewardDitas = 30 } = {}) {
  return {
    rewardDitas,
    questions: defaultQuizQuestions.map((question) => ({
      ...question,
      options: question.options.map((option) => ({ ...option })),
    })),
  };
}
