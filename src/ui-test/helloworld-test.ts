import {
  Notification,
  NotificationType,
  VSBrowser,
  Workbench,
} from "vscode-extension-tester";
import { expect } from "chai";

describe("Hello world testing", async () => {
  it("Hello world notification show correct text", async () => {
    await new Workbench().executeCommand("Hello world");

    const notification = (await VSBrowser.instance.driver.wait(() => {
      return notificationExists("Hello");
    }, 2000)) as Notification;

    const msg = await notification.getMessage();
    const notificationType = await notification.getType();

    expect(msg).equals("Hello World!");
    expect(notificationType).equals(NotificationType.Info);
  }).timeout(999999);
});

async function notificationExists(
  text: string
): Promise<Notification | undefined> {
  const notifications = await new Workbench().getNotifications();
  for (const notification of notifications) {
    const message = await notification.getMessage();
    if (message.indexOf(text) >= 0) {
      return notification;
    }
  }
}
