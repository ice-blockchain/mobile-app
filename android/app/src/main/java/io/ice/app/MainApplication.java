// SPDX-License-Identifier: ice License 1.0

package io.ice.app;
import android.content.res.Configuration;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.moengage.core.MoEngage;
import com.moengage.core.config.NotificationConfig;
import com.moengage.core.config.LogConfig;
import com.moengage.core.LogLevel;
import com.moengage.core.DataCenter;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHostWrapper(this, new DefaultReactNativeHost(this) {
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

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      });

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    MoEngage.Builder moEngage =
            new MoEngage.Builder(this, BuildConfig.MO_ENGAGE_APP_ID)
                .configureNotificationMetaData(new NotificationConfig(R.drawable.ic_stat_notification, R.drawable.ic_stat_notification, R.color.splashscreen_bg, true, true, true))
                .configureLogs(new LogConfig(LogLevel.INFO, false));
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
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }
}
