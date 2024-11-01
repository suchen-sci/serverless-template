/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 15:22:41
 * @LastEditTime: 2024-11-01 17:42:04
 * @LastEditors: mulingyuer
 * @Description: 上下文菜单
 * @FilePath: \serverless-api-tester\src\background\context-menus\index.ts
 * 怎么可能会有bug！！！
 */
import { chromeContextMenu } from "@/utils/chrome-context-menus.ts";
import { chromeMessage, EventName } from "@/utils/chrome-message";
import { ContextMenuEnum } from "./context-menu-enum";
import { generateMensListStrategy } from "./generate-mens-list-strategy";
export * from "./context-menu-enum";

export class ContextMenus {
	private isInit = false;

	/** 初始化 */
	public init() {
		if (this.isInit) return;
		this.watchCreateMenus();
		this.isInit = true;
	}

	/** 监听创建菜单事件 */
	private watchCreateMenus() {
		chromeMessage.on(EventName.CREATE_CONTEXT_MENUS, (message) => {
			const data = message.data as ContextMenuEnum;
			if (!data) return;

			const strategy = generateMensListStrategy[data];
			if (typeof strategy !== "function") return;

			// 清除之前的菜单
			chromeContextMenu.removeAll();

			// 从策略中取得菜单列表数据并创建菜单
			const menuList = strategy();
			menuList.forEach((item) => {
				chromeContextMenu.create(item);
			});
		});
	}
}

export const contextMenus = new ContextMenus();
