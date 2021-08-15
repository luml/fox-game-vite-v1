import { reactive, toRefs } from 'vue'

export const useCounter = () => {
    const state = reactive({
        count1: 10,
    })
    const decreaseCount = () => {
        state.count1--;
    }
    const increaseCount = () => {
        state.count1++;
    }
    return { 
        decreaseCount,
        increaseCount,
        ...toRefs(state)
    }

}