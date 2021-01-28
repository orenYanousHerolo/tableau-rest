require("dotenv").config();
const axios = require("axios");
const serverUrl = "https://dub01.online.tableau.com/trusted";
// const reportPath = "/views/poc/Sheet-1";
// const request = require("request-promise-native");
// //This is optional, you can add filter parameters directly into the URL
// //Check if you need to URI encode the parameter value
// //You can have more than one parameter, this is a regular query string
// const parameters = `${encodeURIComponent("<Parameter name>")}=<Paramter value>`;

// //Note, you will need to configure your server to accept trusted connection from the IP of the server running this code.
// //See this: https://onlinehelp.tableau.com/current/server/en-us/trusted_auth.htm

/* get trusted ticket */
function getTrustedTicket() {
    const config = {
        method: "post",
        url: `${serverUrl}?username=oren.yanous@herolo.co.il`,
        rejectUnauthorized: false,
    };
    return axios(config).then((ticket) => {
        if (ticket.toString() === "-1") {
            const errorMessage = "Tableau server did not return a ticket!";
            throw new Error(errorMessage);
        }
        return ticket;
    });
    // return request({
    //     method: "POST",
    //     uri: `${server}?username=${username}`,
    //     rejectUnauthorized: false,
    // }).then((ticket) => {
    //     if (ticket.toString() === "-1") {
    //         const errorMessage = "Tableau server did not return a ticket!";
    //         throw new Error(errorMessage);
    //     }
    //     return ticket;
    // });
}

// getTrustedTicket()
//     .then((ticket) => {
//         //Note that I ask for the data as CSV to avoid all the iFrame shananigans
//         const vizUrl = `${serverUrl}/${ticket}${reportPath}.csv?${parameters}`;
//         return request({
//             method: "GET",
//             uri: vizUrl,
//             rejectUnauthorized: false,
//         });
//     })
//     .then((csvData) => {
//         res.send(csvData);
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send();
//     });

module.exports = {
    getDetails,
    getUserGraph,
};

async function getUserGraph() {
    // const credentials = await loginToTableau();
    const config = {
        method: "post",
        url:
            "https://dub01.online.tableau.com/t/herolopoc/views/poc/Sheet1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link",
    };
    const response = await axios(config);
    console.log(response.data);
    return response.data;
}

/* login to tableau with api-token of administrator user */
async function loginToTableau() {
    const data = JSON.stringify({
        credentials: {
            personalAccessTokenName: "api-token",
            personalAccessTokenSecret:
                "nKwUKv4vRqqKcbaOwVuVzg==:3nuCMA2nE3aBI7xJEovwv3JEZWnfGOhZ",
            site: { contentUrl: "herolopoc" },
        },
    });

    const config = {
        method: "post",
        url: "https://dub01.online.tableau.com/api/3.9/auth/signin",
        headers: {
            "Content-Type": "application/json",
            Cookie:
                "hid=dub01pd-hap01; AWSELB=C5750B1F1C02CA9630AA7C7905CEF4E81E1406D8286D96385BA85FA2BDAFD8338A5348BCF05ED6698ECE95B720A6A461BFFE3E54C8EAF659898412195E729BB2FACF2E51A890B3D2054AC673438F2F12B6FD4A5623; workgroup_session_id=null; XSRF-TOKEN=Jbk4oNcSkMWLSHebnWHT2zQ59fI8CQrQ",
        },
        data: data,
    };

    const response = await axios(config);
    console.log(response.data.credentials.token);
    return response.data.credentials.token;
}

/* get view by view id */
async function getDetails(next) {
    const token = await loginToTableau();
    const config = {
        method: "get",
        url:
            "https://dub01.online.tableau.com/api/3.9/sites/2cf921cf-50a3-4e5a-9eda-faa35bb153f6/views/3fc4f739-9afd-467b-9faa-8f3ff66c570a",
        headers: {
            "Content-Type": "application/json",
            "X-Tableau-Auth": token,
            Cookie:
                "hid=dub01pd-hap01; AWSELB=C5750B1F1C02CA9630AA7C7905CEF4E81E1406D8286D96385BA85FA2BDAFD8338A5348BCF05ED6698ECE95B720A6A461BFFE3E54C8EAF659898412195E729BB2FACF2E51A890B3D2054AC673438F2F12B6FD4A5623; workgroup_session_id=null; XSRF-TOKEN=Jbk4oNcSkMWLSHebnWHT2zQ59fI8CQrQ",
        },
    };

    const response = await axios(config);
    return response.data;
}
