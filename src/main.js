import { createSSRApp } from 'vue'
import App from './App.vue'
import AutoImport from './auto-import'
import UViewPlus from 'uview-plus'
import * as Pinia from 'pinia';// pinia数据持久化
import { createUnistorage } from 'pinia-plugin-unistorage'
import '@/utils/time'

export function createApp() {
	const app = createSSRApp(App)
	app.use(UViewPlus)
	app.use(AutoImport)
	const store = Pinia.createPinia();
	store.use(createUnistorage());
	app.use(store);
	return {
		app
	}
}
