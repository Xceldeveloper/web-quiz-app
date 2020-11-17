export default {
  mounted() {
    this.addStack();
  },
  methods: {
    removeStack() {
      this.$store.commit('routestack/removeStack', this.$options.name); //delete from stack
      this.$store.commit('routestack/removePath', this.$route.path);
    },
    purgeStack(url) {
      var index = this.RouteStack.paths.indexOf(url);
      if (index !== -1) {
        this.$store.commit('routestack/removeStack', this.RouteStack.stacks[index]); //delete from stack
        this.$store.commit('routestack/removePath', this.RouteStack.paths[index]);
      }
    },
    addStack() {
      this.$store.commit('routestack/addStack', this.$options.name);
      this.$store.commit('routestack/addPath', this.$route.path);
    },
    clearAllStacks(){
      this.$store.commit('routestack/clearStack');
      this.$store.commit('routestack/clearPath');
    },

    navBack() {
      this.$router.go(-1);
    },

    openNewPage(url, history, clearAll = false) {
      if (url === '' || url == null || url === undefined) {
        url = '/';
      }
      if (history === '' || history === null || history === undefined) {
        history = true;
      }
      if (clearAll) {
        //remove all cached stack
        this.clearAllStacks();
      }

      if (history) { //if stack should be cached
        this.$router.push(url);
      } else { //no history 
        this.removeStack();
        this.$router.replace(url);
      }

    },
    beforeEnteringPage(vm, to, from, next) {

    },
    beforeLeavingPage(to, from, next, callback) {
      var callBackFunc = callback || function () {}
      callBackFunc(true);

    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.beforeEnteringPage(vm, to, from, next);
    })

  },

  beforeRouteLeave(to, from, next) {
    var index = this.RouteStack.paths.indexOf(to.path); //destination page
    var currentIndex = this.RouteStack.paths.indexOf(this.$route.path); //current page
    // console.log(currentIndex - index);
    this.beforeLeavingPage(to, from, next, canLeave => {
      if (canLeave) { //make sure i can leave page before running this operation
        if (index !== -1) {
          if (currentIndex - index == 1) { //check if diff of currentStack and destination stack == 1, which would mean currentIndex is bigger
            //console.log('GOING BACK');
            this.removeStack();
          } else { //was cached b4 and we ain't goin back
            this.purgeStack(to.path); //delete stack from cache b4 reaching there so it would be reopened
            //console.log('RE OPENING');
          }
        }
      }
      next(canLeave);
    })
  },

  computed: {
    RouteStack() {
      return {
        stacks: this.$store.state.routestack.stacks,
        length: this.$store.state.routestack.stacks.length,
        current: this.$store.state.routestack.stacks[this.$store.state.routestack.stacks.length - 1],
        previous: this.$store.state.routestack.stacks[this.$store.state.routestack.stacks.length - 2],
        paths: this.$store.state.routestack.paths
      }

    }
  },
}
