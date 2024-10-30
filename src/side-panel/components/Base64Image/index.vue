<!--
 * @Author: mulingyuer
 * @Date: 2024-10-29 15:29:30
 * @LastEditTime: 2024-10-30 16:13:49
 * @LastEditors: mulingyuer
 * @Description: base64图片组件
 * @FilePath: \serverless-api-tester\src\side-panel\components\Base64Image\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="image-component">
		<t-form ref="formInstance" :data="form" label-align="top" :rules="rules" @submit="onSubmit">
			<t-form-item label="ServerLess ID" name="serverlessId">
				<t-input v-model="form.serverlessId" placeholder="请输入ServerLess ID"></t-input>
			</t-form-item>
			<t-form-item label="API key" name="apiKey">
				<t-input v-model="form.apiKey" placeholder="请输入API key"></t-input>
			</t-form-item>
			<t-form-item label="关键词" name="keyword">
				<t-textarea
					v-model="form.keyword"
					placeholder="请输入关键词，英文逗号分隔"
					:autosize="{ minRows: 5, maxRows: 5 }"
				/>
			</t-form-item>
			<t-form-item>
				<t-button theme="primary" type="submit" size="large" block :loading="loading">
					{{ loading ? "正在请求" : "发起请求" }}
				</t-button>
			</t-form-item>
		</t-form>
		<div class="result">
			<div v-if="isImg" class="image-preview">
				<t-image v-if="imgSrc" class="image-preview-img" :src="imgSrc" fit="contain" />
				<t-empty v-else />
			</div>
			<div v-else class="other-data">
				<t-textarea
					v-model="otherData"
					placeholder="暂无内容"
					:autosize="{ minRows: 5, maxRows: 15 }"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MessagePlugin, type FormInstanceFunctions, type FormProps } from "tdesign-vue-next";
import { request } from "@/request";
import { useTools } from "@side-panel/hooks/useTools";

export interface Form {
	serverlessId: string;
	apiKey: string;
	keyword: string;
}

const { getLocalFormData, setLocalFormData } = useTools();
const baseUrl = ref("");
const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	keyword: ""
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	keyword: [{ required: true, message: "请填写关键词", trigger: "blur" }]
};
const loading = ref(false);
const isImg = ref(true);
const imgSrc = ref("");
const otherData = ref("");

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		loading.value = true;
		// 缓存数据
		await saveForm();
		// api请求
		const resString = await request
			.post<string>(`${form.value.serverlessId}/sync`, {
				prefixUrl: baseUrl.value,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${form.value.apiKey}`
				},
				body: JSON.stringify({
					input: { prompt: form.value.keyword }
				})
			})
			.json();
		const data = JSON.parse(resString) as { image: string };

		if (Object.hasOwn(data, "image")) {
			isImg.value = true;
			imgSrc.value = `data:image/png;base64, ${data.image}`;
		} else {
			isImg.value = false;
			otherData.value = typeof resString === "string" ? resString : JSON.stringify(resString);
		}

		loading.value = false;
	} catch (error) {
		loading.value = false;
		MessagePlugin.error((error as Error)?.message);
	}
};

/** 定时器 */
let timer: null | number = null;
/** 获取缓存数据并填充表单 */
async function initForm() {
	if (timer) {
		clearTimeout(timer);
		timer = null;
	}
	const data = await getLocalFormData();
	console.log("🚀 ~ initForm ~ data:", data);
	if (!data.loading) {
		baseUrl.value = data.baseUrl;
		const keys = Object.keys(form.value) as (keyof Form)[];
		keys.forEach((key) => {
			form.value[key] = data[key];
		});
	} else {
		timer = setTimeout(() => {
			initForm();
		}, 300);
	}
}

/** 存储缓存数据 */
async function saveForm() {
	await setLocalFormData({
		apiKey: form.value.apiKey,
		serverlessId: form.value.serverlessId,
		keyword: form.value.keyword
	});
}

/** 初始化 */
async function init() {
	try {
		await initForm();
	} catch (error) {
		MessagePlugin.error((error as Error)?.message);
	}
}

onMounted(() => {
	init();
});
</script>

<style lang="scss" scoped>
.result {
	margin-top: 40px;
	position: relative;
	&::before {
		content: "";
		padding-top: 70%;
		display: block;
	}
}
.image-preview,
.other-data {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}
.image-preview {
	bottom: 0;
	overflow: hidden;
	border-width: 1px;
	border-style: solid;
	border-radius: var(--td-radius-default);
	border-color: var(--td-border-level-2-color);
	display: flex;
	justify-content: center;
	align-items: center;
}
.image-preview-img {
	width: 100%;
	height: 100%;
}
</style>
