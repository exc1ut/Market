export const getRole = (num: number) => {
  if (num === 0) return 'Продавец';
  if (num === 1) return 'Администратор';
  return 'Суперадминистратор';
};
