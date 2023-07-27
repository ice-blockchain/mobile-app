// SPDX-License-Identifier: ice License 1.0

#import <RCTAppDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <FirebaseMessaging.h>

@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate, FIRMessagingDelegate>

// add this line to the @interface section of AppDelegate
@property (nonatomic, strong) NSString *moeDeeplink;

@end
