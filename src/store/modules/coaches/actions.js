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
};
