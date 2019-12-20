const makeMailContent = (challengerInfo) => {
  const subject = `[퀵킥] ${challengerInfo.team.name}으로부터 매치 요청이 들어왔습니다.`;
  const content = /*html*/ `
    <h1>신청자 정보</h1>
    <p>playerId: ${challengerInfo.playerId}</p>
    <p>name: ${challengerInfo.name}</p>
    <p>phone: ${challengerInfo.phone}</p>
    <p>email: ${challengerInfo.email}</p>
    <p>team.name: ${challengerInfo.team.name}</p>
  `;
  return { subject, content };
};

module.exports = makeMailContent;
