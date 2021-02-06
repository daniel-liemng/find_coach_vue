import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "../pages/coaches/CoachesList.vue";
import CoachDetail from "../pages/coaches/CoachDetail.vue";
import CoachRegistration from "../pages/coaches/CoachRegistration.vue";
import ContactCoach from "../pages/requests/ContactCoach.vue";
import RequestsReceived from "../pages/requests/RequestsReceived.vue";
import NotFound from "../pages/NotFound.vue";
import UserAuth from "../pages/auth/UserAuth.vue";

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    props: true, // get ID
    children: [{ path: "contact", component: ContactCoach }], // /coaches/c1/contact
  },
  { path: "/register", component: CoachRegistration },
  { path: "/requests", component: RequestsReceived },
  { path: "/auth", component: UserAuth },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
