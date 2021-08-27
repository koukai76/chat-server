export const gimmick = (str: string) => {
  const omikuji_arr = ['大吉', '中吉', '小吉', '吉', '半吉', '末吉', '末小吉'];
  const dice_arr = [1, 2, 3, 4, 5, 6];

  switch (str) {
    case 'サイコロ':
      return `サイコロを振って${
        dice_arr[Math.floor(Math.random() * dice_arr.length)]
      }が出ました`;
    case 'おみくじ':
      return `おみくじの結果: ${
        omikuji_arr[Math.floor(Math.random() * omikuji_arr.length)]
      }`;
    default:
      return null;
  }
};
