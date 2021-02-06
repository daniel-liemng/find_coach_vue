export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    // HTTP request
    const token = context.rootGetters.token;

    const res = await fetch(
      `https://devmeetup-vue-26ab8.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    // const data = await res.json();

    if (!res.ok) {
      // error
      const error = new Error(res.message || "Something went wrong. Try again");
      throw error;
    }

    context.commit("registerCoach", { ...coachData, id: userId });
  },
  //// FETCH COACHES
  // payload.forceRefesh -> for Refesh Btn -> fetch data without caching
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const res = await fetch(
      `https://devmeetup-vue-26ab8.firebaseio.com/coaches.json`
    );

    const data = await res.json();

    // Error handling
    if (!res.ok) {
      // error
      const error = new Error(data.message || "Failed to fetch coaches");
      throw error;
    }

    const coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };

      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },
};
