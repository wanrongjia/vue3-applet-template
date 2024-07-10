import sysConfig from '@/config'
const buildIcon = function (url) {
	return sysConfig.ASSETS_URL + url;
};
export default buildIcon;
