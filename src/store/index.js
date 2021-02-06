import { createStore } from "vuex";

// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

import coachesModule from "./modules/coaches/index.js";
import requestsModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
  },
  // state() {
  //   return {
  //     // Authentication
  //     userId: "c2",
  //   };
  // },
  // getters: {
  //   userId(state) {
  //     return state.userId;
  //   },
  // },
});

export default store;
