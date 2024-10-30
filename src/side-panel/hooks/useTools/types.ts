/*
 * @Author: mulingyuer
 * @Date: 2024-10-30 10:09:31
 * @LastEditTime: 2024-10-30 15:43:41
 * @LastEditors: mulingyuer
 * @Description: 工具hooks类型
 * @FilePath: \serverless-api-tester\src\side-panel\hooks\useTools\types.ts
 * 怎么可能会有bug！！！
 */
import type { Base64ImageData } from "@/background/types";

/** 缓存的表单数据类型 */
export type LocalFormData = Base64ImageData;

/** 保存表单数据 */
export type SaveFormData = Omit<LocalFormData, "loading" | "baseUrl">;
