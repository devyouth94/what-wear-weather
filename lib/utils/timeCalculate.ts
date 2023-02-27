export const longNowTime = (date: string) => {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Seoul',
  }).format(new Date(date));
};

export const shortNowTime = (date: number) => {
  return new Intl.DateTimeFormat('ko-KR', {
    timeStyle: 'short',
  }).format(new Date(date * 1000));
};
