import { defineStore } from 'pinia';

export const useSystem = defineStore('system', {
    state: () => {
        return { count: 0 };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        increment() {
            this.count++;
        },
    },
});
