/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 15:26:13
 * @LastEditTime: 2024-11-01 15:26:13
 * @LastEditors: mulingyuer
 * @Description: 谷歌浏览器通知类型
 * @FilePath: \serverless-api-tester\src\utils\chrome-notifications\types.ts
 * 怎么可能会有bug！！！
 */

/** 错误通知参数 */
export interface ErrorNotificationOptions {
	/** 标题 */
	title?: string;
	/** 内容 */
	message: string;
}
