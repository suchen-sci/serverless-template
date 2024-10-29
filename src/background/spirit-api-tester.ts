/*
 * @Author: mulingyuer
 * @Date: 2024-10-29 15:23:59
 * @LastEditTime: 2024-10-29 15:25:46
 * @LastEditors: mulingyuer
 * @Description: 测试核心类
 * @FilePath: \serverless-api-tester\src\background\spirit-api-tester.ts
 * 怎么可能会有bug！！！
 */
import { localStorageGet } from "@/utils/tools";
import type { Base64ImageData } from "./types";

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
		baseUrl: "",
		serverlessId: "",
		apiKey: "",
		keyword: ""
	};

	/** 统一初始化 */
	public async init() {
		await this.initBase64ImageData();
	}

	/** 初始化base64图片数据 */
	private async initBase64ImageData() {
		const { SERVERLESS_ID, API_KEY, KEYWORD } = BASE64_IMAGE_CONSTANT_KEY_MAP;
		// 更新数据状态
		this.base64ImageData.loading = true;

		this.base64ImageData.baseUrl = await localStorageGet(SERVERLESS_ID, "");
		this.base64ImageData.apiKey = await localStorageGet(API_KEY, "");
		this.base64ImageData.keyword = await localStorageGet(KEYWORD, "");

		// 更新数据状态
		this.base64ImageData.loading = false;
	}

	/** 获取base64图片数据 */
	public getBase64ImageData(): Base64ImageData {
		return this.base64ImageData;
	}
}
