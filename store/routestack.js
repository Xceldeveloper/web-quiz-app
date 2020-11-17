export const state = () => ({
  stacks: [

  ],
  paths: [],
  backEvent: null
});

export const mutations = {
  addStack(state, stack) {
    if (state.stacks.indexOf(stack) == -1) {
      state.stacks.push(stack)
    }
  },

  removeStack(state, stack) {
    if (state.stacks.length > 1) {
      var index = state.stacks.indexOf(stack);
      state.stacks.splice(index, 1);
    } else {
      //console.log('empty')
      //state.stacks[0] = 'index'
    }
  },

  clearStack(state) {
    state.stacks = [];
  },

  addPath(state, path) {
    if (state.paths.indexOf(path) == -1) {
      state.paths.push(path)
    }
  },

  removePath(state, path) {
    if (state.paths.length > 1) {
      var index = state.paths.indexOf(path);
      state.paths.splice(index, 1);
    } else {
      //console.log('empty')
      // state.paths[0] = 'index'
    }
  },

  clearPath(state) {
    state.paths = [];
  }
}
