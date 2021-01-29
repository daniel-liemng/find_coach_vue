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

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
});

export default store;
