// SPDX-License-Identifier: ice License 1.0

package io.ice.app;

import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    // Replace 'MainActivity' with the value of android:name entry in
    // <activity> in AndroidManifest.xml
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<>(MainActivity.class, false, false);

    @Test
    public void runDetoxTests() {
        DetoxConfig detoxConfig = new DetoxConfig();
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 900;
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 600;
        detoxConfig.rnContextLoadTimeoutSec = (io.ice.app.BuildConfig.DEBUG ? 2000 : 600);

        Detox.runTests(mActivityRule, detoxConfig);
    }
}
