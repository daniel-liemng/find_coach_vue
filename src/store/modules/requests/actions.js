export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    // send http request
    const res = await fetch(
      `https://devmeetup-vue-26ab8.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    console.log(res);

    const data = await res.json();

    // Error handling
    if (!res.ok) {
      // error
      const error = new Error(data.message || "Failed to send request");
      throw error;
    }

    // name in Firebase is ID -> add ID to newRequest
    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;

    // commit mutation
    context.commit("addRequest", newRequest);
  },
  //// Only fetch request of specified coach
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    const res = await fetch(
      `https://devmeetup-vue-26ab8.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to fetch requests");
      throw error;
    }

    // Transform data
    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };

      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
