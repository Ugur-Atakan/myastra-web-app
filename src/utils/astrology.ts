export const calculateZodiacSign = (month: number, day: number): string => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
};

export const getZodiacEmoji = (sign: string): string => {
  switch (sign) {
    case 'aries':
      return '♈️';
    case 'taurus':
      return '♉️';
    case 'gemini':
      return '♊️';
    case 'cancer':
      return '♋️';
    case 'leo':
      return '♌️';
    case 'virgo':
      return '♍️';
    case 'libra':
      return '♎️';
    case 'scorpio':
      return '♏️';
    case 'sagittarius':
      return '♐️';
    case 'capricorn':
      return '♑️';
    case 'aquarius':
      return '♒️';
    case 'pisces':
      return '♓️';
    default:
      return '';
  }
}

export const getLocalizedName = (sign: string): string => {
  switch (sign) {
    case 'aries':
      return 'Koç';
    case 'taurus':
      return 'Boğa';
    case 'gemini':
      return 'İkizler';
    case 'cancer':
      return 'Yengeç';
    case 'leo':
      return 'Aslan';
    case 'virgo':
      return 'Başak';
    case 'libra':
      return 'Terazi';
    case 'scorpio':
      return 'Akrep';
    case 'sagittarius':
      return 'Yay';
    case 'capricorn':
      return 'Oğlak';
    case 'aquarius':
      return 'Kova';
    case 'pisces':
      return 'Balık';
    default:
      return '';
  }
}
