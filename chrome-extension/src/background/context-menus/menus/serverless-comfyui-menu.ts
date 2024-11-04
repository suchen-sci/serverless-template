/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 16:14:19
 * @LastEditTime: 2024-11-01 16:19:46
 * @LastEditors: mulingyuer
 * @Description: serverless-comfyui 右键菜单
 * @FilePath: \serverless-api-tester\src\background\context-menus\menus\serverless-comfyui-menu.ts
 * 怎么可能会有bug！！！
 */
import { MenuId } from "@/utils/chrome-context-menus.ts";
import type { CreateMenuOptions } from "@/utils/chrome-context-menus.ts";
import { chromeMessage, EventName } from "@/utils/chrome-message";

export const ServerlessComfyuiMenu: CreateMenuOptions[] = [
	{
		menuProperties: {
			id: MenuId.SERVERLESS_COMFYUI_INPUT_KEYWORD,
			title: "填入关键词",
			contexts: ["selection"] // 只有在选中文本时才会出现
		},
		onClicked: (info) => {
			const { selectionText } = info;
			const data = selectionText ?? "";

			chromeMessage.emit(EventName.SERVERLESS_COMFYUI_FILL_KEYWORD, data);
		}
	}
];
