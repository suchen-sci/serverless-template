<!--
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:58:06
 * @LastEditTime: 2024-10-29 17:03:42
 * @LastEditors: mulingyuer
 * @Description: app
 * @FilePath: \serverless-api-tester\src\side-panel\App.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="side-panel">
		<Base64Image />
	</div>
</template>

<script setup lang="ts">
import Base64Image from "@side-panel/components/Base64Image/index.vue";
</script>

<style lang="scss" scoped>
.side-panel {
	padding: 20px;
}
</style>
