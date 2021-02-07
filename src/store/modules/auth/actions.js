// set global timer variable -> have timer at a time
let timer;

export default {
  // async login(context, payload) {
  //   const res = await fetch(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: payload.email,
  //         password: payload.password,
  //         returnSecureToken: true,
  //       }),
  //     }
  //   );

  //   const data = await res.json();

  //   if (!res.ok) {
  //     const error = new Error(data.message || "Failed to authenticate.");
  //     throw error;
  //   }

  //   context.commit("setUser", {
  //     token: data.idToken,
  //     userId: data.localId,
  //     tokenExpiration: data.expiresIn,
  //   });
  // },
  // async signup(context, payload) {
  //   const res = await fetch(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: payload.email,
  //         password: payload.password,
  //         returnSecureToken: true,
  //       }),
  //     }
  //   );

  //   const data = await res.json();

  //   if (!res.ok) {
  //     const error = new Error(data.message || "Failed to authenticate.");
  //     throw error;
  //   }

  //   context.commit("setUser", {
  //     token: data.idToken,
  //     userId: data.localId,
  //     tokenExpiration: data.expiresIn,
  //   });
  // },
  // auth replace both login & signup actions
  // alike login but change Firebase URL based on mode
  async auth(context, payload) {
    const mode = payload.mode;

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;

    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
    }

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to authenticate.");
      throw error;
    }

    // Token duration -> transform to Number & second to milisecond (1000)
    const expiresIn = +data.expiresIn * 1000;
    // const expiresIn = 5000;   // for testing
    // expiry data = now of login time + duration
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    // auto logout when duration ends
    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
      // tokenExpiration: data.expiresIn,
      // tokenExpiration: expirationDate,  // just store tokenExpiration in localStorage
    });
  },
  login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },
  signup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },
  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    // check how much expiration time left, then set timer to that time
    const expiresIn = +tokenExpiration - new Date().getTime();

    // if timer expires, not continue to login
    if (expiresIn < 0) {
      return;
    }

    // logout based on the timer left
    setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", { token, userId });
    }
  },
  logout(context) {
    // clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    // clear auth data to null
    context.commit("setUser", {
      token: null,
      userId: null,
      // tokenExpiration: null,  // just store in localStorage
    });
  },
  autoLogout(context) {
    // Normal logout
    context.dispatch("logout");
    // commit autoLogout
    context.commit("setAutoLogout");
  },
};
