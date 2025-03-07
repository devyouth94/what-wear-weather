/**
 * 좌표 변환 결과 인터페이스
 */
type ConversionResult = {
  // 위도 (WGS84)
  lat: number;
  // 경도 (WGS84)
  lng: number;
  // 기상청 X 좌표
  x: number;
  // 기상청 Y 좌표
  y: number;
};

/**
 * 기상청 좌표계 변환 함수
 * LCC DFS 좌표변환 (Lambert Conformal Conic Projection)
 *
 * @param code - 변환 코드 "toXY"(위경도->좌표) 또는 "toLL"(좌표->위경도)
 * @param v1 - code가 "toXY"면 위도(lat), "toLL"이면 x좌표
 * @param v2 - code가 "toXY"면 경도(lng), "toLL"이면 y좌표
 * @returns 변환된 좌표 객체 {lat, lng, x, y} 중 일부
 *
 * 사용 예:
 * const rs = dfs_xy_conv("toLL", 60, 127);
 * console.log(rs.lat, rs.lng); // 위도, 경도 출력
 *
 * const rs2 = dfs_xy_conv("toXY", 37.579871128849334, 126.98935225645432);
 * console.log(rs2.x, rs2.y); // 기상청 XY 좌표 출력
 */
const dfs_xy_conv = (
  code: 'toXY' | 'toLL',
  v1: number,
  v2: number,
): Partial<ConversionResult> => {
  // 지구 반경(km)
  const RE: number = 6371.00877;
  // 격자 간격(km)
  const GRID: number = 5.0;
  // 투영 위도1(degree)
  const SLAT1: number = 30.0;
  // 투영 위도2(degree)
  const SLAT2: number = 60.0;
  // 기준점 경도(degree)
  const OLON: number = 126.0;
  // 기준점 위도(degree)
  const OLAT: number = 38.0;
  // 기준점 X좌표(GRID)
  const XO: number = 43;
  // 기준점 Y좌표(GRID)
  const YO: number = 136;

  // 라디안 변환 상수
  const DEGRAD: number = Math.PI / 180.0;
  const RADDEG: number = 180.0 / Math.PI;

  const re: number = RE / GRID;
  const slat1: number = SLAT1 * DEGRAD;
  const slat2: number = SLAT2 * DEGRAD;
  const olon: number = OLON * DEGRAD;
  const olat: number = OLAT * DEGRAD;

  let sn: number =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf: number = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro: number = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  const rs: Partial<ConversionResult> = {};

  if (code === 'toXY') {
    // 위경도를 기상청 XY 좌표로 변환
    rs.lat = v1;
    rs.lng = v2;

    let ra: number = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);

    let theta: number = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    // 기상청 XY 좌표를 위경도로 변환
    rs.x = v1;
    rs.y = v2;

    const xn: number = v1 - XO;
    const yn: number = ro - v2 + YO;

    let ra: number = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) ra = -ra;

    let alat: number = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    let theta: number;
    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) theta = -theta;
      } else {
        theta = Math.atan2(xn, yn);
      }
    }

    const alon: number = theta / sn + olon;
    rs.lat = alat * RADDEG;
    rs.lng = alon * RADDEG;
  }

  return rs;
};

/**
 * 위도와 경도를 기상청 XY 좌표로 변환
 * @param lat - 위도 (WGS84)
 * @param lng - 경도 (WGS84)
 * @returns XY 좌표 객체 {x, y}
 */
export const convertLatLngToXY = (
  lat: number,
  lng: number,
): Pick<ConversionResult, 'x' | 'y'> => {
  const result = dfs_xy_conv('toXY', lat, lng);
  return {
    x: result.x!,
    y: result.y!,
  };
};

/**
 * 기상청 XY 좌표를 위도와 경도로 변환
 * @param x - 기상청 X 좌표
 * @param y - 기상청 Y 좌표
 * @returns 위경도 객체 {lat, lng}
 */
export const convertXYToLatLng = (
  x: number,
  y: number,
): Pick<ConversionResult, 'lat' | 'lng'> => {
  const result = dfs_xy_conv('toLL', x, y);
  return {
    lat: result.lat!,
    lng: result.lng!,
  };
};
