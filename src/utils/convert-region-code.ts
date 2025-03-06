import { metropolitanCodes, provinceCodes } from '~/src/constants/region-code';

export const convertAddressToRegionCode = (address: string) => {
  const [depth1, depth2] = address.split(' ');

  if (metropolitanCodes[depth1]) {
    return metropolitanCodes[depth1];
  }

  if (provinceCodes[depth1] && provinceCodes[depth1][depth2]) {
    return provinceCodes[depth1][depth2];
  }

  return null;
};
