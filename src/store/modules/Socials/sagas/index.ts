// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {scheduleSocialsSaga} from '@store/modules/Socials/sagas/scheduleSocials';
import {showSocialSaga} from '@store/modules/Socials/sagas/showSocial';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {takeLeading} from 'redux-saga/effects';

export const socialsWatchers = isLightDesign
  ? []
  : [
      takeLeading(
        [
          AppCommonActions.APP_STATE_CHANGE.STATE.type,
          AppCommonActions.APP_INITIALIZED.SUCCESS.type,
        ],
        showSocialSaga,
      ),
      takeLeading(
        TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
        scheduleSocialsSaga,
      ),
    ];
