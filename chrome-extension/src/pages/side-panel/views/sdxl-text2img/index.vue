<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 16:01:20
 * @LastEditTime: 2024-11-18 16:20:55
 * @LastEditors: mulingyuer
 * @Description: sdxl-text2img
 * @FilePath: \chrome-extension\src\pages\side-panel\views\sdxl-text2img\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="sdxl-text2img">
		<t-form
			ref="formInstance"
			:data="form"
			label-align="top"
			:rules="rules"
			colon
			@submit="onSubmit"
		>
			<ServerLessID ref="serverLessIDRef" v-model="form.serverlessId" name="serverlessId" />
			<APIKey ref="apiKeyRef" v-model="form.apiKey" name="apiKey" />
			<PositivePrompt ref="positivePromptRef" v-model="form.keywords" name="keywords" />
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result">
			<ImageResponse v-if="isImg" :src="imgSrc" />
			<JsonResponse v-else :json="otherData" />
		</div>
	</div>
</template>

<script setup lang="ts">
import PositivePrompt from "@/pages/side-panel/components/form/PositivePrompt.vue";
import { request } from "@/request";
import APIKey from "@side-panel/components/form/APIKey.vue";
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import ImageResponse from "@side-panel/components/response/ImageResponse.vue";
import JsonResponse from "@side-panel/components/response/JsonResponse.vue";
import { useServerlessStore } from "@side-panel/stores";
import { type FormInstanceFunctions, type FormProps } from "tdesign-vue-next";

export interface Form {
	serverlessId: string;
	apiKey: string;
	keywords: string;
}

const serverlessStore = useServerlessStore();

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	keywords: ""
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	keywords: [{ required: true, message: "请填写关键词", trigger: "blur" }]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const isImg = ref(true);
const imgSrc = ref("");
const otherData = ref("");
const serverLessIDRef = ref<InstanceType<typeof ServerLessID>>();
const apiKeyRef = ref<InstanceType<typeof APIKey>>();
const positivePromptRef = ref<InstanceType<typeof PositivePrompt>>();

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		loading.value = true;
		// 缓存数据
		await saveForm();
		requestController = new AbortController();
		// api请求
		const resString = await request<string>({
			url: `${form.value.serverlessId}/sync`,
			method: "post",
			responseType: "json",
			signal: requestController.signal,
			prefixUrl: serverlessStore.baseUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${form.value.apiKey}`
			},
			body: JSON.stringify({
				input: { prompt: form.value.keywords }
			})
		});
		const data = JSON.parse(resString) as { image: string };

		if (Object.hasOwn(data, "image")) {
			isImg.value = true;
			imgSrc.value = `data:image/png;base64, ${data.image}`;
		} else {
			isImg.value = false;
			otherData.value = typeof resString === "string" ? resString : JSON.stringify(resString);
		}

		loading.value = false;
	} catch (_error) {
		loading.value = false;
	}
};

/** 取消请求 */
function onCancel() {
	if (!requestController) return;
	requestController.abort();
	requestController = null;
}

/** 存储缓存数据 */
function saveForm() {
	serverLessIDRef.value?.saveData();
	apiKeyRef.value?.saveData();
	positivePromptRef.value?.saveData();
}
</script>

<style lang="scss" scoped>
.result {
	margin-top: 40px;
}
</style>
