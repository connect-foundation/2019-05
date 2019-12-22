const _ = require('lodash');

// author candidates
const boostCamperInfo = [
  { teamNum: 1, name: '김희선' },
  { teamNum: 1, name: '함형규' },
  { teamNum: 1, name: '서보현' },
  { teamNum: 1, name: '조영도' },
  { teamNum: 2, name: '김도현' },
  { teamNum: 2, name: '김재원' },
  { teamNum: 2, name: '이미림' },
  { teamNum: 2, name: '조애리' },
  { teamNum: 3, name: '김재현' },
  { teamNum: 3, name: '정소영' },
  { teamNum: 3, name: '전형진' },
  { teamNum: 3, name: '남정호' },
  { teamNum: 4, name: '김희라' },
  { teamNum: 4, name: '김준표' },
  { teamNum: 4, name: '우혜주' },
  { teamNum: 4, name: '육지수' },
  { teamNum: 5, name: '언더독1' },
  { teamNum: 5, name: '언더독2' },
  { teamNum: 5, name: '언더독3' },
  { teamNum: 5, name: '언더독4' },
  { teamNum: 6, name: '배형진' },
  { teamNum: 6, name: '성재호' },
  { teamNum: 6, name: '이정환' },
  { teamNum: 6, name: '홍종화' },
  { teamNum: 7, name: '오창영' },
  { teamNum: 7, name: '이수정' },
  { teamNum: 7, name: '이재민' },
  { teamNum: 7, name: '조찬기' },
  { teamNum: 8, name: '고승빈' },
  { teamNum: 8, name: '김경래' },
  { teamNum: 8, name: '김기표' },
  { teamNum: 8, name: '이상원' },
  { teamNum: 9, name: '권기웅' },
  { teamNum: 9, name: '나영균' },
  { teamNum: 9, name: '장기원' },
  { teamNum: 9, name: '조정현' },
  { teamNum: 10, name: '강관훈' },
  { teamNum: 10, name: '권혁우' },
  { teamNum: 10, name: '김동환' },
  { teamNum: 10, name: '김지혜' },
  { teamNum: 11, name: '서준배' },
  { teamNum: 11, name: '최성찬' },
  { teamNum: 11, name: '홍승표' },
  { teamNum: 11, name: '황선준' },
  { teamNum: 12, name: '문종현' },
  { teamNum: 12, name: '육진혁' },
  { teamNum: 12, name: '이용호' },
  { teamNum: 12, name: '조성동' },
  { teamNum: 13, name: '김건욱' },
  { teamNum: 13, name: '김영준' },
  { teamNum: 13, name: '유진관' },
  { teamNum: 13, name: '임문수' },
  { teamNum: 14, name: '권태욱' },
  { teamNum: 14, name: '김윤환' },
  { teamNum: 14, name: '박다정' },
  { teamNum: 14, name: '윤준환' },
  { teamNum: 15, name: '손진아' },
  { teamNum: 15, name: '이지영' },
  { teamNum: 15, name: '이창권' },
  { teamNum: 15, name: '최형준' },
  { teamNum: 16, name: '김세진' },
  { teamNum: 16, name: '이수배' },
  { teamNum: 16, name: '이아람' },
  { teamNum: 16, name: '임태현' },
  { teamNum: 17, name: '박상은' },
  { teamNum: 17, name: '우연서' },
  { teamNum: 17, name: '이규종' },
  { teamNum: 17, name: '이영훈' },
  { teamNum: 18, name: '신철현' },
  { teamNum: 18, name: '이준호' },
  { teamNum: 18, name: '조민지' },
  { teamNum: 18, name: '크롱' },
  { teamNum: 19, name: '김민성' },
  { teamNum: 19, name: '김한비' },
  { teamNum: 19, name: '신정수' },
  { teamNum: 19, name: '윤경호' },
  { teamNum: 20, name: '고경표' },
  { teamNum: 20, name: '여재환' },
  { teamNum: 20, name: '이석재' },
  { teamNum: 20, name: '호눅스' },
  { teamNum: 21, name: '권혁' },
  { teamNum: 21, name: '김근영' },
  { teamNum: 21, name: '김유준' },
  { teamNum: 21, name: '홍태의' },
  { teamNum: 22, name: '윤현담' },
  { teamNum: 22, name: '이인정' },
  { teamNum: 22, name: '이효은' },
  { teamNum: 22, name: '신용우' },
  { teamNum: 23, name: '모드리치' },
  { teamNum: 23, name: '호날두' },
  { teamNum: 23, name: '메시' },
  { teamNum: 23, name: '카카' },
  { teamNum: 24, name: '칸나바로' },
  { teamNum: 24, name: '호나우지뉴' },
  { teamNum: 24, name: '셉첸코' },
  { teamNum: 24, name: '네드베드' },
  { teamNum: 25, name: '호나우두' },
  { teamNum: 25, name: '오언' },
  { teamNum: 25, name: '피구' },
  { teamNum: 25, name: '히바우두' },
];

const TEST_EMAIL = 'samrho.dev@gmail.com';
const TEST_PHONE = '01033084808';

const stadiumSet = [
  {
    name: '송파 천마풋살파크',
    address: '서울 송파구 마천동 68-21',
  },
  {
    name: '도봉 루다풋살장',
    address: '서울 도봉구 방학동 271-2',
  },
  { name: '은평 롯데몰', address: '서울 은평구 통일로 105' },
  {
    name: '목동 크라우드76',
    address: '서울 양천구 목동서로 170',
  },
  {
    name: '동대문 토모풋살파크',
    address: '서울 동대문구 전농동 647-1',
  },
  {
    name: '노원 하라풋살구장',
    address: '서울 노원구 상계동 764-1',
  },
  {
    name: '올팍축구장',
    address: '서울시 송파구 올림픽공원 벨로드롬 내 축구장',
  },
  {
    name: '도봉 라온풋살장',
    address: '서울 도봉구 방학동 553-2',
  },
  {
    name: '아디다스 더베이스 서울',
    address: '서울 용산구 한강대로23길 55 현대아이파크몰',
  },
  {
    name: '루프탑필드 목동점',
    address: '서울 양천구 목동서로 170 홈플러스',
  },
  {
    name: '카미노 풋살아레나',
    address: '서울 금천구 남부순환로 1372 현경빌딩',
  },
  {
    name: '로꼬풋살아레나 신도림점',
    address: '서울 구로구 신도림로11나길 8',
  },
  {
    name: '루다 풋살장',
    address: '서울 도봉구 방학로 223 신동아프라자',
  },
  { name: '퍼스트사커', address: '서울 광진구 뚝섬로 54' },
  {
    name: 'SND 풋살장',
    address: '서울 강남구 역삼로 150 영빌딩',
  },
  {
    name: '주사랑FC풋살장 삼천',
    address: '서울 송파구 석촌호수로 140 잠실레이크타워',
  },
  {
    name: '고덕 배수지 풋살장',
    address: '서울 강동구 아리수로 185 고덕풋살장',
  },
  {
    name: '잠실 종합운동장 제1풋살장',
    address: '서울 송파구 올림픽로 25 잠실종합운동장제1풋살장',
  },
  {
    name: '잠실 종합운동장 제2풋살장',
    address: '서울 송파구 올림픽로 25 잠실종합운동장제2풋살장',
  },
  {
    name: '잠실 종합운동장 제3풋살',
    address: '서울 송파구 올림픽로 25 잠실종합운동장제3풋살장',
  },
  {
    name: '망원 유수지체육공원 풋살구장',
    address: '서울 마포구 월드컵로25길 190',
  },
  {
    name: '서울 월드컵경기장 풋살구장',
    address: '서울 마포구 성산동',
  },
  {
    name: 'e편한세상 옥수파크힐스 풋살장',
    address: '서울 성동구 옥수동',
  },
  {
    name: '성내유수지 풋살장',
    address: '서울 송파구 방이동 88-13',
  },
  {
    name: '강남 도곡FC 풋살장',
    address: '서울 강남구 선릉로 207',
  },
];

const SeoulDistrictSet = [
  'CNO',
  'CGS',
  'YSN',
  'SDG',
  'KJI',
  'TDM',
  'CNG',
  'SBK',
  'KBK',
  'TBG',
  'NWN',
  'UPG',
  'SDM',
  'MPO',
  'YGC',
  'KSS',
  'KRO',
  'KCN',
  'YDP',
  'TJK',
  'KNK',
  'SCO',
  'KNM',
  'SPA',
  'KDG',
];
const emblems = [
  '1.png',
  '2.png',
  '3.jpeg',
  '4.png',
  '5.jpg',
  '6.png',
  '7.jpg',
  '8.jpg',
  '9.png',
  '10.png',
  '11.png',
  '12.png',
  '13.png',
  '14.png',
  '15.jpg',
  '16.png',
  '17.jpg',
  '18.jpeg',
  '19.png',
  '20.png',
  '21.png',
  '22.png',
  '23.jpeg',
  '24.png',
  '25.jpg',
];

const Team = [
  {
    name: '쌍칼 FC',
    logo: emblems[0],
    homeArea: 'CNO',
    introduction: '야인시대 쌍칼과 같이 남자답게 풋살하는 팀 입니다.',
  },
  {
    name: 'FC 명동성당',
    logo: emblems[1],
    homeArea: 'CGS',
    introduction:
      '명동 성당 성도들로 이뤄진 FC 명동성당 입니다. 승패 보다는 함께 땀 흘리는 걸 더 좋아합니다.',
  },
  {
    name: '전자상가 FC',
    logo: emblems[2],
    homeArea: 'YSN',
    introduction: '용산 전자상가 상인들의 풋살 팀! 상대 시 컴퓨터 특가 할인!!',
  },
  {
    name: '성수동 FC',
    logo: emblems[3],
    homeArea: 'SDG',
    introduction:
      '거칠게 플레이 하지 않습니다. 구두 공장 운영하는 사람들로 이루어져 있습니다.',
  },
  {
    name: '팀 언더독스',
    logo: emblems[4],
    homeArea: 'KJI',
    introduction:
      '패배가 예상되는 플레이어들의 모임인 언더독스 축구부 입니다. 주로 6:6 풋살을 즐기며 선출 없습니다.',
  },
  {
    name: 'FS 동대문',
    logo: emblems[5],
    homeArea: 'TDM',
    introduction:
      '팀 전원 풋살화 착용, 4호 사이즈 풋살공 사용, 유니폼은 빨간색 입니다.',
  },
  {
    name: '중랑천 풋살회',
    logo: emblems[6],
    homeArea: 'CNG',
    introduction:
      '중랑천 둔치 풋살장을 주로 사용하고 있는 중랑구 풋살팀입니다. 가입 문의는 연령불문 누구나 환영합니다.',
  },
  {
    name: '성북회',
    logo: emblems[7],
    homeArea: 'SBK',
    introduction:
      '성북구 아저씨들로 이루어진 친목팀입니다. 아직 발을 맞춘 지 얼마 되지 않아 많이 미흡합니다^^',
  },
  {
    name: '강북 족쟁이',
    logo: emblems[8],
    homeArea: 'KBK',
    introduction:
      '20중~30초. 창단 3년된 팀입니다. 평소 축구만 하다가 풋살로 전향을 안거라 아직 많이 부족합니다. 한수 배우겠습니다.',
  },
  {
    name: '쌍문고 동창회',
    logo: emblems[9],
    homeArea: 'TBG',
    introduction:
      '쌍문고 동창회 친목 풋살팀입니다. 풋살보다는 친목이 우선인지라 실력이 부족합니다.',
  },
  {
    name: '상계 FC',
    logo: emblems[10],
    homeArea: 'NWN',
    introduction:
      '1990년 창단.. 30여년 전통의 노원구 최고 명문 풋살팀 상계 FC입니다. 연령대는 20대부터 50대 까지 다양합니다. 잘 부탁 드려요',
  },
  {
    name: '불광FC',
    logo: emblems[11],
    homeArea: 'UPG',
    introduction:
      '불광동 선수출신들만 모아놓은 풋살팀 불광FC입니다. 선출들이 많은 만큼 저희는 수준 높은 경기력을 지향합니다. 저희와 함께 수준 높은 풋살을 경험해보시고 싶은 분은 연락 부탁드립니다.',
  },
  {
    name: '형무소 FC',
    logo: emblems[12],
    homeArea: 'SDM',
    introduction:
      '서대문 형무소 근처 풋살장에서 주로 운동하는 형무소 FC 입니다.',
  },
  {
    name: '상암 웨스턴',
    logo: emblems[13],
    homeArea: 'MPO',
    introduction:
      '20대 중후반 정도 되시는 책임감 있고 개념탑재 되신분\n' +
      '\n' +
      ' \n' +
      '\n' +
      '거의 중하매칭 위주로 하기때문에 그냥 운동하러오시는분\n' +
      '\n' +
      '기본기 안되는 초보자분은 죄송합니다\n' +
      '\n' +
      '오셔도 아마 벨런스가 안맞을거에요ㅠㅡㅠ\n',
  },
  {
    name: 'FC 스피릿',
    logo: emblems[14],
    homeArea: 'YGC',
    introduction:
      '- 선출 없는 순수 아마추어팀입니다.\n' +
      '- 저희가 어린 팀이다 보니 나이대가 있으신 분들 죄송하지만\n' +
      '정중히 거절하겠습니다.\n' +
      '그리고 경기 잡았다가 파토내시는 분들이 간혹 계셔서 구장비는 없지만 보증금형태로 일부 받았다가 오시면 드리겠습니다.\n' +
      '- 물만 좀 준비해주시면 감사하겠습니다!\n',
  },
  {
    name: '강서 리버풀',
    logo: emblems[15],
    homeArea: 'KSS',
    introduction:
      '안녕하세요 fc코기입니다🤚 취미로 매월 2회씩 축구활동을 하려고 합니다. 떄로는 진지하게 때로는 유쾌하게 친목을 다지는 축구 동호회  라고 할 수 있습니다. 실력과 상관없이 배려 깊은 회원님 모십니다~ 실력과 상관없어서 간단한 미팅과 연습을 통해 진행하려고 합니다. 같이 공차면서 좋은 사람 좋은 추억 만들어보아요 ! \n',
  },
  {
    name: '구로티카',
    logo: emblems[16],
    homeArea: 'KRO',
    introduction:
      '팀인원 충원 중입니다. 매주 일요일 10-16시 사이 2시간 운동 진행합니다. 친목도모 위주로 팀 운영중이지만, division-6리그, 서울시민리그 등 대회도 매년 참가하고 있습니다. 운동할때나 밖에서나 서로 활발한 교류를 하며 지내고 있습니다. 임원진들이 딱딱한 분위기를 정말 싫어하기때문에 오시면 정말 편하고 즐겁게 운동하실 수 있을겁니다. \n',
  },
  {
    name: '유니온스',
    logo: emblems[17],
    homeArea: 'KCN',
    introduction:
      '저희는 침목으로 게임을 하는 스마일FC입니다.\n' +
      '\n' +
      '실력은 중하 정도 되고 승부보다 재미로 게임을 하는 팀입니다.\n' +
      '\n' +
      '\n' +
      '\n' +
      '실력이 출중하지 않으시더라고 꾸준한 참석과 매너를 가지고 계신\n' +
      '\n' +
      '분들이면 환영합니다.\n',
  },
  {
    name: '레니언스',
    logo: emblems[18],
    homeArea: 'YDP',
    introduction:
      '현재 홈구장으로는 목동 홈플러스 6층 풋살 구장에서 한달 4회 공을 차고 있습니다.\n' +
      '\n' +
      '\n' +
      '연령대는 20대 후반~30대 후반 등 직장인을 우대하며, 친목도모 하는 순수동호회입니다.\n' +
      '\n' +
      '실력은 하 이지만 축구열정 만큼은 남부럽지 않으니 많은 관심 부탁드립니다.\n',
  },
  {
    name: 'FC 리턴',
    logo: emblems[19],
    homeArea: 'TJK',
    introduction:
      '현재 인원은 총 20명이고, (20~25명 인원조정 중입니다.)\n' +
      '\n' +
      '나이대는 20~30 대 입니다. \n' +
      '공차는걸 좋아하나 나이가 들면서 마음맞는 사람들과 공차기 힘드신분들,\n' +
      '즐겁게 주말 운동하실 분 연락 주십시요!\n',
  },
  {
    name: '서울대학교 교직원 풋살팀',
    logo: emblems[20],
    homeArea: 'KNK',
    introduction:
      '저희는 매주 목요일 오전에 풋살을 하는 마포조기풋살 (마조풋) 팀입니다.\n' +
      '평일 오전시간에 여유가 되시는 분들이 모여 즐겁게 운동하고 있는 팀으로 실력을 우선으로 하기보단 열심히 뛰며 안전을 최우선으로 과격하지 않게 운동하고 있습니다!\n',
  },
  {
    name: '리작',
    logo: emblems[21],
    homeArea: 'SCO',
    introduction:
      '저희팀은 은평 스카이필드 풋살장을 전용구장으로 사용하고 있습니다.\n' +
      '장기 계약 되어있기 때문에 계속사용 하는 구장이고요\n' +
      '1년 운영해오면서 많은 구장에서 뛰었고 서울에서 가장좋은 풋살장중에 하나인지라 여기로 정착하게 되었습니다.\n' +
      '지하철 구파발역과 연결되어 있어 내리시면 바로이고 게임 운영시간 이후 지하철이 운행함으로 서울에 계신분은 집에가는것은 걱정없이 가실 수 있습니다.\n' +
      '회원 분들의 지역은 영등포구 동작구 서대문구 마포구 양천구 강서구 은평구 광명 용산구 중구등 다양한편인데 아주잘 다니고계십니다.\n',
  },
  {
    name: '백야 FC',
    logo: emblems[22],
    homeArea: 'KNM',
    introduction:
      '실력은 크게 중요하지 않습니다만 기본패스만 되시면 되고요\n' +
      '풋살팀에서 회식 및 원정 매치도 합니다.\n' +
      '자주 참가하시고 축구도 중요하지만 팀원분들과 잘어울릴 수 있는분을 찾고있습니다.\n' +
      '\n' +
      '팀에서 시간이 되는 분들끼리 매칭을 잡아서 원정 경기를 한달에 한두번씩 가고있어서\n' +
      '축구에 열정이 있으신분들은 아주 재미있는 팀이 되실거라 생각됩니다.\n' +
      '\n' +
      '요약으로\n' +
      '실력은 패스정도되면 상관없고\n' +
      '20 대 중후반에서 30대 후반 까지 맴버로 모집,\n' +
      '패스 플레이를 중요하게 여기는 팀인지라\n' +
      '개인기 위주로 축구하시는분은 거절하겠습니다.\n' +
      '회식및 매치 원정등 풋살팀 행사에 자주 참가하실 수 있으신분을 찾고 있습니다.\n',
  },
  {
    name: '두산 베어스',
    logo: emblems[23],
    homeArea: 'SPA',
    introduction:
      '송파구 잠실동 종합운동장 풋살장을 홈으로 사용하고있는 FC스텝포워드 풋살 클럽입니다.\n' +
      '\n' +
      '\n' +
      '\n' +
      '저희 연령대는 20대 중반부터 30대 후반까지 포괄적으로 분포되 있습니다.\n' +
      '\n' +
      '\n' +
      '\n' +
      '매주 토요일 오후나 저녁시간에 6:6 경기를 진행하고 있습니다.\n' +
      '\n' +
      '\n' +
      '\n' +
      '실력있으신분 없으신분 모두 모두 매너만 있으면 환영하겠습니다.\n',
  },
  {
    name: '천호 풋살회',
    logo: emblems[24],
    homeArea: 'KDG',
    introduction:
      '저희는 초창기 3명으로 시작하여 지금은 20대 30대 23명의 회원이 매주 즐겁게 운동하고 있는 골든에이지 팀입니다. 향후 햑교 홈구장 계약 추진과 노원구 관외팀 등록이 예정되어 있습니다. 실력 부담 가지시지 마시고 한 번 함께 차보시고 팀 안에서 소중한 인연을 만들어 나갔으면 좋겠습니다. 많은 문의 부탁드립니다!\n',
  },
];

const Player = boostCamperInfo.map((playerInfo, idx) => {
  return {
    playerId: `${idx + 1}`,
    team: null,
    name: playerInfo.name,
    phone: TEST_PHONE,
    email: TEST_EMAIL,
    authProvider: 'NAVER',
  };
});

const dates = [
  '2019-12-23',
  '2019-12-24',
  '2019-12-25',
  '2019-12-26',
  '2019-12-27',
  '2019-12-28',
  '2019-12-29',
  '2019-12-30',
  '2019-12-31',
  '2020-01-01',
  '2020-01-02',
  '2020-01-03',
  '2020-01-04',
  '2020-01-05',
  '2020-01-06',
  '2020-01-07',
  '2020-01-08',
  '2020-01-09',
  '2020-01-10',
  '2020-01-11',
  '2020-01-12',
  '2020-01-13',
  '2020-01-14',
  '2020-01-15',
  '2020-01-16',
  '2020-01-17',
  '2020-01-18',
  '2020-01-19',
  '2020-01-20',
  '2020-01-21',
  '2020-01-22',
  '2020-01-23',
  '2020-01-24',
  '2020-01-25',
  '2020-01-26',
  '2020-01-27',
  '2020-01-28',
  '2020-01-29',
  '2020-01-30',
  '2020-01-31',
];

const times = [
  { startTime: '06:00', endTime: '07:00' },
  { startTime: '07:00', endTime: '08:00' },
  { startTime: '08:00', endTime: '09:00' },
  { startTime: '09:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '11:00' },
  { startTime: '11:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '13:00' },
  { startTime: '13:00', endTime: '14:00' },
  { startTime: '14:00', endTime: '15:00' },
  { startTime: '15:00', endTime: '16:00' },
  { startTime: '16:00', endTime: '17:00' },
  { startTime: '17:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '19:00' },
  { startTime: '19:00', endTime: '20:00' },
  { startTime: '20:00', endTime: '21:00' },
  { startTime: '21:00', endTime: '22:00' },
  { startTime: '22:00', endTime: '23:00' },
];

const descriptionDummy = [
  '우천시에도 진행합니다.',
  '실력 위주의 선출 팀입니다. 고려해주세요.',
  '실력과 무관하게 즐겁게 공차는걸 좋아하는 팀입니다. 빡팀 사절',
  '예약은 경기장 비용 선입금순으로 확정됩니다.',
  '전원 풋살화 착용 반드시 부탁드립니다.',
  '인원이 확실히 준비된 팀만 연락 주세요',
  '단순 변심 시 구장비 돌려드리지 않습니다.',
];

const generateSet = () => {
  const newDistrict = _.shuffle(SeoulDistrictSet);
  return stadiumSet.map((val, idx) => {
    return {
      author: {
        connect: {
          seq: Math.ceil((idx + 1) / 4),
        },
      },
      host: {
        connect: {
          seq: idx + 1,
        },
      },
      status: 'OPEN',
      description: descriptionDummy[idx % 7],
      stadium: val.name,
      address: val.address,
      area: newDistrict[idx],
    };
  });
};

const createData = () => {
  return dates.reduce((acc, date) => {
    const oneDayMatch = times.reduce((accumulator, time) => {
      const oneTimezoneMatch = generateSet().map((set) => {
        return {
          ...set,
          startTime: time.startTime,
          endTime: time.endTime,
          date,
        };
      });
      return [...accumulator, ...oneTimezoneMatch];
    }, []);
    return [...acc, ...oneDayMatch];
  }, []);
};

const Match = createData();

module.exports = { Player, Team, Match };
