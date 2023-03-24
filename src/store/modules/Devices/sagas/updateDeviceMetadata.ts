// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {DeviceMetadata} from '@api/devices/types';
import {Api} from '@api/index';
import {DEVICE_METADATA_UPDATE_TIMEOUT_HOURS} from '@constants/timeouts';
import {dayjs} from '@services/dayjs';
import {getFcmToken} from '@services/firebase';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {
  isAppActiveSelector,
  isAppInitializedSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {
  deviceUniqueIdSelector,
  lastMetadataUpdateSelector,
} from '@store/modules/Devices/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {getTimezoneOffset} from '@utils/device';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import DeviceInfo from 'react-native-device-info';
import {all, call, put, select} from 'redux-saga/effects';

type Action = ReturnType<
  | typeof DeviceActions.UPDATE_DEVICE_METADATA.START.create
  | typeof AccountActions.USER_STATE_CHANGE.SUCCESS.create
  | typeof AppCommonActions.APP_INITIALIZED.SUCCESS.create
  | typeof AppCommonActions.APP_STATE_CHANGE.STATE.create
>;

export function* updateDeviceMetadataSaga(action: Action) {
  try {
    const forceUpdate =
      checkProp(action?.payload, 'forceUpdate') && action.payload.forceUpdate;

    const clearDeviceMetadata =
      checkProp(action?.payload, 'clearDeviceMetadata') &&
      action.payload.clearDeviceMetadata;

    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );
    const isSplashHidden: ReturnType<typeof isSplashHiddenSelector> =
      yield select(isSplashHiddenSelector);

    const isAppInitialized: ReturnType<typeof isAppActiveSelector> =
      yield select(isAppInitializedSelector);

    const lastUpdateDate: ReturnType<typeof lastMetadataUpdateSelector> =
      yield select(lastMetadataUpdateSelector);

    const hoursFromLastUpdate = lastUpdateDate
      ? dayjs().diff(lastUpdateDate, 'hours')
      : 0;

    const shouldUpdateMetadata =
      forceUpdate ||
      !lastUpdateDate ||
      hoursFromLastUpdate >= DEVICE_METADATA_UPDATE_TIMEOUT_HOURS;

    if (
      isAuthorized &&
      // wait the app to be initialized so the deviceUniqueId is populated
      isAppInitialized &&
      isAppActive &&
      isSplashHidden &&
      shouldUpdateMetadata
    ) {
      const hasPushPermissions: boolean = yield select(
        isPermissionGrantedSelector('pushNotifications'),
      );

      const data = {
        userId: select(userIdSelector),
        deviceUniqueId: select(deviceUniqueIdSelector),
        readableVersion: DeviceInfo.getReadableVersion(),
        fingerprint: DeviceInfo.getFingerprint(),
        instanceId: DeviceInfo.getInstanceId(),
        hardware: DeviceInfo.getHardware(),
        product: DeviceInfo.getProduct(),
        device: DeviceInfo.getDevice(),
        type: DeviceInfo.getType(),
        tags: DeviceInfo.getTags(),
        deviceName: DeviceInfo.getDeviceName(),
        carrier: DeviceInfo.getCarrier(),
        manufacturer: DeviceInfo.getManufacturer(),
        userAgent: DeviceInfo.getUserAgent(),
        pinOrFingerprintSet: DeviceInfo.isPinOrFingerprintSet(),
        emulator: DeviceInfo.isEmulator(),
        firstInstallTime: DeviceInfo.getFirstInstallTime().then(time =>
          time === -1 ? dayjs().valueOf() : time,
        ),
        lastUpdateTime: DeviceInfo.getLastUpdateTime().then(time =>
          time === -1 ? dayjs().valueOf() : time,
        ),
        apiLevel: DeviceInfo.getApiLevel().then(apiLevel =>
          apiLevel === -1 ? 999 : apiLevel,
        ),
        buildId: DeviceInfo.getBuildId(),
        codename: DeviceInfo.getCodename(),
        installerPackageName: DeviceInfo.getInstallerPackageName(),
        baseOS: DeviceInfo.getBaseOs(),
        bootloader: DeviceInfo.getBootloader(),
        deviceId: DeviceInfo.getDeviceId(),
        deviceType: DeviceInfo.getDeviceType(),
        brand: DeviceInfo.getBrand(),
        tablet: DeviceInfo.isTablet(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        pushNotificationToken:
          hasPushPermissions && !clearDeviceMetadata ? getFcmToken() : '',
        tz: getTimezoneOffset(),
      };

      const resolvedMetadata: {
        [key in keyof typeof data]: Awaited<typeof metadata[key]>;
      } = yield all(data);

      const metadata: DeviceMetadata = resolvedMetadata;

      yield call(Api.devices.updateDeviceMetadata, {metadata});

      yield put(DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.create());
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    if (isApiError(error, 400, 'UPDATE_REQUIRED')) {
      yield put(
        DeviceActions.UPDATE_DEVICE_METADATA.FAILED.create(
          errorMessage,
          error.response?.data?.code,
        ),
      );
    } else {
      yield put(
        DeviceActions.UPDATE_DEVICE_METADATA.FAILED.create(errorMessage),
      );
      throw error;
    }
  }
}
