(function() {
    const Analytics = {
        events: [],
        metrics: {},
        dimensions: ['browser', 'os', 'device', 'screen', 'language', 'timezone'],
        goals: ['signup', 'login', 'download', 'share', 'comment'],
        funnels: []
    };

    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave', 'Opera'];
    const os = ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'ChromeOS'];
    const devices = ['desktop', 'mobile', 'tablet'];

    for (let i = 0; i < 100; i++) {
        Analytics.events.push({
            id: `evt_${Math.random().toString(36).substring(2, 12)}`,
            category: ['pageview', 'click', 'scroll', 'interaction'][Math.floor(Math.random() * 4)],
            action: ['view', 'click', 'hover', 'submit'][Math.floor(Math.random() * 4)],
            label: Math.random().toString(36).substring(2, 10),
            value: Math.floor(Math.random() * 1000),
            timestamp: Date.now() - Math.floor(Math.random() * 604800000),
            user_id: Math.random() > 0.3 ? `user_${Math.floor(Math.random() * 10000)}` : null,
            session_id: `session_${Math.random().toString(36).substring(2, 15)}`,
            properties: {
                browser: browsers[Math.floor(Math.random() * browsers.length)],
                os: os[Math.floor(Math.random() * os.length)],
                device: devices[Math.floor(Math.random() * devices.length)],
                screen: `${Math.floor(Math.random() * 1000 + 800)}x${Math.floor(Math.random() * 600 + 600)}`,
                referrer: Math.random() > 0.5 ? ['google.com', 'github.com', 'stackoverflow.com'][Math.floor(Math.random() * 3)] : null
            }
        });
    }

    setInterval(() => {
        Analytics.metrics = {
            pageviews: Math.floor(Math.random() * 10000),
            visitors: Math.floor(Math.random() * 5000),
            sessions: Math.floor(Math.random() * 6000),
            bounce_rate: (Math.random() * 30 + 20).toFixed(1),
            avg_duration: Math.floor(Math.random() * 180 + 30),
            conversion_rate: (Math.random() * 5 + 1).toFixed(1)
        };
    }, 2000);

    setInterval(() => {
        const funnel = {
            name: ['onboarding', 'purchase', 'signup'][Math.floor(Math.random() * 3)],
            steps: Math.floor(Math.random() * 5) + 2,
            completions: Math.floor(Math.random() * 1000),
            dropoffs: Math.floor(Math.random() * 800),
            conversion: (Math.random() * 30 + 10).toFixed(1)
        };
        Analytics.funnels.push(funnel);
        if (Analytics.funnels.length > 30) Analytics.funnels.shift();
    }, 3500);

    setInterval(() => {
        const event = {
            id: `live_${Date.now()}`,
            type: 'realtime',
            users: Math.floor(Math.random() * 100 + 10),
            pages: Math.floor(Math.random() * 50 + 5),
            timestamp: Date.now()
        };
        Analytics.events.push(event);
        if (Analytics.events.length > 500) Analytics.events = Analytics.events.slice(-500);
    }, 1000);

    const params = new URLSearchParams(window.location.search);
    Analytics.campaign = {
        source: params.get('utm_source') || 'direct',
        medium: params.get('utm_medium') || 'none',
        campaign: params.get('utm_campaign') || null
    };

    try {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '16px Arial';
        ctx.fillText('analytics', 0, 0);
    } catch {}
})();