const useLogin = () => {
	const Authorize = () => {
		let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
		let appid = "wxd2fe965e64564f23";
		window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
	};
	return {
		Authorize,
	};
};
export default useLogin;
