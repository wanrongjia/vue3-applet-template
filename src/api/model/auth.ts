import http from "@/utils/request";
export default {
	info: {
		url: `/app/game/bindDevice`,
		name: "绑定设备",
		async get(data = {}) {
			return await http.get(this.url, data);
		},
	},
};
