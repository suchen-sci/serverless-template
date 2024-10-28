/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:45:58
 * @LastEditTime: 2024-10-28 16:51:17
 * @LastEditors: mulingyuer
 * @Description: 工具函数
 * @FilePath: \serverless-api-tester\src\utils\tools.ts
 * 怎么可能会有bug！！！
 */

/** 写入持久化数据 */
export async function localStorageSet(key: string, value: any) {
	chrome.storage.local.set({ key: value });
}

/** 获取持久化数据 */
export async function localStorageGet(key: string, defaultValue: any) {
	const localData = await chrome.storage.local.get(key);
	const value = localData?.[key];
	if (typeof value === "undefined" && typeof defaultValue !== "undefined") {
		return defaultValue;
	}
	return value;
}
