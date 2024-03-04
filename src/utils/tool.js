/*
 * @Descripttion: 工具集
 * @version: 1.0
 */
const tool = {}
/* Storage */
tool.data = {
    set(key, data, datetime = 0) {
        const cacheValue = {
            content: data,
            datetime: Number(datetime) === 0 ? 0 : new Date().getTime() + Number(datetime) * 1000
        }
        return uni.setStorageSync(key, JSON.stringify(cacheValue))
    },
    get(key) {
        try {
            const value = JSON.parse(uni.getStorageSync(key))
            if (value) {
                const nowTime = new Date().getTime()
                if (nowTime > value.datetime && value.datetime !== 0) {
                    uni.removeStorageSync(key)
                    return null
                }
                return value.content
            }
            return null
        } catch (err) {
            return null
        }
    },
    remove(key) {
        return uni.removeStorageSync(key)
    },
    clear() {
        return uni.clearStorageSync()
    }
}
export default tool
