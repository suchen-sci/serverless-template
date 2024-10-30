/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 10:54:41
 * @LastEditTime: 2024-10-30 17:11:02
 * @LastEditors: mulingyuer
 * @Description: 消息策略
 * @FilePath: \serverless-api-tester\src\background\message-strategy.ts
 * 怎么可能会有bug！！！
 */
import { SpiritApiTester } from "./spirit-api-tester";
import { ChromeMessageType } from "@/enums/chrome-message";
import type { ListenerMessageCallback } from "./types";

export function messageStrategy(apiTester: SpiritApiTester) {
	/** 获取base64图片数据策略 */
	const getBase64ImageDataStrategy: ListenerMessageCallback = (
		message: CustomMessage,
		sender,
		sendResponse
	) => {
		const data = apiTester.getBase64ImageData();

		sendResponse(data);
	};

	/** 存储base64图片数据 */
	const saveBase64ImageDataStrategy: ListenerMessageCallback = async (
		message: CustomMessage,
		sender,
		sendResponse
	) => {
		const { data } = message;

		await apiTester.setBase64ImageData(data);

		sendResponse(true);
	};

	/** 策略对象 */
	const strategyMap: Partial<Record<ChromeMessageType, ListenerMessageCallback>> = {
		/** 获取base64图片数据策略 */
		[ChromeMessageType.GET_BASE64_IMAGE_DATA]: getBase64ImageDataStrategy,
		/** 存储base64图片数据 */
		[ChromeMessageType.SAVE_BASE64_IMAGE_DATA]: saveBase64ImageDataStrategy
	};

	return strategyMap;
}
