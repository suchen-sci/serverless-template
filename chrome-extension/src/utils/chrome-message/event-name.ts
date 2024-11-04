/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 11:57:42
 * @LastEditTime: 2024-11-01 16:30:56
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

	/** 创建右键菜单 */
	CREATE_CONTEXT_MENUS = "create-context-menus",

	/** serverless-comfyui - 填充文生图关键字 */
	SERVERLESS_COMFYUI_FILL_KEYWORD = "serverless-comfyui-fill-keyword"
}
