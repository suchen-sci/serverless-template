/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:44:12
 * @LastEditTime: 2024-10-31 15:29:39
 * @LastEditors: mulingyuer
 * @Description: 背景脚本
 * @FilePath: \serverless-api-tester\src\background\index.ts
 * 怎么可能会有bug！！！
 */

import { ContextMenus } from "./context-menus";

/** 初始化侧边栏 */
function initSidePanel() {
	// 点击侧边栏按钮打开侧边栏
	chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

/** 插件安装 */
chrome.runtime.onInstalled.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始化菜单
	new ContextMenus().init();
});

/** 插件启用 */
chrome.runtime.onStartup.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始化菜单
	new ContextMenus().init();
});
