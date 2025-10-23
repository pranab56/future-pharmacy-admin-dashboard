import React from "react";

import PushNotification from "./PushNotification";
import AllNotifications from './AllNotifications';

function NotificationsLayout() {
  return (
    <div>
      {/* <AllNotifications /> */}
      <PushNotification />
    </div>
  );
}

export default NotificationsLayout;
