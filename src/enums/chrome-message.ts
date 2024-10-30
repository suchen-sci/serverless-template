/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 09:30:27
 * @LastEditTime: 2024-10-30 17:07:43
 * @LastEditors: mulingyuer
 * @Description: 谷歌消息相关枚举
 * @FilePath: \serverless-api-tester\src\enums\chrome-message.ts
 * 怎么可能会有bug！！！
 */

/** 消息类型枚举 */
export enum ChromeMessageType {
	/** 获取base64图片的数据 */
	GET_BASE64_IMAGE_DATA = "get-base64-image-data",
	/** 存储base64图片数据 */
	SAVE_BASE64_IMAGE_DATA = "save-base64-image-data",
	/** 通知侧边栏：更新serverlessId */
	NOTIFY_UPDATE_SERVERLESS_ID = "update-serverless-id",
	/** 通知侧边栏：更新api key */
	NOTIFY_UPDATE_API_KEY = "update-api-key",
	/** 通知侧边栏：更新关键词 */
	NOTIFY_UPDATE_KEYWORD = "update-keyword"
}
