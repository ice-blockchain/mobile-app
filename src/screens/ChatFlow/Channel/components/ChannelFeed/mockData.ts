// SPDX-License-Identifier: ice License 1.0

import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {dayjs} from '@services/dayjs';

function getDaysBackTimestamp(daysBack: number) {
  const now = dayjs();
  return now.subtract(daysBack, 'days').valueOf();
}

function getMockedUserIcon() {
  const iconRandom = Math.floor(Math.random() * 20) + 1;
  return `https://ice-staging.b-cdn.net/profile/default-profile-picture-${iconRandom}.png`;
}

export async function fetchChannelPosts({}: {
  channelId: number;
  offset: number;
  limit: number;
}): Promise<ChannelPostData[]> {
  return [
    {
      id: 1,
      sourceName: 'ice',
      views: 29,
      postTimestamp: getDaysBackTimestamp(0),
      totalComments: 0,
      lastCommentatorsLogos: [],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },

      postText:
        'A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyon that has been here again.',
    },
    {
      id: 2,
      sourceName: 'ice',
      views: 29,
      postTimestamp: getDaysBackTimestamp(0),
      totalComments: 11000,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {},

      postImages: [
        'https://ice.io/wp-content/uploads/2023/02/Get-Ready-for-a-New-Era-The-Launch-of-the-ice-Project-600x403.png',
      ],
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyon that has been here again.",
    },
    {
      id: 3,
      sourceName: 'ice',
      views: 11000,
      postTimestamp: getDaysBackTimestamp(1),
      totalComments: 0,
      lastCommentatorsLogos: [],
      emojis: {
        '👍': {
          counter: 6,
          liked: true,
        },
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postImages: [
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now.png',
      ],
      postCaption: 'Welcome to ice. The global currency reset',
    },
    {
      id: 4,
      sourceName: 'ice',
      views: 29,
      postTimestamp: getDaysBackTimestamp(1),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postImages: [
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now.png',
      ],
      postLink: {
        link: 'https://ice.io/',
        source: 'ice: Network',
        sourceLogo:
          'https://ice-staging.b-cdn.net/profile/default-profile-picture-20.png',
        title:
          'Mine Cryptocurrency For Free With ice Mobile App - ice: Network',
        shortDescription:
          'ice is the newest digital currency that you can mine for free using your phone without any resources or battery drain. Download ice app today!',
      },
    },
    {
      id: 5,
      sourceName: 'ice',
      views: 29,
      edited: true,
      postTimestamp: getDaysBackTimestamp(1),
      totalComments: 0,
      lastCommentatorsLogos: [],
      emojis: {},
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our [[:link href='https://ice.io/']]own community[[/:link]] and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 6,
      sourceName: 'ice',
      views: 29,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postImages: [
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-ice-Network-A-Solution-to-Restore-Trust-in-Crypto-Assets-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/Is-it-too-late-to-get-into-the-crypto-game-600x403.png',
      ],
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our [[:link href='https://ice.io/']]own community[[/:link]] and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 7,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postEmoji: '👍',
    },
    {
      id: 8,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postFile: {
        fileName: 'Roadmap ice 2023.zip',
        fileSize: 1258291.2,
      },
      postText:
        'We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyon that has been here again.',
    },
    {
      id: 9,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postFile: {
        fileName: 'Whitelist ice.pdf',
        fileSize: 1258291.2,
      },
    },
    {
      id: 10,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postImages: [
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-ice-Network-A-Solution-to-Restore-Trust-in-Crypto-Assets-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/Is-it-too-late-to-get-into-the-crypto-game-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-ice-Network-A-Solution-to-Restore-Trust-in-Crypto-Assets-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/Is-it-too-late-to-get-into-the-crypto-game-600x403.png',
      ],
    },
    {
      id: 11,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      postImages: [
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-ice-Network-A-Solution-to-Restore-Trust-in-Crypto-Assets-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/Is-it-too-late-to-get-into-the-crypto-game-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-Future-is-Now-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-ice-Network-A-Solution-to-Restore-Trust-in-Crypto-Assets-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/Is-it-too-late-to-get-into-the-crypto-game-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/The-ice-Network-A-Solution-to-Restore-Trust-in-Crypto-Assets-600x403.png',
        'https://ice.io/wp-content/uploads/2023/02/Is-it-too-late-to-get-into-the-crypto-game-600x403.png',
      ],
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 12,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 1,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 13,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 2,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 14,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 3,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 15,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 4,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 16,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 5,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 17,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 6,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 18,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 7,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 19,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 8,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 20,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 9,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
    {
      id: 21,
      sourceName: 'ice',
      views: 37,
      postTimestamp: getDaysBackTimestamp(2),
      totalComments: 7,
      lastCommentatorsLogos: [
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
        getMockedUserIcon(),
      ],
      emojis: {
        '👍': {counter: 6},
        '🔥': {counter: 11},
        '😍': {counter: 10},
        '👎': {counter: 2},
      },
      replyToPost: 10,
      postText:
        "Especially when you attract new users. 🤟 I've already sent out an invitation to all my friends. A lot of them supported the initiative to use and earn together. We have also created our own community and there we communicate and discuss our achievements that we have seen by now here with everyone that has been here again.",
    },
  ];
}
