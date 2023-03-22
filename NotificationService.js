// p-token = "cptxr6ZMRkab6ZOcANUtEq:APA91bHux74Z1w5j2kp3dxk8Jc6HF1WrgkXPyGDqmUV_fxgFQ4ekK4bkch05yNJvjyMpR2NJN9wbOuAUb_hXzKUprohjaTjMtxctAx1JY0qvJDjaPgI-O1uMRs5JLnS8VbG0rMBSXwAC"

//r1-token = "fpdMa4MMRvmdl0af8gFLd7:APA91bFsZZU5Xc0o8_dT-LDdDZUX3MI05FA2jlpgBIFBs7_eqtS6nMmX1oWHftznAkeuCHRLMeimxMDxM4646OHgVSwuVyd-hlEQ8a95uhscz1Kvkz-cO7BEz3dxy8F_PzVfCMYkkL0K"

//r2-token = "fp5oUtqWRomG1J8lUf0v6E:APA91bElIhkrclH3yIWY4AWp8LwuCedmEnQqIcCfuwFTT-Vec-xJt4gPPs7-8BQ8tXfT1j-GR7b4y99OdnzFaRdCugtVef8sz1EN8oPkh3_PVnOtT-Est0e6CBh50sQlq9RGDGuoVo08"


const sendSingleDeviceNotification = (notificationData) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAA3wtump8:APA91bEeFdTodgZHXiDvR0IF72yaNLx0JuGK8uLDoEP7O3jEg1qy4X7_wCENa637aa-TM5VD0OO6Lc0L_94VTpelh3LunIxeKgGVzT5ypx5QEOMB6ZPsoEmM07fUYYstWtQ6jS2rwMIN");

    var raw = JSON.stringify({
        "data": {},
        "notification": {
            "body": notificationData.body,
            "title": notificationData.title,
        },
        "to": notificationData.token
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default sendSingleDeviceNotification