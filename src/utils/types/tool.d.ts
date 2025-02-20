// 定义 Crypto 接口
interface ICrypto {
	/**
	 * @description MD5加密
	 * @param data 需要加密的数据
	 */
	MD5(data: string): string;
	BASE64: {
		/**
		 * @description BASE64加密
		 * @param data 需要加密的数据
		 */
		encrypt(data: string): string;
		/**
		 * @description BASE64解密
		 * @param cipher 需要解密的数据
		 */
		decrypt(cipher: string): string;
	};
	AES: {
		/**
		 * @description AES加密
		 * @param data 需要加密的数据
		 * @param secretKey 加密密钥
		 */
		encrypt(data: string, secretKey: string): string;
		/**
		 * @description AES解密
		 * @param cipher 需要解密的数据
		 * @param secretKey 解密密钥
		 */
		decrypt(cipher: string, secretKey: string): string;
	};
}

// 定义 Tool 接口
interface ITool {
	/**
	 * @description 保存数据进缓存
	 * @param key 缓存键名
	 * @param data 缓存值
	 * @param dateTime 过期时间，单位ms
	 */
	set(key: string, data: any, dateTime?: number): void;
	/**
	 * @description 根据Key获取缓存
	 * @param key 缓存键名
	 */
	get(key: string): any;
	/**
	 * @description 根据Key删除缓存
	 * @param key 缓存键名
	 */
	remove(key: string): void;
	/**
	 * @description 清空缓存
	 */
	clear(): void;
}
