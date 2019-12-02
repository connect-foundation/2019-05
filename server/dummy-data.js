const Team = [
  {
    name: 'String! not null',
    logo: null,
    homeArea: 'one of SB,SN,DN,DB !! not string! no quote!',
    introduction: 'String',
  },
];

const Player = [
  {
    playerId: 'String! naver identification value, not null',
    team: 'team sequence... Int..',
    name: 'String',
    phone: 'String',
    email: 'String',
  },
];

const Match = [
  {
    host: 'team sequence... Int.. not null',
    guest: null,
    stadium: 'String not null ...not null',
    address: 'String',
    area: 'one of SB,SN,DN,DB !! not string! no quote!',
    date: 'String not null',
    startTime: 'String not null',
    endTime: 'String not null',
    description: 'String',
    result: null,
  },
];
