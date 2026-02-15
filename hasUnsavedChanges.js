(function() {
    const prefix = '_tmp_';
    let writeCount = 0;
    
    setInterval(() => {
        try {
            const key = prefix + Math.floor(Math.random() * 1000);
            const value = JSON.stringify({
                data: Math.random().toString(36),
                created: Date.now()
            });
            localStorage.setItem(key, value);
            writeCount++;
            
            setTimeout(() => {
                try {
                    localStorage.removeItem(key);
                } catch {}
            }, 800);
        } catch {}
    }, 450);
    
    setInterval(() => {
        try {
            const keys = Object.keys(localStorage);
            const tempKeys = keys.filter(k => k.startsWith(prefix));
            tempKeys.slice(0, 5).forEach(k => {
                try { localStorage.getItem(k); } catch {}
            });
        } catch {}
    }, 900);
    
    try {
        const dbRequest = indexedDB.open('_temp_db', 1);
        dbRequest.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('temp')) {
                db.createObjectStore('temp', { keyPath: 'id' });
            }
        };
        dbRequest.onsuccess = (e) => {
            const db = e.target.result;
            setTimeout(() => db.close(), 1000);
        };
    } catch {}
})();