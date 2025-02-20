import { tool } from "@/utils/tool";
import { defineStore } from "pinia";
export const useAuth = defineStore("auth", {
	state: () => ({
		TOKEN: tool.get("TOKEN") || "",
		USER_INFO: tool.get("USER_INFO") || null,
	}),
	actions: {
		SET_TOKEN(token: string) {
			this.TOKEN = token;
			tool.set("TOKEN", token);
		},
		CLEAR_TOKEN() {
			this.TOKEN = "";
			tool.remove("TOKEN");
		},
		SET_USER_INFO(data: any) {
			this.USER_INFO = data;
			tool.set("USER_INFO", data);
		},
		CLEAR_USER_INFO() {
			this.USER_INFO = null;
			tool.remove("USER_INFO");
		},
		async GetUserInfo() {
			// const res: any = await getUserInfo({});
			// if (res) {
			// 	this.SET_USER_INFO(res);
			// 	this.bindParentUser(res);
			// }
		},
		logout() {
			// const ShopCar = useShopCar();
			// this.CLEAR_TOKEN();
			// this.CLEAR_USER_INFO();
			// ShopCar.CLEAR_CAR_LIST();
			// uni.showToast({
			// 	title: "退出登录成功",
			// 	icon: "none",
			// });
			// (uni.$u as any).sleep(1000).then(() => {
			// 	uni.navigateBack();
			// });
		},
		checkLogin() {
			if (!this.TOKEN) {
				uni.navigateTo({ url: "/pages/login/index" });
				return false;
			} else {
				return true;
			}
		},
		bindParentUser(res: any) {
			// if (!res.pid && tool.get("INVITE_USER")) {
			// 	bindParent({ pid: tool.get("INVITE_USER") });
			// }
			// if (tool.get("INVITE_DEVICE")) {
			// 	bindParent({ device_code: tool.get("INVITE_DEVICE") });
			// }
			// tool.remove("INVITE_DEVICE");
			// tool.remove("INVITE_USER");
		},
	},
});
