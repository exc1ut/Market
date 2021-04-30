export const apiAddress = localStorage.getItem('serverInfo');

export const generateRandomColor = () => {
  const number = Math.floor(Math.random() * 4);

  const colors = ['red', 'orange', 'green', 'blue', 'pink'];

  return colors[number];
};

export const roundNumber = (num: number) => {
  return Math.round(num * 100) / 100;
};
