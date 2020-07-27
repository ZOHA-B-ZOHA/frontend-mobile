// 쿠폰 얻었을 때의 행동도 쓰기!!!!
// scan에서.
//

// 쓸 수 없는 쿠폰은 누를 수 없게 막기. 혹시 눌렸을 때도 서버에서 처리하고

// 아 유저 시나리오를 분기를 정확히 다 짜서 검토해 봐야 할 듯....ㅜㅜㅜㅜ

// 아 랭킹 데이터도 받아야 함!!!!

// reward를 v-for를 써서 보여 주려면 유니크한 key가 필요해서
// reward의 id나 식별 가능한 키 같은 거 같이 받을 것!!!!!!

const fakeData = {
  main: {
    request: null,
    response: {
      data: {
        achievement: 0.5,
        justEarned: false,
      },
    },
  },
  authenticate: {
    request: {
      data: {
        phoneNumber: '01012345678',
      },
    },
    response: {
      data: {
        achievement: 0.51,
        justEarned: false,
        currentUser: {
          phoneNumber: '01012345678',
          purchaseQuantity: {
            firstRound: 5,
            secondRound: 4,
          },
          rewards: [
            {
              round: 'first',
              type: 'bogo',
              status: 'expired'
            },
            {
              round: 'first',
              type: 'free',
              status: 'used'
            },
            {
              round: 'second',
              type: 'bogo',
              status: 'unused'
            },
          ],
        },
      },
    },
  },
  scan: {
    request: {
      data: {
        phoneNumber: '01012345678',
        branch: '도서관점', // 생각해 보니까 이걸 까먹었다.... QR코드에 넣을 수도 있지만
        verificationCode: 'erod3i9.x91r-134mt0c8134t=134t+',
      },
    },
    response: {
      data: {
        achievement: 0.52,
        justEarned: true,
      },
    },
  },
  redeem: {
    request: {
      data: {
        round: 'second',
        type: 'bogo',
        status: 'unused',
      },
    },
    response: {
      data: {
        round: 'second',
        type: 'bogo',
        status: 'used',
      },
    },
  },
};

export default fakeData;
