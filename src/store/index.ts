import { createStore, Store, useStore as allStore } from 'vuex'

export interface State {
    count: number
}
const store = createStore<State>({
    state: {
        count: 0
    },
    getters: {
        count(state) {
            return state.count
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})
export function useStore(): Store<State> {
    return allStore()
}
export default store