import wd from 'wd';
import chai from 'chai';

const { assert } = chai;

describe('send whchat msg to specify contact', function () {

    let driver;

    before(async function () {
        // Connect to Appium server
        driver = await wd.promiseChainRemote({
            host: 'localhost',
            port: 4723
        });

        // Start the session
        await driver.init({
            "platformName": "Android",
            "platformVersion": "7.0",
            "deviceName": "Redmi_Note_4X",
            "udid": "99bee08a0604",
            "appActivity": "com.tencent.mm.ui.LauncherUI",
            "appPackage": "com.tencent.mm",
            "noReset": true,
            "automationName": "UiAutomator2",
            "app": ""
        });
    });

    after(async function () {
        await driver.quit();
    });

    it('should click contact and sendmsg and back', async function () {

        await driver.sleep(3000);
        //driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        //driver.implicitly_wait(5);

        // 获取联系人对话框
        const contactBoxElement = await driver.elementByXPath('//android.view.View[@resource-id="com.tencent.mm:id/as6" and @text="Bingo"]')
        await contactBoxElement.click();

        // 找到消息输入框
        const msgBoxElement = await driver.elementById('com.tencent.mm:id/ac8');
        await msgBoxElement.click();

        // 输入消息内容
        await msgBoxElement.sendKeys('Hello world!');

        // 找到发送按钮
        const sendBtnElement = await driver.elementById('com.tencent.mm:id/acd');
        await sendBtnElement.click();

        assert.equal('Hello world!', 'Hello world!');
    });
});