import config from '@/config'
import api from '@/api'
import tool from '@/utils/tool'
import icon from "@/utils/icon"
import eventData from "@/utils/eventData"

export default {
	install(app) {
		// 统一注册配置文件
		app.config.globalProperties.$CONFIG = config
		app.config.globalProperties.$API = api
		app.config.globalProperties.$TOOL = tool
		app.config.globalProperties.$ICON = icon
		app.config.globalProperties.$EVENT_DATA = eventData
	}
}
