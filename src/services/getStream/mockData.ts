// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';

export const mockedNotifications = [
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(30, 'minutes').toISOString(),
    verb: 'level',
    foreign_id: 'level:id:1',
    extra: {
      description: 'Your level is now **28**',
      imageUrl: 'https://i.postimg.cc/CxRm9YYm/Frame-4076280-3x.png',
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(8, 'days').toISOString(),
    verb: 'joined',
    foreign_id: 'joined:id:1',
    extra: {
      description: '**@monyka** has joined your team',
      deeplink: 'staging.ice.app://users/0123ba01-c196-4a37-b0d4-63936b8e6ac9',
      imageUrl:
        'https://w0.peakpx.com/wallpaper/286/639/HD-wallpaper-black-and-white-beautiful-girl-portrait-of-a-girl-face.jpg',
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(8, 'days').toISOString(),
    verb: 'joined',
    foreign_id: 'joined:id:1',
    extra: {
      description: '**@John** and **3 others** have joined your team',
      imageUrls: [
        'https://laughingsquid.com/wp-content/uploads/2013/07/20130722-12002032-flag.jpg',
        'https://w0.peakpx.com/wallpaper/286/639/HD-wallpaper-black-and-white-beautiful-girl-portrait-of-a-girl-face.jpg',
        'https://www.sony.co.uk/alphauniverse/assets/resized/2022/02/Davide-Oricchio-profile_square_582x582.jpg',
      ],
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(9, 'days').toISOString(),
    verb: 'joined',
    foreign_id: 'joined:id:2',
    extra: {
      description: '**@Doe** has joined your team',
      deeplink: 'staging.ice.app://users/0123ba01-c196-4a37-b0d4-63936b8e6ac9',
      imageUrl:
        'https://www.sony.co.uk/alphauniverse/assets/resized/2022/02/Davide-Oricchio-profile_square_582x582.jpg',
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(11, 'days').toISOString(),
    verb: 'joined',
    foreign_id: 'joined:id:3',
    extra: {
      description: '**@Maximus** has joined your team',
      deeplink: 'staging.ice.app://users/0123ba01-c196-4a37-b0d4-63936b8e6ac9',
      imageUrl: 'https://i.ytimg.com/vi/IHxRqJ-9D4M/maxresdefault.jpg',
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(1, 'months').toISOString(),
    verb: 'badge',
    foreign_id: 'badge:id:1',
    extra: {
      description: 'You have unlocked "ice Breaker" badge',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0055/1249/5177/products/Honorary-Pin-Gold.jpg?v=1564194008',
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(2, 'months').toISOString(),
    verb: 'news',
    foreign_id: 'news:id:1',
    extra: {
      description:
        'Ukrainian art museum to preserve art and cultural heritage through NFT auction',
      deeplink: 'https://cryptonews.net/news/nft/14307519/',
      imageUrl:
        'https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202111/tinyML_0.jpg?itok=brIBdXLy',
    },
  },
  {
    actor: '-',
    object: '+',
    time: dayjs().subtract(2, 'years').toISOString(),
    verb: 'pinged',
    foreign_id: 'pinged:id:1',
    extra: {
      description: '**SelmmaSheryras** has pinged you, wake up!',
      imageUrl:
        'https://w0.peakpx.com/wallpaper/286/639/HD-wallpaper-black-and-white-beautiful-girl-portrait-of-a-girl-face.jpg',
    },
  },
];

export const mockedAnnouncements = [
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:1',
    extra: {
      description: 'Youtube deeplinking test v1',
      deeplink: 'staging.ice.app://browser&url=https%3A%2F%2Fyoutube.com',
      imageUrl:
        'https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202006/MIT-Evaluating-Performance_0-2.jpg?itok=8DR__Um9',
    },
    time: dayjs().subtract(30, 'minutes').toISOString(),
  },
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:2',
    extra: {
      description: 'Youtube deeplinking test v2',
      deeplink: 'https://youtube.com',
      imageUrl:
        'https://media.istockphoto.com/photos/cloud-computing-picture-id1145589623?k=20&m=1145589623&s=170667a&w=0&h=67IXzeBMXnYN_ypu3m93FoouH_yTzwa1VzR1K6SKO5Q=',
    },
    time: dayjs().subtract(4, 'days').toISOString(),
  },
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:3',
    extra: {
      description: 'The Merge is Coming?',
      deeplink:
        'https://blockchain.news/news/seven-web3-firms-form-alliance-focusing-on-data-privacy',
      imageUrl:
        'https://media.istockphoto.com/photos/cloud-computing-data-center-server-rack-connection-in-neural-network-picture-id1310129219?b=1&k=20&m=1310129219&s=170667a&w=0&h=poqLA9iCzHMQ_apSbzmHmlpc_RZLyC3bipPSNtXbkFs=',
    },
    time: dayjs().subtract(8, 'days').toISOString(),
  },
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:4',
    extra: {
      description: 'Could Today’s CPI Data be Bullish?',
      deeplink:
        'https://blockchain.news/news/seven-web3-firms-form-alliance-focusing-on-data-privacy',
      imageUrl:
        'https://media.istockphoto.com/photos/cloud-computing-picture-id630022096?k=20&m=630022096&s=612x612&w=0&h=UOY8u7SCaX3g3nzvvyp2CtnP6ZRDgaqeS63LXOd3eOE=',
    },
    time: dayjs().subtract(15, 'days').toISOString(),
  },
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:5',
    extra: {
      description: 'Will a Bitcoin ETF be Launched This Month?',
      deeplink:
        'https://blockchain.news/news/seven-web3-firms-form-alliance-focusing-on-data-privacy',
      imageUrl:
        'https://media.istockphoto.com/photos/digital-earth-5g-ai-technology-picture-id1132986308?k=20&m=1132986308&s=170667a&w=0&h=0JzM0XPchkn2gQGiZx1yTBk3e-xm4NFBXx10g4C7bro=',
    },
    time: dayjs().subtract(1, 'months').toISOString(),
  },
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:6',
    extra: {
      description: 'Ethereum’s Merge Event has a New September',
      deeplink:
        'https://blockchain.news/news/seven-web3-firms-form-alliance-focusing-on-data-privacy',
      imageUrl:
        'https://media.istockphoto.com/photos/sign-of-the-wireless-technology-picture-id1186955933?s=612x612',
    },
    time: dayjs().subtract(4, 'months').toISOString(),
  },
  {
    actor: '-',
    object: '+',
    verb: 'announcements',
    foreign_id: 'announcements:id:7',
    extra: {
      description: 'The importance of blockchain across',
      deeplink:
        'https://blockchain.news/news/seven-web3-firms-form-alliance-focusing-on-data-privacy',
      imageUrl:
        'https://media.tag24.de/951x634/r/l/rlc7ss6nwah9n0qetisv6lfs9gzgm38y.jpg',
    },
    time: dayjs().subtract(2, 'years').toISOString(),
  },
];
