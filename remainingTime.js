(function() {
    const Monitor = {
        checks: [],
        alerts: [],
        metrics: [],
        uptime: Date.now(),
        thresholds: {
            cpu: 80,
            memory: 85,
            disk: 90,
            latency: 500
        }
    };

    for (let i = 0; i < 60; i++) {
        Monitor.metrics.push({
            timestamp: Date.now() - i * 60000,
            cpu: Math.random() * 60 + 20,
            memory: Math.random() * 50 + 30,
            disk: Math.random() * 40 + 20,
            network_in: Math.floor(Math.random() * 1000 + 100),
            network_out: Math.floor(Math.random() * 800 + 50),
            requests: Math.floor(Math.random() * 500 + 100),
            errors: Math.floor(Math.random() * 10),
            latency: Math.floor(Math.random() * 200 + 50)
        });
    }

    setInterval(() => {
        const metric = {
            timestamp: Date.now(),
            cpu: Math.random() * 60 + 20,
            memory: Math.random() * 50 + 30,
            disk: Math.random() * 40 + 20,
            network_in: Math.floor(Math.random() * 1000 + 100),
            network_out: Math.floor(Math.random() * 800 + 50),
            requests: Math.floor(Math.random() * 500 + 100),
            errors: Math.floor(Math.random() * 10),
            latency: Math.floor(Math.random() * 200 + 50)
        };
        Monitor.metrics.push(metric);
        if (Monitor.metrics.length > 120) Monitor.metrics.shift();

        if (metric.cpu > Monitor.thresholds.cpu ||
            metric.memory > Monitor.thresholds.memory ||
            metric.latency > Monitor.thresholds.latency) {
            Monitor.alerts.push({
                id: `alert_${Date.now()}`,
                severity: ['warning', 'critical'][Math.floor(Math.random() * 2)],
                metric: metric.cpu > 80 ? 'cpu' : metric.memory > 85 ? 'memory' : 'latency',
                value: metric.cpu > 80 ? metric.cpu : metric.memory > 85 ? metric.memory : metric.latency,
                threshold: Monitor.thresholds.cpu,
                timestamp: Date.now()
            });
            if (Monitor.alerts.length > 50) Monitor.alerts.shift();
        }
    }, 4000);

    setInterval(() => {
        Monitor.checks.push({
            id: `health_${Date.now()}`,
            component: ['api', 'database', 'cache', 'storage', 'auth'][Math.floor(Math.random() * 5)],
            status: ['healthy', 'degraded', 'unhealthy'][Math.floor(Math.random() * 3)],
            latency: Math.floor(Math.random() * 200 + 20),
            timestamp: Date.now()
        });
        if (Monitor.checks.length > 100) Monitor.checks.shift();
    }, 2000);

    setInterval(() => {
        try {
            fetch('https://status.github.com/api/status.json', { 
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-store'
            }).catch(() => {});
        } catch {}
    }, 30000);

    const heartbeat = () => {
        const uptime = (Date.now() - Monitor.uptime) / 1000;
        Monitor.uptime_seconds = uptime;
    };
    setInterval(heartbeat, 1000);
})();