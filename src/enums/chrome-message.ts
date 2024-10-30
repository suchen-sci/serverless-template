/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 09:30:27
 * @LastEditTime: 2024-10-30 15:44:35
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
	SAVE_BASE64_IMAGE_DATA = "save-base64-image-data"
}
