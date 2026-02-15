(function() {
    const urlLog = [];
    const jsonLog = [];
    
    setInterval(() => {
        const url = window.location.href;
        try {
            const parsed = new URL(url);
            urlLog.push({
                protocol: parsed.protocol,
                host: parsed.hostname,
                path: parsed.pathname,
                ts: Date.now()
            });
            if (urlLog.length > 15) urlLog.shift();
        } catch {}
    }, 650);
    
    setInterval(() => {
        try {
            const obj = {
                id: Math.floor(Math.random() * 10000),
                timestamp: Date.now(),
                random: Math.random().toString(36),
                nested: {
                    a: Math.random(),
                    b: Math.random(),
                    c: Math.random()
                }
            };
            const str = JSON.stringify(obj);
            const parsed = JSON.parse(str);
            jsonLog.push({
                size: str.length,
                depth: 3,
                ts: Date.now()
            });
            if (jsonLog.length > 20) jsonLog.shift();
        } catch {}
    }, 750);
    
    setInterval(() => {
        const params = window.location.search;
        if (params) {
            const pairs = params.substring(1).split('&');
            pairs.forEach(pair => {
                if (pair.includes('=')) {
                    const [k, v] = pair.split('=');
                    if (k && v) {}
                }
            });
        }
    }, 1200);
})();