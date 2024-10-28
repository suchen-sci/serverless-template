/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:52:00
 * @LastEditTime: 2024-10-28 16:53:08
 * @LastEditors: mulingyuer
 * @Description: 背景脚本类型声明
 * @FilePath: \serverless-api-tester\src\background\types.ts
 * 怎么可能会有bug！！！
 */

export interface SpiritApiTester {
	/** 数据状态：loading、success、error */
	status: string;
	/** 接口地址 */
	baseUrl: string;
	/** ServerLess ID */
	serverlessId: string;
	/** API key */
	apiKey: string;
	/** 关键词 */
	keyword: string;
	/** 初始化命名空间 */
	init: () => Promise<void> | void;
}
