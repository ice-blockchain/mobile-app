// SPDX-License-Identifier: ice License 1.0

import {DISABLE_ALL_NOTIFICATION_DOMAIN} from '@api/devices/constants';
import {
  NotificationDeliveryChannel,
  NotificationDomainToggle,
} from '@api/devices/types';
import {SocialType} from '@screens/InviteFlow/InviteShare/components/ShareButton/types';
import {Attributes, trackEvent} from '@services/analytics';
import {dayjs} from '@services/dayjs';
import {store} from '@store/configureStore';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {
  ClaimBonusResult,
  EventNamesType,
  TapToMineActionType,
} from '@store/modules/Analytics/types';
import {enabledNotificationDomainsSelector} from '@store/modules/Devices/selectors';

export const EVENT_NAMES = {
  INVITE: 'Invite',
  INVITE_CONTACT_BY_SMS: 'Invite Contact by SMS',
  INVITE_FRIENDS_BANNER_PRESSED: 'Invite Friends Banner',
  OPEN_ARTICLE: 'Open Article',
  TERMS_OF_SERVICE: 'Terms of Service',
  PRIVACY_POLICY: 'Privacy Policy',
  SEND_FEEDBACK: 'Send Feedback',
  TAP_TO_MINE: 'Tap To Mine',
  TEAM_NUMBER_CONFIRMED: 'Team Number Confirmed',
  LOGIN: 'Login',
  REGISTER: 'Register',
  VIEW_SCREEN: 'View Screen',
  CLAIM_BONUS: 'Claim Bonus',
  TURN_OFF_NOTIFICATIONS: 'Turn Off Notifications',
  TURN_ON_NOTIFICATIONS: 'Turn On Notifications',
  CHANGE_LANGUAGE: 'Change Language',
  CHANGE_PROFILE_PICTURE: 'Change Profile Picture',
  SHARE_PROFILE_USERNAME: 'Share Telegram Username',
  PING: 'Ping',
} as const;

export const AnalyticsEventLogger = {
  trackEvent: (params: {eventName: EventNamesType}) => {
    trackEvent(params);
  },
  trackInvite: ({inviteAppType}: {inviteAppType: SocialType}) => {
    trackEvent({
      eventName: EVENT_NAMES.INVITE,
      eventProps: {App: inviteAppType},
    });
  },
  trackOpenArticle: ({articleName}: {articleName: string}) => {
    trackEvent({
      eventName: EVENT_NAMES.OPEN_ARTICLE,
      eventProps: {Name: articleName},
    });
  },
  trackTapToMine: ({
    tapToMineActionType,
  }: {
    tapToMineActionType: TapToMineActionType;
  }) => {
    trackEvent({
      eventName: EVENT_NAMES.TAP_TO_MINE,
      eventProps: {'Tap to Mine': tapToMineActionType},
    });
    if (tapToMineActionType !== 'Info') {
      Attributes.trackUserAttributeISODateString(
        'Last mining start',
        dayjs().toISOString(),
      );
    }
  },
  trackViewScreen: ({screenName}: {screenName: string}) => {
    trackEvent({
      eventName: EVENT_NAMES.VIEW_SCREEN,
      eventProps: {'Screen Name': screenName},
    });
  },
  trackClaimBonus: ({
    claimBonusResult,
  }: {
    claimBonusResult: ClaimBonusResult;
  }) => {
    trackEvent({
      eventName: EVENT_NAMES.CLAIM_BONUS,
      eventProps: {Result: claimBonusResult},
    });
  },
  trackChangeLanguage: ({newLanguage}: {newLanguage: string}) => {
    const currentLanguage = appLocaleSelector(store.getState());
    trackEvent({
      eventName: EVENT_NAMES.CHANGE_LANGUAGE,
      eventProps: {
        'Old language': currentLanguage,
        'New language': newLanguage,
      },
    });
  },
  trackChangeProfilePicture: () => {
    trackEvent({
      eventName: EVENT_NAMES.CHANGE_PROFILE_PICTURE,
    });
  },
  trackShareTelegramUsername: ({tgUsername}: {tgUsername: string}) => {
    trackEvent({
      eventName: EVENT_NAMES.SHARE_PROFILE_USERNAME,
      eventProps: {
        'Telegram Username': tgUsername,
      },
    });
  },
  trackPingUser: ({username}: {username: string}) => {
    trackEvent({
      eventName: EVENT_NAMES.PING,
      eventProps: {
        'Pinged User': username,
      },
    });
  },
  trackNotificationSettingsUpdate: ({
    notificationChannel,
    notificationDeliveryChannel,
  }: {
    notificationChannel: NotificationDomainToggle;
    notificationDeliveryChannel: NotificationDeliveryChannel;
  }) => {
    const {type, enabled} = notificationChannel;
    if (type === DISABLE_ALL_NOTIFICATION_DOMAIN) {
      trackEvent({
        eventName: enabled
          ? EVENT_NAMES.TURN_OFF_NOTIFICATIONS
          : EVENT_NAMES.TURN_ON_NOTIFICATIONS,
        eventProps: {
          Param: 'All',
        },
      });
    } else {
      trackEvent({
        eventName: enabled
          ? EVENT_NAMES.TURN_ON_NOTIFICATIONS
          : EVENT_NAMES.TURN_OFF_NOTIFICATIONS,
        eventProps: {
          Param: type,
        },
      });
    }

    AnalyticsAttributesLogger.updateNotificationPreferences({
      notificationDeliveryChannel,
    });
  },
};

export const AnalyticsAttributesLogger = {
  updateNotificationPreferences: ({
    notificationDeliveryChannel,
  }: {
    notificationDeliveryChannel: NotificationDeliveryChannel;
  }) => {
    const enabledNotificationDomains = enabledNotificationDomainsSelector(
      notificationDeliveryChannel,
    )(store.getState());
    const attributeName =
      notificationDeliveryChannel === 'push'
        ? 'Push preferences'
        : 'Email preferences';
    Attributes.trackUserAttribute(
      attributeName,
      enabledNotificationDomains.toString(),
    );
  },
  updateEmailPreferences: () => {
    const enabledNotificationDomains = enabledNotificationDomainsSelector(
      'email',
    )(store.getState());
    Attributes.trackUserAttribute(
      'Email preferences',
      enabledNotificationDomains.toString(),
    );
  },
};
