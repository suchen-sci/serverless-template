<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:23:37
 * @LastEditTime: 2024-11-18 16:14:52
 * @LastEditors: mulingyuer
 * @Description: api key
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\APIKey.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-input v-model="apiKey" :placeholder="placeholder"></t-input>
	</t-form-item>
</template>

<script setup lang="ts">
import { chromeMessage, EventName, type EventCallback } from "@/utils/chrome-message";
import { useServerlessStore } from "@side-panel/stores";

const { enableCache } = defineProps({
	label: {
		type: String,
		default: "API key"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "请输入API key"
	},
	/** 默认从本地存储获取数据 */
	enableCache: {
		type: Boolean,
		default: true
	}
});

const apiKey = defineModel({ type: String, required: true });

const serverlessStore = useServerlessStore();

/** 监听右键菜单 */
const listenContextMenu: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	apiKey.value = data;
};

/** 创建右键菜单 */
function createContextMenu() {
	chromeMessage.on(EventName.FILL_API_KEY, listenContextMenu);
	chromeMessage.emit(EventName.CREATE_API_KEY_MENU);
}

/** 关闭右键菜单 */
function removeContextMenu() {
	chromeMessage.off(EventName.FILL_API_KEY, listenContextMenu);
	chromeMessage.emit(EventName.CLOSE_API_KEY_MENU);
}

/** 缓存数据 */
function saveData(str?: string) {
	let value = apiKey.value;
	if (typeof str === "string" && str.trim() !== "") {
		value = str.trim();
	}
	serverlessStore.setApiKey(value);
}

onMounted(() => {
	createContextMenu();

	if (enableCache) {
		apiKey.value = serverlessStore.apiKey;
	}
});

onUnmounted(() => {
	removeContextMenu();
});

defineExpose({
	saveData
});
</script>

<style scoped></style>
