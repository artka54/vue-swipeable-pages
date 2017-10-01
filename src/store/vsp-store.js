const store = {
  namespaced: true,
  state: {
    currentPageIndex: 0,
    xTranslate: 0
  },
  mutations: {
    setNewPageIndex: (state, pageIndex) => { state.currentPageIndex = pageIndex },
    transform: (state, distance) => { state.xTranslate = distance }
  }
}

export default store
