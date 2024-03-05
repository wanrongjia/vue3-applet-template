// pages.config.js
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
	easycom: {
		// 注意一定要放在custom里，否则无效，https://ask.dcloud.net.cn/question/131175
		custom: {
			"^u--(.*)": "uview-plus/components/u-$1/u-$1.vue",
			"^up-(.*)": "uview-plus/components/u-$1/u-$1.vue",
			"^u-([^-].*)": "uview-plus/components/u-$1/u-$1.vue"
		}
	},
	// 你也可以定义 pages 字段，它具有最高的优先级。
	pages: [		//pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationStyle": "custom",
			}
		}
	],
	globalStyle: {
		"navigationBarTextStyle": "white",
		"navigationBarTitleText": "好料星球",
		"navigationBarBackgroundColor": "#0094FF",
		"backgroundColor": "#F5F5F5"
	},
})
