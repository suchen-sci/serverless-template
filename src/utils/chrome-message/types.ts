/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 14:07:56
 * @LastEditTime: 2024-10-31 14:58:26
 * @LastEditors: mulingyuer
 * @Description: 谷歌插件事件订阅类型
 * @FilePath: \serverless-api-tester\src\utils\chrome-message\types.ts
 * 怎么可能会有bug！！！
 */
import { EventName } from "./event-name";

/** 自定义消息类型 */
export interface EventMessage {
	type: EventName;
	data?: any;
}

/** 监听消息的回调函数类型 */
// export type ChromeMessageCallback = Parameters<typeof chrome.runtime.onMessage.addListener>[0];

/** 时间订阅的回调函数类型 */
export type EventCallback = (
	message: EventMessage,
	sender: chrome.runtime.MessageSender,
	sendResponse: (response?: any) => void
) => void;

/** 事件订阅map */
export type EventMap = Map<EventName, Array<EventCallback>>;
