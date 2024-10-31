/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 15:22:41
 * @LastEditTime: 2024-10-31 15:28:37
 * @LastEditors: mulingyuer
 * @Description: 上下文菜单
 * @FilePath: \serverless-api-tester\src\background\context-menus\index.ts
 * 怎么可能会有bug！！！
 */
import { chromeMessage, EventName } from "@/utils/chrome-message";

export class ContextMenus {
	private isInit = false;

	/** 初始化 */
	public init() {
		if (this.isInit) {
			return;
		}
		this.textToImageMenus();
		this.isInit = true;
	}

	/** 图片转文字菜单 */
	private textToImageMenus() {
		chrome.contextMenus.create({
			id: "serverlessId",
			title: "填入Serverless ID",
			contexts: ["selection"] // 只有在选中文本时才会出现
		});

		chrome.contextMenus.create({
			id: "apiKey",
			title: "填入API key",
			contexts: ["selection"] // 只有在选中文本时才会出现
		});

		chrome.contextMenus.create({
			id: "keyword",
			title: "填入关键词",
			contexts: ["selection"] // 只有在选中文本时才会出现
		});

		// 监听菜单事件
		chrome.contextMenus.onClicked.addListener((info) => {
			const { menuItemId, selectionText } = info;
			const data = selectionText ?? "";

			switch (menuItemId) {
				case "serverlessId":
					chromeMessage.emit(EventName.FILL_SERVERLESS_ID, data);
					break;
				case "apiKey":
					chromeMessage.emit(EventName.FILL_API_KEY, data);
					break;
				case "keyword":
					chromeMessage.emit(EventName.FIL_TEXT_TO_IMAGE_KEYWORD, data);
					break;
			}
		});
	}
}
