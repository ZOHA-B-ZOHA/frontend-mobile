const fakeData = {
  main: {
    request: null,
    response: {
      data: {
        achievement: 0.5,
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
        justEarned: false, // 이것도 빼도 될 것 같긴 한데..?!
        ranking: [
          {
            phoneNumber: '01011112222',
            purchaseQuantity: 6,
          },
          {
            phoneNumber: '01012345678',
            purchaseQuantity: 5,
          },
          {
            phoneNumber: '01022221111',
            purchaseQuantity: 4,
          },
        ],
        currentUser: {
          phoneNumber: '01012345678',
          purchaseQuantity: {
            firstRound: 3,
            secondRound: 2,
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
  verify: {
    request: {
      data: {
        phoneNumber: '01012345678',
        branch: '도서관점', // 생각해 보니까 이 정보를 QR코드에 넣을 수도 있겠다
        purchaseQuantity: 10,
        verificationCode: 'erod3i9.x91r-134mt0c8134t=134t+', // 아무말임
      },
    },
    response: {
      data: {
        achievement: 0.52,
        justEarned: true,
        purchaseCount: 3,
        newReward: {
          round: 'second',
          type: 'bogo',
          status: 'unused'
        },
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
