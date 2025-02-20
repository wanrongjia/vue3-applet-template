import sysConfig from "@/config";
const buildIcon = function (path: string) {
	return sysConfig.ASSETS_URL + path;
};
const buildImage = function (path: string) {
	// 请注意，这不包括子目录中的文件
	return new URL(`../static/${path}`, import.meta.url).href;
};
export { buildIcon, buildImage };
