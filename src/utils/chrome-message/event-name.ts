/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 11:57:42
 * @LastEditTime: 2024-10-31 14:07:44
 * @LastEditors: mulingyuer
 * @Description: 事件名
 * @FilePath: \serverless-api-tester\src\utils\chrome-message\event-name.ts
 * 怎么可能会有bug！！！
 */

export enum EventName {
	/** 填充Serverless ID */
	FILL_SERVERLESS_ID = "fill-serverless-id",
	/** 填充api key */
	FILL_API_KEY = "fill-api-key",

	// 文生图
	/** 填充文生图关键字 */
	FIL_TEXT_TO_IMAGE_KEYWORD = "fil-text-to-image-keyword"
}
