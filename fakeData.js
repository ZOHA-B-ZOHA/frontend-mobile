const api_main = {
  request: null,
  response: {
    data: {
      achievement: 0.5,
    },
  },
};

const api_authenticate = {
  request: {
    data: {
      phoneNumber: '01012345678',
    },
  },
  response: {
    data: {
      achievement: 0.51,
      currentUser: {
        phoneNumber: '01012345678',
        purchaseQuantity: {
          firstRound: 3,
          secondRound: 2,
        },
      },
    },
  },
};

const api_rankings = {
  request: {
    data: {
      phoneNumber: '01012345678',
    },
  },
  response: {
    data: {
      rankings: [
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
        {
          phoneNumber: '01022221112',
          purchaseQuantity: 4,
        },
        {
          phoneNumber: '01022221110',
          purchaseQuantity: 3,
        },
      ],
    },
  },
};

const api_verify = {
  request: {
    data: {
      phoneNumber: '01012345678',
      branch: '도서관점', // 생각해 보니까 이 정보를 QR코드에 넣을 수도 있겠다
      purchaseQuantity: 10,
      verificationCode: 'zohabzohafighting',
    },
  },
  response: {
    data: {
      achievement: 0.52,
      justEarned: true,
      purchaseCount: 3,
      purchaseQuantity: {
        firstRound: 3,
        secondRound: 12,
      },
      complete: false,
    },
  },
};

const api_rewards = {
  request: {
    data: {
      phoneNumber: '01012345678',
    },
  },
  response: {
    data: {
      rewards: {
        firstRoundPlus: 'used', // null|'unavailable'|'unused'|'used'|'expired'
        firstRoundFree: 'expired',
        secondRoundPlus: 'unused',
        secondRoundFree: null,
      },
    },
  },
};

const api_redeem = {
  request: {
    data: {
      phoneNumber: '1234567890',
      rewardType: 'secondRoundPlus',
    },
  },
  response: {
    data: {
      rewards: {
        firstRoundPlus: 'used', // null|'unavailable'|'unused'|'used'|'expired'
        firstRoundFree: 'expired',
        secondRoundPlus: 'used',
        secondRoundFree: null,
      },
    },
  },
};

export {
  api_main,
  api_authenticate,
  api_rankings,
  api_verify,
  api_rewards,
  api_redeem,
};
