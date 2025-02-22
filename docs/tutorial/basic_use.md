# Basic use of the extension.

In this tutorial you will learn how to use the basic commands of this extension to develop your application with Espressif devices.

You have several options to create a project:

- Using one the examples from ESP-IDF or any additional supported framework using the **ESP-IDF: Show Examples Projects** command.
- Use one of the templates included with this extension using the **ESP-IDF: Create ESP-IDF project** command.

> **NOTE:** To configure any additional supported framework, please review [configuring additional frameworks](./additional_frameworks.md)

1. Let's use the ESP-IDF get-started's blink example for this tutorial. Click menu View -> Command Palette... and type **ESP-IDF: Show Examples Projects** and choose `Use current ESP-IDF (/path/to/esp-idf)`. If the user doesn't see the option, please review the setup in [Install tutorial](./install.md).
2. A window will be open with a list a projects, go the **get-started** section and choose the `blink_example`. You will see a **Create blink_example project** button in the top and a description of the project below. Click **Create blink_example project** button.

<p>
  <img src="../../media/tutorials/basic_use/blink_example.png" alt="Blink example" height="500">
</p>

3. Now select a container directory where to copy the example project. For example, if the user choose `/Users/myUser/someFolder` the resulting folder will be `/Users/myUser/someFolder/blink`. This new project directory will be created and opened in Visual Studio Code.

4. First the user should select an Espressif target (esp32, esp32s2, etc.) with the **ESP-IDF: Set Espressif device target** command. Default is `esp32` and the one used in this tutorial.

5. Next configure your project using menuconfig. Use the **ESP-IDF: SDK Configuration editor** command (<kbd>CTRL</kbd> <kbd>E</kbd> <kbd>G</kbd> keyboard shortcut ) where the user can modify the ESP-IDF project settings. After all changes are made, click save and close this window.

<p>
  <img src="../../media/tutorials/basic_use/gui_menuconfig.png" alt="GUI Menuconfig" height="500">
</p>

6. Configure the `.vscode/c_cpp_properties.json` as explained in [C/C++ Configuration](../C_CPP_CONFIGURATION.md).

7. Now to build the project, use the **ESP-IDF: Build your project** command (<kbd>CTRL</kbd> <kbd>E</kbd> <kbd>B</kbd> keyboard shortcut). The user will see a new terminal being launched with the build output and a notification bar with Building Project message until it is done then a Build done message when finished. You could modify the behavior of the build task with `idf.cmakeCompilerArgs` for Cmake configure step and `idf.ninjaArgs` for Ninja step. For example, using  `[-j N]` where N is the number of jobs run in parallel.

> **NOTE:** There is a `idf.notificationSilentMode` configuration setting if the user does not wants to see the output automatically. Please review [ESP-IDF Settings](../SETTINGS.md)) to see how to modify this configuration setting.

<p>
  <img src="../../media/tutorials/basic_use/build.png" alt="Building" width="975">
</p>

8. (OPTIONAL) Use the **ESP-IDF: Size analysis of the binaries** command (<kbd>CTRL</kbd> <kbd>E</kbd> <kbd>S</kbd> keyboard shortcut) to review the application size information.

<p>
  <img src="../../media/tutorials/basic_use/size.png" alt="Size" height="500">
</p>

8. Before flashing the project, the user needs to specify the serial port of the device with the **ESP-IDF: Select port to use** command (<kbd>CTRL</kbd> <kbd>E</kbd> <kbd>P</kbd> keyboard shortcut). You can choose between UART/JTAG flashing mode and then a list of serial ports will be shown for the user to select.

> **NOTE:** Please take a look at [ESP-PROG board the instructions](https://docs.espressif.com/projects/espressif-esp-iot-solution/en/latest/hw-reference/ESP-Prog_guide.html#step-by-step-instruction) or [Configuring ESP32 Target](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-guides/jtag-debugging/index.html#configuring-esp32-target) your Espressif device and JTAG interface to your computer.

9. Now to flash the project, use the **ESP-IDF: Flash your project** command (<kbd>CTRL</kbd> <kbd>E</kbd> <kbd>F</kbd> keyboard shortcut). Choose UART flash mode ([Configure JTAG flashing](#About-JTAG-flashing)) and the flashing will start. The user will see a new terminal being launched with the flash output and a notification bar with Flashing Project message until it is done then a Flash done message when finished.

> **NOTE:** There is an `idf.flashBaudRate` configuration settings to modify the flashing baud rate. Please review [ESP-IDF Settings](../SETTINGS.md) to see how to modify this configuration setting.

<p>
  <img src="../../media/tutorials/basic_use/flash.png" alt="Flashing" width="975">
</p>

10. Now to start monitoring your device, use the **ESP-IDF: Monitor your device** command (<kbd>CTRL</kbd> <kbd>E</kbd> <kbd>M</kbd> keyboard shortcut). The user will see a new terminal being launched with the `idf.py monitor` output.

> **NOTE** The ESP-IDF Monitor default baud rate value is taken from your project's skdconfig `CONFIG_ESPTOOLPY_MONITOR_BAUD` (idf.py monitor' baud rate). This value can be override by setting the environment variable `IDF_MONITOR_BAUD` or `MONITORBAUD` in your system environment variables or this extension's `idf.customExtraVars` configuration setting. Please review [ESP-IDF Settings](../SETTINGS.md)) to see how to modify `idf.customExtraVars`.

<p>
  <img src="../../media/tutorials/basic_use/monitor.png" alt="Monitor" width="975">
</p>

## Next steps

You can debug ESP-IDF projects as shown in the [debug tutorial](./debugging.md).

The **ESP-IDF: Open ESP-IDF Terminal** will launch a system terminal with ESP-IDF, ESP-IDF tools and ESP-IDF python virtual environment loaded as environment variables. Just typing `idf.py` or `esptool.py` should work to execute scripts from ESP-IDF and additional frameworks.

See other [ESP-IDF extension features](../FEATURES.md).

## About JTAG flashing

JTAG flash mode requires openOCD v0.10.0-esp32-20201125 or later. To replace openOCD, just get one of the latest [openOCD releases](https://github.com/espressif/openocd-esp32/releases) and replace in `idf.customExtraPaths` the openOCD binary path like:

```
c:\\esp\\tools\\.espressif\\tools\\openocd-esp32\\v0.10.0-esp32-20200709\\openocd-esp32\\bin
```

for the bin directory of your desired openOCD release

```
c:\\esp\\tools\\.espressif\\tools\\openocd-esp32\\v0.10.0-esp32-20201202\\openocd-esp32\\bin
```

Also update `idf.customExtraVars` OPENOCD_SCRIPTS to the new OpenOCD Scripts folder path.

Please review [ESP-IDF Settings](../SETTINGS.md) to see how to modify these values.
