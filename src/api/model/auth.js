import http from '@/utils/request'

export default {
	login: {
		url: `/login`,
		name: '登录获取TOKEN',
		async post(data = {}) {
			return await http.post(this.url, data)
		}
	}
}
