/*
 * @Author: mulingyuer
 * @Date: 2024-10-29 15:23:59
 * @LastEditTime: 2024-10-30 17:18:28
 * @LastEditors: mulingyuer
 * @Description: 测试核心类
 * @FilePath: \serverless-api-tester\src\background\spirit-api-tester.ts
 * 怎么可能会有bug！！！
 */
import { localStorageGet, localStorageSet } from "@/utils/tools";
import type { Base64ImageData } from "./types";
import { ChromeMessageType } from "@/enums/chrome-message";

/** base64图片keyMap */
const BASE64_IMAGE_CONSTANT_KEY_MAP = {
	SERVERLESS_ID: "serverlessId",
	API_KEY: "apiKey",
	KEYWORD: "keyword"
};

export class SpiritApiTester {
	/** base64图片数据  */
	private base64ImageData: Base64ImageData = {
		loading: false,
		baseUrl: "https://api-serverless.datastone.cn/v1",
		serverlessId: "",
		apiKey: "",
		keyword: ""
	};

	constructor() {
		this.createBase64ImageContextMenus();
	}

	/** 统一初始化 */
	public async init() {
		await this.initBase64ImageData();
	}

	/** 初始化base64图片数据 */
	private async initBase64ImageData() {
		const { SERVERLESS_ID, API_KEY, KEYWORD } = BASE64_IMAGE_CONSTANT_KEY_MAP;
		// 更新数据状态
		this.base64ImageData.loading = true;

		this.base64ImageData.serverlessId = await localStorageGet(SERVERLESS_ID, "");
		this.base64ImageData.apiKey = await localStorageGet(API_KEY, "");
		this.base64ImageData.keyword = await localStorageGet(KEYWORD, "");

		// 更新数据状态
		this.base64ImageData.loading = false;
	}

	/** 获取base64图片数据 */
	public getBase64ImageData(): Base64ImageData {
		return this.base64ImageData;
	}

	/** 存储base64图片数据 */
	public async setBase64ImageData(data: Omit<Base64ImageData, "loading" | "baseUrl">) {
		const { SERVERLESS_ID, API_KEY, KEYWORD } = BASE64_IMAGE_CONSTANT_KEY_MAP;
		// 更新数据状态
		this.base64ImageData.loading = true;
		// 缓存
		await localStorageSet(SERVERLESS_ID, data.serverlessId);
		await localStorageSet(API_KEY, data.apiKey);
		await localStorageSet(KEYWORD, data.keyword);
		// 更新实例数据
		Object.assign(this.base64ImageData, data);
		// 更新数据状态
		this.base64ImageData.loading = false;
	}

	/** 更新Serverless ID */
	public async setServerlessId(serverlessId: string) {
		const { SERVERLESS_ID } = BASE64_IMAGE_CONSTANT_KEY_MAP;
		// 更新数据状态
		this.base64ImageData.loading = true;
		// 缓存
		await localStorageSet(SERVERLESS_ID, serverlessId);
		// 更新实例数据
		this.base64ImageData.serverlessId = serverlessId;
		// 更新数据状态
		this.base64ImageData.loading = false;
	}

	/** 更新apiKey */
	public async setApiKey(apiKey: string) {
		const { API_KEY } = BASE64_IMAGE_CONSTANT_KEY_MAP;
		// 更新数据状态
		this.base64ImageData.loading = true;
		// 缓存
		await localStorageSet(API_KEY, apiKey);
		// 更新实例数据
		this.base64ImageData.apiKey = apiKey;
		// 更新数据状态
		this.base64ImageData.loading = false;
	}

	/** 更新关键词 */
	public async setKeyword(keyword: string) {
		const { KEYWORD } = BASE64_IMAGE_CONSTANT_KEY_MAP;
		// 更新数据状态
		this.base64ImageData.loading = true;
		// 缓存
		await localStorageSet(KEYWORD, keyword);
		// 更新实例数据
		this.base64ImageData.keyword = keyword;
		// 更新数据状态
		this.base64ImageData.loading = false;
	}

	/** 创建base64图片右键菜单 */
	private createBase64ImageContextMenus() {
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
					this.setServerlessId(data);
					chrome.runtime.sendMessage<CustomMessage>({
						type: ChromeMessageType.NOTIFY_UPDATE_SERVERLESS_ID,
						data
					});
					break;
				case "apiKey":
					this.setApiKey(data);
					chrome.runtime.sendMessage<CustomMessage>({
						type: ChromeMessageType.NOTIFY_UPDATE_API_KEY,
						data
					});
					break;
				case "keyword":
					this.setKeyword(data);
					chrome.runtime.sendMessage<CustomMessage>({
						type: ChromeMessageType.NOTIFY_UPDATE_KEYWORD,
						data
					});
					break;
			}
		});
	}
}
