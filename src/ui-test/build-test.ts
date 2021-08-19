import {
  InputBox,
  Notification,
  NotificationType,
  VSBrowser,
  Workbench,
} from "vscode-extension-tester";
import { expect } from "chai";
import { resolve } from "path";
import { pathExists } from "fs-extra";

describe("Build testing", async () => {

  before(async function () {
    this.timeout(100000);
    await openTestProject();
  });

  it("Build command notification show correct text", async () => {
    await new Workbench().executeCommand("ESP-IDF: Build your project");
    await new Promise((res) => setTimeout(res, 360000));
    // const notification = (await VSBrowser.instance.driver.wait(() => {
    //   return notificationExists("Build");
    // }, 2000)) as Notification;

    // const msg = await notification.getMessage();
    // const notificationType = await notification.getType();

    // expect(msg).equals("Build Successfully");
    // expect(notificationType).equals(NotificationType.Info);
    const testBinPath = resolve(__dirname, "..", "..", "testFiles", "testWorkspace", "build", "hello-world.bin");
    const binExists = await pathExists(testBinPath);
    expect(binExists).equals(true);
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

export async function openTestProject() {
  await new Promise((res) => setTimeout(res, 5000));
  await new Workbench().executeCommand("file: open folder");
  const testWorkspaceDir = resolve(__dirname, "..", "..", "testFiles", "testWorkspace");
  await new Promise((res) => setTimeout(res, 1000));
  const input = await InputBox.create();
  await input.setText(testWorkspaceDir);
  await input.confirm();
  await new Promise((res) => setTimeout(res, 4000));
}
