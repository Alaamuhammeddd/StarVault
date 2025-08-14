// import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";

// const routes = [
//   { path: "/", name: "Home", component: Home },
//   {
//     path: "/login",
//     name: "Login",
//     component: Login,
//   },
// ];
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   if (to.meta.requiresAuth && !auth.token) {
//     next("/login");
//   } else {
//     next();
//   }
// });
// export default router;
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import BookList from "../views/BookList.vue";
import Register from "../views/Register.vue";
import Landing from "../views/Landing.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/books", name: "BookList", component: BookList },
  { path: "/user-home", component: Landing },
  {
    path: "/admin-dashboard",
    component: Dashboard,
    meta: { requiresAdmin: true },
  },
  {
    path: "/verify-email/:token",
    name: "VerifyEmail",
    component: () => import("../components/Verify.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role");
  if (to.meta.requiresAdmin && role !== "admin") {
    return next("/"); // send back to login/home
  }
  next();
});
export default router;
