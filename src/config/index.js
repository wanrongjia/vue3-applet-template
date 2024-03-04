/*
 * @Descripttion: 配置文件
 * @version: 1.0
 */
const DEFAULT_CONFIG = {
	// 标题
	APP_NAME: import.meta.env.VITE_APP_TITLE,

	// 接口地址
	API_URL:
		import.meta.env.MODE === 'development' && import.meta.env.VITE_APP_PROXY === 'true'
			? '/api'
			: import.meta.env.VITE_APP_API_BASEURL,

	// 请求APPID
	APP_ID: import.meta.env.VITE_APP_APPID,

	// 请求超时
	TIMEOUT: 10000,

	// TokenName
	TOKEN_NAME: 'xx-token',

	// Token前缀，注意最后有个空格，如不需要需设置空字符串
	TOKEN_PREFIX: '',

	// 追加其他头
	HEADERS: {}
}

export default DEFAULT_CONFIG
