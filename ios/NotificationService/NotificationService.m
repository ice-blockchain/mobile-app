// SPDX-License-Identifier: ice License 1.0

#import "NotificationService.h"
#import "FirebaseMessaging.h"
@import MoEngageRichNotification;

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    if ([request.content.userInfo objectForKey:@"moengage"]) {
      [MoEngageSDKRichNotification setAppGroupID: @"group.io.ice"];
      [MoEngageSDKRichNotification handleWithRichNotificationRequest:request withContentHandler:contentHandler];
    } else {
      [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
    }
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
