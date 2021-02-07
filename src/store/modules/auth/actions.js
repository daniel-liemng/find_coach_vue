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

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
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

    if (token && userId) {
      context.commit("setUser", { token, userId, tokenExpiration: null });
    }
  },
  logout(context) {
    // clear auth data to null
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
