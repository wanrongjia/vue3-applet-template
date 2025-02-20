<script lang="ts" setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { tool } from "@/utils/tool";
import { useAuth } from "@/store"
import { urlParamToJson } from "@/hook/useParam"
const Auth = useAuth();
onLaunch(() => {
	console.log("App Launch");
});
onShow(() => {
	console.log("App Show");
	const queryData = uni.getEnterOptionsSync(); // uni-app版本 3.5.1+ 支持
	console.log(queryData)
	if (queryData.query.invite_user) {
		tool.set('INVITE_USER', queryData.query.invite_user)
	}
	if (queryData.query.device_code) {
		tool.set('INVITE_DEVICE', queryData.query.device_code)
	}
	if (queryData.query.scene) {
		const state = urlParamToJson(queryData.query.scene)
		if (state.c) {
			tool.set('INVITE_USER', queryData.query.invite_user)
		}
	}
	if (!!Auth.TOKEN) {
		Auth.GetUserInfo()
	}
});
onHide(() => {
	console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/styles/global.scss";
</style>
