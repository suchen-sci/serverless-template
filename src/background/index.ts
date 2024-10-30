/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:44:12
 * @LastEditTime: 2024-10-30 16:33:56
 * @LastEditors: mulingyuer
 * @Description: 背景脚本
 * @FilePath: \serverless-api-tester\src\background\index.ts
 * 怎么可能会有bug！！！
 */
import { errorNotification } from "@/utils/chrome-notifications";
import { messageStrategy } from "./message-strategy";
import { SpiritApiTester } from "./spirit-api-tester";

const spiritApiTester = new SpiritApiTester();
const strategy = messageStrategy(spiritApiTester);

/** 初始化侧边栏 */
function initSidePanel() {
	// 点击侧边栏按钮打开侧边栏
	chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

/** 插件安装 */
chrome.runtime.onInstalled.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始核心类
	await spiritApiTester.init();
});

/** 插件启用 */
chrome.runtime.onStartup.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始核心类
	await spiritApiTester.init();
});

/** 监听消息 */
chrome.runtime.onMessage.addListener((message: CustomMessage, sender, sendResponse) => {
	const { type } = message;

	if (typeof strategy[type] === "function") {
		strategy[type](message, sender, sendResponse);
		return true;
	} else {
		const message = `未知消息类型: ${type}`;
		sendResponse(new Error(message));
		errorNotification({ message });
	}

	return true;
});
