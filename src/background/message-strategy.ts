/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 10:54:41
 * @LastEditTime: 2024-10-30 16:33:47
 * @LastEditors: mulingyuer
 * @Description: 消息策略
 * @FilePath: \serverless-api-tester\src\background\message-strategy.ts
 * 怎么可能会有bug！！！
 */
import { SpiritApiTester } from "./spirit-api-tester";
import { ChromeMessageType } from "@/enums/chrome-message";
import type { ListenerMessageCallback } from "./types";

export function messageStrategy(apiTester: SpiritApiTester) {
	/** 策略对象 */
	const strategyMap: Record<ChromeMessageType, ListenerMessageCallback> = {
		/** 获取base64图片数据策略 */
		[ChromeMessageType.GET_BASE64_IMAGE_DATA]: (message: CustomMessage, sender, sendResponse) => {
			const data = apiTester.getBase64ImageData();

			sendResponse(data);
		},
		/** 存储base64图片数据 */
		[ChromeMessageType.SAVE_BASE64_IMAGE_DATA]: async (
			message: CustomMessage,
			sender,
			sendResponse
		) => {
			const { data } = message;

			await apiTester.setBase64ImageData(data);

			sendResponse(true);
		}
	};

	return strategyMap;
}
