/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:44:12
 * @LastEditTime: 2024-10-28 16:53:19
 * @LastEditors: mulingyuer
 * @Description: 背景脚本
 * @FilePath: \serverless-api-tester\src\background\spirit-api-tester-background.ts
 * 怎么可能会有bug！！！
 */

import { localStorageGet } from "@/utils/tools";
import type { SpiritApiTester } from "./types";

/** 常量key */
const SERVERLESS_ID = "serverlessId";
const API_KEY = "apiKey";
const KEYWORD = "keyword";

// 命名空间
const spiritApiTester: SpiritApiTester = {
	/** 数据状态：loading、success、error */
	status: "loading",
	/** 接口地址 */
	baseUrl: "https://api-serverless.datastone.cn/v1",
	/** ServerLess ID */
	serverlessId: "",
	/** API key */
	apiKey: "",
	/** 关键词 */
	keyword: "",
	init: () => {}
};

/** 初始化命名空间 */
spiritApiTester.init = async function init() {
	// 更新数据状态
	spiritApiTester.status = "loading";

	spiritApiTester.serverlessId = await localStorageGet(SERVERLESS_ID, "");
	spiritApiTester.apiKey = await localStorageGet(API_KEY, "");
	spiritApiTester.keyword = await localStorageGet(KEYWORD, "");

	// 更新数据状态
	spiritApiTester.status = "success";
};

/** 初始化侧边栏 */
function initSidePanel() {
	// 点击侧边栏按钮打开侧边栏
	chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

/** 插件安装 */
chrome.runtime.onInstalled.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始化命名空间
	await spiritApiTester.init();
});

/** 插件启用 */
chrome.runtime.onStartup.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始化命名空间
	await spiritApiTester.init();
});
