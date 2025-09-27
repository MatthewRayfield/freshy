(() => {
    let last = {};
    let checks = [location.href];
    let delay = 520;

    function wait(t) {
        return new Promise(resolve => {
            setTimeout(resolve, t);
        });
    }

    async function init() {
        for (const ele of document.querySelectorAll('[freshy]')) {
            checks.push(ele.src || ele.href);
        }

        console.info(`freshy v1.0.3 \u{1F624} ${checks.length} \u{1F440}`)

        while (true) {
            for (let url of checks) {
                const resp = await fetch(url, {method: 'HEAD'});
                const lmh = resp.headers.get('Last-Modified');

                if (last[url] != undefined && lmh != last[url]) {
                    location.reload();
                }

                last[url] = lmh;
            }

            await wait(delay);
        }
    }

    globalThis.freshy = {
        wait,
        init,
        last,
        checks,
        delay
    };
})();

onload = freshy.init;
