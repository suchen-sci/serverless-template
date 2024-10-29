/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:56:27
 * @LastEditTime: 2024-10-29 11:12:20
 * @LastEditors: mulingyuer
 * @Description: side-panel main
 * @FilePath: \serverless-api-tester\src\side-panel\main.ts
 * 怎么可能会有bug！！！
 */
import { createApp } from "vue";
import App from "./App.vue";

// style
import "normalize.css/normalize.css";
import "tdesign-vue-next/es/style/index.css"; // 引入组件库的少量全局样式变量
import "@/styles/index.scss";

createApp(App).mount("#app");
