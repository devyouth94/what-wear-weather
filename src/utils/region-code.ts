import {
  landForecastCodes,
  metropolitanCodes,
  provinceCodes,
} from '~/src/constants/region-code';

export const convertAddressToRegionCode = (address: string) => {
  const [depth1, depth2] = address.split(' ');

  if (metropolitanCodes[depth1]) {
    return metropolitanCodes[depth1];
  }

  if (provinceCodes[depth1] && provinceCodes[depth1][depth2]) {
    return provinceCodes[depth1][depth2];
  }

  return '11B10101';
};

export const convertAddressToLandForecastCode = (address: string) => {
  const [depth1, depth2] = address.split(' ');

  // 강원특별자치도인 경우 영서/영동 구분
  if (depth1 === '강원특별자치도') {
    // 영동 지역 (강릉, 속초, 동해, 삼척, 고성, 양양, 태백)
    const eastCoastCities = [
      '강릉시',
      '속초시',
      '동해시',
      '삼척시',
      '고성군',
      '양양군',
      '태백시',
    ];

    if (eastCoastCities.includes(depth2)) {
      return landForecastCodes['강원도영동'];
    } else {
      return landForecastCodes['강원도영서'];
    }
  }

  // 다른 지역은 직접 매핑
  if (landForecastCodes[depth1]) {
    return landForecastCodes[depth1];
  }

  // 기본값 (서울/인천/경기)
  return '11B00000';
};
