/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 11:16:15
 * @LastEditTime: 2024-10-30 11:18:43
 * @LastEditors: mulingyuer
 * @Description: 谷歌浏览器通知
 * @FilePath: \serverless-api-tester\src\utils\chrome-notifications.ts
 * 怎么可能会有bug！！！
 */

/** 错误通知 */
export function errorNotification(options: { title?: string; message: string }) {
	const { title, message } = options;

	chrome.notifications.create({
		type: "basic",
		iconUrl: "/images/icon/error.png",
		title: title ?? "发生错误",
		message: message,
		priority: 0
	});
}
