export const quizOptionColors = {
  green: {
    border: '#6AB439',
    glow: 'rgba(106, 180, 57, 0.3)',
    tint: 'rgba(106, 180, 57, 0.1)',
  },
  blue: {
    border: '#22ADE4',
    glow: 'rgba(34, 173, 228, 0.32)',
    tint: 'rgba(34, 173, 228, 0.1)',
  },
  pink: {
    border: '#E13B8A',
    glow: 'rgba(225, 59, 138, 0.32)',
    tint: 'rgba(225, 59, 138, 0.1)',
  },
  orange: {
    border: '#F08725',
    glow: 'rgba(240, 135, 37, 0.32)',
    tint: 'rgba(240, 135, 37, 0.1)',
  },
};

export function getQuizOptionColor(colorName) {
  return quizOptionColors[colorName] ?? quizOptionColors.green;
}
