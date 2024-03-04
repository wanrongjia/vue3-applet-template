/**
 * @description 自动import导入所有 api 模块
 */

// 批量引入其他module，
const files = import.meta.globEager('./model/*.js') // vite的写法
const keys = Object.keys(files)

const modules = {}
keys.forEach((key) => {
	if (Object.prototype.hasOwnProperty.call(files, key)) {
		// 提取文件的名字作为模块名
		modules[key.replace(/(\.\/model\/|\.js)/g, '')] = files[key].default
	}
})

export default modules
