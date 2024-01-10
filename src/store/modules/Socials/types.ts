// SPDX-License-Identifier: ice License 1.0

import {socialTypesOrder} from '@store/modules/Socials/data';

export type SocialType = typeof socialTypesOrder[number];

export type SocialsShare = {
  type: SocialType;
  dateToShow: string;
  shared: boolean;
};
