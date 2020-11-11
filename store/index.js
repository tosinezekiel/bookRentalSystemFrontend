export const getters = {
    authenticated(state){
        return state.auth.loggedIn
    },
    user(state){
        return state.auth.user
    }
}


export const mutations = {
    SET_VERIFIED(state,val){
        state.auth.user.verified = val
    },
    SET_SUBSCRIBE(state,val){
        state.auth.user.subscription = val
    },
    SET_USER(state,val){
        state.auth.user = val
    }
} 


export const actions = {
    verify({commit}, val){
        commit('SET_VERIFIED',val)
    },
    subscribe({commit}, val){
        commit('SET_SUBSCRIBE',val)
    },
    user({commit}, val){
        commit('SET_USER',val)
    }
}