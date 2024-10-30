/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 09:35:02
 * @LastEditTime: 2024-10-30 16:11:54
 * @LastEditors: mulingyuer
 * @Description: 工具hooks
 * @FilePath: \serverless-api-tester\src\side-panel\hooks\useTools\index.ts
 * 怎么可能会有bug！！！
 */
import { ChromeMessageType } from "@/enums/chrome-message";
import type { LocalFormData, SaveFormData } from "./types";

export function useTools() {
	/** 获取缓存的表单数据 */
	function getLocalFormData(): Promise<LocalFormData> {
		return new Promise((resolve) => {
			chrome.runtime.sendMessage<CustomMessage>(
				{ type: ChromeMessageType.GET_BASE64_IMAGE_DATA },
				(data: LocalFormData) => {
					return resolve(data);
				}
			);
		});
	}

	/** 存储表单数据到缓存 */
	function setLocalFormData(data: SaveFormData) {
		return new Promise((resolve) => {
			chrome.runtime.sendMessage<CustomMessage>(
				{ type: ChromeMessageType.SAVE_BASE64_IMAGE_DATA, data },
				() => {
					return resolve(true);
				}
			);
		});
	}

	return {
		getLocalFormData,
		setLocalFormData
	};
}
