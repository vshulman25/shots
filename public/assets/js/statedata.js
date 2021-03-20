// fetch for state data, testing with hard corded location

// const getUser= (user) => {
//     userId = user || '';
//     if (userId) {
//       userId = `/?user_id=${1}`;
//     }
const userId = "1";
const key = "7e3bafb672774e49bfa657f1d33be17a";
// NEED to set up a key for the map itself with process.env variable to pass through the map
//if you click on the map link in the console log, you will get the api data for the sate
fetch(`/api/user/${userId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success in getting posts:", data);
    const state = data.state;
    const user = data.first_name;
    const stateData =
      `https://api.covidactnow.org/v2/state/${state}.json?apiKey=` + key;
    console.log(stateData);
    $("#userWelcome").append(user); 

    $.ajax({
      url: stateData,
      method: "GET",
    }).then((response) => {
      console.log(response.url);
      $("#userState").append(response.state);
      $("#cases").append(response.actuals.cases);

      if (response.riskLevels.overall === "2" || "3" || "4" || "5") {
        $("#riskLevelHigh").append("Critical to Extreme Risk Level");
        $("#riskLevelLow").hide();
        $("#riskLevelMed").hide();
      }
      if (response.riskLevels.overall === "0") {
        $("#riskLevelHigh").hide();
        $("#riskLevelLow").append("Critical to Extreme Risk Level");
        $("#riskLevelMed").hide();
      }
      if (response.riskLevels.overall === "1") {
        $("#riskLevelHigh").hide();
        $("#riskLevelLow").hide();
        $("#riskLevelMed").append("Critical to Extreme Risk Level");
      }
    });
  });

// //}