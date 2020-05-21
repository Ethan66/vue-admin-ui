const app = {
  state: {
    sidebar: {
      opened: true
    },
    mainTabs: [],
    mainActivedTab: {}
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, boolean) => {
      state.sidebar.opened = boolean
    },
    UPDATETABS: (state, val) => {
      state.mainTabs = val
    },
    UPDATEMINACTIVEDTAB: (state, val) => {
      state.mainActivedTab = JSON.parse(JSON.stringify(val))
    }
  }
}

export default app
