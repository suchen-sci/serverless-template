/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 09:14:04
 * @LastEditTime: 2024-10-31 11:34:00
 * @LastEditors: mulingyuer
 * @Description: 文生图数据
 * @FilePath: \serverless-api-tester\src\side-panel\stores\modules\text-to-img\index.ts
 * 怎么可能会有bug！！！
 */
import { defineStore } from "pinia";

export const useTextToImgStore = defineStore(
	"text-to-img",
	() => {
		/** 关键词 */
		const keyword = ref("");
		function setKeyword(value: string) {
			keyword.value = value;
		}

		return {
			keyword,
			setKeyword
		};
	},
	{
		persist: true
	}
);
