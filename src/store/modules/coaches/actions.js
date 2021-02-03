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
    const res = await fetch(
      `https://devmeetup-vue-26ab8.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    console.log("aaRes", res);

    // const data = await res.json();

    if (!res.ok) {
      // error
    }

    context.commit("registerCoach", { ...coachData, id: userId });
  },
  //// FETCH COACHES
  async loadCoaches(context) {
    const res = await fetch(
      `https://devmeetup-vue-26ab8.firebaseio.com/coaches.json`
    );

    const data = await res.json();

    if (!res.ok) {
      // error
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
  },
};
