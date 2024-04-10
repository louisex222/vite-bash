import { createStore, Store, useStore as allStore } from 'vuex'

export interface State {
    count: number,
    currentPromotion: Array<object>
}
const store = createStore<State>({
    state: {
        count: 0,
        currentPromotion: []
    },
    getters: {
        count(state) {
            return state.count
        },
        currentPromotion(state) {
            return state.currentPromotion
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setCurrentPromotion(state, data) {
            state.currentPromotion.push(data)
        },
        clearCurrentPromotion(state) {
            state.currentPromotion = []
        },
    }
})
export function useStore(): Store<State> {
    return allStore()
}
export default store