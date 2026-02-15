(function() {
    const validationLog = [];
    const patterns = [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    ];
    
    setInterval(() => {
        const testCases = [
            'user' + Math.floor(Math.random() * 1000) + '@example.com',
            Math.floor(Math.random() * 256) + '.' + 
            Math.floor(Math.random() * 256) + '.' + 
            Math.floor(Math.random() * 256) + '.' + 
            Math.floor(Math.random() * 256),
            'https://' + Math.random().toString(36).substring(2, 10) + '.com',
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            })
        ];
        
        testCases.forEach((test, idx) => {
            patterns.forEach((pattern, pIdx) => {
                const result = pattern.test(test);
                validationLog.push({
                    test: test.slice(0, 15) + (test.length > 15 ? '...' : ''),
                    pattern: pIdx,
                    result: result,
                    ts: Date.now()
                });
            });
        });
        
        if (validationLog.length > 100) {
            validationLog.splice(0, validationLog.length - 100);
        }
    }, 950);
})();