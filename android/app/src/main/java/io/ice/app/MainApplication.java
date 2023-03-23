// SPDX-License-Identifier: ice License 1.0

package io.ice.app;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.moengage.core.MoEngage;
import com.moengage.core.config.NotificationConfig;
import com.moengage.core.config.LogConfig;
import com.moengage.core.LogLevel;
import com.moengage.core.DataCenter;
import com.facebook.soloader.SoLoader;
import io.ice.app.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);

    MoEngage.Builder moEngage =
            new MoEngage.Builder(this, BuildConfig.MO_ENGAGE_APP_ID)
                .configureNotificationMetaData(new NotificationConfig(R.drawable.ic_stat_notification, R.drawable.ic_stat_notification, R.color.splashscreen_bg, true, true, true))
                .configureLogs(new LogConfig(LogLevel.WARN, false));
    switch (BuildConfig.MO_ENGAGE_APP_DOMAIN) {
      case "DATA_CENTER_01": {
        moEngage.setDataCenter(DataCenter.DATA_CENTER_1);
        break;
      }
      case "DATA_CENTER_02": {
        moEngage.setDataCenter(DataCenter.DATA_CENTER_2);
        break;
      }
      case "DATA_CENTER_03": {
        moEngage.setDataCenter(DataCenter.DATA_CENTER_3);
        break;
      }
      case "DATA_CENTER_04": {
        moEngage.setDataCenter(DataCenter.DATA_CENTER_4);
        break;
      }
    }
    MoEngage.initialiseDefaultInstance(moEngage.build());

    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("io.ice.app.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
