/*
 * @Author: mulingyuer
 * @Date: 2024-10-29 17:26:50
 * @LastEditTime: 2024-10-29 17:52:02
 * @LastEditors: mulingyuer
 * @Description: 请求
 * @FilePath: \serverless-api-tester\src\request\index.ts
 * 怎么可能会有bug！！！
 */
import ky from "ky";

export const request = ky.create({
	timeout: 3000000 // ms
});
