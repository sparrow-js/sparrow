// /api/mock2/options/level2?a=${a}
import * as qs from 'qs';

export const apiUrlParse = (url: string) => {
  const qsStr = qs.parse('/api/mock2/options/level2?a=${a}');
  console.log('********8*******', qsStr);
};