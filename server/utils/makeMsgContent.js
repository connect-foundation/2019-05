module.exports = (
  { date, startTime },
  { phone, team }
) => `[퀵킥 매치 신청 알림] ${date} ${startTime}  ${team.name}이 신청하였습니다. 연락처: ${phone}  
   `;
