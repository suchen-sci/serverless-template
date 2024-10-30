/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 09:38:47
 * @LastEditTime: 2024-10-30 10:57:15
 * @LastEditors: mulingyuer
 * @Description: 谷歌插件类型声明文件
 * @FilePath: \serverless-api-tester\types\chrome.d.ts
 * 怎么可能会有bug！！！
 */
import { ChromeMessageType } from "@/enums/chrome-message";

declare global {
	/** 自定义消息类型 */
	interface CustomMessage {
		type: ChromeMessageType;
		data?: any;
	}
}
