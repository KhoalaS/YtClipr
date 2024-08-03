const originalFetch = window.fetch;

window.fetch = async function (info, options) {
    console.log("Custom fetch called");

    var modifiedUrl = info.url; // Modify if needed
    console.log(modifiedUrl)

    var req = info

    try {
        if(modifiedUrl.includes("googlevideo")){
         info.headers.append("orgurl", info.url)
         console.log(info)
         req = new Request("/video", {
            method: info.method,
            headers: info.headers,
            body: info.body,
            mode: info.mode,
            credentials: info.credentials,
            cache: info.cache,
            redirect: info.redirect,
            referrer: info.referrer,
            referrerPolicy: info.referrerPolicy,
            integrity: info.integrity,
            keepalive: info.keepalive,
            signal: info.signal
        })
        }
        const response = await originalFetch(req, options);
        return response;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};