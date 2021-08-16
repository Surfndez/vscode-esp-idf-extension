import { expect } from "chai";
import { Workbench, EditorView, WebView, By, InputBox } from "vscode-extension-tester";
import { resolve } from "path";

describe("SDKConfig Editor", () => {
  let view: WebView;

  before(async function () {
    this.timeout(250000);
    await new Promise((res) => setTimeout(res, 5000));
    await new Workbench().executeCommand("file: open folder");
    const testWorkspaceDir = resolve(__dirname, "..", "..", "testFiles", "testWorkspace");
    await new Promise((res) => setTimeout(res, 1000));
    const input = await InputBox.create();
    await input.setText(testWorkspaceDir);
    await input.confirm();
    await new Promise((res) => setTimeout(res, 8000));
    await new Workbench().executeCommand("espIdf.menuconfig.start");
    await new Promise((res) => setTimeout(res, 100000));
  });

  after(async () => {
    if (view) {
      await view.switchBack();
    }
    await new EditorView().closeAllEditors();
  });

  it("findWebElement works", async () => {
    view = new WebView();
    await view.switchToFrame();
    const element = await view.findWebElement(By.id("searchbar-save"));
    expect(await element.getText()).has.string("Save");
  }).timeout(999999);
});
