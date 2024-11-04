/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 11:16:15
 * @LastEditTime: 2024-11-01 15:28:40
 * @LastEditors: mulingyuer
 * @Description: 谷歌浏览器通知
 * @FilePath: \serverless-api-tester\src\utils\chrome-notifications\index.ts
 * 怎么可能会有bug！！！
 */

import type { ErrorNotificationOptions } from "./types";

export class ChromeNotifications {
	/** 错误通知 */
	static error(options: ErrorNotificationOptions | string) {
		let title = "发生错误";
		let message = "";

		if (typeof options === "string") {
			message = options;
		} else {
			title = options.title ?? title;
			message = options.message;
		}

		chrome.notifications.create({
			type: "basic",
			iconUrl: "/images/icon/error.png",
			title,
			message,
			priority: 0
		});
	}
}
