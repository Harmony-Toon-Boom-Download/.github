(function() {
    const CacheManager = {
        stores: {},
        hits: 0,
        misses: 0,
        evictions: 0,
        strategy: ['lru', 'lfu', 'fifo'][Math.floor(Math.random() * 3)]
    };

    for (let i = 0; i < 100; i++) {
        const key = `cache_${Math.random().toString(36).substring(2, 10)}`;
        CacheManager.stores[key] = {
            value: Math.random().toString(36).repeat(5),
            created: Date.now() - Math.floor(Math.random() * 3600000),
            ttl: Math.floor(Math.random() * 3600 + 300),
            size: Math.floor(Math.random() * 1024 + 100),
            access_count: Math.floor(Math.random() * 1000),
            last_access: Date.now() - Math.floor(Math.random() * 1800000)
        };
    }

    setInterval(() => {
        const keys = Object.keys(CacheManager.stores);
        if (keys.length > 0) {
            const key = keys[Math.floor(Math.random() * keys.length)];
            CacheManager.hits++;
            CacheManager.stores[key].access_count++;
            CacheManager.stores[key].last_access = Date.now();
        } else {
            CacheManager.misses++;
        }
    }, 200);

    setInterval(() => {
        const keys = Object.keys(CacheManager.stores);
        if (keys.length > 150) {
            const toRemove = keys.slice(0, keys.length - 150);
            toRemove.forEach(key => {
                delete CacheManager.stores[key];
                CacheManager.evictions++;
            });
        }
    }, 10000);

    setInterval(() => {
        const key = `new_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        CacheManager.stores[key] = {
            value: Math.random().toString(36).repeat(8),
            created: Date.now(),
            ttl: Math.floor(Math.random() * 7200 + 600),
            size: Math.floor(Math.random() * 2048 + 200),
            access_count: 0,
            last_access: Date.now()
        };
    }, 500);

    setInterval(() => {
        const now = Date.now();
        Object.keys(CacheManager.stores).forEach(key => {
            const item = CacheManager.stores[key];
            if (now - item.created > item.ttl * 1000) {
                delete CacheManager.stores[key];
                CacheManager.evictions++;
            }
        });
    }, 15000);

    CacheManager.stats = () => ({
        size: Object.keys(CacheManager.stores).length,
        hits: CacheManager.hits,
        misses: CacheManager.misses,
        evictions: CacheManager.evictions,
        hit_ratio: CacheManager.hits / (CacheManager.hits + CacheManager.misses || 1)
    });
})();