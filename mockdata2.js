// mockdata2.js

const NUM_VEHICLES = 300; 
const NUM_LOGS = 2000;     
const TRAVEL_TIME_MINUTES = 20; 

const STATIONS = [
    "Central Station", "Downtown Hub", "North Plaza", "South Gateway", 
    "West End", "Airport Terminal", "East Industrial Zone", "Riverside Park", 
    "University Campus", "Old Town Market", "City Civil Hospital",
    "Grand Tech Park", "Botanical Garden", "Museum Square", "Cricket Stadium",
    "Financial District", "Railway Junction", "Sector 17 Plaza",
    "Ancient Fort", "Zoo Entrance"
];

export const STATION_TRANSLATIONS = {
    "Central Station": { hi: "केंद्रीय स्टेशन", pa: "ਕੇਂਦਰੀ ਸਟੇਸ਼ਨ" },
    "Downtown Hub": { hi: "डाउनटाउन हब", pa: "ਡਾਊਨਟਾਊਨ ਹੱਬ" },
    "North Plaza": { hi: "नॉर्थ प्लाज़ा", pa: "ਨੌਰਥ ਪਲਾਜ਼ਾ" },
    "South Gateway": { hi: "साउथ गेटवे", pa: "ਸਾਊਥ ਗੇਟਵੇ" },
    "West End": { hi: "वेस्ट एंड", pa: "ਵੈਸਟ ਐਂਡ" },
    "Airport Terminal": { hi: "एयरपोर्ट टर्मिनल", pa: "ਏਅਰਪੋਰਟ ਟਰਮੀਨਲ" },
    "East Industrial Zone": { hi: "ईस्ट इंडस्ट्रियल ज़ोन", pa: "ਈਸਟ ਇੰਡਸਟਰੀਅਲ ਜ਼ੋਨ" },
    "Riverside Park": { hi: "रिवरसाइड पार्क", pa: "ਰਿਵਰਸਾਈਡ ਪਾਰਕ" },
    "University Campus": { hi: "यूनिवर्सिटी कैंपस", pa: "ਯੂਨੀਵਰਸਿਟੀ ਕੈਂਪਸ" },
    "Old Town Market": { hi: "ओल्ड टाउन मार्केट", pa: "ਓਲਡ ਟਾਊਨ ਮਾਰਕੀਟ" },
    "City Civil Hospital": { hi: "सिटी सिविल हॉस्पिटल", pa: "ਸਿਟੀ ਸਿਵਲ ਹਸਪਤਾਲ" },
    "Grand Tech Park": { hi: "ग्रैंड टेक पार्क", pa: "ਗ੍ਰੈਂਡ ਟੈਕ ਪਾਰਕ" },
    "Botanical Garden": { hi: "बोटैनिकल गार्डन", pa: "ਬੋਟੈਨੀਕਲ ਗਾਰਡਨ" },
    "Museum Square": { hi: "म्यूजियम स्क्वायर", pa: "ਮਿਊਜ਼ੀਅਮ ਸਕੁਆਇਰ" },
    "Cricket Stadium": { hi: "क्रिकेट स्टेडियम", pa: "ਕ੍ਰਿਕਟ ਸਟੇਡੀਅਮ" },
    "Financial District": { hi: "फाइनेंशियल डिस्ट्रिक्ट", pa: "ਵਿੱਤੀ ਜ਼ਿਲ੍ਹਾ" },
    "Railway Junction": { hi: "रेलवे जंक्शन", pa: "ਰੇਲਵੇ ਜੰਕਸ਼ਨ" },
    "Sector 17 Plaza": { hi: "सेक्टर 17 प्लाज़ा", pa: "ਸੈਕਟਰ 17 ਪਲਾਜ਼ਾ" },
    "Ancient Fort": { hi: "पुराना किला", pa: "ਪੁਰਾਣਾ ਕਿਲ੍ਹਾ" },
    "Zoo Entrance": { hi: "चिड़ियाघर प्रवेश", pa: "ਚਿੜੀਆਘਰ ਦਾ ਪ੍ਰਵੇਸ਼ ਦੁਆਰ" }
};

const DYNAMIC_TXT = {
    en: { depart: "DEPART", arrive: "ARRIVE", seats: "🟢 SEATS AVAIL", waiting: "🟡 waiting", full: "🔴 FULL", book: "BOOK", delay: "DELAY", schedule_sms: "📱 SMS ALERT" },
    hi: { depart: "प्रस्थान", arrive: "पहुंच", seats: "🟢 सीट उपलब्ध", waiting: "🟡 ", full: "🔴 फुल", book: "बुक", delay: "देरी", schedule_sms: "📱 एसएमएस अलर्ट" },
    pa: { depart: "ਰਵਾਨਾ", arrive: "ਪਹੁੰਚ", seats: "🟢 ਸੀਟ ਉਪਲਬਧ", waiting:  "🟡 ਖੜ੍ਹੇ ਹੋਣ ਦੀ ਥਾਂ", full: "🔴 ਭਰੀ ਹੋਈ", book: "ਬੁੱਕ", delay: "ਦੇਰੀ", schedule_sms: "📱 SMS ਅਲਰਟ" }
};

function generateLicensePlate(index) {
    if (index === 0) return "GOLD-BUS-007"; 
    const state = "MH"; const city = "12"; const series = ["AB", "CD", "EF", "GH"][Math.floor(index/25)%4];
    return `${state}-${city}-${series}-${String(index+1).padStart(4,'0')}`;
}

function generateVehiclesAndTickets() {
    const vehicles = {}; const tickets = {};
    for (let i = 0; i < NUM_VEHICLES; i++) {
        const p = generateLicensePlate(i);
        vehicles[p] = `Route ${String.fromCharCode(65+(i%26))}${Math.floor(i/26)+1}`;
        tickets[`TKT-${9000+i}`] = p;
    }
    return { vehicles, tickets };
}

function generateLogs(vehicles) {
    const logs = []; const plates = Object.keys(vehicles); const now = Date.now();
    STATIONS.forEach((s, i) => logs.push({ vehicleId: "GOLD-BUS-007", station: s, type: i%2===0?'arrival':'departure', timestamp: new Date(now + i*45*60000) }));
    for (let i=0; i<NUM_LOGS; i++) {
        const v = plates[Math.floor(Math.random()*plates.length)];
        if(v==="GOLD-BUS-007") continue;
        logs.push({ vehicleId: v, station: STATIONS[Math.floor(Math.random()*STATIONS.length)], type: Math.random()<0.5?'arrival':'departure', timestamp: new Date(now + Math.floor(Math.random()*24*3600000)) });
    }
    return logs;
}

const { vehicles, tickets } = generateVehiclesAndTickets();
const logs = generateLogs(vehicles);

export const MOCK_DATA = { vehicles, tickets, logs, STATIONS, NEXT_STATION: "Central Station", TRAVEL_TIME_MINUTES: 20 };

// Also attach to window for non-module access (for local file access)
if (typeof window !== 'undefined') {
    window.MOCK_DATA = MOCK_DATA;
    window.STATION_TRANSLATIONS = STATION_TRANSLATIONS;
}

window.openBooking = function(plate, from, to, price) {
    const lang = document.getElementById('langSelect').value || 'en';
    const fromName = (lang !== 'en' && STATION_TRANSLATIONS[from]) ? STATION_TRANSLATIONS[from][lang] : from;
    const toName = (lang !== 'en' && STATION_TRANSLATIONS[to]) ? STATION_TRANSLATIONS[to][lang] : to;
    document.getElementById('payPlate').innerText = plate;
    document.getElementById('payFrom').innerText = fromName;
    document.getElementById('payTo').innerText = toName;
    document.getElementById('payAmount').innerText = "₹" + price;
    document.getElementById('passengerName').value = "";
    document.getElementById('passengerMobile').value = "";
    document.getElementById('paymentModal').classList.remove('hidden');
    document.getElementById('paymentStep1').classList.remove('hidden');
    document.getElementById('paymentStep2').classList.add('hidden');
};

window.findBusesOnRoute = function() {
    // Use window variables to ensure it works even when module fails to load
    const mockData = window.MOCK_DATA || MOCK_DATA;
    const stations = mockData ? mockData.STATIONS : STATIONS;
    const stationTranslations = window.STATION_TRANSLATIONS || STATION_TRANSLATIONS;
    const dynamicTxt = DYNAMIC_TXT;
    
    if (!mockData) {
        alert('Data not loaded. Please refresh the page or use a local server.');
        console.error('MOCK_DATA not available');
        return;
    }

    const fromVal = document.getElementById('fromStation').value;
    const toVal = document.getElementById('toStation').value;
    const dateVal = document.getElementById('travelDate').value;
    const currentLang = document.getElementById('langSelect').value || 'en';
    const txt = dynamicTxt[currentLang];

    if (!fromVal || !toVal || fromVal.includes("Select")) { alert("Select stations"); return; }
    if (fromVal === toVal) { alert("Stations must be different"); return; }

    const fromIndex = stations.indexOf(fromVal); const toIndex = stations.indexOf(toVal);
    // scheduledMins is the SCHEDULED time on a clear day (used as the base for delay calc)
    const scheduledMins = (Math.abs(toIndex-fromIndex) * 20) + 15;

    let displayDateStr = "TODAY";
    let searchDate = new Date(); searchDate.setHours(0,0,0,0);
    const today = new Date(); today.setHours(0,0,0,0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

    const resultsDiv = document.getElementById('routeResults');
    const errorDiv = document.getElementById('routeError');
    const listDiv = document.getElementById('busList');
    listDiv.innerHTML = '';
    
    // Hide vehicle details sections when searching for a route
    document.getElementById('logsAndEta').classList.add('hidden');
    document.getElementById('vehicleDetails').classList.add('hidden');

    // Check if selected date is today or tomorrow
    let isTodayOrTomorrow = true;
    if (dateVal) {
        searchDate = new Date(dateVal + "T00:00:00");
        // Check for past date
        if (searchDate < today) { 
             // Error message logic is handled in index2.html's findRouteBtn listener, we just hide results here
            resultsDiv.classList.add('hidden'); 
            errorDiv.classList.remove('hidden'); 
            errorDiv.querySelector('span').textContent = (currentLang === 'en') ? 'CANNOT SEARCH FOR PAST DATES' : 'अतीत की तारीखों के लिए खोज नहीं कर सकते';
            return; 
        }
        displayDateStr = searchDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        // Check if date is today or tomorrow
        const searchDateOnly = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
        isTodayOrTomorrow = (searchDateOnly.getTime() === todayOnly.getTime() || searchDateOnly.getTime() === tomorrowOnly.getTime());
    }

    let foundCount = 0;
    function getHash(str) { let h=0; for(let i=0;i<str.length;i++) h=Math.imul(31,h)+str.charCodeAt(i)|0; return Math.abs(h); }

    Object.keys(mockData.vehicles).forEach(plate => {
        const vLogs = mockData.logs.filter(l => l.vehicleId === plate);
        if (vLogs.some(l => l.station === fromVal) && vLogs.some(l => l.station === toVal)) {
            const seed = getHash(plate + (dateVal || "def"));
            if (plate !== "GOLD-BUS-007" && seed % 10 < 5) return; 

            const hour = seed % 24;
            const departureDate = new Date(searchDate); departureDate.setHours(hour); departureDate.setMinutes(seed%60);
            
            // --- CALCULATE DYNAMIC ETA AT PICKUP POINT ---
            // Calculate ETA based on bus's current position relative to pickup point
            let etaAtPickup = null;
            let etaAtPickupText = '';
            
            if (isTodayOrTomorrow) {
                const now = new Date();
                const sortedLogs = vLogs.sort((a, b) => b.timestamp - a.timestamp);
                const lastLog = sortedLogs[0];
                
                // Use a combination of last known location and seed-based variation for uniqueness
                let minsToPickup = 0;
                
                if (lastLog) {
                    const lastStation = lastLog.station;
                    const lastStationIndex = stations.indexOf(lastStation);
                    const pickupStationIndex = stations.indexOf(fromVal);
                    
                    if (lastStationIndex !== -1 && pickupStationIndex !== -1) {
                        // Calculate stations between current and pickup
                        const stationsBetween = Math.abs(pickupStationIndex - lastStationIndex);
                        // Base time: ~20 minutes per station
                        minsToPickup = stationsBetween * 20;
                        
                        // Add variation based on seed to make each bus unique
                        minsToPickup += (seed % 30) - 10; // -10 to +20 minutes variation
                        
                        // If bus is already at or past pickup, calculate from departure time
                        if (lastStationIndex >= pickupStationIndex && stationsBetween === 0) {
                            // Bus is at pickup point or past it
                            minsToPickup = Math.max(0, (departureDate - now) / 60000);
                        }
                    }
                } else {
                    // No logs found, use seed-based calculation
                    minsToPickup = 15 + (seed % 45); // 15-60 minutes
                }
                
                // Ensure positive time
                minsToPickup = Math.max(5, minsToPickup);
                
                // Calculate ETA: current time + time to reach pickup
                etaAtPickup = new Date(now.getTime() + minsToPickup * 60000);
                
                // Only show if ETA is before or close to departure time (within 2 hours)
                const minsUntilDeparture = (departureDate - now) / 60000;
                if (minsUntilDeparture > 0 && minsUntilDeparture < 120) {
                    // Format ETA text
                    if (minsToPickup < 60) {
                        etaAtPickupText = `${Math.round(minsToPickup)} min`;
                    } else {
                        const hours = Math.floor(minsToPickup / 60);
                        const mins = Math.round(minsToPickup % 60);
                        etaAtPickupText = `${hours}h ${mins}m`;
                    }
                } else {
                    // ETA too far in future or bus already departed
                    etaAtPickup = null;
                }
            }
            // --- END ETA CALCULATION ---
            
            // --- DELAY CALCULATION (only for today or tomorrow) ---
            let simulatedDelayMins = 0;
            let delayValueHtml = '';
            
            if (isTodayOrTomorrow) {
                // Simulate delay (-5 to +14 minutes) only for today/tomorrow
                simulatedDelayMins = (seed % 20) - 5; 
                // Ensure GOLD-BUS-007 is always on time
                if (plate === "GOLD-BUS-007") simulatedDelayMins = 0;
                // Ensure delay is not excessively negative (max early is 5 mins)
                if (simulatedDelayMins < -5) simulatedDelayMins = (seed % 5) - 5;

                // --- DELAY DISPLAY STRING ---
                let delayMinsAbs = Math.abs(simulatedDelayMins);
                if (simulatedDelayMins > 0) {
                    // Late
                    delayValueHtml = `<span class="text-red-500 font-bold">+${delayMinsAbs} min</span>`;
                } else if (simulatedDelayMins < 0) {
                    // Early
                    delayValueHtml = `<span class="text-green-500 font-bold">-${delayMinsAbs} min</span>`;
                } else {
                    // On Time
                    delayValueHtml = `<span class="text-cyan-400 font-bold">On Time</span>`;
                }
            }
            // --- END DELAY DISPLAY STRING ---

            const totalMins = scheduledMins + simulatedDelayMins;
            const arrivalDate = new Date(departureDate.getTime() + totalMins*60000);

            const price = 10 + Math.floor(totalMins * 2);
            const crowdIdx = seed % 3;
            const crowdText = crowdIdx===0 ? txt.seats : crowdIdx===1 ? txt.waiting : txt.full;
            const displayFrom = (currentLang !== 'en' && stationTranslations[fromVal]) ? stationTranslations[fromVal][currentLang] : fromVal;
            const displayTo = (currentLang !== 'en' && stationTranslations[toVal]) ? stationTranslations[toVal][currentLang] : toVal;

            foundCount++;
            const card = document.createElement('div');
            card.className = 'p-4 rounded-lg border border-blue-500 bg-gray-800 cursor-pointer hover:bg-blue-900 transition-all relative overflow-hidden group';
            card.dataset.vehicleId = plate;
            card.dataset.departureDate = departureDate.toISOString();
            card.dataset.isFuture = !isTodayOrTomorrow ? 'true' : 'false';
            
            // Add click handler to display logs
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking the book button
                if (e.target.closest('.book-ticket-btn')) return;
                if (window.displayVehicleLogs) {
                    window.displayVehicleLogs(plate, departureDate.toISOString());
                }
            });
            
            // Build delay HTML - only show if today or tomorrow
            const delayHtml = isTodayOrTomorrow 
                ? `<div class="text-gray-400 text-xs font-semibold">${txt.delay}: ${delayValueHtml}</div>`
                : '';
            
            // Build ETA HTML - show dynamic ETA at pickup point if available
            let etaHtml = '';
            if (etaAtPickup && etaAtPickupText) {
                const etaTimeStr = etaAtPickup.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
                etaHtml = `
                    <div class="mt-2 pt-2 border-t border-gray-700">
                        <div class="text-yellow-400 text-[10px] uppercase tracking-wider">ETA at ${displayFrom}</div>
                        <div class="text-yellow-300 font-mono text-lg font-bold mt-1">${etaTimeStr}</div>
                        <div class="text-gray-500 text-[9px] mt-0.5">in ${etaAtPickupText}</div>
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="flex justify-between items-start mb-4 border-b border-gray-700 pb-2">
                    <div>
                        <div class="text-cyan-400 font-bold text-2xl">${plate}</div>
                        <div class="text-xs font-bold mt-1 ${crowdIdx===0?'text-green-400':crowdIdx===1?'text-yellow-400':'text-red-500'}">${crowdText}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-purple-400 text-sm font-bold uppercase">📅 ${displayDateStr}</div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                    <div class="text-left">
                        <div class="text-gray-400 text-[10px] uppercase tracking-wider">${txt.depart} ${displayFrom}</div>
                        <div class="text-green-300 font-mono text-2xl font-bold mt-1">${departureDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div>
                        ${etaHtml}
                    </div>
                    <div class="flex flex-col items-center px-4">
                        <div class="text-gray-500 text-xs mb-1">${Math.floor(totalMins/60)}h ${totalMins%60}m</div>
                        ${delayHtml}
                        <div class="text-cyan-500 mt-1">➤</div>
                    </div>
                    <div class="text-right flex flex-col items-end gap-2">
                        <div class="flex gap-2">
                            <button class="book-ticket-btn bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-4 rounded shadow-lg transition-all"
                                    data-plate="${plate}" data-from="${fromVal}" data-to="${toVal}" data-price="${price}">
                                ${txt.book} ₹${price}
                            </button>
                            <button class="schedule-sms-btn bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1 px-3 rounded shadow-lg transition-all text-sm"
                                    data-plate="${plate}" data-from="${fromVal}" data-to="${toVal}" data-arrival="${arrivalDate.toISOString()}">
                                ${txt.schedule_sms}
                            </button>
                        </div>
                        <div>
                            <div class="text-gray-400 text-[10px] uppercase tracking-wider text-right">${txt.arrive} ${displayTo}</div>
                            <div class="text-cyan-300 font-mono text-2xl font-bold mt-1 text-right">${arrivalDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div>
                        </div>
                    </div>
                </div>
            `;
            listDiv.appendChild(card);
        }
    });

    if(foundCount===0) { resultsDiv.classList.add('hidden'); errorDiv.classList.remove('hidden'); }
    else { errorDiv.classList.add('hidden'); resultsDiv.classList.remove('hidden'); }

    document.querySelectorAll('.book-ticket-btn').forEach(b => {
        b.addEventListener('click', (e) => { e.stopPropagation(); window.openBooking(e.currentTarget.dataset.plate, e.currentTarget.dataset.from, e.currentTarget.dataset.to, e.currentTarget.dataset.price); });
    });

    document.querySelectorAll('.schedule-sms-btn').forEach(b => {
        b.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            const arrivalTimeISO = e.currentTarget.dataset.arrival;
            const arrivalDate = new Date(arrivalTimeISO);
            const arrivalTimeStr = arrivalDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
            if (window.openSmsModal) {
                window.openSmsModal(
                    e.currentTarget.dataset.plate, 
                    e.currentTarget.dataset.from, 
                    e.currentTarget.dataset.to, 
                    arrivalTimeStr,
                    arrivalTimeISO
                );
            } else {
                alert('SMS scheduling feature is loading. Please wait a moment and try again.');
            }
        });
    });
};