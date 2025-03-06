interface MetropolitanCodes {
  [metropolitan: string]: string;
}

interface ProvinceCodes {
  [province: string]: {
    [city: string]: string;
  };
}

export const metropolitanCodes: MetropolitanCodes = {
  서울특별시: '11B10101',
  부산광역시: '11H20201',
  인천광역시: '11B20201',
  대전광역시: '11C20401',
  광주광역시: '11F20501',
  대구광역시: '11H10701',
  울산광역시: '11H20101',
  세종특별자치시: '11C20404',
};

export const provinceCodes: ProvinceCodes = {
  경기도: {
    과천시: '11B10102',
    광명시: '11B10103',
    강화군: '11B20101',
    김포시: '11B20102',
    시흥시: '11B20202',
    안산시: '11B20203',
    부천시: '11B20204',
    의정부시: '11B20301',
    고양시: '11B20302',
    양주시: '11B20304',
    파주시: '11B20305',
    동두천시: '11B20401',
    연천군: '11B20402',
    포천시: '11B20403',
    가평군: '11B20404',
    구리시: '11B20501',
    남양주시: '11B20502',
    양평군: '11B20503',
    하남시: '11B20504',
    수원시: '11B20601',
    안양시: '11B20602',
    오산시: '11B20603',
    화성시: '11B20604',
    성남시: '11B20605',
    평택시: '11B20606',
    의왕시: '11B20609',
    군포시: '11B20610',
    안성시: '11B20611',
    용인시: '11B20612',
    이천시: '11B20701',
    광주시: '11B20702',
    여주시: '11B20703',
  },
  강원특별자치도: {
    철원군: '11D10101',
    화천군: '11D10102',
    인제군: '11D10201',
    양구군: '11D10202',
    춘천시: '11D10301',
    홍천군: '11D10302',
    원주시: '11D10401',
    횡성군: '11D10402',
    영월군: '11D10501',
    정선군: '11D10502',
    평창군: '11D10503',
    태백시: '11D20301',
    속초시: '11D20401',
    고성군: '11D20402',
    양양군: '11D20403',
    강릉시: '11D20501',
    동해시: '11D20601',
    삼척시: '11D20602',
  },
  충청북도: {
    충주시: '11C10101',
    진천군: '11C10102',
    음성군: '11C10103',
    제천시: '11C10201',
    단양군: '11C10202',
    청주시: '11C10301',
    보은군: '11C10302',
    괴산군: '11C10303',
    증평군: '11C10304',
    영동군: '11C10402',
    옥천군: '11C10403',
  },
  충청남도: {
    서산시: '11C20101',
    태안군: '11C20102',
    당진시: '11C20103',
    홍성군: '11C20104',
    보령시: '11C20201',
    서천군: '11C20202',
    천안시: '11C20301',
    아산시: '11C20302',
    예산군: '11C20303',
    공주시: '11C20402',
    계룡시: '11C20403',
    부여군: '11C20501',
    청양군: '11C20502',
    금산군: '11C20601',
    논산시: '11C20602',
  },
  전북특별자치도: {
    전주시: '11F10201',
    익산시: '11F10202',
    정읍시: '11F10203',
    완주군: '11F10204',
    장수군: '11F10301',
    무주군: '11F10302',
    진안군: '11F10303',
    남원시: '11F10401',
    임실군: '11F10402',
    순창군: '11F10403',
    군산시: '21F10501',
    김제시: '21F10502',
    고창군: '21F10601',
    부안군: '21F10602',
  },
  전라남도: {
    함평군: '21F20101',
    영광군: '21F20102',
    진도군: '21F20201',
    완도군: '11F20301',
    해남군: '11F20302',
    강진군: '11F20303',
    장흥군: '11F20304',
    여수시: '11F20401',
    광양시: '11F20402',
    고흥군: '11F20403',
    보성군: '11F20404',
    순천시: '11F20405',
    장성군: '11F20502',
    나주시: '11F20503',
    담양군: '11F20504',
    화순군: '11F20505',
    구례군: '11F20601',
    곡성군: '11F20602',
    흑산도: '11F20701',
    목포시: '21F20801',
    영암군: '21F20802',
    신안군: '21F20803',
    무안군: '21F20804',
  },
  경상북도: {
    울진군: '11H10101',
    영덕군: '11H10102',
    포항시: '11H10201',
    경주시: '11H10202',
    문경시: '11H10301',
    상주시: '11H10302',
    예천군: '11H10303',
    영주시: '11H10401',
    봉화군: '11H10402',
    영양군: '11H10403',
    안동시: '11H10501',
    의성군: '11H10502',
    청송군: '11H10503',
    김천시: '11H10601',
    구미시: '11H10602',
    군위군: '11H10707',
    고령군: '11H10604',
    성주군: '11H10605',
    영천시: '11H10702',
    경산시: '11H10703',
    청도군: '11H10704',
    칠곡군: '11H10705',
    울릉군: '11E00101',
  },
  경상남도: {
    양산시: '11H20102',
    창원시: '11H20301',
    김해시: '11H20304',
    통영시: '11H20401',
    사천시: '11H20402',
    거제시: '11H20403',
    고성군: '11H20404',
    남해군: '11H20405',
    함양군: '11H20501',
    거창군: '11H20502',
    합천군: '11H20503',
    밀양시: '11H20601',
    의령군: '11H20602',
    함안군: '11H20603',
    창녕군: '11H20604',
    진주시: '11H20701',
    산청군: '11H20703',
    하동군: '11H20704',
  },
  제주특별자치도: {
    제주시: '11G00201',
    서귀포시: '11G00401',
  },
};
