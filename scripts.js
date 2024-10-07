function updateCurrentTime() {
    const now = new Date();
    const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const currentTime = now.toLocaleTimeString('en-US', options);
    document.getElementById('current-time').innerText = `Current Time (GMT -4): ${currentTime}`;

    checkSessions(now);
}

function checkSessions(now) {
    const londonOpen = new Date(now);
    londonOpen.setHours(4, 0, 0);
    const londonClose = new Date(now);
    londonClose.setHours(12, 0, 0);
    
    const newYorkOpen = new Date(now);
    newYorkOpen.setHours(9, 0, 0);
    const newYorkClose = new Date(now);
    newYorkClose.setHours(17, 0, 0);
    
    const sydneyOpen = new Date(now);
    sydneyOpen.setHours(18, 0, 0);
    const sydneyClose = new Date(now);
    sydneyClose.setHours(2, 0, 0);
    
    const tokyoOpen = new Date(now);
    tokyoOpen.setHours(19, 0, 0);
    const tokyoClose = new Date(now);
    tokyoClose.setHours(3, 0, 0);

    let currentSessions = [];
    
    if (now >= londonOpen && now < londonClose) {
        currentSessions.push("London");
        document.getElementById('london').classList.add('active'); // Marca la sesión activa
        updateClosesIn('london-closes', londonClose);
    } else {
        document.getElementById('london').classList.remove('active'); // Elimina la clase activa
        document.getElementById('london-closes').innerText = '';
    }

    if (now >= newYorkOpen && now < newYorkClose) {
        currentSessions.push("New York");
        document.getElementById('new-york').classList.add('active');
        updateClosesIn('new-york-closes', newYorkClose);
    } else {
        document.getElementById('new-york').classList.remove('active');
        document.getElementById('new-york-closes').innerText = '';
    }

    if (now >= sydneyOpen && now < sydneyClose) {
        currentSessions.push("Sydney");
        document.getElementById('sydney').classList.add('active');
        updateClosesIn('sydney-closes', sydneyClose);
    } else {
        document.getElementById('sydney').classList.remove('active');
        document.getElementById('sydney-closes').innerText = '';
    }

    if (now >= tokyoOpen && now < tokyoClose) {
        currentSessions.push("Tokyo");
        document.getElementById('tokyo').classList.add('active');
        updateClosesIn('tokyo-closes', tokyoClose);
    } else {
        document.getElementById('tokyo').classList.remove('active');
        document.getElementById('tokyo-closes').innerText = '';
    }

    const activePairs = {
        London: "EUR/USD, GBP/USD",
        NewYork: "USD/CAD, EUR/USD",
        Sydney: "AUD/USD, NZD/USD",
        Tokyo: "USD/JPY, AUD/JPY"
    };
    
    let activePairsText = '';
    if (currentSessions.length > 0) {
        const activePairsList = currentSessions.map(session => activePairs[session]).join(', ');
        activePairsText = activePairsList;
    } else {
        activePairsText = "No active pairs";
    }

    document.getElementById('active-pairs').innerText = activePairsText;
    
    document.getElementById('current-session').innerText = `Current Session: ${currentSessions.length > 0 ? currentSessions.join(' & ') : 'No active session'}`;
}

function updateClosesIn(sessionId, closeTime) {
    const now = new Date();
    const timeLeft = closeTime - now;
    const hours = Math.floor((timeLeft % 86400000) / 3600000);
    const minutes = Math.round(((timeLeft % 86400000) % 3600000) / 60000);

    document.getElementById(sessionId).innerText = `Closes in: ${hours} Hours ${minutes} Minutes`;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Initial call
