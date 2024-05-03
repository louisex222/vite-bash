import { createStore, Store, useStore as allStore } from 'vuex'

export interface State {
    count: number,
    currentPromotion: Array<object>,
    healthFlag: boolean
}
const store = createStore<State>({
    state: {
        count: 0,
        currentPromotion: [],
        healthFlag: false
    },
    getters: {
        count(state) {
            return state.count
        },
        currentPromotion(state) {
            return state.currentPromotion
        },
        healthFlag(state) {
            return state.healthFlag
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
        setHealthFlag(state, data) {
            state.healthFlag = data
        }
    }
})
export function useStore(): Store<State> {
    return allStore()
}
export default store
