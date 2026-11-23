// src/utils/format.js
const TYPE_LABELS = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  remote: 'Remoto',
};

const SALARY_LABELS = {
  'under-50k': 'Menos de 50k',
  '50k-100k': '50k - 100k',
  '100k-150k': '100k - 150k',
  'over-150k': 'Más de 150k',
};

export const formatType = (type) => TYPE_LABELS[type] ?? type;
export const formatSalary = (salary) => SALARY_LABELS[salary] ?? salary;
