function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const vapidPublicKey = 'BNMvpwaWOPsNCQH6bgWt9caDGR3WBK84SmevhBteuX5fwMmh5DcNQmb69EF4-C0AssRDBjU45oYs7RJIS1Bn6r0';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

// check service workers
if ('serviceWorker' in navigator) {
    send()
        .catch(err => console.error("ERROR => ", err))
}

async function send() {
    // register the service worker

    console.log("registering service worker !")
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    })
    console.log("service worker registred !")
    // register push 
    console.log("registering push !")

    await navigator.serviceWorker.ready; // Here's the waiting

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    })
    console.log("push registred !")

    // send push 
    console.log("sending push !")

    console.log("subscription     =  ", subscription)


    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });


    console.log("push sent !")
}


