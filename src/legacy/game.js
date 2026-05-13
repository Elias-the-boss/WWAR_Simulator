// ==========================================
        // CONFIGURACIÃ“N E INYECCIÃ“N DE PRECIOS
        // ==========================================
        
        // Â¡REFACTORIZACIÃ“N! Cambia los precios aquÃ­ y todo el juego se actualizarÃ¡ solo.
        const CONFIG = {
            speeds: { playerBase: 3.75, playerTank: 2.25, aiBase: 0.9, verticalWobble: 2.25, bulletNormal: 8, bulletCannon: 5 },
            cooldowns: { bullet: 300, cannon: 1500 },
            ai: { fireChance: 0.014 },
            economy: { 
                recruitCostPop: 5000, 
                recruitCostMoney: 2000, 
                paraCost: 4000,       // Paracaidistas a 4k
                spyCost: 7000,        // EspÃ­a a 7k
                airCost: 3000,        // ZepelÃ­n a 3k
                subCost: 6000,        // Submarino a 6k
                battleshipCost: 9000, // Barco a 9k
                juggernautCost: 9000, // Tanque a 9k
                generalCost: 50000,   
                nukeCost: 1000000,    // Bomba a 1 MillÃ³n
                pactCost: 10000, 
                allianceCost: 30000,
                bribeCost: 20000, 
                mercCost: 15000,
                recruitYield: 50, fortCostBat: 50, turnPopGrowth: 5000, turnMoneyGrowth: 2500, turnBatGrowth: 20 
            },
            battle: { maxOnScreen: 50 } 
        };

        function cleanText(value) {
            return String(value)
                .replaceAll('ÃƒÂ¡', 'á').replaceAll('ÃƒÂ©', 'é').replaceAll('ÃƒÂ­', 'í').replaceAll('ÃƒÂ³', 'ó').replaceAll('ÃƒÂº', 'ú')
                .replaceAll('ÃƒÂ', 'Á').replaceAll('ÃƒÂ‰', 'É').replaceAll('ÃƒÂ', 'Í').replaceAll('ÃƒÂ“', 'Ó').replaceAll('ÃƒÂš', 'Ú')
                .replaceAll('ÃƒÂ±', 'ñ').replaceAll('ÃƒÂ‘', 'Ñ').replaceAll('Ã‚Â¡', '¡').replaceAll('Ã‚Â¿', '¿')
                .replaceAll('Ã¡', 'á').replaceAll('Ã©', 'é').replaceAll('Ã­', 'í').replaceAll('Ã³', 'ó').replaceAll('Ãº', 'ú')
                .replaceAll('Ã', 'Á').replaceAll('Ã‰', 'É').replaceAll('Ã', 'Í').replaceAll('Ã“', 'Ó').replaceAll('Ãš', 'Ú')
                .replaceAll('Ã±', 'ñ').replaceAll('Ã‘', 'Ñ').replaceAll('Â¡', '¡').replaceAll('Â¿', '¿')
                .replaceAll('â˜¢ï¸', '☢️').replaceAll('âš”ï¸', '⚔️').replaceAll('âš ï¸', '⚠️')
                .replaceAll('ðŸ’°', '💰').replaceAll('ðŸ›¡ï¸', '🛡️').replaceAll('ðŸ•µï¸', '🕵️')
                .replaceAll('ðŸŒ', '🌍').replaceAll('ðŸš¨', '🚨').replaceAll('ðŸ¤', '🤝')
                .replaceAll('ðŸª–', '🪖').replaceAll('ðŸ›©ï¸', '🛩️').replaceAll('ðŸš¢', '🚢')
                .replaceAll('ðŸ¦¾', '🦾').replaceAll('ðŸª‚', '🪂').replaceAll('ðŸŒŸ', '🌟')
                .replaceAll('ðŸ“…', '📅').replaceAll('ðŸ‘¥', '👥').replaceAll('ðŸ›’', '🛒')
                .replaceAll('âŒ', '❌').replaceAll('â­', '⭐').replaceAll('âš“', '⚓')
                .replaceAll('â¸', '⏸').replaceAll('â–¶ï¸', '▶️').replaceAll('ðŸ“–', '📖')
                .replaceAll('ðŸŽ¨', '🎨').replaceAll('ðŸ–¼ï¸', '🖼️').replaceAll('ðŸ—¡ï¸', '🗡️')
                .replaceAll('â¬†', '↑').replaceAll('â¬‡', '↓').replaceAll('â¬…', '←').replaceAll('âž¡', '→');
        }

        function formatPrice(num) {
            if(num >= 1000000) return (num/1000000) + 'M';
            if(num >= 1000) return (num/1000) + 'k';
            return num.toString();
        }

        function formatScenarioYear(year) {
            return year < 0 ? `${Math.abs(year)} a.C.` : `${year}`;
        }

        const SHOP_PRICE_IDS = { recruit: 'price-recruit', gen: 'price-gen', para: 'price-para', spy: 'price-spy', air: 'price-air', sub: 'price-sub', ship: 'price-ship', jug: 'price-jug', nuke: 'price-nuke' };
        const CAMPAIGN_ERAS = [-1450, -323, 117, 1200, 1492, 1740, 1825, 1928, 2026];
        const CAMPAIGN_TURNS_PER_ERA = 6;
        const RESOURCE_TYPES = {
            oil: new Set(["Saudi Arabia", "Iraq", "Iran", "Russia", "Venezuela", "United States of America", "Canada", "Nigeria", "Libya", "Algeria", "Mexico"]),
            gold: new Set(["South Africa", "Ghana", "Mali", "Peru", "Bolivia", "Australia", "Russia", "Canada"]),
            food: new Set(["France", "Ukraine", "Argentina", "Brazil", "India", "China", "Egypt", "United States of America", "Turkey"]),
            industry: new Set(["Germany", "United Kingdom", "France", "United States of America", "Japan", "China", "Italy", "Russia", "India"]),
            science: new Set(["United States of America", "United Kingdom", "Germany", "France", "Japan", "South Korea", "China", "India", "Russia"]),
        };
        const RESOURCE_INFO = {
            oil: { label: "Petróleo", icon: "Pet" },
            gold: { label: "Oro", icon: "Oro" },
            food: { label: "Comida", icon: "Com" },
            industry: { label: "Industria", icon: "Ind" },
            science: { label: "Ciencia", icon: "Tec" },
        };
        const RESOURCE_EFFECTS = {
            oil: "baja el coste de tanques, barcos, aviones y submarinos",
            gold: "+1200 dinero por turno y territorio",
            food: "+8% población por turno y territorio",
            industry: "+8% tropas por turno y territorio",
            science: "investigar cuesta menos y algunas armas avanzadas salen mas baratas",
        };
        const VICTORY_RULES_TEXT = [
            "Dominación: controlar el 45% de territorios jugables",
            "Capitales: controlar 4 capitales",
            "Economía: 2.000.000 dinero y al menos 8 territorios",
            "Alianzas: tener 4 aliados",
        ];
        const ERA_MISSIONS = [
            { until: -1, title: "Reino antiguo", goal: "Controla 3 capitales y 1 recurso de comida.", check: id => countOwnedCapitals(id) >= 3 && hasResource(nations[id], 'food') },
            { until: 500, title: "Imperio clasico", goal: "Controla 20 territorios o 4 capitales.", check: id => countOwnedProvinces(id) >= 20 || countOwnedCapitals(id) >= 4 },
            { until: 1491, title: "Corona medieval", goal: "Construye 4 fuertes o consigue 3 aliados.", check: id => countOwnedForts(id) >= 4 || countAllies(id) >= 3 },
            { until: 1825, title: "Era de exploracion", goal: "Controla 2 territorios coloniales y 2 recursos.", check: id => countOwnedColonies(id) >= 2 && countResourceTypes(id) >= 2 },
            { until: 1928, title: "Imperio industrial", goal: "Consigue industria, oro y 12 territorios.", check: id => hasResource(nations[id], 'industry') && hasResource(nations[id], 'gold') && countOwnedProvinces(id) >= 12 },
            { until: 2025, title: "Guerra mundial", goal: "Controla 4 capitales o investiga aviacion.", check: id => countOwnedCapitals(id) >= 4 || ensureTechSet(nations[id]).has('Aviacion') },
            { until: Infinity, title: "Superpotencia moderna", goal: "Consigue ciencia, petroleo y tecnologia de drones.", check: id => hasResource(nations[id], 'science') && hasResource(nations[id], 'oil') && ensureTechSet(nations[id]).has('Drones') },
        ];
        const CAMPAIGN_LEVELS = [
            { year: -1450, title: "Nacimiento del Reino", objective: "Controla 3 territorios y al menos 1 recurso de comida.", rule: "La estabilidad importa desde el primer turno: crecer sin comida puede provocar crisis.", rewardText: "+20.000 dinero, +80 batallones y estabilidad.", reward: { money: 20000, bat: 80, stability: 8 }, check: id => countOwnedProvinces(id) >= 3 && hasResource(nations[id], 'food') },
            { year: -1450, title: "Unificación", objective: "Controla 6 territorios o captura tu primera capital.", rule: "Los reinos pequeños empiezan a mirar tus fronteras con miedo.", rewardText: "+30.000 dinero y +120 batallones.", reward: { money: 30000, bat: 120 }, check: id => countOwnedProvinces(id) >= 6 || countOwnedCapitals(id) >= 1 },
            { year: -323, title: "Primer Imperio", objective: "Controla 8 territorios y 1 capital.", rule: "Los imperios agresivos reciben más ganas de atacarte.", rewardText: "Desbloqueas prestigio imperial: +50.000 dinero, +1 general.", reward: { money: 50000, generals: 1, stability: 6 }, check: id => countOwnedProvinces(id) >= 8 && countOwnedCapitals(id) >= 1 },
            { year: 117, title: "Rutas Comerciales", objective: "Controla 2 tipos de recursos distintos.", rule: "El comercio empieza a decidir guerras: los recursos abaratan armas y sostienen población.", rewardText: "+65.000 dinero y tecnología de Navegación.", reward: { money: 65000, tech: ["Navegacion"] }, check: id => countResourceTypes(id) >= 2 },
            { year: 1200, title: "Guerra de Fronteras", objective: `Sobrevive ${CAMPAIGN_TURNS_PER_ERA - 1} turnos con estabilidad 40+ y 5 territorios.`, rule: "La IA se vuelve más agresiva durante este nivel.", rewardText: "+150 batallones y +1 fuerte gratis en tus capitales.", reward: { bat: 150, fortCapitals: 1 }, check: id => campaignTurnsInEra >= CAMPAIGN_TURNS_PER_ERA - 1 && (nations[id].stability || 0) >= 40 && countOwnedProvinces(id) >= 5 },
            { year: 1200, title: "Era de Conquistas", objective: "Controla el 25% de los territorios jugables.", rule: "Las alianzas defensivas son más probables contra grandes potencias.", rewardText: "+90.000 dinero, +220 batallones y reputación.", reward: { money: 90000, bat: 220, reputation: 2 }, check: id => countOwnedProvinces(id) >= Math.ceil(getPlayableTerritoryCount() * 0.25) },
            { year: 1492, title: "Crisis Interna", objective: "Mantén estabilidad 55+ con 8 territorios.", rule: "Impuestos altos y capitales perdidas pueden iniciar rebeliones.", rewardText: "Reforma del Estado: +18 estabilidad y +60.000 dinero.", reward: { money: 60000, stability: 18 }, check: id => (nations[id].stability || 0) >= 55 && countOwnedProvinces(id) >= 8 },
            { year: 1492, title: "Dominio Naval", objective: "Controla 3 territorios navales o coloniales.", rule: "Las potencias navales colonizan con más frecuencia.", rewardText: "+2 barcos, +1 submarino si existe en la época, +40.000 dinero.", reward: { money: 40000, battleships: 2, subs: 1 }, check: id => countOwnedNavalOrColonial(id) >= 3 },
            { year: 1740, title: "Colonización", objective: "Controla 3 colonias y 3 tipos de recursos.", rule: "Las colonias dan recursos, pero pueden ser inestables.", rewardText: "+120.000 dinero, +1 espía y +1 tecnología industrial.", reward: { money: 120000, spies: 1, tech: ["Industrializacion"] }, check: id => countOwnedColonies(id) >= 3 && countResourceTypes(id) >= 3 },
            { year: 1825, title: "Carrera Tecnológica", objective: "Investiga 6 tecnologías o desbloquea Industrialización y Artillería.", rule: "La ciencia empieza a separar imperios modernos de reinos atrasados.", rewardText: "+1 general, +1 juggernaut y +80.000 dinero.", reward: { money: 80000, generals: 1, juggernauts: 1 }, check: id => countTechs(id) >= 6 || (ensureTechSet(nations[id]).has("Industrializacion") && ensureTechSet(nations[id]).has("Artilleria")) },
            { year: 1928, title: "Guerra Mundial", objective: "Controla 20 territorios o derrota una coalición consiguiendo 3 capitales.", rule: "Las alianzas defensivas y ataques de IA son más duros.", rewardText: "+250 batallones, +2 aviones y +1 espía.", reward: { bat: 250, air: 2, spies: 1 }, check: id => countOwnedProvinces(id) >= 20 || countOwnedCapitals(id) >= 3 },
            { year: 1928, title: "Caida de una Capital", objective: "Controla 4 capitales.", rule: "Cada capital enemiga perdida hunde dinero, moral y tropas del rival.", rewardText: "+180.000 dinero, +2 generales y estabilidad nacional.", reward: { money: 180000, generals: 2, stability: 12 }, check: id => countOwnedCapitals(id) >= 4 },
            { year: 2026, title: "Superpotencia", objective: "Ten petróleo, ciencia, industria y 1.000.000 de dinero.", rule: "Las armas modernas dependen de ciencia, industria y petróleo.", rewardText: "+1 dron/avión, +1 submarino, +1 tecnología Drones.", reward: { air: 1, subs: 1, tech: ["Drones"] }, check: id => hasResource(nations[id], 'oil') && hasResource(nations[id], 'science') && hasResource(nations[id], 'industry') && nations[id].money >= 1000000 },
            { year: 2026, title: "Guerra Fría", objective: "Consigue 3 aliados y 2 espías o investiga Drones sin usar dominación total.", rule: "Diplomacia, espionaje y reputación valen tanto como conquistar.", rewardText: "+250.000 dinero, +3 espías y +2 reputación.", reward: { money: 250000, spies: 3, reputation: 2 }, check: id => (countAllies(id) >= 3 && (nations[id].spies || 0) >= 2) || ensureTechSet(nations[id]).has("Drones") },
            { year: 2026, title: "Dominio Final", objective: "Gana por dominación, capitales, economía o alianzas.", rule: "Este es el final de la historia alternativa.", rewardText: "Victoria de campaña.", reward: { money: 500000, stability: 20 }, check: id => hasAnyVictoryCondition(id) },
        ];
        const CAPITAL_BY_YEAR = {
            "-1450": { 1: "Egypt", 2: "Turkey", 4: "Iraq", 5: "Iraq", 6: "Greece", 7: "Sudan", 10: "India", 11: "China" },
            "-323": { 1: "Iraq", 2: "Greece", 3: "Tunisia", 4: "Italy", 5: "India", 6: "China" },
            "117": { 1: "Italy", 2: "Iran", 3: "Sudan", 4: "Germany", 6: "China", 7: "India" },
            "1200": { 1: "Germany", 2: "France", 3: "United Kingdom", 4: "Turkey", 5: "Morocco", 6: "Turkey", 7: "Egypt", 8: "Mongolia", 10: "Spain", 12: "China", 13: "Japan", 14: "India" },
            "1492": { 1: "United Kingdom", 2: "France", 3: "Mexico", 4: "Russia", 5: "Spain", 6: "China", 7: "Japan", 10: "Germany", 11: "Poland", 12: "Turkey", 13: "Portugal", 14: "Peru", 15: "Mexico" },
            "1740": { 1: "United Kingdom", 2: "France", 3: "United States of America", 4: "Russia", 5: "Spain", 6: "China", 7: "Japan", 10: "Austria", 11: "Germany", 12: "Turkey", 13: "Portugal", 14: "Netherlands", 15: "India", 16: "Sweden" },
            "1825": { 1: "United Kingdom", 2: "France", 3: "United States of America", 4: "Russia", 5: "Spain", 6: "China", 7: "Japan", 10: "Brazil", 11: "Germany", 12: "Turkey", 13: "Portugal", 14: "Colombia", 15: "Mexico", 16: "Austria" },
            "1928": { 1: "United Kingdom", 2: "France", 3: "United States of America", 4: "Russia", 5: "Spain", 6: "China", 7: "Japan", 8: "Greenland", 10: "Italy", 11: "Germany", 12: "Turkey", 13: "Portugal" },
            "2026": { 1: "Australia", 2: "France", 3: "United States of America", 4: "Russia", 5: "Mexico", 6: "China", 7: "Japan", 8: "South Africa", 10: "India", 11: "Indonesia", 12: "Saudi Arabia", 13: "Brazil" },
        };
        const TECH_ORDER = ["Formaciones", "Navegacion", "Polvora", "Artilleria", "Industrializacion", "Aviacion", "Blindados", "Submarinos", "Nuclear", "Drones"];
        const ITEM_TECH = { gen: "Formaciones", ship: "Navegacion", jug: "Artilleria", air: "Aviacion", para: "Aviacion", sub: "Submarinos", nuke: "Nuclear", spy: "Formaciones" };

        function getScenarioWeapons() {
            const weaponSets = (window.WAR_WORLD && window.WAR_WORLD.scenarioWeapons) || {};
            return weaponSets[selectedScenarioYear] || weaponSets[1928] || {};
        }

        function isWeaponAvailable(item) {
            return Object.prototype.hasOwnProperty.call(getScenarioWeapons(), item);
        }

        function getEraStartingTech(year = selectedScenarioYear) {
            if (year < 0) return ["Formaciones"];
            if (year < 1492) return ["Formaciones", "Navegacion"];
            if (year < 1740) return ["Formaciones", "Navegacion", "Polvora"];
            if (year < 1900) return ["Formaciones", "Navegacion", "Polvora", "Artilleria"];
            if (year < 2026) return ["Formaciones", "Navegacion", "Polvora", "Artilleria", "Industrializacion"];
            return ["Formaciones", "Navegacion", "Polvora", "Artilleria", "Industrializacion", "Aviacion", "Blindados", "Submarinos"];
        }

        function ensureTechSet(nation) {
            if (!nation) return new Set();
            if (!(nation.tech instanceof Set)) nation.tech = new Set(nation.tech || getEraStartingTech());
            return nation.tech;
        }

        function hasTechForItem(item, nation = nations[currentShopper]) {
            if (item === 'recruit') return true;
            const needed = getItemTechRequirement(item);
            return !needed || ensureTechSet(nation).has(needed);
        }

        function getItemTechRequirement(item) {
            if (item === 'jug' && selectedScenarioYear < 1492) return 'Formaciones';
            if (item === 'air' && selectedScenarioYear >= 2026) return 'Drones';
            return ITEM_TECH[item];
        }

        function getNextResearchTech(nation = nations[currentShopper]) {
            const tech = ensureTechSet(nation);
            const eraMax = selectedScenarioYear >= 2026 ? TECH_ORDER : getEraStartingTech().concat(selectedScenarioYear >= 1900 ? ["Aviacion", "Blindados", "Submarinos"] : selectedScenarioYear >= 1492 ? ["Artilleria", "Industrializacion"] : ["Navegacion"]);
            return TECH_ORDER.find(name => eraMax.includes(name) && !tech.has(name)) || null;
        }

        function getProvinceResource(name) {
            return Object.keys(RESOURCE_TYPES).find(type => RESOURCE_TYPES[type].has(name)) || null;
        }

        function getNationResources(nationId) {
            const counts = {};
            Object.keys(RESOURCE_INFO).forEach(type => counts[type] = 0);
            provinces.filter(p => p.owner === nationId).forEach(p => {
                if (p.resource && counts[p.resource] !== undefined) counts[p.resource]++;
            });
            return counts;
        }

        function countOwnedProvinces(id) { return provinces.filter(p => p.owner === id).length; }
        function countOwnedCapitals(id) { return provinces.filter(p => p.owner === id && p.isCapital).length; }
        function countOwnedForts(id) { return provinces.filter(p => p.owner === id).reduce((sum, p) => sum + (p.forts || 0), 0); }
        function countOwnedColonies(id) { return provinces.filter(p => p.owner === id && p.isColony).length; }
        function countOwnedNavalOrColonial(id) { return provinces.filter(p => p.owner === id && (p.terrain === 'naval' || p.isColony)).length; }
        function countTechs(id) { return ensureTechSet(nations[id]).size; }
        function getPlayableTerritoryCount() { return Math.max(1, provinces.filter(p => p.owner !== 9 || p.originalOwner !== 9).length); }
        function countResourceTypes(id) {
            const res = nations[id] ? nations[id].resources || {} : {};
            return Object.keys(RESOURCE_INFO).filter(type => res[type] > 0).length;
        }
        function countAllies(id) {
            return Object.keys(nations).filter(other => parseInt(other, 10) !== id && parseInt(other, 10) !== 9 && areAllied(id, parseInt(other, 10))).length;
        }

        function getEraMission() {
            return ERA_MISSIONS.find(mission => selectedScenarioYear <= mission.until) || ERA_MISSIONS[ERA_MISSIONS.length - 1];
        }

        function hasResource(nation, type) {
            return nation && nation.resources && nation.resources[type] > 0;
        }

        function hasAnyVictoryCondition(id) {
            const nat = nations[id];
            if (!nat || !provinces.length) return false;
            const owned = countOwnedProvinces(id);
            return owned >= Math.ceil(getPlayableTerritoryCount() * 0.45)
                || countOwnedCapitals(id) >= 4
                || (nat.money >= 2000000 && owned >= 8)
                || countAllies(id) >= 4;
        }

        function getCampaignLevelIndexForYear(year) {
            const exact = CAMPAIGN_LEVELS.findIndex(level => level.year >= year);
            return exact >= 0 ? exact : CAMPAIGN_LEVELS.length - 1;
        }

        function getCurrentCampaignLevel() {
            return CAMPAIGN_LEVELS[Math.min(campaignLevelIndex, CAMPAIGN_LEVELS.length - 1)];
        }

        function getResourceAdjustedCost(item, buyer = nations[currentShopper]) {
            const base = {
                recruit: CONFIG.economy.recruitCostMoney,
                gen: CONFIG.economy.generalCost,
                para: CONFIG.economy.paraCost,
                spy: CONFIG.economy.spyCost,
                air: CONFIG.economy.airCost,
                sub: CONFIG.economy.subCost,
                ship: buyer && buyer.trait === 'naval' ? Math.floor(CONFIG.economy.battleshipCost * 0.7) : CONFIG.economy.battleshipCost,
                jug: CONFIG.economy.juggernautCost,
                nuke: CONFIG.economy.nukeCost,
            }[item] || 0;
            let mult = 1;
            if ((item === 'jug' || item === 'air' || item === 'sub' || item === 'ship') && !hasResource(buyer, 'oil')) mult += 0.35;
            if ((item === 'jug' || item === 'ship' || item === 'air') && !hasResource(buyer, 'industry')) mult += 0.25;
            if ((item === 'spy' || item === 'nuke' || (selectedScenarioYear >= 2026 && item === 'air')) && !hasResource(buyer, 'science')) mult += 0.25;
            return Math.max(1, Math.floor(base * mult));
        }

        function getShopButton(item) {
            return Array.from(document.querySelectorAll('#shop-modal button')).find(button => (button.getAttribute('onclick') || '').includes(`buyItem('${item}')`));
        }

        function setShopItemLabel(item, label) {
            const button = getShopButton(item);
            if (!button) return;
            const span = button.querySelector('span');
            if (span) span.innerText = label;
        }
        // Esta funciÃ³n lee los precios de arriba y los pone en los botones automÃ¡ticamente.
        function initDynamicTexts() {
            const labels = getScenarioWeapons();
            Object.keys(SHOP_PRICE_IDS).forEach(item => {
                const button = getShopButton(item);
                if (button) button.classList.toggle('hidden', !isWeaponAvailable(item));
                if (labels[item]) setShopItemLabel(item, labels[item]);
            });
            document.getElementById('price-recruit').innerText = `-${formatPrice(CONFIG.economy.recruitCostPop)} pob | -${formatPrice(getResourceAdjustedCost('recruit'))} dinero`;
            document.getElementById('price-gen').innerText = `-${formatPrice(getResourceAdjustedCost('gen'))} dinero`;
            document.getElementById('price-para').innerText = `-${formatPrice(getResourceAdjustedCost('para'))} dinero`;
            document.getElementById('price-spy').innerText = `-${formatPrice(getResourceAdjustedCost('spy'))} dinero`;
            document.getElementById('price-air').innerText = `-${formatPrice(getResourceAdjustedCost('air'))} dinero`;
            document.getElementById('price-sub').innerText = `-${formatPrice(getResourceAdjustedCost('sub'))} dinero`;
            document.getElementById('price-ship').innerText = `-${formatPrice(getResourceAdjustedCost('ship'))} dinero`;
            document.getElementById('price-jug').innerText = `-${formatPrice(getResourceAdjustedCost('jug'))} dinero`;
            document.getElementById('price-nuke').innerText = `-${formatPrice(getResourceAdjustedCost('nuke'))} dinero`;
            
            document.getElementById('btn-dip-pact').innerText = `PACTO DE NO AGRESION (${formatPrice(CONFIG.economy.pactCost)} dinero)`;
            document.getElementById('btn-dip-bribe').innerText = `SOBORNO DE GUERRA (${formatPrice(CONFIG.economy.bribeCost)} dinero)`;
            document.getElementById('btn-dip-alliance').innerText = `PROPONER ALIANZA (${formatPrice(CONFIG.economy.allianceCost)} dinero)`;
            let btnMerc = document.getElementById('btn-dip-merc-buy');
            if(btnMerc) btnMerc.innerText = `CONTRATARLOS (${formatPrice(CONFIG.economy.mercCost)} dinero)`;
        }

        let isTwoPlayerMode = false; let activeCommander = 0; let selectedScenarioYear = 1928; let selectedPlayerEmpireId = 0; let selectedPlayer2EmpireId = 4; let diplomacyMapMode = false; let pendingNewspaperActions = [];
        let isCampaignMode = false; let campaignEraIndex = CAMPAIGN_ERAS.indexOf(1928); let campaignLevelIndex = getCampaignLevelIndexForYear(1928); let campaignTurnsInEra = 0; let victoryMode = 'domination';
        let p1FlagIndex = 0; let p2FlagIndex = 1; let activeFlagIndex = 0; let flagGalleryTarget = null; let currentShopper = 0; 
        let konamiProgress = 0;
        const KONAMI_SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

        function toggle2P(is2P) {
            isTwoPlayerMode = is2P;
            const p2Setup = document.getElementById('p2-setup-div');
            const p2FlagButton = document.getElementById('btn-assign-p2');
            if(is2P) {
                if (p2Setup) p2Setup.classList.remove('hidden');
                if (p2FlagButton) p2FlagButton.classList.remove('hidden');
            } else {
                if (p2Setup) p2Setup.classList.add('hidden');
                if (p2FlagButton) p2FlagButton.classList.add('hidden');
            }
            populatePlayerEmpireSelect();
        }

        function setScenarioYear(year) {
            selectedScenarioYear = parseInt(year, 10) || 1928;
            populatePlayerEmpireSelect();
        }

        function setPlayerEmpire(ownerId, player = 1) {
            const selectedId = parseInt(ownerId, 10) || 0;
            const preset = window.WAR_WORLD && window.WAR_WORLD.scenarioNations[selectedScenarioYear];
            if (!preset || !preset[selectedId]) return;
            if (player === 2) selectedPlayer2EmpireId = selectedId;
            else selectedPlayerEmpireId = selectedId;

            const nameInput = document.getElementById(player === 2 ? 'p2-nation' : 'p1-nation');
            const colorInput = document.getElementById(player === 2 ? 'p2-color' : 'p1-color');
            if (nameInput) nameInput.value = preset[selectedId].name;
            if (colorInput) colorInput.value = preset[selectedId].color;
            updateSetupPlayerColor(player);
        }

        function updateSetupPlayerColor(player) {
            const colorInput = document.getElementById(player === 2 ? 'p2-color' : 'p1-color');
            const card = document.getElementById(player === 2 ? 'p2-setup-div' : 'p1-setup-card');
            if (card && colorInput) card.style.borderColor = colorInput.value;
        }

        function populatePlayerEmpireSelect() {
            const p1Select = document.getElementById('p1-empire-select');
            const p2Select = document.getElementById('p2-empire-select');
            if (!p1Select || !window.WAR_WORLD) return;
            const preset = window.WAR_WORLD.scenarioNations[selectedScenarioYear] || window.WAR_WORLD.scenarioNations[1928];
            const playableIds = Object.keys(preset)
                .map(id => parseInt(id, 10))
                .filter(id => id !== 9)
                .sort((a, b) => a - b);

            const defaultHistoricalId = playableIds.find(id => id !== 0) ?? 0;
            const defaultP2Id = playableIds.find(id => id !== 0 && id !== defaultHistoricalId) ?? defaultHistoricalId;
            selectedPlayerEmpireId = preset[selectedPlayerEmpireId] && selectedPlayerEmpireId !== 9 && selectedPlayerEmpireId !== 0 ? selectedPlayerEmpireId : defaultHistoricalId;
            selectedPlayer2EmpireId = preset[selectedPlayer2EmpireId] && selectedPlayer2EmpireId !== 9 && selectedPlayer2EmpireId !== selectedPlayerEmpireId ? selectedPlayer2EmpireId : defaultP2Id;

            function fillSelect(select, selectedId) {
                if (!select) return;
                select.innerHTML = '';
                playableIds.forEach(id => {
                    const option = document.createElement('option');
                    option.value = id;
                    option.textContent = preset[id].name;
                    select.appendChild(option);
                });
                select.value = String(selectedId);
            }

            fillSelect(p1Select, selectedPlayerEmpireId);
            fillSelect(p2Select, selectedPlayer2EmpireId);
            setPlayerEmpire(selectedPlayerEmpireId, 1);
            setPlayerEmpire(selectedPlayer2EmpireId, 2);
        }

        // ==========================================
        // CREADOR DE BANDERAS Y GALERÃA
        // ==========================================
        let canvas = document.getElementById('flag-canvas'); let ctx = canvas.getContext('2d');
        let isDrawing = false; let currentTool = 'brush';
        function openFlagCreator() {
            flagGalleryTarget = null;
            showScreen('flag-creator-screen');
            initCanvas();
        }
        function initCanvas() { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
        function setTool(tool) { currentTool = tool; ['brush', 'fill', 'eraser', 'sticker'].forEach(t => { document.getElementById('tool-' + t).classList.remove('active'); }); document.getElementById('tool-' + tool).classList.add('active'); }
        function selectHistoricalSymbol(symbolId) {
            const select = document.getElementById('sticker-select');
            if (select) select.value = symbolId;
            document.querySelectorAll('.flag-symbol-grid button').forEach(btn => btn.classList.remove('active'));
            const activeButton = document.querySelector(`.flag-symbol-grid button[onclick="selectHistoricalSymbol('${symbolId}')"]`);
            if (activeButton) activeButton.classList.add('active');
            setTool('sticker');
        }
        function clearCanvas() { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
        canvas.addEventListener('mousedown', startPos); canvas.addEventListener('mousemove', drawOnCanvas);
        canvas.addEventListener('mouseup', endPos); canvas.addEventListener('mouseout', endPos);
        function startPos(e) { if(currentTool === 'fill') { applyFloodFill(e); return; } if(currentTool === 'sticker') { applySticker(e); return; } isDrawing = true; drawOnCanvas(e); }
        function endPos() { isDrawing = false; ctx.beginPath(); }
        function drawOnCanvas(e) { if(!isDrawing || currentTool === 'fill' || currentTool === 'sticker') return; let rect = canvas.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top; ctx.lineWidth = document.getElementById('brush-size').value; ctx.lineCap = 'round'; ctx.strokeStyle = (currentTool === 'eraser') ? '#ffffff' : document.getElementById('paint-color').value; ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); }
        function applySticker(e) {
            let rect = canvas.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
            let select = document.getElementById('sticker-select'), option = select.options[select.selectedIndex];
            let stickerValue = option.value, type = option.getAttribute('data-type');
            let size = document.getElementById('brush-size').value * 4;
            if(type === 'img') {
                let img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = function() { ctx.drawImage(img, x - ((size*1.5)/2), y - (size/2), size*1.5, size); };
                img.src = stickerValue;
            } else if (type === 'symbol') {
                drawHistoricalFlagSymbol(stickerValue, x, y, size);
            } else {
                ctx.font = size + "px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = document.getElementById('paint-color').value;
                ctx.fillText(stickerValue, x, y);
            }
        }
        function drawStar(cx, cy, spikes, outerRadius, innerRadius, fillStyle, strokeStyle = null, lineWidth = 1) {
            let rot = Math.PI / 2 * 3;
            let x = cx, y = cy;
            const step = Math.PI / spikes;
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fillStyle = fillStyle;
            ctx.fill();
            if (strokeStyle) {
                ctx.strokeStyle = strokeStyle;
                ctx.lineWidth = lineWidth;
                ctx.stroke();
            }
        }
        function drawLaurelBranch(side, scale) {
            ctx.save();
            ctx.scale(side, 1);
            ctx.strokeStyle = '#d4af37';
            ctx.fillStyle = '#d4af37';
            ctx.lineWidth = 2.2 * scale;
            ctx.beginPath();
            ctx.moveTo(-36 * scale, 23 * scale);
            ctx.quadraticCurveTo(-49 * scale, 0, -34 * scale, -27 * scale);
            ctx.stroke();
            for (let i = 0; i < 6; i++) {
                const yy = 17 * scale - i * 8 * scale;
                const xx = -38 * scale - Math.sin(i * 0.7) * 7 * scale;
                ctx.beginPath();
                ctx.ellipse(xx - 5 * scale, yy, 7 * scale, 3.2 * scale, -0.7, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
        function drawCrownedShield(scale) {
            ctx.fillStyle = '#f1c40f';
            ctx.fillRect(-14 * scale, -28 * scale, 7 * scale, 10 * scale);
            ctx.fillRect(-3.5 * scale, -32 * scale, 7 * scale, 14 * scale);
            ctx.fillRect(7 * scale, -28 * scale, 7 * scale, 10 * scale);
            ctx.fillStyle = '#c0392b';
            ctx.beginPath();
            ctx.moveTo(-18 * scale, -18 * scale);
            ctx.lineTo(18 * scale, -18 * scale);
            ctx.lineTo(15 * scale, 14 * scale);
            ctx.quadraticCurveTo(0, 28 * scale, -15 * scale, 14 * scale);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#f1c40f';
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
        }
        function drawHistoricalFlagSymbol(symbolId, x, y, size) {
            const s = Math.max(0.45, Math.min(2.3, size / 70));
            ctx.save();
            ctx.translate(x, y);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 3 * s;
            if (symbolId === 'brazil') {
                ctx.fillStyle = '#f1c40f';
                ctx.beginPath(); ctx.moveTo(0, -26*s); ctx.lineTo(34*s, 0); ctx.lineTo(0, 26*s); ctx.lineTo(-34*s, 0); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#2446a8'; ctx.beginPath(); ctx.arc(0, 0, 15*s, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 4*s; ctx.beginPath(); ctx.moveTo(-13*s, -2*s); ctx.quadraticCurveTo(0, 5*s, 13*s, -2*s); ctx.stroke();
                [[-7,-7],[2,-9],[8,-3],[-2,5],[6,8]].forEach(([sx, sy]) => drawStar(sx*s, sy*s, 5, 1.7*s, 0.7*s, '#fff'));
            } else if (symbolId === 'rome') {
                ctx.fillStyle = '#f1c40f';
                drawLaurelBranch(1, s);
                drawLaurelBranch(-1, s);
                ctx.font = `bold ${20*s}px Georgia, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('SPQR', 0, 2*s);
                ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2*s;
                ctx.beginPath(); ctx.arc(0, 31*s, 10*s, Math.PI, 0); ctx.stroke();
            } else if (symbolId === 'spain') {
                drawCrownedShield(s);
                ctx.strokeStyle = '#8b1a10'; ctx.lineWidth = 2*s;
                ctx.beginPath(); ctx.moveTo(0, -18*s); ctx.lineTo(0, 22*s); ctx.moveTo(-17*s, 0); ctx.lineTo(17*s, 0); ctx.stroke();
                ctx.fillStyle = '#f1c40f'; ctx.beginPath(); ctx.arc(-24*s, 3*s, 4*s, 0, Math.PI * 2); ctx.arc(24*s, 3*s, 4*s, 0, Math.PI * 2); ctx.fill();
            } else if (symbolId === 'mongolia') {
                ctx.fillStyle = '#f1c40f'; ctx.strokeStyle = '#f1c40f'; ctx.lineWidth = 3*s;
                ctx.beginPath(); ctx.moveTo(0, -31*s); ctx.lineTo(-6*s, -20*s); ctx.lineTo(0, -24*s); ctx.lineTo(6*s, -20*s); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.arc(0, -14*s, 7*s, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, 7*s, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, 7*s, Math.PI * 1.5, Math.PI * 0.5); ctx.stroke();
                ctx.fillRect(-14*s, 12*s, 28*s, 4*s); ctx.fillRect(-14*s, 23*s, 28*s, 4*s);
                ctx.beginPath(); ctx.moveTo(-12*s, -3*s); ctx.lineTo(-22*s, 8*s); ctx.lineTo(-12*s, 19*s); ctx.moveTo(12*s, -3*s); ctx.lineTo(22*s, 8*s); ctx.lineTo(12*s, 19*s); ctx.stroke();
            } else if (symbolId === 'china') {
                drawStar(-10*s, -8*s, 5, 17*s, 7*s, '#f1c40f');
                [[12,-18],[22,-6],[18,10],[4,18]].forEach(([sx, sy]) => drawStar(sx*s, sy*s, 5, 5*s, 2*s, '#f1c40f'));
            } else if (symbolId === 'vietnam') {
                drawStar(0, 0, 5, 28*s, 11*s, '#f1c40f');
            } else if (symbolId === 'serbia') {
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.moveTo(-6*s,-18*s); ctx.quadraticCurveTo(-34*s,-8*s,-25*s,22*s); ctx.quadraticCurveTo(-11*s,14*s,0,27*s); ctx.quadraticCurveTo(11*s,14*s,25*s,22*s); ctx.quadraticCurveTo(34*s,-8*s,6*s,-18*s); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#c0392b'; ctx.fillRect(-12*s, -13*s, 24*s, 30*s);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 4*s; ctx.beginPath(); ctx.moveTo(0, -10*s); ctx.lineTo(0, 14*s); ctx.moveTo(-9*s, 1*s); ctx.lineTo(9*s, 1*s); ctx.stroke();
                ctx.fillStyle = '#f1c40f'; ctx.fillRect(-9*s, -26*s, 18*s, 7*s);
            } else if (symbolId === 'egypt') {
                ctx.fillStyle = '#d4af37';
                ctx.beginPath(); ctx.moveTo(0,-28*s); ctx.lineTo(-9*s,-12*s); ctx.lineTo(-33*s,-7*s); ctx.lineTo(-12*s,4*s); ctx.lineTo(-18*s,28*s); ctx.lineTo(0,15*s); ctx.lineTo(18*s,28*s); ctx.lineTo(12*s,4*s); ctx.lineTo(33*s,-7*s); ctx.lineTo(9*s,-12*s); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#fff'; ctx.fillRect(-7*s, -1*s, 14*s, 16*s);
                ctx.fillStyle = '#c0392b'; ctx.fillRect(-7*s, -1*s, 14*s, 5*s);
                ctx.fillStyle = '#111'; ctx.fillRect(-7*s, 10*s, 14*s, 5*s);
            } else if (symbolId === 'saudi') {
                ctx.strokeStyle = '#fff'; ctx.fillStyle = '#fff'; ctx.lineWidth = 4*s;
                ctx.font = `${14*s}px Georgia, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('لا إله إلا الله', 0, -9*s);
                ctx.beginPath(); ctx.moveTo(-28*s, 16*s); ctx.lineTo(24*s, 16*s); ctx.lineTo(30*s, 11*s); ctx.moveTo(24*s, 16*s); ctx.lineTo(28*s, 20*s); ctx.stroke();
            } else if (symbolId === 'portugal') {
                ctx.strokeStyle = '#f1c40f'; ctx.lineWidth = 3*s;
                ctx.beginPath(); ctx.arc(0, 0, 26*s, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(0, 0, 12*s, 26*s, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(-26*s, 0); ctx.lineTo(26*s, 0); ctx.moveTo(0, -26*s); ctx.lineTo(0, 26*s); ctx.stroke();
                ctx.fillStyle = '#fff'; ctx.fillRect(-9*s, -13*s, 18*s, 26*s);
                ctx.strokeStyle = '#1f5fbf'; ctx.lineWidth = 2*s; ctx.strokeRect(-9*s, -13*s, 18*s, 26*s);
                ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(0, 0, 5*s, 0, Math.PI * 2); ctx.fill();
            } else if (symbolId === 'morocco') {
                ctx.strokeStyle = '#0f7a3b'; ctx.lineWidth = 4*s;
                const pts = [];
                for (let i = 0; i < 5; i++) {
                    const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
                    pts.push([Math.cos(a) * 27*s, Math.sin(a) * 27*s]);
                }
                ctx.beginPath();
                [0,2,4,1,3,0].forEach((idx, i) => i ? ctx.lineTo(pts[idx][0], pts[idx][1]) : ctx.moveTo(pts[idx][0], pts[idx][1]));
                ctx.stroke();
            }
            ctx.restore();
        }
        function applyFloodFill(e) { let rect = canvas.getBoundingClientRect(), startX = Math.floor(e.clientX - rect.left), startY = Math.floor(e.clientY - rect.top); let colorData = ctx.getImageData(0, 0, canvas.width, canvas.height); let targetHex = document.getElementById('paint-color').value; let fillR = parseInt(targetHex.slice(1,3), 16), fillG = parseInt(targetHex.slice(3,5), 16), fillB = parseInt(targetHex.slice(5,7), 16); let startPos = (startY * canvas.width + startX) * 4; let startR = colorData.data[startPos], startG = colorData.data[startPos+1], startB = colorData.data[startPos+2]; if(startR === fillR && startG === fillG && startB === fillB) return; let pixelStack = [[startX, startY]]; while(pixelStack.length > 0) { let newPos = pixelStack.pop(), x = newPos[0], y = newPos[1], pixelPos = (y * canvas.width + x) * 4; if(x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) { if(colorData.data[pixelPos] === startR && colorData.data[pixelPos+1] === startG && colorData.data[pixelPos+2] === startB) { colorData.data[pixelPos] = fillR; colorData.data[pixelPos+1] = fillG; colorData.data[pixelPos+2] = fillB; colorData.data[pixelPos+3] = 255; pixelStack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]); } } } ctx.putImageData(colorData, 0, 0); }

        const FLAG_STORAGE_KEY = 'imperiosFlagsData';
        function readSavedFlags() {
            try {
                return JSON.parse(localStorage.getItem(FLAG_STORAGE_KEY) || '[]') || [];
            } catch (e) {
                console.warn('No se pudieron leer las banderas guardadas:', e);
                return [];
            }
        }
        function getCompressedFlagDataURL() {
            const webp = canvas.toDataURL('image/webp', 0.82);
            if (webp && webp.startsWith('data:image/webp')) return webp;
            const jpeg = canvas.toDataURL('image/jpeg', 0.86);
            if (jpeg && jpeg.startsWith('data:image/jpeg')) return jpeg;
            return canvas.toDataURL('image/png');
        }
        function persistSavedFlags(flags) {
            let workingFlags = flags.slice();
            while (workingFlags.length > 0) {
                try {
                    localStorage.setItem(FLAG_STORAGE_KEY, JSON.stringify(workingFlags));
                    savedFlags = workingFlags;
                    p1FlagIndex = Math.min(p1FlagIndex, Math.max(0, savedFlags.length - 1));
                    p2FlagIndex = Math.min(p2FlagIndex, Math.max(0, savedFlags.length - 1));
                    return { ok: true, pruned: flags.length - workingFlags.length };
                } catch (e) {
                    if (workingFlags.length <= 2) throw e;
                    workingFlags.splice(2, 1);
                }
            }
            throw new Error('No queda espacio para guardar banderas.');
        }
        function describeStorageError(e) {
            if (!e) return 'Error desconocido.';
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') return 'El navegador se quedó sin espacio para más banderas.';
            if (e.name === 'SecurityError') return 'El navegador bloqueó el almacenamiento al abrir el juego como archivo local. Usa http://localhost:5173 para guardarlas permanentemente.';
            return `${e.name || 'Error'}: ${e.message || 'No se pudo guardar.'}`;
        }
        let savedFlags = readSavedFlags();
        function createDefaultFlag(colors) {
            let tempCanvas = document.createElement('canvas');
            tempCanvas.width = 300; tempCanvas.height = 200;
            let tCtx = tempCanvas.getContext('2d');
            tCtx.fillStyle = colors[0]; tCtx.fillRect(0, 0, 300, 200);
            tCtx.fillStyle = colors[1]; tCtx.fillRect(0, 0, 100, 200);
            tCtx.fillStyle = colors[2]; tCtx.fillRect(200, 0, 100, 200);
            return tempCanvas.toDataURL();
        }
        function createKonamiFlag() {
            let tempCanvas = document.createElement('canvas');
            tempCanvas.width = 300; tempCanvas.height = 200;
            let tCtx = tempCanvas.getContext('2d');
            tCtx.fillStyle = '#111820';
            tCtx.fillRect(0, 0, 300, 200);
            tCtx.fillStyle = '#00cec9';
            tCtx.fillRect(0, 0, 300, 18);
            tCtx.fillRect(0, 182, 300, 18);
            tCtx.fillStyle = '#f1c40f';
            tCtx.font = 'bold 46px monospace';
            tCtx.textAlign = 'center';
            tCtx.textBaseline = 'middle';
            tCtx.fillText('↑↑↓↓', 150, 68);
            tCtx.fillText('←→←→', 150, 118);
            tCtx.font = 'bold 30px monospace';
            tCtx.fillText('B A', 150, 158);
            tCtx.strokeStyle = '#fff';
            tCtx.lineWidth = 5;
            tCtx.strokeRect(8, 8, 284, 184);
            return tempCanvas.toDataURL();
        }

        function unlockKonamiFlag() {
            const alreadyUnlocked = localStorage.getItem('warKonamiFlagUnlocked') === '1';
            const flag = createKonamiFlag();
            if (!alreadyUnlocked) {
                try {
                    persistSavedFlags(savedFlags.concat(flag));
                    localStorage.setItem('warKonamiFlagUnlocked', '1');
                } catch (e) {
                    savedFlags.push(flag);
                }
            }
            playSound('win');
            showNewspaper('BANDERA SECRETA', 'Has desbloqueado la bandera Konami. Ya aparece en la galeria de banderas.');
        }
        function ensureDefaultFlags() {
            if(savedFlags.length === 0) savedFlags.push(createDefaultFlag(['#1abc9c', '#ffffff', '#1abc9c']));
            if(savedFlags.length === 1) savedFlags.push(createDefaultFlag(['#e1b12c', '#2c3e50', '#e1b12c']));
            try { persistSavedFlags(savedFlags); } catch (e) { console.warn('Las banderas por defecto quedan solo en memoria:', e); }
        }
        ensureDefaultFlags();
        
        function saveFlag() {
            let dataURL;
            try {
                dataURL = getCompressedFlagDataURL();
                const result = persistSavedFlags(savedFlags.concat(dataURL));
                const prunedText = result.pruned > 0 ? ` Se borraron ${result.pruned} banderas antiguas para hacer espacio.` : '';
                alert(`¡Bandera imperial creada y guardada!${prunedText}`);
                openGallery();
            } catch(e) {
                if (dataURL) savedFlags.push(dataURL);
                alert(`No se pudo guardar permanentemente. ${describeStorageError(e)} La bandera queda disponible en esta sesión hasta recargar.`);
                openGallery();
            }
        }

        function openGallery(player = null) {
            flagGalleryTarget = player;
            activeFlagIndex = player === 2 ? p2FlagIndex : p1FlagIndex;
            let container = document.getElementById('gallery-container'); container.innerHTML = '';
            let assignDiv = document.createElement('div'); assignDiv.style.marginBottom = "20px";
            assignDiv.innerHTML = flagGalleryTarget
                ? `<p style="color: #bdc3c7; font-size: 0.95em;">Elige una bandera para el Jugador ${flagGalleryTarget}.</p>`
                : `
                    <button onclick="assignFlag(1)" style="background-color: #8c7ae6;">Asignar a JUGADOR 1</button>
                    <button id="btn-assign-p2" onclick="assignFlag(2)" class="${isTwoPlayerMode ? '' : 'hidden'}" style="background-color: #e1b12c; color:black;">Asignar a JUGADOR 2</button>
                    <p style="color: #bdc3c7; font-size: 0.9em;">Haz clic en una bandera y luego asignala al jugador que quieras.</p>
                `;
            container.appendChild(assignDiv);

            let grid = document.createElement('div'); grid.className = "gallery-grid";
            savedFlags.forEach((flagData, index) => {
                let div = document.createElement('div'); div.className = `gallery-item ${index === activeFlagIndex ? 'active' : ''}`;
                div.onclick = () => {
                    activeFlagIndex = index;
                    if (flagGalleryTarget) assignFlag(flagGalleryTarget, true);
                    else openGallery();
                };
                div.innerHTML = `<div class="flag-box" style="background-image: url('${flagData}'); background-size: cover; background-position: center;"></div>`;
                grid.appendChild(div);
            });
            container.appendChild(grid); showScreen('flag-gallery-screen');
        }

        function closeGallery() {
            showScreen(flagGalleryTarget ? 'setup-screen' : 'menu-screen');
            flagGalleryTarget = null;
        }

        function assignFlag(player, silent = false) {
            if(player === 1) p1FlagIndex = activeFlagIndex;
            else p2FlagIndex = activeFlagIndex;
            if (!silent) alert(`Bandera asignada al Jugador ${player}.`);
            applyActiveFlagUI();
            if (flagGalleryTarget) closeGallery();
        }

        function applyActiveFlagUI() {
            let f1 = savedFlags[p1FlagIndex] || savedFlags[0]; let f2 = savedFlags[p2FlagIndex] || savedFlags[1] || f1;
            let sp1 = document.getElementById('setup-flag-preview-p1'); if(sp1) { sp1.style.backgroundImage = `url('${f1}')`; sp1.style.backgroundSize = 'cover'; sp1.style.backgroundPosition = 'center'; }
            let sp2 = document.getElementById('setup-flag-preview-p2'); if(sp2) { sp2.style.backgroundImage = `url('${f2}')`; sp2.style.backgroundSize = 'cover'; sp2.style.backgroundPosition = 'center'; }
            let hp1 = document.getElementById('hud-flag-p1'); if(hp1) { hp1.style.backgroundImage = `url('${f1}')`; hp1.style.backgroundSize = 'cover'; hp1.style.backgroundPosition = 'center'; }
            let hp2 = document.getElementById('hud-flag-p2'); if(hp2) { hp2.style.backgroundImage = `url('${f2}')`; hp2.style.backgroundSize = 'cover'; hp2.style.backgroundPosition = 'center'; }
        }

        // ==========================================
        // EDITOR Y GALERIA DE CONTINENTES
        // ==========================================
        let savedContinents = JSON.parse(localStorage.getItem('warContinentsData') || '[]');
        let activeContinentId = localStorage.getItem('warActiveContinentId') || '';
        let continentCanvas = document.getElementById('continent-canvas');
        let continentCtx = continentCanvas ? continentCanvas.getContext('2d') : null;
        let continentTool = 'coast';
        let isDrawingContinent = false;
        let currentContinentTerritories = [];
        let currentTerritoryPoints = [];
        let borderStrokePoints = [];
        let borderStrokes = [];
        let currentBorderStroke = null;
        let lastBorderPoint = null;
        const CONTINENT_TEMPLATES = {
            blank: [],
            world: [
                [[70,160],[170,110],[300,145],[365,230],[310,355],[170,375],[95,290]],
                [[390,115],[530,95],[660,155],[690,260],[580,320],[455,265]],
                [[745,170],[940,125],[1040,205],[990,330],[820,330],[735,260]],
                [[510,345],[620,385],[610,515],[505,565],[435,475]],
                [[765,395],[890,370],[970,470],[915,565],[780,540]],
            ],
            europe: [],
            mediterranean: [
                [[80,170],[245,120],[390,170],[380,255],[210,275],[95,240]],
                [[450,165],[630,135],[805,190],[790,270],[610,300],[475,255]],
                [[190,380],[385,355],[520,430],[455,545],[245,520]],
                [[590,375],[785,350],[980,420],[910,540],[675,525]],
            ],
            greece: [
                [[160,120],[320,105],[405,210],[365,330],[205,310],[130,220]],
                [[470,150],[620,125],[710,220],[640,335],[505,300]],
                [[305,380],[420,365],[470,500],[340,560],[250,480]],
                [[600,395],[740,380],[785,510],[670,565]],
                [[830,180],[955,210],[930,330],[805,300]],
            ],
            islands: [
                [[150,210],[250,170],[315,235],[260,315],[160,300]],
                [[430,130],[560,125],[625,215],[520,285],[410,230]],
                [[735,210],[865,170],[955,260],[885,360],[755,330]],
                [[335,430],[460,380],[550,465],[495,555],[365,535]],
                [[675,430],[820,405],[895,500],[790,575]],
            ],
        };

        function getActiveContinent() {
            return savedContinents.find(item => item.id === activeContinentId) || null;
        }

        function openContinentEditor() {
            showScreen('continent-editor-screen');
            initContinentCanvas();
        }

        function initContinentCanvas() {
            if (!continentCanvas || !continentCtx) return;
            if (!continentCanvas.dataset.ready) {
                const templateSelect = document.getElementById('continent-template-select');
                loadContinentTemplate(templateSelect ? templateSelect.value : 'europe');
                continentCanvas.dataset.ready = '1';
            }
            setContinentTool(continentTool);
        }

        function clearContinentCanvas(confirmFirst = true) {
            if (!continentCtx) return;
            if (confirmFirst && !confirm("Borrar el dibujo actual del continente?")) return;
            currentContinentTerritories = [];
            currentTerritoryPoints = [];
            borderStrokePoints = [];
            borderStrokes = [];
            currentBorderStroke = null;
            lastBorderPoint = null;
            const w = continentCanvas.width, h = continentCanvas.height;
            continentCtx.clearRect(0, 0, w, h);
            const ocean = continentCtx.createLinearGradient(0, 0, w, h);
            ocean.addColorStop(0, '#1f6f8b');
            ocean.addColorStop(1, '#0d344c');
            continentCtx.fillStyle = ocean;
            continentCtx.fillRect(0, 0, w, h);
            continentCtx.strokeStyle = 'rgba(255,255,255,0.18)';
            continentCtx.lineWidth = 2;
            for (let x = 80; x < w; x += 130) {
                continentCtx.beginPath();
                continentCtx.moveTo(x, 0);
                continentCtx.lineTo(x - 80, h);
                continentCtx.stroke();
            }
            drawTerritoryDraft();
        }

        function drawTemplateShape(points, index) {
            if (!continentCtx || !points.length) return;
            continentCtx.beginPath();
            continentCtx.moveTo(points[0][0], points[0][1]);
            points.slice(1).forEach(p => continentCtx.lineTo(p[0], p[1]));
            continentCtx.closePath();
            continentCtx.fillStyle = index % 2 ? '#d7c180' : '#c9b16d';
            continentCtx.strokeStyle = '#111';
            continentCtx.lineWidth = 5;
            continentCtx.fill();
            continentCtx.stroke();
        }

        function getTemplateGeoBounds(templateId) {
            return {
                europe: [-25, 34, 45, 72],
                mediterranean: [-12, 24, 45, 48],
                greece: [18, 33, 32, 43],
            }[templateId] || null;
        }

        function getTemplateGeoFilter(templateId) {
            const bounds = getTemplateGeoBounds(templateId);
            if (!bounds) return () => true;
            return feature => {
                const b = getFeatureLonLatBounds(feature);
                const c = window.d3.geoCentroid(feature);
                const centroidInside = c[0] >= bounds[0] && c[0] <= bounds[2] && c[1] >= bounds[1] && c[1] <= bounds[3];
                const overlapsBounds = b.maxLon >= bounds[0] && b.minLon <= bounds[2] && b.maxLat >= bounds[1] && b.minLat <= bounds[3];
                return centroidInside || overlapsBounds;
            };
        }

        function getFeatureLonLatBounds(feature) {
            const longs = [];
            const lats = [];
            const collect = coords => {
                if (!Array.isArray(coords)) return;
                if (typeof coords[0] === 'number') {
                    longs.push(coords[0]);
                    lats.push(coords[1]);
                    return;
                }
                coords.forEach(collect);
            };
            collect(feature.geometry && feature.geometry.coordinates);
            if (!longs.length) return { minLon: 0, maxLon: 0, minLat: 0, maxLat: 0 };
            return {
                minLon: Math.min(...longs),
                maxLon: Math.max(...longs),
                minLat: Math.min(...lats),
                maxLat: Math.max(...lats),
            };
        }

        function getFeatureLongitudeSpan(feature) {
            const bounds = getFeatureLonLatBounds(feature);
            return bounds.maxLon - bounds.minLon;
        }

        async function loadSurfaceFromWorldMap(templateId) {
            if (!continentCtx || !window.d3) return false;
            try {
                const data = await loadWorldGeoJson();
                const filter = getTemplateGeoFilter(templateId);
                const features = data.features.filter(feature => {
                    const name = feature.properties && feature.properties.name;
                    if (templateId === 'world' && getFeatureLongitudeSpan(feature) > 320) return false;
                    if (templateId !== 'world' && name === 'Greenland') return false;
                    return !["Antarctica", "French Southern and Antarctic Lands"].includes(name) && filter(feature);
                });
                if (!features.length) return false;
                const geo = { type: 'FeatureCollection', features };
                const bounds = getTemplateGeoBounds(templateId);
                const fitGeo = bounds ? {
                    type: 'MultiPoint',
                    coordinates: [
                        [bounds[0], bounds[1]],
                        [bounds[2], bounds[1]],
                        [bounds[2], bounds[3]],
                        [bounds[0], bounds[3]],
                    ],
                } : geo;
                const projection = (templateId === 'world' && window.d3.geoNaturalEarth1
                    ? window.d3.geoNaturalEarth1()
                    : window.d3.geoMercator()).fitExtent([[35, 30], [1065, 590]], fitGeo);
                continentCtx.save();
                continentCtx.fillStyle = '#d8c78e';
                continentCtx.strokeStyle = '#d8c78e';
                continentCtx.lineWidth = 2;
                continentCtx.lineJoin = 'round';

                const drawRing = ring => {
                    let started = false;
                    let previousLon = null;
                    ring.forEach(coord => {
                        const projected = projection(coord);
                        if (!projected) return;
                        const [x, y] = projected;
                        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
                        const lon = coord[0];
                        if (!started || (previousLon !== null && Math.abs(lon - previousLon) > 180)) {
                            continentCtx.moveTo(x, y);
                            started = true;
                        } else {
                            continentCtx.lineTo(x, y);
                        }
                        previousLon = lon;
                    });
                    if (started) continentCtx.closePath();
                };

                features.forEach(feature => {
                    const geometry = feature.geometry;
                    if (!geometry) return;
                    const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
                    continentCtx.beginPath();
                    polygons.forEach(polygon => polygon.forEach(drawRing));
                    continentCtx.fill();
                    continentCtx.stroke();
                });
                continentCtx.restore();
                return true;
            } catch (error) {
                return false;
            }
        }

        async function loadContinentTemplate(templateId) {
            if (!continentCtx) return;
            clearContinentCanvas(false);
            if (['world', 'europe', 'mediterranean', 'greece'].includes(templateId) && await loadSurfaceFromWorldMap(templateId)) return;
            const shapes = CONTINENT_TEMPLATES[templateId] || [];
            shapes.forEach((points, index) => drawTemplateShape(points, index));
        }

        function drawTerritoryDraft() {
            if (!continentCtx) return;
            currentContinentTerritories.forEach((territory, index) => {
                const pts = territory.points;
                if (!pts || pts.length < 3) return;
                continentCtx.beginPath();
                continentCtx.moveTo(pts[0].x, pts[0].y);
                pts.slice(1).forEach(p => continentCtx.lineTo(p.x, p.y));
                continentCtx.closePath();
                continentCtx.fillStyle = `hsla(${(index * 53 + 150) % 360}, 72%, 48%, 0.72)`;
                continentCtx.strokeStyle = '#111';
                continentCtx.lineWidth = 4;
                continentCtx.fill();
                continentCtx.stroke();
                const c = getPointCentroid(pts);
                continentCtx.fillStyle = '#2ecc71';
                continentCtx.strokeStyle = 'rgba(5, 20, 8, 0.9)';
                continentCtx.lineWidth = 4;
                continentCtx.font = 'bold 20px monospace';
                continentCtx.textAlign = 'center';
                continentCtx.strokeText(territory.name, c.x, c.y);
                continentCtx.fillText(territory.name, c.x, c.y);
            });
            if (currentTerritoryPoints.length > 0) {
                continentCtx.strokeStyle = '#ff3f34';
                continentCtx.fillStyle = '#ff3f34';
                continentCtx.lineWidth = 3;
                continentCtx.beginPath();
                continentCtx.moveTo(currentTerritoryPoints[0].x, currentTerritoryPoints[0].y);
                currentTerritoryPoints.slice(1).forEach(p => continentCtx.lineTo(p.x, p.y));
                continentCtx.stroke();
                currentTerritoryPoints.forEach(p => {
                    continentCtx.beginPath();
                    continentCtx.arc(p.x, p.y, 5, 0, Math.PI * 2);
                    continentCtx.fill();
                });
            }
        }

        function setContinentTool(tool) {
            continentTool = tool;
            ['coast', 'land', 'water', 'desert', 'mountain', 'winter', 'erase', 'territory'].forEach(name => {
                const btn = document.getElementById('continent-tool-' + name);
                if (btn) btn.classList.toggle('active', name === tool);
            });
        }

        function getContinentPoint(event) {
            const rect = continentCanvas.getBoundingClientRect();
            const client = event.touches && event.touches[0] ? event.touches[0] : event;
            return {
                x: (client.clientX - rect.left) * (continentCanvas.width / rect.width),
                y: (client.clientY - rect.top) * (continentCanvas.height / rect.height),
            };
        }

        function getPointCentroid(points) {
            const total = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
            return { x: total.x / Math.max(1, points.length), y: total.y / Math.max(1, points.length) };
        }

        function getDistance(a, b) {
            const dx = a.x - b.x, dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function simplifyStroke(points, tolerance = 14) {
            const result = [];
            points.forEach(point => {
                if (!result.length || getDistance(result[result.length - 1], point) >= tolerance) {
                    result.push({ x: Math.round(point.x), y: Math.round(point.y) });
                }
            });
            if (result.length > 2 && getDistance(result[0], result[result.length - 1]) < tolerance * 1.8) result.pop();
            return result;
        }

        function getConvexHull(points) {
            const unique = Array.from(new Map(points.map(p => [`${p.x},${p.y}`, p])).values())
                .sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
            if (unique.length <= 3) return unique;
            const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
            const lower = [];
            unique.forEach(p => {
                while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
                lower.push(p);
            });
            const upper = [];
            unique.slice().reverse().forEach(p => {
                while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
                upper.push(p);
            });
            lower.pop();
            upper.pop();
            return lower.concat(upper);
        }

        function getPolygonArea(points) {
            let area = 0;
            for (let i = 0; i < points.length; i++) {
                const a = points[i], b = points[(i + 1) % points.length];
                area += (a.x * b.y) - (b.x * a.y);
            }
            return Math.abs(area / 2);
        }

        function addTerritoryPoint(event) {
            const p = getContinentPoint(event);
            currentTerritoryPoints.push({ x: Math.round(p.x), y: Math.round(p.y) });
            drawTerritoryDraft();
        }

        function isLandPixel(x, y) {
            if (!continentCtx) return false;
            const px = Math.max(0, Math.min(continentCanvas.width - 1, Math.round(x)));
            const py = Math.max(0, Math.min(continentCanvas.height - 1, Math.round(y)));
            const data = continentCtx.getImageData(px, py, 1, 1).data;
            const r = data[0], g = data[1], b = data[2], a = data[3];
            if (a < 10) return false;
            if (getBiomeFromPixel(r, g, b, a)) return true;
            if (r < 45 && g < 45 && b < 45) return false;
            if (b > r + 20 && b > g + 5) return false;
            return r > 95 && g > 80;
        }

        function isLandSegmentClear(a, b) {
            const distance = getDistance(a, b);
            const steps = Math.max(1, Math.ceil(distance / 4));
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const x = a.x + (b.x - a.x) * t;
                const y = a.y + (b.y - a.y) * t;
                if (!isLandPixel(x, y)) return false;
            }
            return true;
        }

        function drawBorderBrushPoint(p) {
            if (!continentCtx || !isLandPixel(p.x, p.y)) {
                lastBorderPoint = null;
                currentBorderStroke = null;
                return;
            }
            if (lastBorderPoint && !isLandSegmentClear(lastBorderPoint, p)) {
                lastBorderPoint = null;
                currentBorderStroke = null;
            }
            if (!currentBorderStroke) {
                currentBorderStroke = [];
                borderStrokes.push(currentBorderStroke);
            }
            const size = Math.max(6, parseInt(document.getElementById('continent-brush-size').value, 10) || 8);
            continentCtx.save();
            continentCtx.globalCompositeOperation = 'source-over';
            continentCtx.lineCap = 'round';
            continentCtx.lineJoin = 'round';
            continentCtx.strokeStyle = '#ffffff';
            continentCtx.lineWidth = size;
            continentCtx.shadowColor = '#111';
            continentCtx.shadowBlur = 2;
            continentCtx.beginPath();
            if (lastBorderPoint) continentCtx.moveTo(lastBorderPoint.x, lastBorderPoint.y);
            else continentCtx.moveTo(p.x, p.y);
            continentCtx.lineTo(p.x, p.y);
            continentCtx.stroke();
            continentCtx.restore();
            borderStrokePoints.push({ x: Math.round(p.x), y: Math.round(p.y), size });
            if (currentBorderStroke) currentBorderStroke.push({ x: Math.round(p.x), y: Math.round(p.y) });
            lastBorderPoint = p;
        }

        function isTerritoryFillPixel(r, g, b, a) {
            if (a < 10) return false;
            if (getBiomeFromPixel(r, g, b, a)) return true;
            if (r > 230 && g > 230 && b > 230) return false;
            if (r < 55 && g < 55 && b < 55) return false;
            if (b > r + 20 && b > g + 5) return false;
            return r > 95 && g > 80;
        }

        function getBiomeFromPixel(r, g, b, a) {
            if (a < 10) return null;
            if (r > 205 && g > 225 && b > 225) return 'winter';
            if (r > 145 && g > 130 && b < 105) return 'desert';
            if (r > 90 && r < 165 && g > 90 && g < 170 && b > 90 && b < 175) return 'mountain';
            return null;
        }

        function detectBiomeAtPoint(x, y) {
            if (!continentCtx) return 'normal';
            const px = Math.max(0, Math.min(continentCanvas.width - 1, Math.round(x)));
            const py = Math.max(0, Math.min(continentCanvas.height - 1, Math.round(y)));
            const data = continentCtx.getImageData(px, py, 1, 1).data;
            return getBiomeFromPixel(data[0], data[1], data[2], data[3]) || 'normal';
        }

        function detectBiomeForPolygon(points) {
            if (!points || points.length === 0) return 'normal';
            const c = getPointCentroid(points);
            const samples = [c, points[0], points[Math.floor(points.length / 2)], points[points.length - 1]];
            const votes = {};
            samples.forEach(point => {
                const biome = detectBiomeAtPoint(point.x, point.y);
                if (biome !== 'normal') votes[biome] = (votes[biome] || 0) + 1;
            });
            return Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0] || 'normal';
        }

        function simplifyComponentToPolygon(cells, step) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            cells.forEach(cell => {
                minX = Math.min(minX, cell.x);
                minY = Math.min(minY, cell.y);
                maxX = Math.max(maxX, cell.x);
                maxY = Math.max(maxY, cell.y);
            });
            return [
                { x: minX * step, y: minY * step },
                { x: (maxX + 1) * step, y: minY * step },
                { x: (maxX + 1) * step, y: (maxY + 1) * step },
                { x: minX * step, y: (maxY + 1) * step },
            ];
        }

        function generateTerritoriesFromBorders() {
            if (!continentCtx || !continentCanvas) return [];
            const drawnShapes = borderStrokes
                .map(stroke => getConvexHull(simplifyStroke(stroke, 10)))
                .filter(points => points.length >= 3 && getPolygonArea(points) >= 500);
            if (drawnShapes.length > 0) {
                currentContinentTerritories = drawnShapes.map((points, index) => ({
                    name: `Reino ${index + 1}`,
                    points,
                    terrain: detectBiomeForPolygon(points),
                }));
                currentTerritoryPoints = [];
                drawTerritoryDraft();
                alert(`Generados ${currentContinentTerritories.length} paises jugables.`);
                return currentContinentTerritories;
            }
            const step = 10;
            const cols = Math.floor(continentCanvas.width / step);
            const rows = Math.floor(continentCanvas.height / step);
            const img = continentCtx.getImageData(0, 0, continentCanvas.width, continentCanvas.height).data;
            const land = new Uint8Array(cols * rows);
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const px = Math.min(continentCanvas.width - 1, x * step + Math.floor(step / 2));
                    const py = Math.min(continentCanvas.height - 1, y * step + Math.floor(step / 2));
                    const i = (py * continentCanvas.width + px) * 4;
                    land[y * cols + x] = isTerritoryFillPixel(img[i], img[i + 1], img[i + 2], img[i + 3]) ? 1 : 0;
                }
            }
            const seen = new Uint8Array(cols * rows);
            const territories = [];
            const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const start = y * cols + x;
                    if (!land[start] || seen[start]) continue;
                    const queue = [{ x, y }];
                    const cells = [];
                    seen[start] = 1;
                    while (queue.length) {
                        const cell = queue.shift();
                        cells.push(cell);
                        dirs.forEach(([dx, dy]) => {
                            const nx = cell.x + dx, ny = cell.y + dy;
                            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
                            const idx = ny * cols + nx;
                            if (land[idx] && !seen[idx]) {
                                seen[idx] = 1;
                                queue.push({ x: nx, y: ny });
                            }
                        });
                    }
                    if (cells.length >= 12) {
                        const points = simplifyComponentToPolygon(cells, step);
                        territories.push({
                            name: `Reino ${territories.length + 1}`,
                            points,
                            terrain: detectBiomeForPolygon(points),
                        });
                    }
                }
            }
            currentContinentTerritories = territories;
            currentTerritoryPoints = [];
            if (territories.length === 0) alert("No se han detectado territorios cerrados. Pinta tierra y separala con el pincel de fronteras.");
            else alert(`Generados ${territories.length} territorios jugables.`);
            return territories;
        }

        function finishCustomTerritory() {
            if (currentTerritoryPoints.length < 3) {
                alert("Marca al menos 3 puntos para cerrar un territorio.");
                return;
            }
            const nameInput = document.getElementById('continent-territory-name');
            const name = (nameInput && nameInput.value.trim()) || `Reino ${currentContinentTerritories.length + 1}`;
            currentContinentTerritories.push({ name, points: currentTerritoryPoints.slice(), terrain: detectBiomeForPolygon(currentTerritoryPoints) });
            currentTerritoryPoints = [];
            if (nameInput) nameInput.value = `Reino ${currentContinentTerritories.length + 1}`;
            drawTerritoryDraft();
        }

        function beginContinentDraw(event) {
            if (!continentCtx) return;
            event.preventDefault();
            if (continentTool === 'territory') {
                isDrawingContinent = true;
                lastBorderPoint = null;
                currentBorderStroke = null;
                drawBorderBrushPoint(getContinentPoint(event));
                return;
            }
            isDrawingContinent = true;
            const p = getContinentPoint(event);
            continentCtx.beginPath();
            continentCtx.moveTo(p.x, p.y);
            drawContinent(event);
        }

        function drawContinent(event) {
            if (!isDrawingContinent || !continentCtx) return;
            event.preventDefault();
            const p = getContinentPoint(event);
            const size = parseInt(document.getElementById('continent-brush-size').value, 10) || 8;
            if (continentTool === 'territory') {
                drawBorderBrushPoint(p);
                return;
            }
            continentCtx.lineCap = 'round';
            continentCtx.lineJoin = 'round';
            if (continentTool === 'land') {
                continentCtx.globalCompositeOperation = 'source-over';
                continentCtx.strokeStyle = '#d8c78e';
                continentCtx.lineWidth = size * 2.6;
            } else if (continentTool === 'desert') {
                continentCtx.globalCompositeOperation = 'source-over';
                continentCtx.strokeStyle = '#c9a84e';
                continentCtx.lineWidth = size * 2.6;
            } else if (continentTool === 'mountain') {
                continentCtx.globalCompositeOperation = 'source-over';
                continentCtx.strokeStyle = '#8c9797';
                continentCtx.lineWidth = size * 2.4;
            } else if (continentTool === 'winter') {
                continentCtx.globalCompositeOperation = 'source-over';
                continentCtx.strokeStyle = '#dfeff5';
                continentCtx.lineWidth = size * 2.4;
            } else if (continentTool === 'water' || continentTool === 'erase') {
                continentCtx.globalCompositeOperation = 'source-over';
                continentCtx.strokeStyle = '#1f6f8b';
                continentCtx.lineWidth = size * 2.2;
            } else {
                continentCtx.globalCompositeOperation = 'source-over';
                continentCtx.strokeStyle = '#101010';
                continentCtx.lineWidth = size;
            }
            continentCtx.lineTo(p.x, p.y);
            continentCtx.stroke();
        }

        function endContinentDraw() {
            isDrawingContinent = false;
            lastBorderPoint = null;
            currentBorderStroke = null;
            if (continentCtx) continentCtx.beginPath();
        }

        if (continentCanvas) {
            continentCanvas.addEventListener('mousedown', beginContinentDraw);
            continentCanvas.addEventListener('mousemove', drawContinent);
            continentCanvas.addEventListener('mouseup', endContinentDraw);
            continentCanvas.addEventListener('mouseleave', endContinentDraw);
            continentCanvas.addEventListener('touchstart', beginContinentDraw, { passive: false });
            continentCanvas.addEventListener('touchmove', drawContinent, { passive: false });
            continentCanvas.addEventListener('touchend', endContinentDraw);
        }

        function saveContinent() {
            if (!continentCanvas) return;
            if (currentContinentTerritories.length === 0) generateTerritoriesFromBorders();
            const nameInput = document.getElementById('continent-name');
            const name = (nameInput && nameInput.value.trim()) || `Continente ${savedContinents.length + 1}`;
            const item = {
                id: `continent-${Date.now()}`,
                name,
                image: continentCanvas.toDataURL('image/png'),
                territories: currentContinentTerritories.map(t => ({ name: t.name, points: t.points, terrain: t.terrain || detectBiomeForPolygon(t.points) })),
            };
            savedContinents.push(item);
            activeContinentId = item.id;
            localStorage.setItem('warContinentsData', JSON.stringify(savedContinents));
            localStorage.setItem('warActiveContinentId', activeContinentId);
            applyActiveContinentUI();
            openContinentGallery();
        }

        function openContinentGallery() {
            renderContinentGallery();
            showScreen('continent-gallery-screen');
        }

        function renderContinentGallery() {
            const container = document.getElementById('continent-gallery-container');
            const label = document.getElementById('active-continent-label');
            if (!container) return;
            const active = getActiveContinent();
            if (label) label.innerText = active ? `Mapa activo: ${active.name}` : 'Mapa activo: mundo clasico';
            container.innerHTML = '';
            if (savedContinents.length === 0) {
                container.innerHTML = `<div class="continent-card"><h3>No hay continentes guardados</h3><p>Dibuja uno en el editor y guardalo para usarlo como mapa jugable.</p></div>`;
                return;
            }
            savedContinents.forEach(item => {
                const card = document.createElement('div');
                card.className = `continent-card ${item.id === activeContinentId ? 'active' : ''}`;
                const territoryCount = item.territories ? item.territories.length : 0;
                card.innerHTML = `<img src="${item.image}" alt="${item.name}"><h3>${item.name}</h3><p>${territoryCount} territorios jugables</p>`;
                const useBtn = document.createElement('button');
                useBtn.innerText = 'USAR CONTINENTE';
                useBtn.onclick = () => useContinent(item.id);
                const editBtn = document.createElement('button');
                editBtn.innerText = 'EDITAR COPIA';
                editBtn.onclick = () => editContinentCopy(item.id);
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'BORRAR';
                deleteBtn.style.backgroundColor = '#c0392b';
                deleteBtn.onclick = () => deleteContinent(item.id);
                card.appendChild(useBtn);
                card.appendChild(editBtn);
                card.appendChild(deleteBtn);
                container.appendChild(card);
            });
        }

        function useContinent(id) {
            activeContinentId = id;
            localStorage.setItem('warActiveContinentId', activeContinentId);
            applyActiveContinentUI();
            renderContinentGallery();
        }

        function clearActiveContinent() {
            activeContinentId = '';
            localStorage.removeItem('warActiveContinentId');
            applyActiveContinentUI();
            renderContinentGallery();
        }

        function deleteContinent(id) {
            if (!confirm('Borrar este continente?')) return;
            savedContinents = savedContinents.filter(item => item.id !== id);
            if (activeContinentId === id) activeContinentId = '';
            localStorage.setItem('warContinentsData', JSON.stringify(savedContinents));
            if (activeContinentId) localStorage.setItem('warActiveContinentId', activeContinentId);
            else localStorage.removeItem('warActiveContinentId');
            applyActiveContinentUI();
            renderContinentGallery();
        }

        function editContinentCopy(id) {
            const item = savedContinents.find(entry => entry.id === id);
            openContinentEditor();
            if (!item || !continentCtx) return;
            currentContinentTerritories = (item.territories || []).map(t => ({ name: t.name, points: t.points.slice(), terrain: t.terrain || 'normal' }));
            currentTerritoryPoints = [];
            borderStrokePoints = [];
            borderStrokes = [];
            currentBorderStroke = null;
            const img = new Image();
            img.onload = () => {
                continentCtx.clearRect(0, 0, continentCanvas.width, continentCanvas.height);
                continentCtx.drawImage(img, 0, 0, continentCanvas.width, continentCanvas.height);
                drawTerritoryDraft();
            };
            img.src = item.image;
            const nameInput = document.getElementById('continent-name');
            if (nameInput) nameInput.value = `${item.name} copia`;
        }

        function applyActiveContinentUI() {
            const active = getActiveContinent();
            const menuBg = document.querySelector('.menu-map-bg');
            if (menuBg && active) {
                menuBg.style.backgroundImage = `linear-gradient(rgba(236,230,209,0.72), rgba(236,230,209,0.72)), url('${active.image}')`;
                menuBg.style.backgroundSize = 'cover';
                menuBg.style.backgroundPosition = 'center';
            } else if (menuBg) {
                menuBg.style.backgroundImage = '';
            }
        }

        function sanitizeVisibleText(root = document.body) {
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(node => {
                const cleaned = cleanText(node.nodeValue);
                if (cleaned !== node.nodeValue) node.nodeValue = cleaned;
            });
            root.querySelectorAll('[title], [placeholder], [alt], input[value]').forEach(el => {
                ['title', 'placeholder', 'alt', 'value'].forEach(attr => {
                    if (!el.hasAttribute(attr)) return;
                    const cleaned = cleanText(el.getAttribute(attr));
                    if (cleaned !== el.getAttribute(attr)) el.setAttribute(attr, cleaned);
                });
            });
        }

        // ==========================================
        // AUDIO Y TECLADO
        // ==========================================
        let audioCtx = null;
        let audioMaster = null;
        let musicTimer = null;
        let musicMode = 'menu';
        let musicStep = 0;
        let audioEnabled = localStorage.getItem('warSoundEnabled') !== '0';
        const AUDIO_MASTER_VOLUME = 1.8;
        const AUDIO_TONE_BOOST = 2.35;
        const AUDIO_NOISE_BOOST = 2.2;

        function initAudio() {
            try {
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    audioMaster = audioCtx.createGain();
                    const compressor = audioCtx.createDynamicsCompressor();
                    compressor.threshold.value = -18;
                    compressor.knee.value = 18;
                    compressor.ratio.value = 8;
                    compressor.attack.value = 0.004;
                    compressor.release.value = 0.18;
                    audioMaster.gain.value = audioEnabled ? AUDIO_MASTER_VOLUME : 0;
                    audioMaster.connect(compressor);
                    compressor.connect(audioCtx.destination);
                }
                if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
            } catch (e) {}
        }

        function updateAudioButton() {
            const btn = document.getElementById('audio-toggle');
            if (!btn) return;
            btn.innerText = audioEnabled ? '🔊' : '🔇';
            btn.classList.toggle('sound-off', !audioEnabled);
            btn.setAttribute('aria-label', audioEnabled ? 'Sonido activado' : 'Sonido desactivado');
            btn.title = audioEnabled ? 'Sonido activado' : 'Sonido desactivado';
        }

        function toggleAudio() {
            audioEnabled = !audioEnabled;
            localStorage.setItem('warSoundEnabled', audioEnabled ? '1' : '0');
            initAudio();
            if (audioMaster) audioMaster.gain.setTargetAtTime(audioEnabled ? AUDIO_MASTER_VOLUME : 0, audioCtx.currentTime, 0.03);
            updateAudioButton();
            if (audioEnabled) {
                playSound('open');
                startMusic(musicMode);
            } else {
                stopMusic();
            }
        }

        function playTone(freq, duration = 0.12, type = 'sine', volume = 0.18, delay = 0, endFreq = null) {
            if (!audioEnabled) return;
            initAudio();
            if (!audioCtx || !audioMaster) return;
            const now = audioCtx.currentTime + delay;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(0.01, endFreq), now + duration);
            const boostedVolume = volume * AUDIO_TONE_BOOST;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(boostedVolume, now + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(audioMaster);
            osc.start(now);
            osc.stop(now + duration + 0.02);
        }

        function playNoise(duration = 0.18, volume = 0.2, filterFreq = 900, delay = 0) {
            if (!audioEnabled) return;
            initAudio();
            if (!audioCtx || !audioMaster) return;
            const now = audioCtx.currentTime + delay;
            const buffer = audioCtx.createBuffer(1, Math.max(1, audioCtx.sampleRate * duration), audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
            const source = audioCtx.createBufferSource();
            const filter = audioCtx.createBiquadFilter();
            const gain = audioCtx.createGain();
            filter.type = 'lowpass';
            filter.frequency.value = filterFreq;
            gain.gain.setValueAtTime(volume * AUDIO_NOISE_BOOST, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            source.buffer = buffer;
            source.connect(filter);
            filter.connect(gain);
            gain.connect(audioMaster);
            source.start(now);
        }

        function playSound(type) {
            if (!audioEnabled) return;
            if (type === 'click') playTone(520, 0.055, 'triangle', 0.06);
            else if (type === 'open') { playTone(392, 0.08, 'triangle', 0.08); playTone(587, 0.09, 'triangle', 0.07, 0.07); }
            else if (type === 'buy') { playTone(660, 0.08, 'square', 0.09); playTone(880, 0.12, 'triangle', 0.09, 0.07); }
            else if (type === 'error') playTone(140, 0.18, 'sawtooth', 0.11, 0, 80);
            else if (type === 'turn') { playTone(247, 0.11, 'sawtooth', 0.08); playTone(330, 0.11, 'sawtooth', 0.08, 0.09); playTone(494, 0.16, 'triangle', 0.08, 0.18); }
            else if (type === 'diplomacy') { playTone(330, 0.1, 'sine', 0.08); playTone(440, 0.16, 'sine', 0.07, 0.08); }
            else if (type === 'alliance') { playTone(523, 0.12, 'triangle', 0.08); playTone(659, 0.12, 'triangle', 0.08, 0.08); playTone(784, 0.18, 'triangle', 0.08, 0.16); }
            else if (type === 'battleStart') { playNoise(0.35, 0.18, 650); playTone(98, 0.45, 'sawtooth', 0.12, 0, 55); }
            else if (type === 'win') { playTone(523, 0.1, 'triangle', 0.09); playTone(659, 0.12, 'triangle', 0.09, 0.1); playTone(784, 0.25, 'triangle', 0.1, 0.22); }
            else if (type === 'lose') { playTone(220, 0.18, 'sawtooth', 0.1); playTone(165, 0.25, 'sawtooth', 0.1, 0.18); }
            else if (type === 'bang') { playNoise(0.08, 0.16, 1800); playTone(300, 0.1, 'square', 0.12, 0, 40); } 
            else if (type === 'cannon') { playNoise(0.28, 0.24, 700); playTone(100, 0.4, 'sawtooth', 0.22, 0, 35); } 
            else if (type === 'nuke') { playNoise(2.2, 0.32, 360); playTone(50, 3.0, 'square', 0.28, 0, 20); }
            else if (type === 'spy') { playTone(800, 0.2, 'sine', 0.12, 0, 1200); playTone(400, 0.16, 'triangle', 0.08, 0.22); }
            else if (type === 'deploy') { playTone(180, 0.09, 'square', 0.1); playTone(260, 0.09, 'square', 0.08, 0.06); }
            else if (type === 'explosion') { playNoise(0.35, 0.22, 500); playTone(75, 0.28, 'sawtooth', 0.14, 0, 30); }
            else if (type === 'research') { playTone(740, 0.08, 'sine', 0.08); playTone(980, 0.18, 'sine', 0.08, 0.08); }
        }

        function stopMusic() {
            if (musicTimer) clearInterval(musicTimer);
            musicTimer = null;
        }

        function playArp(notes, startDelay, stepDelay, volume = 0.045, type = 'triangle') {
            notes.forEach((note, index) => {
                playTone(note, 0.12 + index * 0.01, type, volume, startDelay + index * stepDelay);
            });
        }

        function getEraMusicProfile() {
            const year = selectedScenarioYear;
            if (year < -500) return {
                name: 'antiguo',
                roots: [110, 130.81, 98, 146.83],
                lead: 'triangle',
                pad: 'sine',
                rhythm: 'ritual',
                ornament: 'flauta',
            };
            if (year < 500) return {
                name: 'clasico',
                roots: [146.83, 174.61, 130.81, 196],
                lead: 'triangle',
                pad: 'sine',
                rhythm: 'marcha',
                ornament: 'lira',
            };
            if (year < 1492) return {
                name: 'medieval',
                roots: [98, 116.54, 130.81, 87.31],
                lead: 'square',
                pad: 'triangle',
                rhythm: 'tambor',
                ornament: 'campana',
            };
            if (year < 1825) return {
                name: 'exploracion',
                roots: [130.81, 164.81, 146.83, 196],
                lead: 'triangle',
                pad: 'sine',
                rhythm: 'naval',
                ornament: 'bronce',
            };
            if (year < 1928) return {
                name: 'industrial',
                roots: [82.41, 98, 110, 73.42],
                lead: 'sawtooth',
                pad: 'triangle',
                rhythm: 'maquina',
                ornament: 'metal',
            };
            if (year < 2026) return {
                name: 'entreguerras',
                roots: [65.41, 82.41, 73.42, 98],
                lead: 'sawtooth',
                pad: 'sine',
                rhythm: 'radio',
                ornament: 'sirena',
            };
            return {
                name: 'moderno',
                roots: [55, 73.42, 61.74, 82.41],
                lead: 'square',
                pad: 'sawtooth',
                rhythm: 'digital',
                ornament: 'dron',
            };
        }

        function playEraRhythm(profile, step, battle = false) {
            const power = battle ? 1.35 : 1;
            if (profile.rhythm === 'ritual') {
                playNoise(0.08, 0.06 * power, 260, 0);
                if (step % 2 === 0) playNoise(0.05, 0.035 * power, 420, 1.15);
            } else if (profile.rhythm === 'marcha') {
                playNoise(0.06, 0.055 * power, 520, 0);
                playNoise(0.04, 0.035 * power, 900, 0.72);
                if (battle) playNoise(0.05, 0.06, 420, 1.32);
            } else if (profile.rhythm === 'tambor') {
                playTone(65, 0.08, 'square', 0.065 * power, 0, 48);
                playTone(82, 0.08, 'square', 0.045 * power, 0.68, 60);
            } else if (profile.rhythm === 'naval') {
                playTone(98, 0.16, 'triangle', 0.055 * power, 0);
                playNoise(0.06, 0.032 * power, 1200, 0.9);
                playTone(130.81, 0.12, 'triangle', 0.04 * power, 1.7);
            } else if (profile.rhythm === 'maquina') {
                [0, 0.42, 0.84, 1.26].forEach(delay => playNoise(0.035, 0.038 * power, 950, delay));
                playTone(73.42, 0.09, 'sawtooth', 0.055 * power, 0.2, 55);
            } else if (profile.rhythm === 'radio') {
                playNoise(0.05, 0.035 * power, 1900, 0.2);
                playTone(110, 0.1, 'sawtooth', 0.055 * power, 0.58);
                if (step % 3 === 0) playNoise(0.18, 0.025 * power, 2600, 1.55);
            } else {
                [0, 0.31, 0.62, 1.18].forEach((delay, i) => playTone(220 + i * 55, 0.045, 'square', 0.032 * power, delay));
                if (step % 2 === 0) playNoise(0.08, 0.04 * power, 3200, 1.38);
            }
        }

        function playEraOrnament(profile, root, step, battle = false) {
            if (profile.ornament === 'flauta') {
                if (step % 2 === 0) playArp([root * 2, root * 2.25, root * 1.875, root * 2.5], 0.75, 0.3, battle ? 0.04 : 0.032, 'sine');
            } else if (profile.ornament === 'lira') {
                if (step % 2 === 0) playArp([root * 2, root * 3, root * 2.5, root * 3], 0.55, 0.22, battle ? 0.044 : 0.036, 'triangle');
            } else if (profile.ornament === 'campana') {
                if (step % 3 === 1) {
                    playTone(root * 4, 0.45, 'sine', battle ? 0.055 : 0.042, 1.2);
                    playTone(root * 5, 0.32, 'triangle', battle ? 0.04 : 0.032, 1.42);
                }
            } else if (profile.ornament === 'bronce') {
                if (step % 4 === 0) {
                    playTone(root * 2.25, 0.28, 'sawtooth', battle ? 0.05 : 0.038, 0.9);
                    playTone(root * 3, 0.28, 'triangle', battle ? 0.04 : 0.032, 1.12);
                }
            } else if (profile.ornament === 'metal') {
                if (step % 2 === 1) playArp([root * 2, root * 1.5, root * 2.5, root * 2], 0.4, 0.18, battle ? 0.04 : 0.032, 'sawtooth');
            } else if (profile.ornament === 'sirena') {
                if (step % 5 === 2) playTone(root * 5, 0.9, 'sine', battle ? 0.055 : 0.035, 0.8, root * 3.5);
            } else {
                if (step % 2 === 0) playArp([root * 4, root * 5, root * 3.75, root * 6], 0.32, 0.16, battle ? 0.048 : 0.035, 'square');
            }
        }

        function playMapMusicStep(step) {
            const profile = getEraMusicProfile();
            const root = profile.roots[step % profile.roots.length];
            const fifth = root * 1.5;
            const octave = root * 2;
            playTone(root, 1.15, profile.pad, 0.16, 0);
            playTone(fifth, 1.05, 'sine', 0.11, 0.04);
            playTone(octave, 0.8, profile.lead, 0.085, 0.22);
            playTone(root / 2, 1.45, 'sine', 0.075, 0.02);

            playEraRhythm(profile, step, false);
            playEraOrnament(profile, root, step, false);
            if (step % 4 === 3) {
                playTone(root * 3, 0.32, 'sine', 0.055, 2.55, root * 2.25);
                playNoise(0.32, 0.03, 1200, 2.7);
            }
            if (step > 0 && step % 6 === 0) {
                playTone(392, 0.5, 'triangle', 0.065, 1.6);
                playTone(523.25, 0.42, 'sine', 0.055, 2.05);
            }
        }

        function playBattleMusicStep(step) {
            const profile = getEraMusicProfile();
            const root = profile.roots[step % profile.roots.length] / 2;
            playEraRhythm(profile, step, true);
            playNoise(0.1, 0.13, 260, 0);
            playTone(root, 0.2, profile.lead, 0.16, 0, root * 0.72);
            playTone(root * 1.5, 0.14, 'square', 0.09, 0.26);
            playNoise(0.075, 0.11, 520, 0.5);
            playTone(root * 2, 0.14, profile.lead, 0.085, 0.74);
            playTone(root * 3, 0.18, 'sawtooth', 0.07, 1.0);
            playTone(root * 1.33, 0.34, 'sawtooth', 0.12, 1.24, root * 0.9);
            playEraOrnament(profile, root, step, true);

            if (step % 2 === 1) playArp([root * 4, root * 3, root * 4.5, root * 3.5], 0.35, 0.18, 0.035, 'square');
            if (step % 4 === 2) {
                playNoise(0.42, 0.09, 900, 0.85);
                playTone(root * 0.75, 0.8, 'sawtooth', 0.08, 0.75, root * 0.55);
            }
            if (step > 0 && step % 7 === 0) {
                playTone(220, 0.18, 'square', 0.08, 0.2);
                playTone(185, 0.18, 'square', 0.08, 0.42);
                playTone(164, 0.28, 'square', 0.075, 0.64);
            }
        }

        function musicPulse() {
            if (!audioEnabled) return;
            if (musicMode === 'battle') {
                playBattleMusicStep(musicStep);
            } else if (musicMode === 'map') {
                playMapMusicStep(musicStep);
            } else {
                const menuRoots = [196, 220, 174.61, 261.63];
                const root = menuRoots[musicStep % menuRoots.length];
                playTone(root, 0.35, 'sine', 0.045);
                playTone(root * 1.5, 0.38, 'sine', 0.038, 0.55);
                if (musicStep % 3 === 2) playTone(root * 2, 0.26, 'triangle', 0.035, 1.15);
            }
            musicStep++;
        }

        function startMusic(mode = 'menu') {
            const changedMode = musicMode !== mode;
            musicMode = mode;
            stopMusic();
            if (!audioEnabled) return;
            if (changedMode) musicStep = 0;
            musicPulse();
            musicTimer = setInterval(musicPulse, mode === 'battle' ? 1700 : (mode === 'map' ? 3200 : 3200));
        }

        function updateAudioForScreen(screenId) {
            if (screenId === 'battle-screen') startMusic('battle');
            else if (screenId === 'game-screen') startMusic('map');
            else startMusic('menu');
        }

        window.addEventListener('click', event => {
            initAudio();
            const button = event.target.closest && event.target.closest('button');
            if (button && !button.disabled && button.id !== 'audio-toggle') playSound('click');
        });

        let keys = { w: false, a: false, s: false, d: false, z: false, x: false, arrowup: false, arrowdown: false, arrowleft: false, arrowright: false, '1': false, '2': false };
        let isPaused = false; let lastShotZ = 0, lastShotX = 0, lastShot1 = 0, lastShot2 = 0;
        let battleLoop = null; let controlledPlayerUnit = null; let controlledEnemyUnit = null; let pendingRetreatProv = null; let currentBattleData = null;
        let battleState = { units: [], bullets: [], zeps: [], bombs: [], unitIdCounter: 0 };
        let spyModeActive = false;
        const BATTLE_SPECIAL_ACTIONS = [
            { type: 'gen', labelKey: 'gen', stock: 'generals', icon: '🌟', leftKey: 'G', rightKey: '8', fallback: 'General' },
            { type: 'zep', labelKey: 'air', stock: 'air', icon: '🛩️', leftKey: 'C', rightKey: '3', fallback: 'Aéreo' },
            { type: 'jug', labelKey: 'jug', stock: 'juggernauts', icon: '🦾', leftKey: 'T', rightKey: '4', fallback: 'Pesado' },
            { type: 'shp', labelKey: 'ship', stock: 'battleships', icon: '🚢', leftKey: 'B', rightKey: '5', fallback: 'Barco' },
            { type: 'par', labelKey: 'para', stock: 'paras', icon: '🪂', leftKey: 'P', rightKey: '6', fallback: 'Paracaidistas' },
            { type: 'sub', labelKey: 'sub', stock: 'subs', icon: '⚓', leftKey: 'M', rightKey: '7', fallback: 'Submarino' },
        ];

        function handleKonamiKey(k) {
            if (k === KONAMI_SEQUENCE[konamiProgress]) {
                konamiProgress++;
                if (konamiProgress >= KONAMI_SEQUENCE.length) {
                    konamiProgress = 0;
                    unlockKonamiFlag();
                }
                return;
            }
            konamiProgress = k === KONAMI_SEQUENCE[0] ? 1 : 0;
        }

        window.addEventListener('keydown', e => { 
            initAudio(); let k = e.key.toLowerCase(); if(keys.hasOwnProperty(k)) keys[k] = true; 
            handleKonamiKey(k);
            
            if (!document.getElementById('battle-screen').classList.contains('hidden')) {
                if (k === 'g') requestSpecial('gen', 'left');
                if (k === 'c') requestSpecial('zep', 'left');
                if (k === 't') requestSpecial('jug', 'left');
                if (k === 'b') requestSpecial('shp', 'left');
                if (k === 'p') requestSpecial('par', 'left');
                if (k === 'm') requestSpecial('sub', 'left');
                
                let isHumanRight = currentBattleData && isHumanBattleNation(currentBattleData.defNat.id) && currentBattleData.defNat.id !== currentBattleData.attNat.id;
                if (isHumanRight) {
                    if (k === '8') requestSpecial('gen', 'right');
                    if (k === '3') requestSpecial('zep', 'right');
                    if (k === '4') requestSpecial('jug', 'right');
                    if (k === '5') requestSpecial('shp', 'right');
                    if (k === '6') requestSpecial('par', 'right');
                    if (k === '7') requestSpecial('sub', 'right');
                }
            }
        });
        window.addEventListener('keyup', e => { let k = e.key.toLowerCase(); if(keys.hasOwnProperty(k)) keys[k] = false; });

        function togglePause() {
            if (document.getElementById('battle-screen').classList.contains('hidden')) return;
            isPaused = !isPaused;
            let pauseOverlay = document.getElementById('pause-overlay'); let btnPause = document.getElementById('btn-pause'); btnPause.blur(); 
            if (isPaused) { if(battleLoop) clearInterval(battleLoop); renderBattleTacticalPanel(); pauseOverlay.classList.remove('hidden'); btnPause.innerText = "▶ REANUDAR"; btnPause.style.backgroundColor = "#2ecc71"; } 
            else { battleLoop = setInterval(updatePhysics, 30); pauseOverlay.classList.add('hidden'); btnPause.innerText = "⏸ PAUSAR"; btnPause.style.backgroundColor = "#34495e"; let t = Date.now(); lastShotZ = t; lastShotX = t; lastShot1 = t; lastShot2 = t; }
        }

        function renderBattleTacticalPanel() {
            const panel = document.getElementById('battle-tactical-panel');
            if (!panel || !currentBattleData) return;
            const d = currentBattleData;
            const leftAlive = Math.max(0, d.totalA - d.deadA);
            const rightAlive = Math.max(0, d.totalD - d.deadD);
            const leftField = battleState.units.filter(u => !u.isDead && u.side === 'left').length;
            const rightField = battleState.units.filter(u => !u.isDead && u.side === 'right').length;
            const leftReserve = Math.max(0, leftAlive - leftField);
            const rightReserve = Math.max(0, rightAlive - rightField);
            const terrainLabel = { normal: 'llanura', naval: 'mar', winter: 'nieve', desert: 'desierto', mountain: 'montaña' }[d.prov.terrain] || 'llanura';
            panel.innerHTML = cleanText(`
                <strong>Parte táctico</strong><br>
                Territorio: ${d.prov.name} | Terreno: ${terrainLabel}<br>
                Resultado solo por aniquilación: no hay victoria por cruzar el borde.
                <div class="tactical-grid">
                    <div class="tactical-stat">Izquierda<br><strong>${leftAlive}</strong> bat. vivos<br>${leftReserve} en reserva</div>
                    <div class="tactical-stat">Derecha<br><strong>${rightAlive}</strong> bat. vivos<br>${rightReserve} en reserva</div>
                    <div class="tactical-stat">En campo<br>${leftField} vs ${rightField}</div>
                    <div class="tactical-stat">Bajas<br>${d.deadA} vs ${d.deadD}</div>
                </div>
            `);
        }

        function tacticalRetreat() {
            if (!currentBattleData) return;
            const d = currentBattleData;
            if (battleLoop) clearInterval(battleLoop);
            isPaused = false;
            document.getElementById('pause-overlay').classList.add('hidden');
            document.getElementById('btn-pause').innerText = "⏸ PAUSAR";
            document.getElementById('btn-pause').style.backgroundColor = "#34495e";
            const humanLeft = isHumanBattleNation(d.attNat.id);
            const humanRight = isHumanBattleNation(d.defNat.id) && d.defNat.id !== d.attNat.id;
            const retreatSide = humanLeft ? 'left' : (humanRight ? 'right' : 'left');
            const retreatNat = retreatSide === 'left' ? d.attNat : d.defNat;
            const total = retreatSide === 'left' ? d.totalA : d.totalD;
            const dead = retreatSide === 'left' ? d.deadA : d.deadD;
            const survivors = Math.max(0, total - dead);
            const saved = Math.floor(survivors * 0.72);
            const extraLoss = survivors - saved;
            if (retreatSide === 'left') {
                d.attNat.bat = Math.max(0, (d.attNat.bat - d.totalA) + saved);
                if (d.type === 'army' || d.type === 'defense') {
                    const defSurvivors = Math.max(0, d.totalD - d.deadD);
                    d.defNat.bat = Math.max(0, (d.defNat.bat - d.totalD) + defSurvivors);
                }
                if (d.type === 'defense') {
                    const oldOwner = d.prov.owner;
                    d.prov.owner = d.defNat.id;
                    d.prov.isColony = true;
                    d.prov.forts = 0;
                    handleProvinceCaptured(d.prov, oldOwner, d.defNat.id);
                }
            } else {
                const attSurvivors = Math.max(0, d.totalA - d.deadA);
                d.attNat.bat = Math.max(0, (d.attNat.bat - d.totalA) + attSurvivors);
                d.defNat.bat = Math.max(0, (d.defNat.bat - d.totalD) + saved);
            }
            retreatNat.stability = Math.max(0, (retreatNat.stability || 70) - 3);
            if (d.type === 'defense' && d.defenseIndex !== undefined) pendingDefenses.splice(d.defenseIndex, 1);
            logEvent(`Retirada táctica: ${retreatNat.name} salva ${saved} batallones y pierde ${extraLoss} durante la retirada.`);
            updateHUD();
            showScreen('game-screen');
            drawMap();
        }

        function quitToMenu() {
            if(battleLoop) clearInterval(battleLoop);
            isPaused = false; document.getElementById('pause-overlay').classList.add('hidden');
            let d = currentBattleData;
            if (d) {
                let aRemain = d.totalA - d.deadA; if (aRemain > 0) d.attNat.bat = (d.attNat.bat - d.totalA) + aRemain;
                if (d.type === 'army' || d.type === 'defense') { let dRemain = d.totalD - d.deadD; if (dRemain > 0) d.defNat.bat = (d.defNat.bat - d.totalD) + dRemain; }
            }
            document.getElementById('btn-return-map').classList.add('hidden'); document.getElementById('btn-pause').classList.add('hidden'); 
            showScreen('menu-screen');
        }

        // ==========================================
        // BASE DE DATOS Y MAPA
        // ==========================================
        let nations = {}; let provinces = []; let alliances = new Set(); let announcedVictories = new Set(); let turn = 1928;
        let geojsonData = null; let d3Svg = null; let d3G = null; let d3Path = null;

        function relationKey(a, b) {
            return [parseInt(a, 10), parseInt(b, 10)].sort((x, y) => x - y).join('-');
        }

        function areAllied(a, b) {
            if (parseInt(a, 10) === parseInt(b, 10)) return true;
            return alliances.has(relationKey(a, b));
        }

        function setAlliance(a, b, active) {
            const key = relationKey(a, b);
            if (active) alliances.add(key);
            else alliances.delete(key);
        }

        async function loadWorldGeoJson() {
            if (geojsonData) return geojsonData;
            if (!window.d3 || !window.WAR_WORLD) throw new Error("Faltan D3 o los datos del mapa mundial.");

            let lastError = null;
            for (const url of window.WAR_WORLD.geoJsonUrls) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    geojsonData = await response.json();
                    return geojsonData;
                } catch (error) {
                    lastError = error;
                }
            }
            throw lastError || new Error("No se pudo cargar el mapa mundial.");
        }

        function getCountryOwner(name) {
            const scenarioMap = window.WAR_WORLD.scenarioMaps[selectedScenarioYear] || window.WAR_WORLD.empireMap;
            return Object.prototype.hasOwnProperty.call(scenarioMap, name) ? scenarioMap[name] : 9;
        }

        function makeNation(id, overrides) {
            const nation = {
                id,
                name: overrides.name,
                color: overrides.color,
                pop: overrides.pop || 260000,
                bat: overrides.bat || 320,
                money: overrides.money || 30000,
                nukes: 0,
                air: 0,
                juggernauts: 0,
                battleships: 0,
                spies: 0,
                paras: 0,
                subs: 0,
                generals: 0,
                pactTurns: 0,
                bribed: false,
                trait: overrides.trait || 'none',
                personality: overrides.personality || getPersonalityForTrait(overrides.trait || 'none', id),
                reputation: 0,
                research: 0,
                tech: new Set(getEraStartingTech()),
                resources: {},
                capitalLost: false,
                stability: 78,
                taxPolicy: 'normal',
                missionDone: false,
                intel: {},
                cursedCapitalLosses: 0,
                pacifistTurns: 0,
                easterEggs: {},
            };
            if (id === 0) { nation.pop = 200000; nation.bat = 300; nation.money = 15000; }
            if (id === 9) { nation.pop = 0; nation.bat = getMercenaryArmyReserve(); nation.money = 0; }
            return nation;
        }

        function getMercenaryArmyReserve() {
            if (selectedScenarioYear >= 2026) return 2600;
            if (selectedScenarioYear >= 1900) return 1800;
            if (selectedScenarioYear >= 1492) return 1100;
            if (selectedScenarioYear >= 500) return 750;
            return 480;
        }

        function getMercenaryGarrison(prov) {
            let base = 120;
            if (selectedScenarioYear >= 2026) base = 420;
            else if (selectedScenarioYear >= 1900) base = 310;
            else if (selectedScenarioYear >= 1492) base = 220;
            else if (selectedScenarioYear >= 500) base = 160;
            if (prov && prov.resource) base += 45;
            if (prov && prov.isCapital) base += 70;
            if (prov && prov.terrain === 'mountain') base += 45;
            if (prov && prov.terrain === 'urban') base += 35;
            return base + ((prov && prov.forts) ? prov.forts * 50 : 0);
        }

        function getProvinceDefenseCount(prov, owner) {
            if (!prov || !owner) return 0;
            if (owner.id === 9 || prov.owner === 9) {
                return Math.max(getMercenaryGarrison(prov), 60);
            }
            const ownerTerritories = Math.max(1, provinces.filter(x => x.owner === prov.owner).length);
            return Math.floor(owner.bat / ownerTerritories) + ((prov.forts || 0) * 50);
        }

        function reinforceNeutralBattleForce() {
            if (!currentBattleData || currentBattleData.type !== 'army') return;
            const d = currentBattleData;
            if (d.defNat && (d.defNat.id === 9 || d.prov.owner === 9)) {
                const minimum = getMercenaryGarrison(d.prov);
                if (d.totalD < minimum) {
                    d.totalD = minimum;
                    d.defNat.bat = Math.max(d.defNat.bat || 0, minimum);
                    logEvent(`No Alineados moviliza una guarnicion real en ${d.prov.name}: ${minimum} batallones.`);
                }
            }
        }

        function getPersonalityForTrait(trait, id) {
            if (id === 9) return 'neutral';
            if (trait === 'naval') return 'naval';
            if (trait === 'def') return 'defensive';
            if (trait === 'econ') return 'commercial';
            if (trait === 'swarm') return 'aggressive';
            if (trait === 'motherland') return 'expansionist';
            if (id % 5 === 0) return 'treacherous';
            return 'balanced';
        }

        function buildScenarioNations() {
            const preset = window.WAR_WORLD.scenarioNations[selectedScenarioYear] || window.WAR_WORLD.scenarioNations[1928];
            const result = {};
            Object.keys(preset).forEach(id => {
                result[id] = makeNation(parseInt(id, 10), preset[id]);
            });
            if (selectedPlayerEmpireId !== 0 && preset[0]) {
                result[17] = makeNation(17, {
                    ...preset[0],
                    name: preset[0].name === "Mi Imperio" ? "Latinoamerica" : preset[0].name,
                });
            }
            if (isTwoPlayerMode && selectedPlayer2EmpireId !== 4 && preset[4]) {
                result[18] = makeNation(18, {
                    ...preset[4],
                    name: `${preset[4].name} IA`,
                });
            }
            return result;
        }

        function getCountryTerrain(name) {
            if (window.WAR_WORLD.winterCountries.has(name)) return 'winter';
            if (window.WAR_WORLD.navalCountries.has(name)) return 'naval';
            return 'normal';
        }

        function getCapitalCountryForOwner(ownerId) {
            const capitalMap = CAPITAL_BY_YEAR[String(selectedScenarioYear)] || CAPITAL_BY_YEAR["1928"];
            let historicalOwner = ownerId;
            if (ownerId === 0) historicalOwner = selectedPlayerEmpireId;
            if (ownerId === 4 && isTwoPlayerMode) historicalOwner = selectedPlayer2EmpireId;
            if (ownerId === 17) historicalOwner = 0;
            if (ownerId === 18) historicalOwner = 4;
            return capitalMap[historicalOwner] || null;
        }

        function buildWorldProvinces() {
            const activeContinent = getActiveContinent();
            if (activeContinent && activeContinent.territories && activeContinent.territories.length >= 2) {
                buildCustomContinentProvinces(activeContinent);
                return;
            }
            provinces = geojsonData.features.filter(feature => !["Antarctica", "French Southern and Antarctic Lands", "Bermuda"].includes(feature.properties.name)).map((feature, index) => {
                const name = feature.properties.name;
                const scenarioOwner = getCountryOwner(name);
                let owner = scenarioOwner;
                if (scenarioOwner === selectedPlayerEmpireId) owner = 0;
                else if (isTwoPlayerMode && scenarioOwner === selectedPlayer2EmpireId) owner = 4;
                else if (scenarioOwner === 0 && selectedPlayerEmpireId !== 0) owner = 17;
                else if (isTwoPlayerMode && scenarioOwner === 4 && selectedPlayer2EmpireId !== 4) owner = 18;
                return {
                    id: index,
                    name,
                    owner,
                    originalOwner: scenarioOwner,
                    feature,
                    forts: owner === 8 ? 3 : 0,
                    isColony: window.WAR_WORLD.colonyCountries.has(name),
                    terrain: getCountryTerrain(name),
                    resource: getProvinceResource(name),
                    isCapital: name === getCapitalCountryForOwner(owner),
                };
            });
            refreshNationResources();
        }

        function buildCustomContinentProvinces(continent) {
            const ownerPool = [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 9];
            const resourceKeys = Object.keys(RESOURCE_INFO);
            provinces = continent.territories.map((territory, index) => {
                let owner = ownerPool[index % ownerPool.length];
                if (isTwoPlayerMode && index === 1) owner = 4;
                else if (!isTwoPlayerMode && owner === 4) owner = 5;
                return {
                    id: index,
                    name: territory.name || `Territorio ${index + 1}`,
                    owner,
                    originalOwner: owner,
                    custom: true,
                    points: territory.points || [],
                    forts: 0,
                    isColony: false,
                    terrain: territory.terrain || 'normal',
                    resource: resourceKeys[index % resourceKeys.length],
                    isCapital: index < Math.min(4, continent.territories.length),
                };
            });
            refreshNationResources();
        }

        function refreshNationResources() {
            Object.values(nations).forEach(n => {
                if (!n || n.id === 9) return;
                n.resources = getNationResources(n.id);
            });
        }
        function initGameData() {
            turn = selectedScenarioYear; nukeModeActive = false; spyModeActive = false; pendingDefenses = []; alliances = new Set(); announcedVictories = new Set();
            campaignEraIndex = Math.max(0, CAMPAIGN_ERAS.indexOf(selectedScenarioYear));
            campaignLevelIndex = getCampaignLevelIndexForYear(selectedScenarioYear);
            campaignTurnsInEra = 0;
            nations = buildScenarioNations();
            const chosen = nations[selectedPlayerEmpireId] || nations[0];
            nations[0].name = chosen.name;
            nations[0].color = chosen.color;
            nations[0].trait = chosen.trait;
            nations[0].pop = chosen.pop;
            nations[0].bat = chosen.bat;
            nations[0].money = chosen.money;
            if (isTwoPlayerMode) {
                const chosenP2 = nations[selectedPlayer2EmpireId] || nations[4];
                nations[4].name = chosenP2.name;
                nations[4].color = chosenP2.color;
                nations[4].trait = chosenP2.trait;
                nations[4].pop = chosenP2.pop;
                nations[4].bat = chosenP2.bat;
                nations[4].money = chosenP2.money;
            }
            buildWorldProvinces();
            document.getElementById('log').innerHTML = `Bienvenido a ${formatScenarioYear(selectedScenarioYear)}.`;
            if (isCampaignMode) {
                const level = getCurrentCampaignLevel();
                logEvent(`Modo campaña activo: Nivel ${campaignLevelIndex + 1}/${CAMPAIGN_LEVELS.length} - ${level.title}. Objetivo: ${level.objective}`);
            }
        }

        applyActiveFlagUI();

        // ==========================================
        // INTERFAZ GENERAL
        // ==========================================
        function showScreen(screenId) {
            document.querySelectorAll('body > div').forEach(div => { if (div.id !== 'tooltip' && div.id !== 'nuke-flash' && !div.classList.contains('modal-overlay')) div.classList.add('hidden'); });
            const tooltip = document.getElementById('tooltip');
            if (tooltip) tooltip.classList.add('hidden');
            document.getElementById(screenId).classList.remove('hidden');
            updateAudioForScreen(screenId);
        }

        function returnToMainMenu() {
            if (battleLoop) clearInterval(battleLoop);
            isPaused = false;
            nukeModeActive = false;
            spyModeActive = false;
            document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.add('hidden'));
            const pauseOverlay = document.getElementById('pause-overlay');
            if (pauseOverlay) pauseOverlay.classList.add('hidden');
            showScreen('menu-screen');
        }

        function toggleWorldInfo() {
            const section = document.getElementById('world-info-section');
            const button = document.getElementById('world-info-toggle');
            const icon = document.getElementById('world-info-toggle-icon');
            if (!section) return;
            const collapsed = section.classList.toggle('collapsed');
            if (button) button.setAttribute('aria-expanded', String(!collapsed));
            if (icon) icon.innerText = collapsed ? '▸' : '▾';
        }

        function setCommander(playerId) {
            activeCommander = playerId;
            document.getElementById('btn-com-p1').classList.toggle('switch-active', playerId === 0); document.getElementById('btn-com-p1').style.opacity = playerId === 0 ? '1' : '0.5';
            document.getElementById('btn-com-p2').classList.toggle('switch-active', playerId === 4); document.getElementById('btn-com-p2').style.opacity = playerId === 4 ? '1' : '0.5';
            nukeModeActive = false; spyModeActive = false;
            ['p1','p2'].forEach(p => {
                let bn = document.getElementById(`btn-nuke-mode-${p}`); if(bn) { bn.innerText = `MISIL NUC: OFF`; bn.style.backgroundColor = "#c0392b"; }
                let bs = document.getElementById(`btn-spy-mode-${p}`); if(bs) { bs.innerText = `MANDAR ESPIA`; bs.style.backgroundColor = "#8e44ad"; }
            });
        }

        function applyNameCheats(playerId, inputId, typedOverride = null) {
            const input = document.getElementById(inputId);
            const nation = nations[playerId];
            if (!input || !nation) return;
            const typedName = cleanText(typedOverride !== null ? typedOverride : (input.value || '')).trim().toLowerCase();
            nation.easterEggs = nation.easterEggs || {};
            if (typedName.includes('nuclear')) {
                nation.nukes = (nation.nukes || 0) + 10;
                nation.easterEggs.nuclear = true;
                logEvent(`☢️ Codigo nuclear activado para ${nation.name}: +10 bombas nucleares.`);
            }
            if (/\broma\b/.test(typedName)) {
                nation.generals = (nation.generals || 0) + 1;
                nation.bat += 180;
                nation.stability = Math.min(100, (nation.stability || 78) + 6);
                ensureTechSet(nation).add('Formaciones');
                nation.easterEggs.rome = true;
                logEvent(`SPQR: ${nation.name} recibe un general romano, +180 batallones y moral imperial.`);
            }
            if (/\boro\b/.test(typedName)) {
                nation.money += 500000;
                nation.stability = Math.max(0, (nation.stability || 78) - 15);
                nation.easterEggs.gold = true;
                logEvent(`Easter egg del oro: ${nation.name} empieza con +500.000 dinero, pero la codicia baja la estabilidad.`);
            }
            if (typedName.includes('pacifista')) {
                nation.money += 180000;
                nation.stability = Math.min(100, (nation.stability || 78) + 12);
                nation.pacifistTurns = 5;
                nation.easterEggs.pacifist = true;
                logEvent(`Modo pacifista: ${nation.name} no puede atacar durante 5 turnos, pero gana dinero, estabilidad y diplomacia.`);
            }
        }

        async function startGame() {
            const typedP1Name = document.getElementById('p1-nation') ? document.getElementById('p1-nation').value : '';
            const typedP2Name = document.getElementById('p2-nation') ? document.getElementById('p2-nation').value : '';
            const scenarioSelect = document.getElementById('scenario-year');
            if (scenarioSelect) setScenarioYear(scenarioSelect.value);
            const campaignToggle = document.getElementById('campaign-mode');
            isCampaignMode = Boolean(campaignToggle && campaignToggle.checked);
            const empireSelect = document.getElementById('p1-empire-select');
            if (empireSelect) setPlayerEmpire(empireSelect.value);
            const empireSelectP2 = document.getElementById('p2-empire-select');
            if (isTwoPlayerMode && empireSelectP2) setPlayerEmpire(empireSelectP2.value, 2);
            if (isTwoPlayerMode && selectedPlayer2EmpireId === selectedPlayerEmpireId) {
                const preset = window.WAR_WORLD.scenarioNations[selectedScenarioYear] || {};
                const fallbackP2 = Object.keys(preset)
                    .map(id => parseInt(id, 10))
                    .find(id => id !== 9 && id !== selectedPlayerEmpireId);
                if (fallbackP2 !== undefined) {
                    selectedPlayer2EmpireId = fallbackP2;
                    setPlayerEmpire(fallbackP2, 2);
                    if (empireSelectP2) empireSelectP2.value = String(fallbackP2);
                }
            }
            initDynamicTexts(); initAudio();
            const startButtons = Array.from(document.querySelectorAll('button')).filter(button => button.textContent.includes('A LA CONQUISTA'));
            startButtons.forEach(button => { button.disabled = true; button.dataset.originalText = button.innerText; button.innerText = "CARGANDO MUNDO..."; });
            const activeContinent = getActiveContinent();
            const activeCustomPlayable = activeContinent && activeContinent.territories && activeContinent.territories.length >= 2;
            if (!activeCustomPlayable) {
                try {
                    await loadWorldGeoJson();
                } catch (error) {
                    alert("No se pudo cargar el mapa mundial. Revisa la conexion e intentalo de nuevo.");
                    startButtons.forEach(button => { button.disabled = false; button.innerText = button.dataset.originalText || "A LA CONQUISTA"; });
                    return;
                }
            }
            initGameData();
            nations[0].name = typedP1Name || document.getElementById('p1-nation').value || nations[0].name; nations[0].color = document.getElementById('p1-color').value; 
            applyNameCheats(0, 'p1-nation', typedP1Name);
            
            if(isTwoPlayerMode && nations[4]) {
                nations[4].name = typedP2Name || document.getElementById('p2-nation').value || nations[4].name; nations[4].color = document.getElementById('p2-color').value; 
                applyNameCheats(4, 'p2-nation', typedP2Name);
                document.getElementById('p2-sidebar').classList.remove('hidden'); document.getElementById('commander-switch-container').classList.remove('hidden');
            } else {
                document.getElementById('p2-sidebar').classList.add('hidden'); document.getElementById('commander-switch-container').classList.add('hidden');
            }
            showScreen('game-screen'); setCommander(0); updateHUD(); drawMap();
            startButtons.forEach(button => { button.disabled = false; button.innerText = button.dataset.originalText || "A LA CONQUISTA"; });
        }

        function updateHUD() {
            document.getElementById('hud-name-p1').innerText = nations[0].name; document.getElementById('hud-pop-p1').innerText = Math.floor(nations[0].pop).toLocaleString();
            document.getElementById('hud-bat-p1').innerText = Math.floor(nations[0].bat); document.getElementById('hud-turn').innerText = formatScenarioYear(turn);
            document.getElementById('hud-money-p1').innerText = Math.floor(nations[0].money).toLocaleString();
            
            document.getElementById('hud-air-p1').innerText = nations[0].air; document.getElementById('hud-jug-p1').innerText = nations[0].juggernauts;
            document.getElementById('hud-ship-p1').innerText = nations[0].battleships; document.getElementById('hud-par-p1').innerText = nations[0].paras;
            document.getElementById('hud-sub-p1').innerText = nations[0].subs; document.getElementById('hud-spy-p1').innerText = nations[0].spies;
            document.getElementById('hud-gen-p1').innerText = nations[0].generals; document.getElementById('hud-nukes-p1').innerText = nations[0].nukes;
            
            if(nations[0].nukes > 0) document.getElementById('btn-nuke-mode-p1').classList.remove('hidden'); else { document.getElementById('btn-nuke-mode-p1').classList.add('hidden'); if(nukeModeActive===0) nukeModeActive = false; }
            if(nations[0].spies > 0) document.getElementById('btn-spy-mode-p1').classList.remove('hidden'); else { document.getElementById('btn-spy-mode-p1').classList.add('hidden'); if(spyModeActive===0) spyModeActive = false; }

            if(isTwoPlayerMode) {
                document.getElementById('hud-name-p2').innerText = nations[4].name; document.getElementById('hud-pop-p2').innerText = Math.floor(nations[4].pop).toLocaleString();
                document.getElementById('hud-bat-p2').innerText = Math.floor(nations[4].bat); document.getElementById('hud-money-p2').innerText = Math.floor(nations[4].money).toLocaleString();
                
                document.getElementById('hud-air-p2').innerText = nations[4].air; document.getElementById('hud-jug-p2').innerText = nations[4].juggernauts;
                document.getElementById('hud-ship-p2').innerText = nations[4].battleships; document.getElementById('hud-par-p2').innerText = nations[4].paras;
                document.getElementById('hud-sub-p2').innerText = nations[4].subs; document.getElementById('hud-spy-p2').innerText = nations[4].spies;
                document.getElementById('hud-gen-p2').innerText = nations[4].generals; document.getElementById('hud-nukes-p2').innerText = nations[4].nukes;
                
                if(nations[4].nukes > 0) document.getElementById('btn-nuke-mode-p2').classList.remove('hidden'); else { document.getElementById('btn-nuke-mode-p2').classList.add('hidden'); if(nukeModeActive===4) nukeModeActive = false; }
                if(nations[4].spies > 0) document.getElementById('btn-spy-mode-p2').classList.remove('hidden'); else { document.getElementById('btn-spy-mode-p2').classList.add('hidden'); if(spyModeActive===4) spyModeActive = false; }
            }
            renderStrategyPanel();
        }

        function getCampaignProgressData(nationId) {
            if (!isCampaignMode) return null;
            const level = getCurrentCampaignLevel();
            if (!level) return null;
            const nat = nations[nationId];
            const owned = countOwnedProvinces(nationId);
            const capitals = countOwnedCapitals(nationId);
            const resources = countResourceTypes(nationId);
            let current = 0, target = 1, label = level.objective;
            if (level.title === "Nacimiento del Reino") { current = Math.min(3, owned); target = 3; label = `${owned}/3 territorios + comida`; }
            else if (level.title === "Unificación") { current = Math.max(Math.min(6, owned), capitals ? 6 : 0); target = 6; label = `${owned}/6 territorios o ${capitals}/1 capital`; }
            else if (level.title === "Primer Imperio") { current = Math.min(8, owned); target = 8; label = `${owned}/8 territorios y ${capitals}/1 capital`; }
            else if (level.title === "Rutas Comerciales") { current = resources; target = 2; label = `${resources}/2 tipos de recursos`; }
            else if (level.title === "Guerra de Fronteras") { current = Math.min(CAMPAIGN_TURNS_PER_ERA - 1, campaignTurnsInEra); target = CAMPAIGN_TURNS_PER_ERA - 1; label = `${campaignTurnsInEra}/${target} turnos, estabilidad ${Math.round(nat.stability || 0)}/40, territorios ${owned}/5`; }
            else if (level.title === "Era de Conquistas") { target = Math.ceil(getPlayableTerritoryCount() * 0.25); current = owned; label = `${owned}/${target} territorios`; }
            else if (level.title === "Crisis Interna") { current = Math.min(55, Math.round(nat.stability || 0)); target = 55; label = `estabilidad ${Math.round(nat.stability || 0)}/55 y territorios ${owned}/8`; }
            else if (level.title === "Dominio Naval") { current = countOwnedNavalOrColonial(nationId); target = 3; label = `${current}/3 territorios navales o coloniales`; }
            else if (level.title === "Colonización") { current = countOwnedColonies(nationId); target = 3; label = `${current}/3 colonias y recursos ${resources}/3`; }
            else if (level.title === "Carrera Tecnológica") { current = countTechs(nationId); target = 6; label = `${current}/6 tecnologías`; }
            else if (level.title === "Guerra Mundial") { current = Math.max(Math.min(20, owned), capitals * (20 / 3)); target = 20; label = `${owned}/20 territorios o ${capitals}/3 capitales`; }
            else if (level.title === "Caida de una Capital") { current = capitals; target = 4; label = `${capitals}/4 capitales`; }
            else if (level.title === "Superpotencia") { current = Math.min(1000000, nat.money); target = 1000000; label = `${formatPrice(nat.money)}/1.000.000 dinero + petróleo/ciencia/industria`; }
            else if (level.title === "Guerra Fría") { current = Math.max(countAllies(nationId), ensureTechSet(nat).has("Drones") ? 3 : 0); target = 3; label = `${countAllies(nationId)}/3 aliados, espías ${nat.spies || 0}/2 o Drones`; }
            else if (level.title === "Dominio Final") { current = hasAnyVictoryCondition(nationId) ? 1 : 0; target = 1; label = getVictoryProgressText(nationId); }
            const pct = Math.max(0, Math.min(100, Math.round((current / Math.max(1, target)) * 100)));
            return { pct, label };
        }

        function renderStrategyPanel() {
            const panel = document.getElementById('strategy-panel');
            if (!panel || !nations[0]) return;
            refreshNationResources();
            const res = nations[activeCommander] ? nations[activeCommander].resources : nations[0].resources;
            const nat = nations[activeCommander] || nations[0];
            const ownedResourceProvinces = provinces.filter(p => p.owner === nat.id && p.resource);
            const resourceText = Object.keys(RESOURCE_INFO)
                .filter(type => res && res[type] > 0)
                .map(type => `${RESOURCE_INFO[type].icon}:${res[type]}`)
                .join(' ') || 'sin recursos clave';
            const capitalCount = provinces.filter(p => p.owner === nat.id && p.isCapital).length;
            const techCount = ensureTechSet(nat).size;
            const campaignLevel = getCurrentCampaignLevel();
            const campaignLevelDone = isCampaignMode && campaignLevel && campaignLevel.check(nat.id);
            const campaignProgress = getCampaignProgressData(nat.id);
            const campaignText = isCampaignMode ? `Campaña nivel ${campaignLevelIndex + 1}/${CAMPAIGN_LEVELS.length}` : `Escenario ${formatScenarioYear(selectedScenarioYear)}`;
            const mission = getEraMission();
            const missionDone = mission.check(nat.id);
            const resourceLines = ownedResourceProvinces.slice(0, 8)
                .map(p => `${RESOURCE_INFO[p.resource].icon} ${p.name}: ${RESOURCE_INFO[p.resource].label}`)
                .join('<br>') || 'No controlas recursos clave todavia.';
            const missingCount = Math.max(0, ownedResourceProvinces.length - 8);
            const effectLines = Object.keys(RESOURCE_INFO)
                .map(type => `${RESOURCE_INFO[type].icon} ${RESOURCE_INFO[type].label}: ${RESOURCE_EFFECTS[type]}`)
                .join('<br>');
            const campaignHelp = isCampaignMode
                ? `La campaña avanza al cumplir objetivos de nivel. Conservas territorios, tecnologias y alianzas.`
                : 'Activa Modo campaña en el menú para avanzar por épocas conservando territorios.';
            const campaignLevelCard = isCampaignMode && campaignLevel
                ? `<div class="strategy-card"><strong>Nivel ${campaignLevelIndex + 1}: ${campaignLevel.title}</strong><br>${campaignLevel.objective}${campaignProgress ? `<div class="campaign-progress"><div class="campaign-progress-fill" style="width:${campaignProgress.pct}%"></div></div><small>Progreso: ${campaignProgress.label}</small>` : ''}<small>${campaignLevelDone ? 'Listo: pasa turno para reclamar recompensa.' : campaignLevel.rule}<br>Recompensa: ${campaignLevel.rewardText}</small></div>`
                : '';
            const capitalWarningCard = nat.capitalLost
                ? `<div class="strategy-card"><strong>Urgencia: recuperar capital</strong><br>Tu capital ha caído. Pierdes estabilidad e impuestos cada turno.<small>Reconquista una capital enemiga o conserva 3 turnos sin perder territorios para estabilizar el imperio.</small></div>`
                : '';
            const diplomacyCard = `<div class="strategy-card"><strong>Vista diplomática</strong><br>${diplomacyMapMode ? 'Activada' : 'Desactivada'}<div class="diplomacy-legend"><span style="color:#2ecc71;">Propio</span><span style="color:#3498db;">Aliado</span><span style="color:#e74c3c;">Rival</span><span style="color:#f1c40f;">Mercenario</span><span style="color:#e67e22;">Asedio</span></div><small>Usa el botón del mapa para ver relaciones y pactos sin abrir cada país.</small></div>`;
            panel.innerHTML = `
                <span class="strategy-pill"><strong>${campaignText}</strong></span>
                <span class="strategy-pill">Capitales: ${capitalCount}</span>
                <span class="strategy-pill">Recursos: ${resourceText}</span>
                <span class="strategy-pill">Tec: ${techCount}/${TECH_ORDER.length}</span>
                <span class="strategy-pill">Estabilidad: ${Math.round(nat.stability || 0)}</span>
                <span class="strategy-pill">Objetivo: ${getVictoryProgressText(nat.id)}</span>
                <div class="strategy-detail">
                    ${campaignLevelCard}
                    ${capitalWarningCard}
                    <div class="strategy-card"><strong>Misión de época: ${mission.title}</strong><br>${mission.goal}<small>${missionDone ? 'Cumplida: recibirás prestigio y bonus al avanzar.' : 'Pendiente.'}</small></div>
                    <div class="strategy-card"><strong>Territorios con recursos</strong><br>${resourceLines}${missingCount ? `<small>+${missingCount} mas</small>` : ''}</div>
                    <div class="strategy-card"><strong>Que aportan</strong><br>${effectLines}</div>
                    ${diplomacyCard}
                    <div class="strategy-card"><strong>Objetivos de victoria</strong><br>${VICTORY_RULES_TEXT.join('<br>')}<small>${campaignHelp}</small></div>
                    <div class="strategy-card"><strong>Política interna</strong><br>Impuestos: ${nat.taxPolicy || 'normal'} | Aliados: ${countAllies(nat.id)} | Personalidad IA: ${nat.personality}<small>La estabilidad baja con guerras, capital perdida e impuestos duros; si cae mucho hay rebeliones.</small></div>
                </div>
            `;
        }

        function logEvent(msg) { let l = document.getElementById('log'); l.innerHTML += `<div>> ${cleanText(msg)}</div>`; l.scrollTop = l.scrollHeight; }
        function toggleDiplomacyMap() {
            diplomacyMapMode = !diplomacyMapMode;
            const btn = document.getElementById('btn-diplomacy-map');
            if (btn) {
                btn.innerText = diplomacyMapMode ? 'MAPA NORMAL' : 'VISTA DIPLOMÁTICA';
                btn.style.backgroundColor = diplomacyMapMode ? '#27ae60' : '#2980b9';
            }
            drawMap();
            renderStrategyPanel();
        }
        function getDiplomacyFill(prov) {
            if (pendingDefenses.some(def => def.targetProvId === prov.id)) return '#e67e22';
            if (prov.owner === activeCommander) return '#2ecc71';
            if (prov.owner === 9) return '#f1c40f';
            if (areAllied(activeCommander, prov.owner)) return '#3498db';
            const owner = nations[prov.owner];
            if (owner && owner.pactTurns > 0) return '#8eecf5';
            return '#e74c3c';
        }
        function getProvinceFill(prov) {
            if (diplomacyMapMode) return getDiplomacyFill(prov);
            if (prov.owner === 0) return `url(#flag-p1)`;
            if (prov.owner === 4 && isTwoPlayerMode) return `url(#flag-p2)`;
            return nations[prov.owner] ? nations[prov.owner].color : '#111111';
        }

        function getShortCountryName(name) {
            const aliases = {
                "United States of America": "EE.UU.",
                "United Arab Emirates": "EAU",
                "Central African Republic": "R. Centroafricana",
                "Democratic Republic of the Congo": "R.D. Congo",
                "Dominican Republic": "R. Dominicana",
                "Bosnia and Herzegovina": "Bosnia",
                "Czech Republic": "Chequia",
                "Equatorial Guinea": "Guinea E.",
                "Guinea Bissau": "Guinea-Bissau",
                "North Korea": "Corea N.",
                "South Korea": "Corea S.",
                "Papua New Guinea": "Papua N.G.",
                "United Kingdom": "Reino Unido",
                "South Africa": "Sudafrica",
                "Western Sahara": "Sahara Occ.",
            };
            return aliases[name] || name;
        }

        function getShortEmpireName(ownerId) {
            const owner = nations[ownerId] || nations[9];
            const aliases = {
                "Mercenarios Piratas": "Mercenarios",
                "Imp. Británico": "Británico",
                "Imp. Britanico": "Británico",
                "Japón Imperial": "Japón",
                "Japon Imperial": "Japón",
                "Dinastía Qing": "Qing",
                "Dinastia Qing": "Qing",
                "La Legión de Clipo": "Clipo",
                "La Legion de Clipo": "Clipo",
                "Imperio Otomano": "Otomano",
            };
            return aliases[cleanText(owner.name)] || cleanText(owner.name);
        }

        function getEmpireMapLabel(ownerId) {
            const owner = nations[ownerId] || nations[9];
            const aliases = { 0: "MI IMPERIO" };
            return aliases[ownerId] || cleanText(owner.name.toUpperCase());
        }

        function getLabelFontSize(prov) {
            if (prov.custom) {
                const area = getProvinceScreenArea(prov);
                return Math.max(8, Math.min(15, Math.sqrt(area) / 12));
            }
            const bounds = d3Path.bounds(prov.feature);
            const width = Math.abs(bounds[1][0] - bounds[0][0]);
            const height = Math.abs(bounds[1][1] - bounds[0][1]);
            const size = Math.sqrt(width * height);
            return Math.max(4, Math.min(9, size / 6));
        }

        function getProvinceScreenArea(prov) {
            if (prov.custom && prov.points) {
                let area = 0;
                for (let i = 0; i < prov.points.length; i++) {
                    const a = prov.points[i], b = prov.points[(i + 1) % prov.points.length];
                    area += (a.x * b.y) - (b.x * a.y);
                }
                return Math.abs(area / 2);
            }
            const bounds = d3Path.bounds(prov.feature);
            return Math.abs(bounds[1][0] - bounds[0][0]) * Math.abs(bounds[1][1] - bounds[0][1]);
        }

        function getProvinceCentroid(prov) {
            if (prov.custom && prov.points) return getPointCentroid(prov.points);
            const c = d3Path.centroid(prov.feature);
            return { x: c[0], y: c[1] };
        }

        function buildEmpireLabels() {
            const groups = new Map();
            provinces.forEach(prov => {
                if (prov.owner === 9) return;
                const point = getProvinceCentroid(prov);
                const centroid = [point.x, point.y];
                if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
                const area = getProvinceScreenArea(prov);
                if (area < 180) return;
                if (!groups.has(prov.owner)) groups.set(prov.owner, []);
                groups.get(prov.owner).push({ centroid, area });
            });

            const labels = [];
            groups.forEach((items, ownerId) => {
                items.sort((a, b) => b.area - a.area);
                const maxLabelsByOwner = { 0: 2, 1: 3, 2: 2, 4: 2, 9: 0 };
                const maxLabels = maxLabelsByOwner[ownerId] || 1;
                const chosen = [];
                for (const item of items) {
                    const tooClose = chosen.some(other => {
                        const dx = item.centroid[0] - other.centroid[0];
                        const dy = item.centroid[1] - other.centroid[1];
                        return Math.sqrt(dx * dx + dy * dy) < 170;
                    });
                    if (!tooClose) chosen.push(item);
                    if (chosen.length >= maxLabels) break;
                }
                chosen.forEach(item => labels.push({
                    ownerId,
                    x: item.centroid[0],
                    y: item.centroid[1],
                    text: getEmpireMapLabel(ownerId),
                    fontSize: Math.max(13, Math.min(28, Math.sqrt(item.area) / 4.4)),
                }));
            });
            return labels;
        }

        function updateMapLabelVisibility(zoomLevel) {
            if (!d3G) return;
            d3G.selectAll('.country-label')
                .style('display', 'none');
            d3G.selectAll('.empire-label')
                .style('display', zoomLevel >= 3.4 ? 'none' : 'block');
            d3G.selectAll('.capital-marker')
                .style('display', 'block');
        }

        function addFlagPattern(defs, id, dataUrl) {
            const pattern = defs.append('pattern')
                .attr('id', id)
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 90)
                .attr('height', 60);

            pattern.append('rect')
                .attr('width', 90)
                .attr('height', 60)
                .attr('fill', '#fff');

            pattern.append('image')
                .attr('href', dataUrl)
                .attr('width', 90)
                .attr('height', 60)
                .attr('preserveAspectRatio', 'xMidYMid slice');
        }

        function addAtlasMapDefs(defs) {
            const ocean = defs.append('linearGradient')
                .attr('id', 'atlasOcean')
                .attr('x1', '0%').attr('y1', '0%')
                .attr('x2', '100%').attr('y2', '100%');
            ocean.append('stop').attr('offset', '0%').attr('stop-color', '#d9eef0');
            ocean.append('stop').attr('offset', '48%').attr('stop-color', '#bdd8dd');
            ocean.append('stop').attr('offset', '100%').attr('stop-color', '#a7c9d4');

            const countryTexture = defs.append('filter')
                .attr('id', 'atlasCountryTexture')
                .attr('x', '-8%').attr('y', '-8%')
                .attr('width', '116%').attr('height', '116%');
            countryTexture.append('feTurbulence')
                .attr('type', 'fractalNoise')
                .attr('baseFrequency', '0.018')
                .attr('numOctaves', '3')
                .attr('seed', '17')
                .attr('result', 'grain');
            countryTexture.append('feColorMatrix')
                .attr('in', 'grain')
                .attr('type', 'matrix')
                .attr('values', '0.42 0 0 0 0.58  0 0.42 0 0 0.58  0 0 0.42 0 0.58  0 0 0 0.2 0')
                .attr('result', 'softGrain');
            countryTexture.append('feBlend')
                .attr('in', 'SourceGraphic')
                .attr('in2', 'softGrain')
                .attr('mode', 'multiply');
        }

        function addAtlasDecorations(svg, group, path, projection, width, height) {
            svg.insert('rect', ':first-child')
                .attr('class', 'atlas-ocean')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width)
                .attr('height', height);

            if (d3.geoGraticule) {
                const graticule = d3.geoGraticule().step([30, 20]);
                group.append('path')
                    .datum(graticule())
                    .attr('class', 'atlas-graticule')
                    .attr('d', path);
            }

            group.append('path')
                .datum({ type: 'FeatureCollection', features: provinces.map(p => p.feature).filter(Boolean) })
                .attr('class', 'atlas-coastline')
                .attr('d', path);

            const oceanLabels = [
                { text: 'Océano Pacífico', lon: -145, lat: 2, size: 18, rotate: -8 },
                { text: 'Océano Atlántico', lon: -34, lat: 8, size: 16, rotate: -12 },
                { text: 'Océano Índico', lon: 78, lat: -22, size: 16, rotate: -8 },
                { text: 'Mar Mediterráneo', lon: 18, lat: 35, size: 12, rotate: -7 },
            ];
            group.selectAll('text.ocean-label')
                .data(oceanLabels.map(label => {
                    const point = projection([label.lon, label.lat]);
                    return point ? { ...label, x: point[0], y: point[1] } : null;
                }).filter(label => label && Number.isFinite(label.x) && Number.isFinite(label.y)))
                .enter()
                .append('text')
                .attr('class', 'ocean-label')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .attr('font-size', d => `${d.size}px`)
                .attr('transform', d => `rotate(${d.rotate} ${d.x} ${d.y})`)
                .text(d => d.text);

            svg.append('text')
                .attr('class', 'atlas-title')
                .attr('x', 24)
                .attr('y', 42)
                .attr('font-size', 28)
                .text(`Escenario ${formatScenarioYear(selectedScenarioYear)}`);
            svg.append('text')
                .attr('class', 'atlas-subtitle')
                .attr('x', 26)
                .attr('y', 66)
                .attr('font-size', 15)
                .text('Mapa político');
            svg.append('line')
                .attr('class', 'atlas-scale')
                .attr('x1', width - 190)
                .attr('x2', width - 70)
                .attr('y1', 38)
                .attr('y2', 38)
                .attr('stroke', '#1f2930')
                .attr('stroke-width', 2);
            svg.append('text')
                .attr('class', 'atlas-scale')
                .attr('x', width - 130)
                .attr('y', 30)
                .attr('text-anchor', 'middle')
                .attr('font-size', 13)
                .text('500 km');
        }

        function handleProvinceClick(prov) {
            if (nukeModeActive !== false) { 
                if (prov.owner !== nukeModeActive) { executeNuclearStrike(prov, nukeModeActive); return; }
                alert("No bombardees tu territorio."); return;
            }
            if (spyModeActive !== false) {
                if (prov.owner !== spyModeActive) { executeSpyAction(prov, spyModeActive); return; }
                alert("No espÃƒÂ­es tu territorio."); return;
            }

            let attId = activeCommander;
            let defenseData = pendingDefenses.find(d => d.targetProvId === prov.id);
            if (defenseData) { initiateDefenseBattle(prov.id); return; }
            if (prov.owner === 9) { openDiplomacy(prov.id, attId); }
            else if (prov.owner !== attId) {
                if (areAllied(attId, prov.owner)) { openDiplomacy(prov.id, attId); return; }
                openDiplomacy(prov.id, attId);
            } else if (prov.isColony && prov.owner === attId) { initiateCivilianBattle(prov.id, attId); }
            else { upgradeFort(prov.id, attId); }
        }

        function positionTooltip(event) {
            const t = document.getElementById('tooltip');
            if (!t) return;
            const padding = 14;
            const width = Math.min(t.offsetWidth || 300, window.innerWidth - padding * 2);
            const height = Math.min(t.offsetHeight || 120, window.innerHeight - padding * 2);
            let left = event.clientX + 15;
            let top = event.clientY + 15;
            if (left + width > window.innerWidth - padding) left = event.clientX - width - 15;
            if (top + height > window.innerHeight - padding) top = event.clientY - height - 15;
            t.style.left = Math.max(padding, left) + 'px';
            t.style.top = Math.max(padding, top) + 'px';
        }

        function drawMap() {
            let map = document.getElementById('map-container');
            map.innerHTML = '';
            map.classList.toggle('diplomacy-mode', diplomacyMapMode);
            if (!window.d3) return;
            const activeContinent = getActiveContinent();
            if (activeContinent) {
                const bg = document.createElement('img');
                bg.className = 'custom-continent-bg';
                bg.src = activeContinent.image;
                bg.alt = activeContinent.name;
                map.appendChild(bg);
            }
            if (provinces.some(p => p.custom)) {
                drawCustomContinentMap(map);
                return;
            }
            if (!geojsonData) return;

            const width = Math.max(map.clientWidth, 900);
            const height = Math.max(map.clientHeight, 520);
            d3Svg = d3.select('#map-container').append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet');
            d3G = d3Svg.append('g');

            const projectionFactory = d3.geoNaturalEarth1 || d3.geoMercator;
            const projection = projectionFactory().fitSize([width, height], geojsonData);
            d3Path = d3.geoPath().projection(projection);

            const defs = d3Svg.append('defs');
            addAtlasMapDefs(defs);
            addFlagPattern(defs, 'flag-p1', savedFlags[p1FlagIndex]);
            addFlagPattern(defs, 'flag-p2', savedFlags[p2FlagIndex] || savedFlags[1] || savedFlags[p1FlagIndex]);
            addAtlasDecorations(d3Svg, d3G, d3Path, projection, width, height);

            d3G.selectAll('path')
                .data(provinces)
                .enter()
                .append('path')
                .attr('class', d => pendingDefenses.some(def => def.targetProvId === d.id) ? 'country country-under-siege' : 'country')
                .attr('d', d => d3Path(d.feature))
                .attr('fill-rule', 'evenodd')
                .attr('fill', d => getProvinceFill(d))
                .attr('stroke', 'rgba(72, 61, 39, 0.52)')
                .attr('stroke-width', 0.75)
                .style('cursor', 'pointer')
                .on('click', (event, d) => handleProvinceClick(d))
                .on('mouseenter', (event, d) => {
                    let owner = nations[d.owner] || nations[9];
                    let defenseData = pendingDefenses.find(def => def.targetProvId === d.id);
                    let t = document.getElementById('tooltip');
                    t.classList.remove('hidden');
                    updateTooltip(d, owner, defenseData !== undefined);
                })
                .on('mousemove', event => {
                    positionTooltip(event);
                })
                .on('mouseleave', () => document.getElementById('tooltip').classList.add('hidden'));

            const countryLabels = d3G.selectAll('text.country-label')
                .data(provinces.filter(prov => {
                    const centroid = d3Path.centroid(prov.feature);
                    return Number.isFinite(centroid[0]) && Number.isFinite(centroid[1]);
                }))
                .enter()
                .append('text')
                .attr('class', 'country-label')
                .attr('x', d => d3Path.centroid(d.feature)[0])
                .attr('y', d => d3Path.centroid(d.feature)[1])
                .attr('font-size', d => `${getLabelFontSize(d)}px`)
                .text(d => getShortCountryName(d.name));

            d3G.selectAll('text.empire-label')
                .data(buildEmpireLabels())
                .enter()
                .append('text')
                .attr('class', 'empire-label')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .attr('font-size', d => `${d.fontSize}px`)
                .text(d => d.text);

            d3G.selectAll('text.capital-marker')
                .data(provinces.filter(p => p.isCapital && p.owner !== 9).map(p => {
                    const c = d3Path.centroid(p.feature);
                    return { x: c[0], y: c[1], name: p.name };
                }).filter(d => Number.isFinite(d.x) && Number.isFinite(d.y)))
                .enter()
                .append('text')
                .attr('class', 'capital-marker')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .text('✪');

            d3G.selectAll('text.resource-marker')
                .data(provinces.filter(p => p.resource).map(p => {
                    const c = d3Path.centroid(p.feature);
                    return { x: c[0], y: c[1], resource: p.resource };
                }).filter(d => Number.isFinite(d.x) && Number.isFinite(d.y)))
                .enter()
                .append('text')
                .attr('class', 'resource-marker')
                .attr('x', d => d.x)
                .attr('y', d => d.y + 12)
                .text(d => RESOURCE_INFO[d.resource].icon);

            updateMapLabelVisibility(1);
            d3Svg.call(d3.zoom().scaleExtent([1, 8]).on('zoom', event => {
                d3G.attr('transform', event.transform);
                updateMapLabelVisibility(event.transform.k);
            }));
        }

        function drawCustomContinentMap(map) {
            d3Svg = d3.select('#map-container').append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', '0 0 1100 620')
                .attr('preserveAspectRatio', 'xMidYMid meet');
            d3G = d3Svg.append('g');
            const defs = d3Svg.append('defs');
            addAtlasMapDefs(defs);
            addFlagPattern(defs, 'flag-p1', savedFlags[p1FlagIndex]);
            addFlagPattern(defs, 'flag-p2', savedFlags[p2FlagIndex] || savedFlags[1] || savedFlags[p1FlagIndex]);

            d3G.selectAll('polygon')
                .data(provinces)
                .enter()
                .append('polygon')
                .attr('class', d => pendingDefenses.some(def => def.targetProvId === d.id) ? 'country country-under-siege' : 'country')
                .attr('points', d => d.points.map(p => `${p.x},${p.y}`).join(' '))
                .attr('fill', d => getProvinceFill(d))
                .attr('stroke', 'rgba(72, 61, 39, 0.55)')
                .attr('stroke-width', 2)
                .style('cursor', 'pointer')
                .on('click', (event, d) => handleProvinceClick(d))
                .on('mouseenter', (event, d) => {
                    let owner = nations[d.owner] || nations[9];
                    let defenseData = pendingDefenses.find(def => def.targetProvId === d.id);
                    let t = document.getElementById('tooltip');
                    t.classList.remove('hidden');
                    updateTooltip(d, owner, defenseData !== undefined);
                })
                .on('mousemove', event => {
                    positionTooltip(event);
                })
                .on('mouseleave', () => document.getElementById('tooltip').classList.add('hidden'));

            d3G.selectAll('text.country-label')
                .data(provinces)
                .enter()
                .append('text')
                .attr('class', 'country-label')
                .style('display', 'block')
                .attr('x', d => getProvinceCentroid(d).x)
                .attr('y', d => getProvinceCentroid(d).y)
                .attr('font-size', d => `${getLabelFontSize(d)}px`)
                .text(d => getShortCountryName(d.name));

            d3G.selectAll('text.resource-marker')
                .data(provinces.filter(p => p.resource))
                .enter()
                .append('text')
                .attr('class', 'resource-marker')
                .attr('x', d => getProvinceCentroid(d).x)
                .attr('y', d => getProvinceCentroid(d).y + 18)
                .text(d => RESOURCE_INFO[d.resource].icon);

            d3G.selectAll('text.empire-label')
                .data(buildEmpireLabels())
                .enter()
                .append('text')
                .attr('class', 'empire-label')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .attr('font-size', d => `${Math.max(16, d.fontSize)}px`)
                .text(d => d.text);

            d3Svg.call(d3.zoom().scaleExtent([1, 8]).on('zoom', event => {
                d3G.attr('transform', event.transform);
                updateMapLabelVisibility(event.transform.k);
                d3G.selectAll('.resource-marker').style('display', 'block');
            }));
        }
        function updateTooltip(prov, owner, isUnderSiege) {
            let t = document.getElementById('tooltip');
            let bat = getProvinceDefenseCount(prov, owner);
            
            let statusText = ""; let ter = prov.terrain === 'naval' ? " (Naval)" : (prov.terrain === 'winter' ? " (Nieve)" : (prov.terrain === 'desert' ? " (Desierto)" : (prov.terrain === 'mountain' ? " (Montaña)" : "")));

            if (isUnderSiege) statusText = "<strong style='color:#e74c3c; font-size:1.2em;'>⚔️ ¡ASEDIO! Haz clic para defender</strong>" + ter;
            else if (nukeModeActive !== false && prov.owner !== nukeModeActive) statusText = "<strong style='color:#e74c3c; font-size:1.2em;'>â˜¢ï¸ CLICK PARA DESTRUIR â˜¢ï¸</strong>";
            else if (spyModeActive !== false && prov.owner !== spyModeActive) statusText = "<strong style='color:#8e44ad; font-size:1.2em;'>ðŸ•µï¸ MANDAR ESPÃA ðŸ•µï¸</strong>";
            else if (prov.owner === 9) statusText = "<strong style='color:#f1c40f;'>ðŸ’° Mercenarios Disponibles</strong>";
            else if (prov.owner !== activeCommander) {
                let isOtherPlayer = isTwoPlayerMode && (prov.owner === 0 || prov.owner === 4);
                if(isOtherPlayer) statusText = "<em style='color:#ff3f34;'>âš”ï¸ Click para Invadir (PvP)</em>" + ter;
                else {
                    statusText = "<em style='color:#ff3f34;'>ðŸ¤ Click para Diplomacia/Ataque</em>" + ter;
                    if(owner.pactTurns > 0) statusText += "<br><span style='color:#3498db;'>ðŸ•Šï¸ Pacto de No AgresiÃ³n Activo</span>";
                    if(prov.id === 10) statusText += "<br><strong style='color:#9b59b6;'>âš ï¸ PELIGRO: Nivel Jefe Final</strong>";
                }
            } else if (prov.isColony) statusText = "<em style='color:#f1c40f;'>ðŸ”¥ Click para Asimilar Colonia</em>";
            else statusText = "<em style='color:#2ecc71;'>ðŸ° Click para Mejorar Fuerte</em>";

            const capitalText = prov.isCapital ? "<br><strong style='color:#f1c40f;'>CAP Capital estrategica</strong>" : "";
            const resourceText = prov.resource ? `<br><span style='color:#2ecc71;'>${RESOURCE_INFO[prov.resource].icon} ${RESOURCE_INFO[prov.resource].label}</span>` : "";
            const personalityText = owner && owner.id !== 9 ? `<br>IA: ${owner.personality || 'balanced'} | Estabilidad: ${Math.round(owner.stability || 0)}` : "";
            const diplomacyText = diplomacyMapMode ? `<br>Relación: ${prov.owner === activeCommander ? 'propio' : areAllied(activeCommander, prov.owner) ? 'aliado' : prov.owner === 9 ? 'mercenario' : 'rival'}` : "";
            t.innerHTML = cleanText(`<strong>${prov.name}</strong>${capitalText}${resourceText}<br>Dueño: ${owner.name}${personalityText}${diplomacyText}<br>Defensa: ~${bat} bat.<br>${statusText}`);
        }

        // COMPRAS Y DIPLOMACIA
        function openShop(playerId) { currentShopper = playerId; updateShopHUD(); document.getElementById('shop-modal').classList.remove('hidden'); playSound('open'); }
        function closeShop() { document.getElementById('shop-modal').classList.add('hidden'); updateHUD(); }
        function updateShopHUD() {
            document.getElementById('shop-title').innerText = `MERCADO MILITAR - ${cleanText(nations[currentShopper].name.toUpperCase())}`;
            document.getElementById('shop-money-display').innerText = Math.floor(nations[currentShopper].money).toLocaleString();
            document.getElementById('shop-pop-display').innerText = Math.floor(nations[currentShopper].pop).toLocaleString();
            initDynamicTexts();
            renderResearchPanel();
            updateShopButtonStates();
        }

        function renderResearchPanel() {
            const panel = document.getElementById('research-panel');
            const nat = nations[currentShopper];
            if (!panel || !nat) return;
            const next = getNextResearchTech(nat);
            const techList = Array.from(ensureTechSet(nat)).join(', ') || 'ninguna';
            if (!next) {
                panel.innerHTML = `<div class="research-line"><strong>Tecnologias:</strong> ${techList}</div><div class="research-line">Todo lo disponible para esta epoca esta desbloqueado.</div>`;
                return;
            }
            panel.innerHTML = `
                <div class="research-line"><strong>Tecnologias:</strong> ${techList}</div>
                <div class="research-line">Siguiente: <strong>${next}</strong> (${nat.research || 0}/100)</div>
                <button onclick="investigateTechnology()" style="width:100%; background:#34495e;">INVESTIGAR (${formatPrice(getResearchCost())}ðŸ’°)</button>
            `;
        }

        function updateShopButtonStates() {
            Object.keys(SHOP_PRICE_IDS).forEach(item => {
                const button = getShopButton(item);
                if (!button || button.classList.contains('hidden')) return;
                const locked = !hasTechForItem(item, nations[currentShopper]);
                button.disabled = locked;
                button.title = locked ? `Investiga ${getItemTechRequirement(item)} para comprar esto.` : "";
            });
        }

        function getResearchCost() {
            const base = 12000;
            return hasResource(nations[currentShopper], 'science') ? Math.floor(base * 0.7) : base;
        }

        function investigateTechnology() {
            const nat = nations[currentShopper];
            const next = getNextResearchTech(nat);
            if (!next) return;
            const cost = getResearchCost();
            if (nat.money < cost) { playSound('error'); alert("Fondos insuficientes para investigar."); return; }
            nat.money -= cost;
            nat.research = (nat.research || 0) + (hasResource(nat, 'science') ? 50 : 35);
            if (nat.research >= 100) {
                nat.research = 0;
                ensureTechSet(nat).add(next);
                logEvent(`${nat.name} desbloqueo ${next}.`);
                playSound('research');
            } else {
                playSound('buy');
            }
            updateHUD(); updateShopHUD();
        }

        let currentDiplomacyBuyer = 0;
        function openDiplomacy(provId, buyerId) {
            selectedDipProvId = provId; currentDiplomacyBuyer = buyerId;
            let p = provinces.find(x => x.id === provId); let owner = nations[p.owner];
            document.getElementById('dip-title').innerText = p.name.toUpperCase(); document.getElementById('dip-owner').innerText = owner.name;
            const allied = areAllied(buyerId, p.owner);
            const allianceButton = document.getElementById('btn-dip-alliance');
            const attackButton = document.getElementById('btn-dip-att');
            if (allianceButton) {
                allianceButton.innerText = allied ? "ROMPER ALIANZA" : `PROPONER ALIANZA (${formatPrice(CONFIG.economy.allianceCost)} dinero)`;
                allianceButton.style.backgroundColor = allied ? "#c0392b" : "#27ae60";
            }
            if (attackButton) {
                attackButton.disabled = allied;
                attackButton.innerText = allied ? "ALIADO - NO PUEDES INVADIR" : "INICIAR INVASIÓN";
            }
            
            if (p.owner === 9) {
                document.getElementById('dip-normal-options').classList.add('hidden');
                document.getElementById('dip-merc-options').classList.remove('hidden');
            } else {
                document.getElementById('dip-normal-options').classList.remove('hidden');
                document.getElementById('dip-merc-options').classList.add('hidden');
            }
            document.getElementById('diplomacy-modal').classList.remove('hidden');
            playSound('diplomacy');
        }

        function closeDiplomacy() { document.getElementById('diplomacy-modal').classList.add('hidden'); }
        function confirmAttack() {
            let p = provinces.find(x => x.id === selectedDipProvId);
            const buyer = nations[currentDiplomacyBuyer];
            if (buyer && buyer.pacifistTurns > 0) {
                alert(`Modo pacifista activo: no puedes atacar durante ${buyer.pacifistTurns} turnos.`);
                return;
            }
            if (p && areAllied(currentDiplomacyBuyer, p.owner)) {
                alert("No puedes invadir a un aliado. Rompe la alianza primero.");
                return;
            }
            closeDiplomacy(); initiateAttack(selectedDipProvId, currentDiplomacyBuyer);
        }

        function triggerDefensiveAlliances(attackerId, defenderId) {
            Object.keys(nations).map(id => parseInt(id, 10)).forEach(allyId => {
                if (allyId === attackerId || allyId === defenderId || allyId === 9) return;
                if (!areAllied(defenderId, allyId) || areAllied(attackerId, allyId)) return;
                const ally = nations[allyId], attacker = nations[attackerId], defender = nations[defenderId];
                if (!ally || ally.bat < 50) return;
                const aid = Math.min(120, Math.floor(ally.bat * 0.18));
                ally.bat -= aid;
                defender.bat += aid;
                logEvent(`🛡️ ${ally.name} envia ${aid} batallones para defender a ${defender.name} contra ${attacker.name}.`);
            });
        }

        function handleProvinceCaptured(prov, oldOwnerId, newOwnerId) {
            if (!prov || oldOwnerId === newOwnerId) return;
            refreshNationResources();
            const oldOwner = nations[oldOwnerId], newOwner = nations[newOwnerId];
            if (cleanText(prov.name).toLowerCase() === 'malta' && newOwner && newOwner.id !== 9 && !newOwner.easterEggs?.malta) {
                newOwner.easterEggs = newOwner.easterEggs || {};
                newOwner.easterEggs.malta = true;
                newOwner.money += 44444;
                newOwner.spies += 1;
                showNewspaper("MICROIMPERIO DESPERTADO", `${newOwner.name} ha conquistado Malta. El microimperio secreto despierta: +44.444 dinero y +1 espía.`);
                logEvent(`Microimperio: Malta cae en manos de ${newOwner.name}.`);
            }
            if (prov.isCapital && oldOwner && oldOwner.id !== 9) {
                oldOwner.capitalLost = true;
                oldOwner.cursedCapitalLosses = (oldOwner.cursedCapitalLosses || 0) + 1;
                oldOwner.money = Math.floor(oldOwner.money * 0.55);
                oldOwner.bat = Math.floor(oldOwner.bat * 0.75);
                oldOwner.pop = Math.floor(oldOwner.pop * 0.9);
                oldOwner.stability = Math.max(0, (oldOwner.stability || 70) - 28);
                if (newOwner) {
                    newOwner.stability = Math.min(100, (newOwner.stability || 70) + 10);
                    newOwner.reputation += 1;
                    newOwner.money += 75000;
                    newOwner.capitalLost = false;
                }
                logEvent(`★ Capital capturada: ${prov.name}. ${oldOwner.name} pierde moral, dinero y tropas.`);
                if (oldOwner.id === 0 || (isTwoPlayerMode && oldOwner.id === 4)) {
                    showNewspaper("CAPITAL PERDIDA", `${oldOwner.name} ha perdido ${prov.name}. La estabilidad cae, el tesoro se reduce y el ejercito pierde moral. Recupera una capital pronto o tu imperio puede fragmentarse.`);
                }
                if (oldOwner.cursedCapitalLosses >= 3 && !oldOwner.easterEggs?.cursedCapitalTriggered) {
                    oldOwner.easterEggs = oldOwner.easterEggs || {};
                    oldOwner.easterEggs.cursedCapitalTriggered = true;
                    const cursed = provinces.filter(p => p.owner === oldOwnerId && !p.isCapital);
                    cursed.slice(0, 3).forEach(p => { p.owner = 9; p.isColony = false; p.forts = Math.max(p.forts || 0, 1); });
                    oldOwner.stability = Math.max(0, (oldOwner.stability || 0) - 20);
                    showNewspaper("CAPITAL MALDITA", `${oldOwner.name} ha perdido capitales demasiadas veces. Tres provincias se rebelan y aparecen como territorios libres fortificados.`);
                    logEvent(`Capital maldita: varias provincias abandonan a ${oldOwner.name}.`);
                }
                const remaining = provinces.filter(p => p.owner === oldOwnerId).length;
                if (remaining <= 2) {
                    provinces.forEach(p => {
                        if (p.owner === oldOwnerId && Math.random() < 0.5) { p.owner = newOwnerId; p.isColony = true; }
                    });
                    logEvent(`🏳️ ${oldOwner.name} esta al borde de rendirse tras perder su capital.`);
                    refreshNationResources();
                }
            }
            checkVictoryConditions();
        }

        function buyPact() {
            let p = provinces.find(x => x.id === selectedDipProvId); let owner = nations[p.owner], buyer = nations[currentDiplomacyBuyer];
            if (owner.pactTurns > 0) { alert("Ya tienes un pacto activo con ellos."); return; }
            if (buyer.money >= CONFIG.economy.pactCost) {
                buyer.money -= CONFIG.economy.pactCost; owner.pactTurns = 5; logEvent(`ðŸ¤ ${buyer.name} firmÃ³ un Pacto de No AgresiÃ³n con ${owner.name}.`);
                playSound('alliance');
                updateHUD(); closeDiplomacy(); drawMap();
            } else { playSound('error'); alert(`Fondos insuficientes.`); }
        }

        function buyBribe() {
            let p = provinces.find(x => x.id === selectedDipProvId); let owner = nations[p.owner], buyer = nations[currentDiplomacyBuyer];
            if (buyer.money >= CONFIG.economy.bribeCost) {
                buyer.money -= CONFIG.economy.bribeCost; owner.bribed = true; logEvent(`ðŸ’¸ ${buyer.name} sobornÃ³ a los generales de ${owner.name}. AtacarÃ¡n a otra facciÃ³n.`);
                playSound('buy');
                updateHUD(); closeDiplomacy();
            } else { playSound('error'); alert(`Fondos insuficientes.`); }
        }

        function buyMercenaries() {
            let p = provinces.find(x => x.id === selectedDipProvId); let buyer = nations[currentDiplomacyBuyer];
            if (buyer.money >= CONFIG.economy.mercCost) {
                buyer.money -= CONFIG.economy.mercCost;
                const oldOwner = p.owner;
                p.owner = buyer.id; p.isColony = true; p.forts = 0; buyer.bat += 100;
                handleProvinceCaptured(p, oldOwner, buyer.id);
                logEvent(`ðŸ´â€â˜ ï¸ Â¡${buyer.name} ha contratado a los mercenarios de ${p.name}! (+100 Batallones)`);
                playSound('buy');
                updateHUD(); closeDiplomacy(); drawMap();
            } else { playSound('error'); alert(`Fondos insuficientes.`); }
        }

        function buyItem(item) {
            if (!isWeaponAvailable(item)) {
                playSound('error');
                alert("Esa tecnologia no existe en esta epoca.");
                return;
            }
            if (!hasTechForItem(item, nations[currentShopper])) {
                playSound('error');
                alert(`Primero investiga ${getItemTechRequirement(item)}.`);
                return;
            }
            let b = nations[currentShopper]; let cPop = 0, cMon = 0, bought = false;
            if(item === 'recruit') { cPop = CONFIG.economy.recruitCostPop; cMon = getResourceAdjustedCost('recruit', b); if(b.pop >= cPop && b.money >= cMon) { b.pop -= cPop; b.money -= cMon; b.bat += (b.trait === 'motherland' ? 75 : CONFIG.economy.recruitYield); bought = true; logEvent(`ðŸª– ${b.name} reclutÃ³ tropas.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'para') { cMon = getResourceAdjustedCost('para', b); if(b.money >= cMon) { b.money -= cMon; b.paras++; bought = true; logEvent(`ðŸª‚ ${b.name} entrenÃ³ Paracaidistas.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'spy') { cMon = getResourceAdjustedCost('spy', b); if(b.money >= cMon) { b.money -= cMon; b.spies++; bought = true; logEvent(`ðŸ•µï¸ ${b.name} contratÃ³ un EspÃ­a.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'air') { cMon = getResourceAdjustedCost('air', b); if(b.money >= cMon) { b.money -= cMon; b.air++; bought = true; logEvent(`ðŸ›©ï¸ ${b.name} comprÃ³ un ZepelÃ­n.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'sub') { cMon = getResourceAdjustedCost('sub', b); if(b.money >= cMon) { b.money -= cMon; b.subs++; bought = true; logEvent(`âš“ ${b.name} botÃ³ un Submarino.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'ship') { cMon = getResourceAdjustedCost('ship', b); if(b.money >= cMon) { b.money -= cMon; b.battleships++; bought = true; logEvent(`ðŸš¢ ${b.name} construyÃ³ un Acorazado.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'jug') { cMon = getResourceAdjustedCost('jug', b); if(b.money >= cMon) { b.money -= cMon; b.juggernauts++; bought = true; logEvent(`ðŸ¦¾ ${b.name} ensamblÃ³ un Juggernaut.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'gen') { cMon = getResourceAdjustedCost('gen', b); if(b.money >= cMon) { b.money -= cMon; b.generals++; bought = true; logEvent(`ðŸŒŸ ${b.name} ascendiÃ³ a un General.`); } else alert(`Faltan fondos.`); } 
            else if (item === 'nuke') { cMon = getResourceAdjustedCost('nuke', b); if(b.money >= cMon) { b.money -= cMon; b.nukes++; bought = true; logEvent(`âš ï¸ ${b.name} adquiriÃ³ armamento NUCLEAR.`); } else alert(`Faltan fondos.`); }
            playSound(bought ? 'buy' : 'error');
            updateHUD(); updateShopHUD();
        }

        function upgradeFort(provId, buyerId) {
            let buyer = nations[buyerId], prov = provinces.find(p => p.id === provId);
            if (buyer.bat >= CONFIG.economy.fortCostBat) {
                buyer.bat -= CONFIG.economy.fortCostBat; prov.forts += 1;
                logEvent(`ðŸ° Defensas mejoradas en ${prov.name}. (Nivel ${prov.forts})`); updateHUD(); drawMap();
            } else logEvent(`âŒ Necesitas ${CONFIG.economy.fortCostBat} batallones libres.`);
        }

        // ==========================================
        // ESPIAS Y NUKES
        // ==========================================
        function toggleSpyMode(playerId) {
            if (nations[playerId].spies <= 0) { playSound('error'); return; }
            if (spyModeActive === playerId) { spyModeActive = false; logEvent(`OperaciÃ³n encubierta abortada.`); } 
            else { spyModeActive = playerId; nukeModeActive = false; logEvent(`ðŸ•µï¸ EspÃ­a listo. Haz clic en un enemigo.`); }
            playSound('spy');
            let btn = document.getElementById(playerId === 0 ? 'btn-spy-mode-p1' : 'btn-spy-mode-p2');
            btn.innerText = spyModeActive === playerId ? "Â¡SELECCIONA OBJETIVO! ðŸ•µï¸" : "MANDAR ESPÃA ðŸ•µï¸"; btn.style.backgroundColor = spyModeActive === playerId ? "#27ae60" : "#8e44ad";
            let nBtn = document.getElementById(playerId === 0 ? 'btn-nuke-mode-p1' : 'btn-nuke-mode-p2'); if(nBtn) { nBtn.innerText = `MISIL â˜¢ï¸: OFF`; nBtn.style.backgroundColor = "#c0392b"; }
        }

        function executeSpyAction(prov, shooterId) {
            if (prov.owner === 9) { alert("No puedes espiar a mercenarios neutrales."); return; }
            nations[shooterId].spies--; spyModeActive = false;
            let btn = document.getElementById(shooterId === 0 ? 'btn-spy-mode-p1' : 'btn-spy-mode-p2');
            btn.innerText = "MANDAR ESPÃA ðŸ•µï¸"; btn.style.backgroundColor = "#8e44ad";
            playSound('spy');
            
            const roll = Math.random();
            if(roll < 0.34) { prov.forts = 0; logEvent(`ðŸ’¥ Â¡Ã‰XITO! Tu espÃ­a ha destruido todos los fuertes en ${prov.name}.`); } 
            else if (roll < 0.67) {
                let stolen = Math.floor(nations[prov.owner].money * 0.3); nations[prov.owner].money -= stolen; nations[shooterId].money += stolen;
                logEvent(`ðŸ’° Â¡GOLPE PERFECTO! Tu espÃ­a robÃ³ ${stolen}ðŸ’° de las reservas de ${nations[prov.owner].name}.`);
            } else {
                const enemy = nations[prov.owner];
                const knownTech = Array.from(ensureTechSet(enemy)).filter(t => !ensureTechSet(nations[shooterId]).has(t));
                if (knownTech.length) {
                    ensureTechSet(nations[shooterId]).add(knownTech[0]);
                    logEvent(`Espionaje tecnologico: ${nations[shooterId].name} roba ${knownTech[0]} a ${enemy.name}.`);
                } else {
                    enemy.stability = Math.max(0, (enemy.stability || 70) - 12);
                    logEvent(`Espionaje politico: ${enemy.name} pierde estabilidad tras sabotajes en ${prov.name}.`);
                }
            }
            updateHUD(); drawMap();
        }

        function toggleNukeMode(playerId) {
            if (nations[playerId].nukes <= 0) { playSound('error'); return; }
            if (nukeModeActive === playerId) { nukeModeActive = false; logEvent(`Misil abortado.`); } 
            else { nukeModeActive = playerId; spyModeActive = false; logEvent(`âš ï¸ Misil nuclear preparado.`); }
            playSound('diplomacy');
            let btn = document.getElementById(playerId === 0 ? 'btn-nuke-mode-p1' : 'btn-nuke-mode-p2');
            btn.innerText = nukeModeActive === playerId ? "Â¡SELECCIONA OBJETIVO! â˜¢ï¸" : `MISIL â˜¢ï¸: OFF`; btn.style.backgroundColor = nukeModeActive === playerId ? "#8e44ad" : "#c0392b";
            let sBtn = document.getElementById(playerId === 0 ? 'btn-spy-mode-p1' : 'btn-spy-mode-p2'); if(sBtn) { sBtn.innerText = "MANDAR ESPÃA ðŸ•µï¸"; sBtn.style.backgroundColor = "#8e44ad"; }
        }

        function executeNuclearStrike(prov, shooterId) {
            nations[shooterId].nukes--; nukeModeActive = false;
            let btn = document.getElementById(shooterId === 0 ? 'btn-nuke-mode-p1' : 'btn-nuke-mode-p2');
            btn.innerText = `MISIL â˜¢ï¸: OFF`; btn.style.backgroundColor = "#c0392b";
            playSound('nuke'); let flash = document.getElementById('nuke-flash'); flash.style.opacity = '1';
            
            setTimeout(() => {
                const oldOwner = prov.owner;
                prov.owner = shooterId; prov.isColony = true; prov.forts = 0; 
                handleProvinceCaptured(prov, oldOwner, shooterId);
                pendingDefenses = pendingDefenses.filter(d => d.targetProvId !== prov.id);
                nations[shooterId].money += 500000; logEvent(`â˜¢ï¸ Â¡${nations[shooterId].name} borrÃ³ ${prov.name} del mapa! BotÃ­n: +500.000ðŸ’°`);
                updateHUD(); drawMap(); flash.style.opacity = '0';
            }, 100); 
        }

        // ==========================================
        // PERIÃ“DICO Y EVENTOS MUNDIALES
        // ==========================================
        function showNewspaper(title, desc, actions = []) {
            pendingNewspaperActions = Array.isArray(actions) ? actions : [];
            document.getElementById('news-title').innerText = cleanText(title); document.getElementById('news-desc').innerText = cleanText(desc);
            const actionsBox = document.getElementById('news-actions');
            if (actionsBox) {
                actionsBox.innerHTML = '';
                actionsBox.classList.toggle('hidden', pendingNewspaperActions.length === 0);
                pendingNewspaperActions.forEach((action, index) => {
                    const btn = document.createElement('button');
                    btn.innerText = cleanText(action.label || `Opcion ${index + 1}`);
                    btn.onclick = () => applyNewspaperAction(index);
                    actionsBox.appendChild(btn);
                });
            }
            document.getElementById('newspaper-modal').classList.remove('hidden');
        }
        function applyNewspaperAction(index) {
            const action = pendingNewspaperActions[index];
            if (!action) return;
            if (typeof action.effect === 'function') action.effect();
            if (action.log) logEvent(action.log);
            pendingNewspaperActions = [];
            closeNewspaper();
        }
        function closeNewspaper() {
            pendingNewspaperActions = [];
            const actionsBox = document.getElementById('news-actions');
            if (actionsBox) { actionsBox.innerHTML = ''; actionsBox.classList.add('hidden'); }
            document.getElementById('newspaper-modal').classList.add('hidden'); updateHUD(); drawMap();
        }

        // ==========================================
        // LÃ“GICA DE TURNO IA Y CRECIMIENTO
        // ==========================================
        function applyInternalPolitics(n, provsOwned) {
            if (!n || n.id === 9) return { moneyMult: 1, unrest: false };
            const policies = {
                low: { money: 0.82, stability: 4 },
                normal: { money: 1, stability: 1 },
                high: { money: 1.28, stability: -5 },
            };
            const policy = policies[n.taxPolicy || 'normal'] || policies.normal;
            n.stability = Math.max(0, Math.min(100, (n.stability || 70) + policy.stability + (hasResource(n, 'food') ? 1 : 0) - (n.capitalLost ? 2 : 0)));
            if (n.stability < 22 && provsOwned > 2 && Math.random() < 0.22) {
                const candidates = provinces.filter(p => p.owner === n.id && !p.isCapital);
                const rebel = candidates[Math.floor(Math.random() * candidates.length)];
                if (rebel) {
                    rebel.owner = 9;
                    rebel.isColony = false;
                    n.stability = Math.min(100, n.stability + 12);
                    logEvent(`Rebelion: ${rebel.name} se declara libre por la baja estabilidad de ${n.name}.`);
                    return { moneyMult: policy.money, unrest: true };
                }
            }
            return { moneyMult: policy.money, unrest: false };
        }

        function processColonization() {
            if (selectedScenarioYear < 1492) return;
            const colonizers = Object.values(nations).filter(n => n.id !== 9 && (n.trait === 'naval' || hasResource(n, 'oil')) && n.money > 20000);
            colonizers.forEach(n => {
                if (Math.random() > 0.08) return;
                const targets = provinces.filter(p => p.owner === 9 && !p.isCapital);
                const target = targets[Math.floor(Math.random() * targets.length)];
                if (!target) return;
                target.owner = n.id;
                target.isColony = true;
                n.money -= 10000;
                logEvent(`Colonizacion: ${n.name} funda una colonia en ${target.name}.`);
            });
        }

        function applyCampaignReward(nation, reward = {}) {
            if (!nation) return;
            nation.money += reward.money || 0;
            nation.bat += reward.bat || 0;
            nation.pop += reward.pop || 0;
            nation.stability = Math.min(100, (nation.stability || 70) + (reward.stability || 0));
            nation.reputation = (nation.reputation || 0) + (reward.reputation || 0);
            nation.generals = (nation.generals || 0) + (reward.generals || 0);
            nation.spies = (nation.spies || 0) + (reward.spies || 0);
            nation.air = (nation.air || 0) + (reward.air || 0);
            nation.paras = (nation.paras || 0) + (reward.paras || 0);
            nation.subs = (nation.subs || 0) + (reward.subs || 0);
            nation.battleships = (nation.battleships || 0) + (reward.battleships || 0);
            nation.juggernauts = (nation.juggernauts || 0) + (reward.juggernauts || 0);
            nation.nukes = (nation.nukes || 0) + (reward.nukes || 0);
            (reward.tech || []).forEach(tech => ensureTechSet(nation).add(tech));
            if (reward.fortCapitals) {
                provinces.forEach(prov => {
                    if (prov.owner === nation.id && prov.isCapital) prov.forts = (prov.forts || 0) + reward.fortCapitals;
                });
            }
        }

        function getAlternativeHistorySummary(player, nextLevel) {
            if (!player || !nextLevel) return "";
            const territories = countOwnedProvinces(player.id);
            const capitals = countOwnedCapitals(player.id);
            const allies = countAllies(player.id);
            const resources = countResourceTypes(player.id);
            const power = territories >= Math.ceil(getPlayableTerritoryCount() * 0.25) ? "una potencia temida" : capitals >= 2 ? "un reino con capitales clave" : "un imperio en crecimiento";
            return `Cronica alternativa: ${player.name} entra en ${formatScenarioYear(nextLevel.year)} como ${power}. Controla ${territories} territorios, ${capitals} capitales, ${resources} tipos de recursos y ${allies} aliados.`;
        }

        function processCampaignLevelProgress() {
            if (!isCampaignMode) return false;
            const level = getCurrentCampaignLevel();
            const player = nations[0];
            if (!level || !player || !level.check(0)) return false;

            applyCampaignReward(player, level.reward);
            logEvent(`Nivel completado: ${level.title}. Recompensa: ${level.rewardText}`);
            playSound('win');

            if (campaignLevelIndex >= CAMPAIGN_LEVELS.length - 1) {
                showNewspaper("CAMPAÑA COMPLETADA", `${player.name} ha completado todos los niveles de la historia alternativa. ${level.rewardText}`);
                updateHUD(); drawMap();
                return true;
            }

            campaignLevelIndex++;
            campaignTurnsInEra = 0;
            const nextLevel = getCurrentCampaignLevel();
            if (nextLevel && nextLevel.year !== selectedScenarioYear) {
                selectedScenarioYear = nextLevel.year;
                campaignEraIndex = Math.max(0, CAMPAIGN_ERAS.indexOf(selectedScenarioYear));
                turn = selectedScenarioYear;
                Object.values(nations).forEach(n => {
                    if (!n || n.id === 9) return;
                    getEraStartingTech().forEach(tech => ensureTechSet(n).add(tech));
                });
                initDynamicTexts();
                updateAudioForScreen('game-screen');
            }
            showNewspaper(`NIVEL ${campaignLevelIndex + 1}: ${nextLevel.title}`, `${getAlternativeHistorySummary(player, nextLevel)} Nueva fase de campaña (${formatScenarioYear(nextLevel.year)}). Objetivo: ${nextLevel.objective} Regla especial: ${nextLevel.rule}`);
            updateHUD(); drawMap();
            return true;
        }

        function endTurn() { 
            if (pendingDefenses.length > 0) { playSound('error'); alert("Â¡Tienes territorios bajo asedio! DefiÃ©ndelos antes de pasar de aÃ±o."); return; }
            playSound('turn');
            turn++; 
            campaignTurnsInEra++;
            refreshNationResources();
            Object.values(nations).forEach(n => { 
                if(n.id === 9) return; 
                let provsOwned = provinces.filter(p => p.owner === parseInt(Object.keys(nations).find(key => nations[key] === n))).length;
                const res = n.resources || {};
                const foodBonus = 1 + ((res.food || 0) * 0.08);
                const industryBonus = 1 + ((res.industry || 0) * 0.08);
                const goldBonus = (res.gold || 0) * 1200;
                const politics = applyInternalPolitics(n, provsOwned);
                n.pop += Math.floor(CONFIG.economy.turnPopGrowth * provsOwned * foodBonus);
                n.bat += Math.floor(CONFIG.economy.turnBatGrowth * provsOwned * industryBonus); 
                n.money += Math.floor((((n.trait === 'econ' ? CONFIG.economy.turnMoneyGrowth * 1.5 : CONFIG.economy.turnMoneyGrowth) * provsOwned) + goldBonus) * politics.moneyMult); 
                if (n.pacifistTurns > 0) {
                    n.pacifistTurns--;
                    n.money += 35000;
                    n.stability = Math.min(100, (n.stability || 70) + 3);
                    if (n.id === 0 || (isTwoPlayerMode && n.id === 4)) logEvent(`Pacifismo armado: ${n.name} recibe +35.000 dinero y estabilidad. Turnos sin atacar restantes: ${n.pacifistTurns}.`);
                }
            }); 
            processColonization();
            processAITurn(); 
            processConfederations();
            const advancedCampaignLevel = processCampaignLevelProgress();
            
            if (!advancedCampaignLevel) {
                if (turn % 4 === 0) {
                    runHistoricEvent();
                } else {
                    updateHUD(); drawMap(); logEvent("--- AÃ±o " + formatScenarioYear(turn) + " --- Impuestos recaudados.");
                }
            }
            checkGameOver(); checkVictoryConditions();
        }

        function processConfederations() {
            const owners = Object.keys(nations).map(id => parseInt(id, 10)).filter(id => id !== 9 && id !== 0 && (!isTwoPlayerMode || id !== 4));
            const bigThreat = owners.find(id => provinces.filter(p => p.owner === id).length >= 10);
            if (!bigThreat) return;
            const small = owners.filter(id => provinces.filter(p => p.owner === id).length > 0 && provinces.filter(p => p.owner === id).length <= 2 && !areAllied(id, bigThreat));
            if (small.length < 2 || Math.random() > 0.25) return;
            const a = small[Math.floor(Math.random() * small.length)];
            const b = small.find(id => id !== a);
            if (!b) return;
            setAlliance(a, b, true);
            nations[a].bat += 40; nations[b].bat += 40;
            logEvent(`🤝 Confederacion defensiva: ${nations[a].name} y ${nations[b].name} se unen por miedo a ${nations[bigThreat].name}.`);
        }

        function advanceCampaignEra() {
            campaignTurnsInEra = 0;
            if (campaignEraIndex < CAMPAIGN_ERAS.length - 1) {
                campaignEraIndex++;
                selectedScenarioYear = CAMPAIGN_ERAS[campaignEraIndex];
                turn = selectedScenarioYear;
                Object.values(nations).forEach(n => {
                    getEraStartingTech().forEach(t => ensureTechSet(n).add(t));
                    n.money += 40000;
                    n.bat += 80;
                });
                initDynamicTexts();
                showNewspaper("NUEVA EPOCA", `La campaÃ±a avanza a ${formatScenarioYear(selectedScenarioYear)}. Conservas territorios y alianzas, pero llegan nuevas tecnologias.`);
            } else {
                showNewspaper("HISTORIA ALTERNATIVA", "Has llegado a 2026. Ahora la campaÃ±a continua como una guerra global moderna.");
            }
            updateHUD(); drawMap();
        }

        function runHistoricEvent() {
            const era = getBattleEraConfig().name;
            const player = nations[0];
            let ev = Math.random();
            if (selectedScenarioYear < 0 && ev < 0.5) {
                Object.values(nations).forEach(n => { if(n.id !== 9) n.pop = Math.floor(n.pop * 0.9); });
                showNewspaper("MALA COSECHA DEL NILO", "Las reservas de comida bajan y todos los reinos pierden poblacion.", [
                    { label: "Racionar grano (+estabilidad, -dinero)", effect: () => { player.money = Math.max(0, player.money - 10000); player.stability = Math.min(100, (player.stability || 70) + 8); }, log: "Decision: racionamiento de grano. El pueblo acepta la crisis con mas calma." },
                    { label: "Reclutar campesinos (+batallones, -poblacion)", effect: () => { player.pop = Math.max(0, player.pop - 15000); player.bat += 90; }, log: "Decision: reclutamiento rural. El ejercito crece, pero la poblacion sufre." },
                ]);
            } else if (selectedScenarioYear < 1492 && ev < 0.5) {
                provinces.forEach(p => { if (p.forts > 0 && Math.random() < 0.25) p.forts++; });
                showNewspaper("FIEBRE DE MURALLAS", `La era de ${era} endurece las fronteras. Algunas ciudades refuerzan defensas.`, [
                    { label: "Fortificar capitales (-dinero, +fuertes)", effect: () => { player.money = Math.max(0, player.money - 15000); provinces.forEach(p => { if (p.owner === 0 && p.isCapital) p.forts = (p.forts || 0) + 1; }); }, log: "Decision: las capitales levantan nuevas murallas." },
                    { label: "Ahorrar piedra (+dinero, -estabilidad)", effect: () => { player.money += 12000; player.stability = Math.max(0, (player.stability || 70) - 4); }, log: "Decision: se ahorran materiales. Los nobles murmuran." },
                ]);
            } else if (selectedScenarioYear === 1492 && ev < 0.6) {
                Object.values(nations).forEach(n => { if(n.trait === 'naval') n.money += 25000; });
                showNewspaper("RUTAS OCEANICAS", "Las potencias navales ganan dinero por exploracion y comercio.", [
                    { label: "Financiar expediciones (-dinero, +barcos)", effect: () => { player.money = Math.max(0, player.money - 12000); player.battleships += 1; }, log: "Decision: expediciones financiadas. La flota gana experiencia." },
                    { label: "Cobrar aranceles (+dinero, -reputacion)", effect: () => { player.money += 22000; player.reputation = (player.reputation || 0) - 1; }, log: "Decision: aranceles duros. El tesoro crece y los vecinos se irritan." },
                ]);
            } else if (selectedScenarioYear >= 1900 && selectedScenarioYear < 2026 && ev < 0.5) {
                Object.values(nations).forEach(n => n.money = Math.floor(n.money * 0.7));
                showNewspaper("CRISIS ECONOMICA", "La economia mundial se contrae. Todos pierden parte de sus reservas.", [
                    { label: "Plan de emergencia (-dinero, +estabilidad)", effect: () => { player.money = Math.max(0, player.money - 30000); player.stability = Math.min(100, (player.stability || 70) + 12); }, log: "Decision: plan de emergencia. La estabilidad aguanta el golpe." },
                    { label: "Austeridad militar (+dinero, -estabilidad)", effect: () => { player.money += 18000; player.stability = Math.max(0, (player.stability || 70) - 9); }, log: "Decision: austeridad militar. El tesoro respira, la calle no." },
                ]);
            } else if (selectedScenarioYear >= 2026 && ev < 0.5) {
                Object.values(nations).forEach(n => { if(n.id !== 9 && !hasResource(n, 'science')) n.money = Math.floor(n.money * 0.85); });
                showNewspaper("CIBERATAQUES GLOBALES", "Los paises sin centros cientificos pierden dinero por ataques digitales.", [
                    { label: "Defensa digital (-dinero, +investigacion)", effect: () => { player.money = Math.max(0, player.money - 25000); player.research = (player.research || 0) + 45; }, log: "Decision: defensa digital. Los laboratorios aceleran la investigacion." },
                    { label: "Contraataque encubierto (+espias, -estabilidad)", effect: () => { player.spies += 1; player.stability = Math.max(0, (player.stability || 70) - 5); }, log: "Decision: contraataque encubierto. Ganas espias, pero el pais se pone nervioso." },
                ]);
            } else {
                Object.values(nations).forEach(n => { if(n.id !== 9) n.money += 30000; });
                showNewspaper("AUGE COMERCIAL", "El comercio mundial crece. Todos los imperios reciben +30.000.", [
                    { label: "Invertir en industria (+investigacion, +batallones)", effect: () => { player.research = (player.research || 0) + 25; player.bat += 60; }, log: "Decision: inversion industrial. La economia se vuelve mas militarizable." },
                    { label: "Guardar reservas (+dinero)", effect: () => { player.money += 20000; }, log: "Decision: reservas guardadas. El tesoro queda mas fuerte." },
                ]);
            }
        }

        function getProvinceCenterForAI(prov) {
            if (prov.custom) return getProvinceCentroid(prov);
            if (d3Path && prov.feature) {
                const c = d3Path.centroid(prov.feature);
                if (Number.isFinite(c[0]) && Number.isFinite(c[1])) return { x: c[0], y: c[1] };
            }
            return { x: prov.id % 30, y: Math.floor(prov.id / 30) };
        }

        function bordersEnemy(attackerId, prov) {
            const own = provinces.filter(p => p.owner === attackerId);
            const target = getProvinceCenterForAI(prov);
            return own.some(p => {
                const c = getProvinceCenterForAI(p);
                return Math.abs(c.x - target.x) + Math.abs(c.y - target.y) < 190;
            });
        }

        function scoreAITarget(attackerId, prov, personality) {
            let score = 10;
            if (bordersEnemy(attackerId, prov)) score += 35;
            if (prov.isCapital) score += personality === 'defensive' ? 18 : 26;
            if (prov.resource) score += personality === 'commercial' ? 28 : 14;
            if (prov.isColony && selectedScenarioYear >= 1492) score += 10;
            if (prov.owner === 9) score += 6;
            if (personality === 'naval' && prov.terrain === 'naval') score += 24;
            if (personality === 'treacherous' && countOwnedProvinces(prov.owner) <= 3) score += 18;
            return score + Math.random() * 20;
        }

        function processAITurn() {
            let aiIds = Object.keys(nations).filter(id => parseInt(id) !== 0 && parseInt(id) !== 9 && (!isTwoPlayerMode || parseInt(id) !== 4)); 
            aiIds.forEach(attId => {
                let attacker = nations[attId];
                const personality = attacker.personality || 'balanced';
                const aggression = personality === 'aggressive' ? 0.82 : personality === 'expansionist' ? 0.7 : personality === 'defensive' ? 0.32 : personality === 'commercial' ? 0.42 : 0.55;
                const diplomacyChance = personality === 'commercial' ? 0.18 : personality === 'treacherous' ? 0.04 : personality === 'defensive' ? 0.12 : 0.08;
                if(attacker.pactTurns && attacker.pactTurns > 0) attacker.pactTurns--;
                if (attacker.money >= CONFIG.economy.allianceCost && Math.random() < diplomacyChance) {
                    const allyCandidates = Object.keys(nations)
                        .map(id => parseInt(id, 10))
                        .filter(id => id !== parseInt(attId) && id !== 9 && !areAllied(attId, id));
                    if (allyCandidates.length > 0) {
                        const allyId = allyCandidates[Math.floor(Math.random() * allyCandidates.length)];
                        attacker.money -= CONFIG.economy.allianceCost;
                        setAlliance(attId, allyId, true);
                        logEvent(`ðŸ›¡ï¸ ${attacker.name} firmÃƒÂ³ una alianza con ${nations[allyId].name}.`);
                    }
                }
                
                if (isWeaponAvailable('nuke') && hasTechForItem('nuke', attacker) && attacker.money >= CONFIG.economy.nukeCost && Math.random() < 0.05) { attacker.money -= CONFIG.economy.nukeCost; attacker.nukes++; }
                if (isWeaponAvailable('jug') && hasTechForItem('jug', attacker) && attacker.money >= CONFIG.economy.juggernautCost && Math.random() < 0.1) { attacker.money -= CONFIG.economy.juggernautCost; attacker.juggernauts++; }
                let shipCost = attacker.trait === 'naval' ? Math.floor(CONFIG.economy.battleshipCost * 0.7) : CONFIG.economy.battleshipCost;
                if (isWeaponAvailable('ship') && hasTechForItem('ship', attacker) && attacker.money >= shipCost && Math.random() < 0.15) { attacker.money -= shipCost; attacker.battleships++; }
                if (isWeaponAvailable('air') && hasTechForItem('air', attacker) && attacker.money >= CONFIG.economy.airCost && Math.random() < 0.3) { attacker.money -= CONFIG.economy.airCost; attacker.air++; }
                if (isWeaponAvailable('sub') && hasTechForItem('sub', attacker) && attacker.money >= CONFIG.economy.subCost && Math.random() < 0.2) { attacker.money -= CONFIG.economy.subCost; attacker.subs++; }
                if (isWeaponAvailable('para') && hasTechForItem('para', attacker) && attacker.money >= CONFIG.economy.paraCost && Math.random() < 0.4) { attacker.money -= CONFIG.economy.paraCost; attacker.paras++; }
                if (isWeaponAvailable('gen') && hasTechForItem('gen', attacker) && attacker.money >= CONFIG.economy.generalCost && Math.random() < 0.1) { attacker.money -= CONFIG.economy.generalCost; attacker.generals++; }
                if (isWeaponAvailable('spy') && hasTechForItem('spy', attacker) && attacker.money >= CONFIG.economy.spyCost && Math.random() < 0.1) { attacker.money -= CONFIG.economy.spyCost; attacker.spies++; }
                if (getNextResearchTech(attacker) && attacker.money >= 12000 && Math.random() < (personality === 'commercial' ? 0.35 : 0.15)) {
                    attacker.money -= 12000; attacker.research = (attacker.research || 0) + 45;
                    if (attacker.research >= 100) { const next = getNextResearchTech(attacker); if (next) ensureTechSet(attacker).add(next); attacker.research = 0; }
                }
                if (attacker.money >= CONFIG.economy.recruitCostMoney && attacker.pop >= CONFIG.economy.recruitCostPop && Math.random() < 0.7) { attacker.money -= CONFIG.economy.recruitCostMoney; attacker.pop -= CONFIG.economy.recruitCostPop; attacker.bat += CONFIG.economy.recruitYield; }

                if (attacker.nukes > 0 && Math.random() < 0.05) {
                    let potentialNukeTargets = provinces.filter(p => p.owner !== parseInt(attId) && !areAllied(attId, p.owner) && p.owner !== 0 && (!isTwoPlayerMode || p.owner !== 4) && p.owner !== 9); 
                    if (Math.random() < 0.2) potentialNukeTargets = provinces.filter(p => p.owner !== parseInt(attId) && !areAllied(attId, p.owner) && p.owner !== 9); 
                    if (potentialNukeTargets.length > 0) {
                        let targetProv = potentialNukeTargets[Math.floor(Math.random() * potentialNukeTargets.length)];
                        attacker.nukes--; const oldOwner = targetProv.owner; targetProv.owner = parseInt(attId); targetProv.isColony = true; targetProv.forts = 0; handleProvinceCaptured(targetProv, oldOwner, parseInt(attId)); attacker.money += 500000;
                        logEvent(`â˜¢ï¸ Â¡ALERTA GLOBAL! ${attacker.name} lanzÃ³ un misil nuclear sobre ${targetProv.name}.`);
                    }
                }

                if (attacker.spies > 0 && Math.random() < 0.1) {
                    let potSpy = provinces.filter(p => p.owner !== parseInt(attId) && !areAllied(attId, p.owner) && p.owner !== 9);
                    if(potSpy.length > 0) {
                        attacker.spies--; let tp = potSpy[Math.floor(Math.random()*potSpy.length)];
                        if(Math.random() < 0.5) { tp.forts = 0; logEvent(`ðŸ•µï¸ Un espÃ­a de ${attacker.name} saboteÃ³ los fuertes de ${tp.name}.`); }
                        else { let st = Math.floor(nations[tp.owner].money*0.3); nations[tp.owner].money -= st; attacker.money += st; logEvent(`ðŸ•µï¸ ${attacker.name} robÃ³ ${st}ðŸ’° a ${nations[tp.owner].name}.`); }
                    }
                }
                
                if (attacker.bat > 80 && (attacker.bribed || Math.random() < aggression)) { 
                    let potentialTargets = provinces.filter(p => p.owner !== parseInt(attId) && !areAllied(attId, p.owner) && !pendingDefenses.some(d => d.targetProvId === p.id));
                    if (attacker.pactTurns > 0 || attacker.bribed) { potentialTargets = potentialTargets.filter(p => p.owner !== 0 && (!isTwoPlayerMode || p.owner !== 4)); }
                    if (personality === 'naval') potentialTargets.sort((a, b) => (b.terrain === 'naval') - (a.terrain === 'naval'));
                    if (personality === 'defensive') potentialTargets.sort((a, b) => (b.isCapital ? 1 : 0) - (a.isCapital ? 1 : 0));
                    if (potentialTargets.length === 0) { attacker.bribed = false; return; }
                    
                    let targetPool = potentialTargets;
                    if (personality === 'naval' || personality === 'defensive') targetPool = potentialTargets.slice(0, Math.max(1, Math.ceil(potentialTargets.length * 0.35)));
                    targetPool.sort((a, b) => scoreAITarget(parseInt(attId), b, personality) - scoreAITarget(parseInt(attId), a, personality));
                    let targetProv = targetPool[0];
                    let defId = targetProv.owner, defender = nations[defId];
                    let attCommitted = Math.floor(attacker.bat * 0.4); attacker.bribed = false; 

                    if (defId === 0 || (isTwoPlayerMode && defId === 4)) {
                        pendingDefenses.push({ targetProvId: targetProv.id, attackerId: parseInt(attId), attCommitted: attCommitted });
                        logEvent(`ðŸš¨ Â¡ALERTA! ${attacker.name} asedia ${targetProv.name} de ${defender.name}.`);
                    } else if (defId === 9) {
                        let defCommitted = getProvinceDefenseCount(targetProv, defender);
                        let attRoll = attCommitted * (0.45 + Math.random()), defRoll = defCommitted * (0.65 + Math.random());
                        if (attRoll > defRoll) {
                            const oldOwner = targetProv.owner; targetProv.owner = parseInt(attId); targetProv.isColony = true; targetProv.forts = 0; handleProvinceCaptured(targetProv, oldOwner, parseInt(attId));
                            attacker.bat -= Math.floor(defCommitted * 0.35);
                            defender.bat = Math.max(0, defender.bat - defCommitted);
                            attacker.money += 50000;
                            logEvent(`IA: ${attacker.name} derrota a mercenarios organizados en ${targetProv.name}.`);
                        } else {
                            attacker.bat -= Math.floor(attCommitted * 0.45);
                            defender.bat = Math.max(0, defender.bat - Math.floor(attCommitted * 0.2));
                            logEvent(`Mercenarios: la guarnicion de ${targetProv.name} rechaza a ${attacker.name}.`);
                        }
                    } else {
                        let defProvsCount = Math.max(1, provinces.filter(p => p.owner === defId).length);
                        let defCommitted = Math.floor(defender.bat / defProvsCount) + (targetProv.forts * 50);
                        let attRoll = attCommitted * (0.5 + Math.random()), defRoll = defCommitted * (0.5 + Math.random());
                        
                        if (attRoll > defRoll) {
                            const oldOwner = targetProv.owner; targetProv.owner = parseInt(attId); targetProv.isColony = true; targetProv.forts = 0; handleProvinceCaptured(targetProv, oldOwner, parseInt(attId)); 
                            attacker.bat -= Math.floor(defCommitted * 0.4); defender.bat -= defCommitted; attacker.money += 500000;
                            logEvent(`ðŸŒ IA: ${attacker.name} conquistÃ³ ${targetProv.name} (de ${defender.name}).`);
                        } else { attacker.bat -= attCommitted; defender.bat -= Math.floor(attCommitted * 0.4); }
                    }
                    if (attacker.bat < 0) attacker.bat = 0; if (defender.bat < 0) defender.bat = 0;
                }
            });
        }

        function checkGameOver() {
            let p1Provs = provinces.filter(p => p.owner === 0);
            let p1Alive = p1Provs.length > 0 || pendingDefenses.some(d => provinces.find(p => p.id === d.targetProvId).owner === 0);
            let p2Alive = false;
            if (isTwoPlayerMode) {
                let p2Provs = provinces.filter(p => p.owner === 4);
                p2Alive = p2Provs.length > 0 || pendingDefenses.some(d => provinces.find(p => p.id === d.targetProvId).owner === 4);
            }
            if (!p1Alive && (!isTwoPlayerMode || !p2Alive)) { setTimeout(() => { showScreen('game-over-screen'); playSound('nuke'); }, 1000); }
        }

        function getVictoryProgressText(nationId) {
            if (!provinces.length) return "sin datos";
            const owned = provinces.filter(p => p.owner === nationId).length;
            const capitals = provinces.filter(p => p.owner === nationId && p.isCapital).length;
            const totalPlayable = Math.max(1, provinces.filter(p => p.owner !== 9 || p.originalOwner !== 9).length);
            return `${owned}/${Math.ceil(totalPlayable * 0.45)} terr. | ${capitals} capitales`;
        }

        function checkVictoryConditions() {
            if (!provinces.length) return;
            const contenders = [0];
            if (isTwoPlayerMode) contenders.push(4);
            const totalPlayable = Math.max(1, provinces.filter(p => p.owner !== 9 || p.originalOwner !== 9).length);
            const mission = getEraMission();
            contenders.forEach(id => {
                const nat = nations[id];
                if (!nat) return;
                const owned = provinces.filter(p => p.owner === id).length;
                const capitals = provinces.filter(p => p.owner === id && p.isCapital).length;
                if (!nat.missionDone && mission.check(id)) {
                    nat.missionDone = true;
                    nat.money += 75000;
                    nat.stability = Math.min(100, (nat.stability || 70) + 12);
                    logEvent(`Mision cumplida: ${nat.name} completa "${mission.title}" y recibe prestigio.`);
                }
                const economyWin = nat.money >= 2000000 && owned >= 8;
                const dominationWin = owned >= Math.ceil(totalPlayable * 0.45);
                const capitalWin = capitals >= 4;
                const allianceWin = Object.keys(nations).filter(other => parseInt(other, 10) !== id && parseInt(other, 10) !== 9 && areAllied(id, parseInt(other, 10))).length >= 4;
                if ((dominationWin || capitalWin || economyWin || allianceWin) && !announcedVictories.has(id)) {
                    announcedVictories.add(id);
                    const victoryType = dominationWin ? 'dominacion' : capitalWin ? 'capitales' : economyWin ? 'economia' : 'alianzas';
                    logEvent(`🏆 ${nat.name} cumple un objetivo de victoria: ${victoryType}.`);
                    if (nat.easterEggs && nat.easterEggs.nuclear) {
                        showNewspaper("PAZ RADIACTIVA", `${nat.name} gana por ${victoryType}. La historia lo recordara como el imperio que prometio paz... con el boton rojo encima de la mesa.`);
                    }
                }
            });
        }

        // ==========================================
        // MOTOR DE BATALLA OPTIMIZADO (RÃ¡pido)
        // ==========================================
        function getBattleSpecialAction(type) {
            return BATTLE_SPECIAL_ACTIONS.find(action => action.type === type);
        }

        function toggleAllianceFromDiplomacy() {
            let p = provinces.find(x => x.id === selectedDipProvId); let owner = nations[p.owner], buyer = nations[currentDiplomacyBuyer];
            if (!p || !owner || !buyer || p.owner === 9 || p.owner === currentDiplomacyBuyer) return;
            if (areAllied(currentDiplomacyBuyer, p.owner)) {
                setAlliance(currentDiplomacyBuyer, p.owner, false);
                buyer.reputation = (buyer.reputation || 0) - 2;
                buyer.money = Math.floor(buyer.money * 0.9);
                logEvent(`ðŸ›¡ï¸ ${buyer.name} rompiÃƒÂ³ su alianza con ${owner.name}.`);
                playSound('lose');
                updateHUD(); closeDiplomacy(); drawMap();
                return;
            }
            if (buyer.money >= CONFIG.economy.allianceCost) {
                buyer.money -= CONFIG.economy.allianceCost;
                setAlliance(currentDiplomacyBuyer, p.owner, true);
                owner.pactTurns = Math.max(owner.pactTurns || 0, 5);
                logEvent(`ðŸ›¡ï¸ ${buyer.name} firmÃƒÂ³ una alianza con ${owner.name}.`);
                playSound('alliance');
                updateHUD(); closeDiplomacy(); drawMap();
            } else { playSound('error'); alert(`Fondos insuficientes.`); }
        }

        function getBattleSideNation(side) {
            if (!currentBattleData) return null;
            return side === 'left' ? currentBattleData.attNat : currentBattleData.defNat;
        }

        function isHumanBattleNation(id) {
            return id === 0 || (isTwoPlayerMode && id === 4);
        }

        function getBattlePlayerLabel(id) {
            if (id === 0) return "JUG 1";
            if (isTwoPlayerMode && id === 4) return "JUG 2";
            return "ENEMIGO (IA)";
        }

        function getBattleSpecialLabel(action) {
            const labels = getScenarioWeapons();
            return labels[action.labelKey] || action.fallback;
        }

        function getSpecialUnavailableReason(action, side) {
            if (!currentBattleData) return "No hay batalla activa.";
            if (!isWeaponAvailable(action.labelKey)) return "No existe en esta epoca.";

            const nat = getBattleSideNation(side);
            const terrain = currentBattleData.prov.terrain;
            if (!nat || !nat[action.stock]) return "No tienes unidades de este tipo.";
            if ((action.type === 'shp' || action.type === 'sub') && terrain !== 'naval') return "Solo se puede usar en combate naval.";
            if (action.type === 'jug' && terrain === 'naval') return "No se puede desplegar aqui.";
            if (action.type === 'zep' && battleState.zeps.some(z => z.side === side)) return "Ya hay una unidad aerea activa.";
            if (action.type === 'gen' && battleState.units.some(u => u.type === 'general' && u.side === side && !u.isDead)) return "Ya hay un general en combate.";
            return "";
        }

        function renderBattleSpecialToolbar() {
            const toolbar = document.getElementById('battle-special-toolbar');
            if (!toolbar) return;
            toolbar.innerHTML = "";
            if (!currentBattleData) return;

            const sides = [];
            if (isHumanBattleNation(currentBattleData.attNat.id)) {
                sides.push({ side: 'left', title: `${getBattlePlayerLabel(currentBattleData.attNat.id).replace('JUG ', 'J')} reservas`, className: 'left' });
            }
            if (isHumanBattleNation(currentBattleData.defNat.id) && currentBattleData.defNat.id !== currentBattleData.attNat.id) {
                sides.push({ side: 'right', title: `${getBattlePlayerLabel(currentBattleData.defNat.id).replace('JUG ', 'J')} reservas`, className: 'right' });
            }

            sides.forEach(group => {
                const nat = getBattleSideNation(group.side);
                const wrapper = document.createElement('div');
                wrapper.className = `battle-special-group ${group.className}`;

                const title = document.createElement('div');
                title.className = 'battle-special-title';
                title.innerText = group.title;
                wrapper.appendChild(title);

                const actions = document.createElement('div');
                actions.className = 'battle-special-actions';

                BATTLE_SPECIAL_ACTIONS.filter(action => isWeaponAvailable(action.labelKey)).forEach(action => {
                    const reason = getSpecialUnavailableReason(action, group.side);
                    const count = nat ? (nat[action.stock] || 0) : 0;
                    const button = document.createElement('button');
                    const key = group.side === 'left' ? action.leftKey : action.rightKey;
                    button.className = 'battle-special-action';
                    button.disabled = Boolean(reason);
                    button.title = `${getBattleSpecialLabel(action)} (${key})${reason ? " - " + reason : ""}`;
                    button.onclick = () => requestSpecial(action.type, group.side);
                    button.innerHTML = cleanText(`<span>${action.icon}</span><span class="battle-special-count">${count}</span><span class="battle-special-key">${key}</span>`);
                    actions.appendChild(button);
                });

                wrapper.appendChild(actions);
                toolbar.appendChild(wrapper);
            });
        }

        function requestSpecial(type, side) {
            if(isPaused) return;
            const action = getBattleSpecialAction(type);
            if (!action || getSpecialUnavailableReason(action, side)) {
                renderBattleSpecialToolbar();
                playSound('error');
                return;
            }
            let terrain = currentBattleData.prov.terrain; let nat = side === 'left' ? currentBattleData.attNat : currentBattleData.defNat;
            let deployed = false;
            
            if (type === 'zep') { if (nat.air > 0 && battleState.zeps.filter(z=>z.side===side).length === 0) { nat.air--; updateBattleHUD(); spawnZeppelin(side); deployed = true; } } 
            else if (type === 'jug') { if (nat.juggernauts > 0 && terrain !== 'naval') { nat.juggernauts--; updateBattleHUD(); spawnUnit(side, nat.color, document.getElementById('battle-arena'), false, 'juggernaut'); deployed = true; } } 
            else if (type === 'shp') { if (nat.battleships > 0 && terrain === 'naval') { nat.battleships--; updateBattleHUD(); spawnUnit(side, nat.color, document.getElementById('battle-arena'), false, 'battleship'); deployed = true; } }
            else if (type === 'par') { if (nat.paras > 0) { nat.paras--; updateBattleHUD(); spawnUnit(side, nat.color, document.getElementById('battle-arena'), false, 'para'); deployed = true; } }
            else if (type === 'sub') { if (nat.subs > 0 && terrain === 'naval') { nat.subs--; updateBattleHUD(); spawnUnit(side, nat.color, document.getElementById('battle-arena'), false, 'sub'); deployed = true; } }
            else if (type === 'gen') { if (nat.generals > 0 && battleState.units.filter(u=>u.type==='general'&&u.side===side).length === 0) { nat.generals--; updateBattleHUD(); spawnUnit(side, nat.color, document.getElementById('battle-arena'), false, 'general'); deployed = true; } }
            playSound(deployed ? 'deploy' : 'error');
        }

        function getVisibleBattleColor(color, side = 'right') {
            const fallback = side === 'left' ? '#2ecc71' : '#f1c40f';
            if (!color || typeof color !== 'string') return fallback;

            let hex = color.trim();
            if (hex.length === 4 && hex[0] === '#') {
                hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            }
            if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return fallback;

            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            if (luminance >= 0.32) return hex;

            const mix = side === 'left' ? { r: 46, g: 204, b: 113 } : { r: 241, g: 196, b: 15 };
            const lift = 0.65;
            const rr = Math.round(r * (1 - lift) + mix.r * lift);
            const gg = Math.round(g * (1 - lift) + mix.g * lift);
            const bb = Math.round(b * (1 - lift) + mix.b * lift);
            return `#${[rr, gg, bb].map(v => v.toString(16).padStart(2, '0')).join('')}`;
        }

        function getBattleArenaColor(terrain) {
            if (terrain === 'naval') return '#0a3d62';
            if (terrain === 'winter') return '#c8d6e5';
            if (terrain === 'desert') return '#8a6f32';
            if (terrain === 'mountain') return '#3d4b4d';
            return '#050505';
        }

        function spawnZeppelin(side) {
            let arena = document.getElementById('battle-arena'), el = document.createElement('div');
            el.className = 'zeppelin' + (side==='right'?' zeppelin-enemy':''); el.innerHTML = '🛩️'; arena.appendChild(el);
            battleState.zeps.push({ el: el, side: side, x: side === 'left' ? -60 : arena.offsetWidth + 60, y: 20, vx: side === 'left' ? 4 : -4 });
        }

        function createAirExplosion(x, side, arena) {
            playSound('explosion'); let exp = document.createElement('div');
            exp.className = 'explosion-effect'; exp.style.left = x + 'px'; exp.style.top = (arena.offsetHeight - 40) + 'px';
            arena.appendChild(exp); setTimeout(() => exp.remove(), 250);

            for (let i = 0; i < battleState.units.length; i++) {
                let u = battleState.units[i];
                if (!u.isDead && Math.abs(u.x - x) < 60) {
                    if ((side === 'left' && u.side === 'right') || (side === 'right' && u.side === 'left')) {
                        if (u.type === 'general') finishBattle(side === 'left' ? 'win' : 'lose', `¡El General ${u.side} cayó bajo las bombas!`);
                        if (u.side === 'right') currentBattleData.deadD++; else currentBattleData.deadA++;
                        u.isDead = true; u.el.remove();
                        if (controlledPlayerUnit === u) controlledPlayerUnit = null; if (controlledEnemyUnit === u) controlledEnemyUnit = null;
                    }
                }
            }
            updateBattleHUD();
        }

        function updateBattleInstructions() {
            let d = currentBattleData, isHumanLeft = isHumanBattleNation(d.attNat.id), isHumanRight = isHumanBattleNation(d.defNat.id) && d.defNat.id !== d.attNat.id;
            let leftName = isHumanLeft ? getBattlePlayerLabel(d.attNat.id) : d.attNat.name;
            let rightName = isHumanRight ? getBattlePlayerLabel(d.defNat.id) : "ENEMIGO (IA)";

            document.getElementById('p1-battle-keys').innerHTML = cleanText(`<b>${leftName} (Izq):</b> [WASD][Z/X] | <span style='color:#f1c40f;'>[G] Gen</span> | <span style='color:#3498db;'>[C] Zep</span> | <span style='color:#e67e22;'>[T] Jug</span> | <span style='color:#2980b9;'>[B] Barco</span> | <span style='color:#1abc9c;'>[P] Para</span> | <span style='color:#16a085;'>[M] Sub</span>`);
            
            let p2Keys = `<b>${rightName} (Der):</b> [FLECHAS][1/2]`;
            if (isHumanRight) p2Keys += ` | <span style='color:#f1c40f;'>[8] Gen</span> | <span style='color:#3498db;'>[3] Zep</span> | <span style='color:#e67e22;'>[4] Jug</span> | <span style='color:#2980b9;'>[5] Barco</span> | <span style='color:#1abc9c;'>[6] Para</span> | <span style='color:#16a085;'>[7] Sub</span>`;
            document.getElementById('p2-battle-keys').innerHTML = cleanText(p2Keys);

            document.getElementById('btn-deploy-p1').classList.toggle('hidden', !isHumanLeft); document.getElementById('btn-deploy-p1').innerText = `+ 🪖 ${leftName}`;
            document.getElementById('btn-deploy-p2').classList.toggle('hidden', !isHumanRight); document.getElementById('btn-deploy-p2').innerText = `+ 🪖 ${rightName}`;
        }

        function initiateDefenseBattle(id) {
            let defData = pendingDefenses.find(d => d.targetProvId === id); let p = provinces.find(x => x.id === id);
            let att = nations[defData.attackerId], def = nations[p.owner]; 
            let defCommitted = getProvinceDefenseCount(p, def);

            document.getElementById('battle-title').innerText = cleanText(`DEFENSA DE ${p.name.toUpperCase()}`);
            document.getElementById('battle-arena').style.backgroundColor = getBattleArenaColor(p.terrain); 
            currentBattleData = { prov: p, type: 'defense', attNat: def, defNat: att, totalA: defCommitted, totalD: defData.attCommitted, deployedA: 0, deployedD: 0, deadA: 0, deadD: 0, defenseIndex: pendingDefenses.indexOf(defData) };
            startBattle();
        }

        function initiateAttack(id, attId) {
            let p = provinces.find(x => x.id === id); let def = nations[p.owner], att = nations[attId];
            if (att && att.pacifistTurns > 0) {
                playSound('error');
                return logEvent(`Modo pacifista: ${att.name} no puede atacar durante ${att.pacifistTurns} turnos.`);
            }
            if (areAllied(attId, p.owner)) return logEvent(`ðŸ›¡ï¸ ${att.name} no puede atacar a su aliado ${def.name}.`);
            triggerDefensiveAlliances(attId, p.owner);
            let dCount = getProvinceDefenseCount(p, def); let aCount = Math.floor(att.bat * 0.5);
            if (att.capitalLost) aCount = Math.floor(aCount * 0.82);
            if (def.capitalLost) dCount = Math.floor(dCount * 0.82);
            if ((att.stability || 70) < 35) aCount = Math.floor(aCount * 0.85);
            if ((def.stability || 70) < 35) dCount = Math.floor(dCount * 0.85);
            if(aCount < 5) return logEvent(`${att.name}: Pocas tropas.`);
            document.getElementById('battle-title').innerText = "FASE 1: INVASIÓN MILITAR";
            document.getElementById('battle-arena').style.backgroundColor = getBattleArenaColor(p.terrain); 
            currentBattleData = { prov: p, type: 'army', attNat: att, defNat: def, totalA: aCount, totalD: dCount, deployedA: 0, deployedD: 0, deadA: 0, deadD: 0 };
            startBattle();
        }

        function initiateCivilianBattle(id, attId) {
            let p = provinces.find(x => x.id === id); let att = nations[attId]; let aCount = Math.floor(att.bat * 0.5);
            if(aCount < 5) return logEvent("Pocas tropas para reprimir.");
            document.getElementById('battle-title').innerText = "FASE 2: ASALTO URBANO"; document.getElementById('battle-arena').style.backgroundColor = "#2d3436"; 
            currentBattleData = { prov: p, type: 'civilian', attNat: att, defNat: { name: "Milicia Rebelde", color: "#aaaaaa", air:0, juggernauts:0, battleships:0, paras:0, subs:0, generals:0 }, totalA: aCount, totalD: 100 + (p.forts * 20), deployedA: 0, deployedD: 0, deadA: 0, deadD: 0 };
            startBattle();
        }

        function startBattle() {
            playSound('battleStart');
            showScreen('battle-screen'); let arena = document.getElementById('battle-arena');
            Array.from(arena.children).forEach(child => { if(!child.classList.contains('goal-line-left') && !child.classList.contains('goal-line-right') && child.id !== 'pause-overlay') arena.removeChild(child); });
            
            battleState = { units: [], bullets: [], zeps: [], bombs: [], unitIdCounter: 0 }; controlledPlayerUnit = null; controlledEnemyUnit = null; pendingRetreatProv = null; 
            isPaused = false; document.getElementById('pause-overlay').classList.add('hidden'); document.getElementById('btn-pause').innerText = "⏸ PAUSAR"; document.getElementById('btn-pause').style.backgroundColor = "#34495e";
            reinforceNeutralBattleForce();
            
            let forts = currentBattleData.prov.forts;
            if (currentBattleData.type !== 'civilian' && forts > 0) {
                let defSide = currentBattleData.type === 'defense' ? 'left' : 'right';
                for(let i=0; i<forts; i++) { spawnUnit(defSide, '#555', arena, false, 'bunker'); }
            }

            updateBattleInstructions(); updateBattleHUD(); 
            let t = Date.now(); lastShotZ = t; lastShotX = t; lastShot1 = t; lastShot2 = t;
            if(battleLoop) clearInterval(battleLoop); battleLoop = setInterval(updatePhysics, 30);
        }

        function updateBattleHUD() {
            let d = currentBattleData, p1Str = `${cleanText(d.attNat.name)} (Izq): 🪖${d.totalA - d.deadA}`;
            let p2Str = `${cleanText(d.defNat.name)} (Der): 🪖${d.totalD - d.deadD}`;
            document.getElementById('battle-status').innerHTML = cleanText(`<span style="color:#2ecc71">${p1Str}</span> VS <span style="color:#e74c3c">${p2Str}</span>`);
            renderBattleSpecialToolbar();
        }

        function manualDeploy(side) {
            let nat = side === 'left' ? currentBattleData.attNat : currentBattleData.defNat;
            if (nat.bat > 0) {
                nat.bat--; if (side === 'left') { currentBattleData.totalA++; currentBattleData.deployedA++; } else { currentBattleData.totalD++; currentBattleData.deployedD++; }
                playSound('deploy');
                spawnUnit(side, nat.color, document.getElementById('battle-arena'), false); updateBattleHUD();
            } else { playSound('error'); alert("No quedan batallones."); }
        }

        function chooseDefaultUnitType(side, isCivilian) {
            if (isCivilian) return 'civilian';
            if (currentBattleData.prov.terrain === 'naval') return 'ship';
            if (selectedScenarioYear >= 2026 && Math.random() < 0.08) return 'drone';
            if (selectedScenarioYear >= 1900) return Math.random() < 0.2 ? 'tank' : 'infantry';
            if (selectedScenarioYear >= 1492) return Math.random() < 0.16 ? 'archer' : 'infantry';
            if (selectedScenarioYear >= 500) return Math.random() < 0.22 ? 'cavalry' : (Math.random() < 0.2 ? 'archer' : 'infantry');
            return Math.random() < 0.28 ? 'archer' : (Math.random() < 0.18 ? 'cavalry' : 'infantry');
        }

        function spawnUnit(side, color, arena, isCivilian, forceType = null) {
            color = getVisibleBattleColor(color, side);
            let type = forceType;
            if (!type) {
                let isClippyBoss = (currentBattleData && currentBattleData.defNat.name && currentBattleData.defNat.name.includes("Clipo"));
                if (isClippyBoss && side === 'right') type = 'clippy'; else if (isCivilian) type = 'civilian';
                else type = chooseDefaultUnitType(side, isCivilian);
            }

            let uEl = document.createElement('div'), w = 4, h = 6, hp = 1, isSuper = false, isStealth = false;

            if (type === 'clippy') { uEl.className = 'pixel-unit bat-clippy'; uEl.innerHTML = '📎'; w = 24; h = 24; hp = 10; isSuper=true; } 
            else if (type === 'civilian') { uEl.className = 'pixel-unit bat-civilian'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 4; h = 5; } 
            else if (type === 'ship') { uEl.className = 'pixel-unit bat-ship'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 20; h = 22; } 
            else if (type === 'tank') { uEl.className = 'pixel-unit bat-tank'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 10; h = 12; hp = 2; } 
            else if (type === 'juggernaut') { uEl.className = 'pixel-unit bat-juggernaut'; uEl.innerHTML = '🦾'; uEl.style.backgroundColor = color; uEl.style.color = '#fff'; w = 35; h = 30; hp = 50; isSuper = true; } 
            else if (type === 'battleship') { uEl.className = 'pixel-unit bat-dreadnought'; uEl.innerHTML = '🚢'; uEl.style.backgroundColor = color; uEl.style.color = '#fff'; w = 45; h = 25; hp = 60; isSuper = true; } 
            else if (type === 'para') { uEl.className = 'pixel-unit bat-para'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 5; h = 7; } 
            else if (type === 'sub') { uEl.className = 'pixel-unit bat-sub'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 25; h = 10; hp = 3; isSuper = true; isStealth = true; uEl.style.opacity = 0.4; } 
            else if (type === 'general') { uEl.className = 'pixel-unit bat-general'; uEl.style.backgroundColor = color; w = 10; h = 14; hp = 15; isSuper = true; }
            else if (type === 'cavalry') { uEl.className = 'pixel-unit bat-cavalry'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 12; h = 8; hp = 2; }
            else if (type === 'archer') { uEl.className = 'pixel-unit bat-archer'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 5; h = 7; }
            else if (type === 'drone') { uEl.className = 'pixel-unit bat-drone'; w = 18; h = 8; hp = 2; isSuper = true; }
            else if (type === 'bunker') { uEl.className = 'pixel-unit bat-bunker'; w = 20; h = 50; hp = 25; isSuper = true; }
            else { uEl.className = 'pixel-unit bat-infantry'; uEl.style.backgroundColor = color; uEl.style.color = color; w = 4; h = 6; }

            let x = 0, y = 0, vy = 0;
            if (type === 'para') { x = arena.offsetWidth/2 + (side === 'left' ? 1 : -1) * (Math.random() * 100 + 50); y = 10; vy = 3; } 
            else if (type === 'bunker') { x = side === 'left' ? 100 : arena.offsetWidth - 100; y = 50 + Math.random() * (arena.offsetHeight - 100); vy = 0; }
            else { x = side === 'left' ? 20 + Math.random() * 20 : arena.offsetWidth - 40 - Math.random() * 20; y = 10 + Math.random() * (arena.offsetHeight - 20); vy = (Math.random() - 0.5) * CONFIG.speeds.verticalWobble; }

            uEl.style.left = x + 'px'; uEl.style.top = y + 'px'; arena.appendChild(uEl);

            let unitObj = { id: battleState.unitIdCounter++, el: uEl, side: side, type: type, x: x, y: y, w: w, h: h, hp: hp, isSuper: isSuper, isStealth: isStealth, stealthTimer: 0, phase: Math.random() * Math.PI * 2, wobbleSpeed: 0.005 + Math.random() * 0.01, vy: vy, isDead: false };

            uEl.onclick = (e) => { 
                e.stopPropagation(); if(isSuper || type==='para') return; 
                if (side === 'left') { if(controlledPlayerUnit) controlledPlayerUnit.el.classList.remove('controlled'); controlledPlayerUnit = unitObj; uEl.classList.add('controlled'); } 
                else { if(controlledEnemyUnit) controlledEnemyUnit.el.classList.remove('controlled-enemy'); controlledEnemyUnit = unitObj; uEl.classList.add('controlled-enemy'); }
            };
            battleState.units.push(unitObj);
        }

        function getBattleEraConfig() {
            const year = selectedScenarioYear;
            if (year < 0) return { name: 'Edad Antigua', projectile: 'bullet-arrow', rangedChance: 0.0035, fireSound: 'bang', cannon: false, melee: true, meleeRange: 26, meleeRate: 0.2, speed: 0.85 };
            if (year < 500) return { name: 'Antiguedad clasica', projectile: 'bullet-arrow', rangedChance: 0.0045, fireSound: 'bang', cannon: false, melee: true, meleeRange: 28, meleeRate: 0.24, speed: 0.95 };
            if (year < 1492) return { name: 'Edad Media', projectile: 'bullet-arrow', rangedChance: 0.0055, fireSound: 'bang', cannon: false, melee: true, meleeRange: 30, meleeRate: 0.28, speed: 1.0 };
            if (year < 1900) return { name: 'Polvora temprana', projectile: 'bullet', rangedChance: 0.008, fireSound: 'bang', cannon: true, melee: true, meleeRange: 22, meleeRate: 0.12, speed: 0.9 };
            if (year >= 2026) return { name: 'Guerra tecnologica', projectile: 'bullet', rangedChance: CONFIG.ai.fireChance + 0.006, fireSound: 'bang', cannon: true, melee: true, meleeRange: 16, meleeRate: 0.05, speed: 1.08 };
            return { name: 'Guerra moderna', projectile: 'bullet', rangedChance: CONFIG.ai.fireChance, fireSound: 'bang', cannon: true, melee: true, meleeRange: 18, meleeRate: 0.08, speed: 1.0 };
        }

        function showMeleeFlash(x, y, arena) {
            let flash = document.createElement('div');
            flash.className = 'melee-flash';
            flash.innerText = '⚔';
            flash.style.left = x + 'px';
            flash.style.top = y + 'px';
            arena.appendChild(flash);
            setTimeout(() => flash.remove(), 260);
        }

        function getMeleePower(unit) {
            const base = {
                civilian: 0.5,
                infantry: 1,
                ship: 1.2,
                tank: 1.55,
                cavalry: 1.9,
                archer: 0.8,
                drone: 2.5,
                para: 1.25,
                general: 1.8,
                juggernaut: 3.2,
                battleship: 3.4,
                sub: 2,
                clippy: 2.6,
                bunker: 2.2,
            };
            return (base[unit.type] || 1) * (unit.hp > 1 ? Math.min(2.5, 1 + unit.hp / 20) : 1);
        }

        function markUnitDead(unit, killerSide, reasonText) {
            if (!unit || unit.isDead) return;
            unit.isDead = true;
            if (unit.el) unit.el.remove();
            if (unit.type !== 'bunker') {
                if (unit.side === 'left') currentBattleData.deadA++;
                else currentBattleData.deadD++;
            }
            if (unit === controlledPlayerUnit) controlledPlayerUnit = null;
            if (unit === controlledEnemyUnit) controlledEnemyUnit = null;
            if (unit.type === 'general') finishBattle(killerSide === 'left' ? 'win' : 'lose', reasonText || '¡General abatido! La moral se derrumba.');
        }

        function resolveMeleeCombat(arena, era) {
            if (!era.melee) return;
            const alive = battleState.units.filter(u => !u.isDead && !u.isStealth && u.type !== 'bunker');
            for (let i = 0; i < alive.length; i++) {
                const a = alive[i];
                for (let j = i + 1; j < alive.length; j++) {
                    const b = alive[j];
                    if (a.side === b.side || a.isDead || b.isDead) continue;
                    const dx = Math.abs(a.x - b.x);
                    const dy = Math.abs(a.y - b.y);
                    const range = era.meleeRange + (a.isSuper || b.isSuper ? 10 : 0);
                    if (dx > range || dy > range) continue;
                    if (Math.random() > era.meleeRate) continue;

                    showMeleeFlash((a.x + b.x) / 2, (a.y + b.y) / 2, arena);
                    const aPower = getMeleePower(a);
                    const bPower = getMeleePower(b);
                    const roll = Math.random() * (aPower + bPower);
                    const loser = roll < aPower ? b : a;
                    const winner = loser === a ? b : a;
                    if (loser.isSuper && loser.hp > 1) {
                        loser.hp -= Math.max(1, Math.ceil(getMeleePower(winner)));
                        if (loser.hp <= 0) markUnitDead(loser, winner.side, '¡Unidad pesada destruida cuerpo a cuerpo!');
                    } else {
                        markUnitDead(loser, winner.side, loser.type === 'general' ? '¡General abatido en combate cuerpo a cuerpo!' : null);
                    }
                    updateBattleHUD();
                    break;
                }
            }
        }

        function getNearestEnemy(unit) {
            let best = null, bestDist = Infinity;
            battleState.units.forEach(other => {
                if (other.isDead || other.side === unit.side || other.isStealth) return;
                const dist = Math.abs(other.x - unit.x) + Math.abs(other.y - unit.y);
                if (dist < bestDist) { best = other; bestDist = dist; }
            });
            return best;
        }

        function redirectEdgeUnit(unit, arenaW, arenaH) {
            const enemy = getNearestEnemy(unit);
            const margin = Math.max(22, unit.w || 8);
            if (unit.side === 'left' && unit.x >= arenaW - margin) unit.x = arenaW - margin;
            if (unit.side === 'right' && unit.x <= margin) unit.x = margin;
            if (enemy) {
                const targetY = Math.max(20, Math.min(arenaH - 20, enemy.y + (Math.random() - 0.5) * 30));
                unit.vy = Math.max(-CONFIG.speeds.verticalWobble, Math.min(CONFIG.speeds.verticalWobble, (targetY - unit.y) * 0.035));
            } else {
                unit.vy = (Math.random() - 0.5) * CONFIG.speeds.verticalWobble;
            }
            unit.edgeRetreatUntil = Date.now() + 1100;
            unit.el.style.left = unit.x + 'px';
            unit.el.style.top = unit.y + 'px';
        }

        function fire(x, y, isLeft, cls, arena) {
            let bEl = document.createElement('div'); bEl.className = cls; bEl.style.left = x + 'px'; bEl.style.top = y + 'px'; arena.appendChild(bEl);
            let isCannon = cls.includes('cannon'); let isTorp = cls.includes('torpedo'); let isArrow = cls.includes('arrow');
            const speed = isArrow ? 6 : (isCannon || isTorp ? CONFIG.speeds.bulletCannon : CONFIG.speeds.bulletNormal);
            battleState.bullets.push({ el: bEl, x: x, y: y, side: isLeft ? 'left' : 'right', vx: (isLeft ? 1 : -1) * speed, w: isCannon ? 10 : (isTorp?16:12), h: isCannon ? 10 : (isTorp?4:2), isDead: false, damage: isTorp ? 5 : (isCannon ? 3 : 1) });
        }

        function updatePhysics() {
            if(isPaused) return;

            let arena = document.getElementById('battle-arena'); let time = Date.now(), d = currentBattleData, borderCrossed = false;
            const era = getBattleEraConfig();
            let terrainMult = 1;
            if (d.type !== 'civilian') {
                if (d.prov.terrain === 'winter') terrainMult = 0.5;
                else if (d.prov.terrain === 'desert') terrainMult = 0.78;
                else if (d.prov.terrain === 'mountain') terrainMult = 0.62;
            }
            
            let leftGen = battleState.units.find(u => u.type === 'general' && u.side === 'left' && !u.isDead);
            let rightGen = battleState.units.find(u => u.type === 'general' && u.side === 'right' && !u.isDead);

            let aOnScreen = 0, dOnScreen = 0;
            battleState.units.forEach(u => { if(!u.isDead && u.type !== 'bunker') { if (u.side === 'left') aOnScreen++; else dOnScreen++; } });

            let defIsHuman = isHumanBattleNation(d.defNat.id) && d.defNat.id !== d.attNat.id;
            if (!defIsHuman) {
                let spawnsThisFrame = (d.defNat.trait === 'swarm' && Math.random() < 0.5) ? 2 : 1;
                for(let i=0; i<spawnsThisFrame; i++) {
                    if (dOnScreen < CONFIG.battle.maxOnScreen && d.deployedD < d.totalD) {
                        let color = d.type === 'civilian' ? '#aaaaaa' : d.defNat.color;
                        if (d.type !== 'civilian') {
                            if (d.defNat.generals > 0 && !rightGen && Math.random() < 0.05) { d.defNat.generals--; spawnUnit('right', color, arena, false, 'general'); rightGen = true; }
                            else if (d.prov.terrain !== 'naval' && d.defNat.juggernauts > 0 && Math.random() < 0.02) { d.defNat.juggernauts--; spawnUnit('right', color, arena, false, 'juggernaut'); } 
                            else if (d.prov.terrain === 'naval' && d.defNat.battleships > 0 && Math.random() < 0.02) { d.defNat.battleships--; spawnUnit('right', color, arena, false, 'battleship'); } 
                            else if (d.prov.terrain === 'naval' && d.defNat.subs > 0 && Math.random() < 0.02) { d.defNat.subs--; spawnUnit('right', color, arena, false, 'sub'); }
                            else if (d.defNat.paras > 0 && Math.random() < 0.02) { d.defNat.paras--; spawnUnit('right', color, arena, false, 'para'); }
                            else spawnUnit('right', color, arena, false);
                        } else spawnUnit('right', color, arena, true);
                        d.deployedD++; dOnScreen++;
                    }
                }
                if (d.defNat.air && d.defNat.air > 0 && battleState.zeps.filter(z=>z.side==='right').length === 0 && Math.random() < 0.005) { d.defNat.air--; updateBattleHUD(); spawnZeppelin('right'); }
            }

            if (aOnScreen < CONFIG.battle.maxOnScreen && d.deployedA < d.totalA) { spawnUnit('left', d.attNat.color, arena, false); d.deployedA++; }
            if (defIsHuman && dOnScreen < CONFIG.battle.maxOnScreen && d.deployedD < d.totalD) { spawnUnit('right', d.defNat.color, arena, false); d.deployedD++; }

            battleState.zeps.forEach((z, i) => {
                z.x += z.vx; z.el.style.left = z.x + 'px';
                if (Math.random() < 0.04) {
                    let b = document.createElement('div'); b.className = 'air-bomb'; b.innerHTML = '💣'; b.dataset.side = z.side; 
                    b.style.left = (z.side === 'left' ? z.x + 15 : z.x + 5) + 'px'; b.style.top = '40px'; arena.appendChild(b);
                    battleState.bombs.push({ el: b, x: (z.side === 'left' ? z.x + 15 : z.x + 5), y: 40, side: z.side, isDead: false });
                }
                if ((z.side === 'left' && z.x > arena.offsetWidth + 50) || (z.side === 'right' && z.x < -50)) { z.el.remove(); battleState.zeps.splice(i, 1); renderBattleSpecialToolbar(); }
            });

            battleState.bombs.forEach(b => {
                if(b.isDead) return;
                b.y += 7; b.el.style.top = b.y + 'px';
                if (b.y > arena.offsetHeight - 40) { createAirExplosion(b.x, b.side, arena); b.el.remove(); b.isDead = true; }
            });

            let arenaW = arena.offsetWidth, arenaH = arena.offsetHeight;
            battleState.units.forEach(u => {
                if(u.isDead) return;
                
                let myGen = u.side === 'left' ? leftGen : rightGen;
                let hasAura = false;
                if (myGen && u.type !== 'general' && u.type !== 'bunker') { if (Math.abs(u.x - myGen.x) < 150 && Math.abs(u.y - myGen.y) < 150) hasAura = true; }
                u.el.style.boxShadow = hasAura ? '0 0 10px gold' : '';
                let auraSpeed = hasAura ? 1.5 : 1.0; let auraFire = hasAura ? 0.05 : 0; 

                let p1BaseSpeed = d.attNat.trait === 'vanguard' ? 1.2 : 1.0; let p2BaseSpeed = d.defNat.trait === 'vanguard' ? 1.2 : 1.0;
                let factionMult = u.side === 'left' ? p1BaseSpeed : p2BaseSpeed;
                let sideDir = u.side === 'left' ? 1 : -1;
                let isRetreatingFromEdge = u.edgeRetreatUntil && time < u.edgeRetreatUntil;
                let advanceDir = isRetreatingFromEdge ? -sideDir : sideDir;

                if (u.type === 'bunker') return; 
                if (u.type === 'general') { u.y += u.vy * terrainMult; u.el.style.top = u.y + 'px'; if(u.y < 20 || u.y > arenaH - 20) u.vy *= -1; return; }
                if (u.type === 'para' && u.y < arenaH - 30) { u.y += u.vy; u.el.style.top = u.y + 'px'; return; }
                if (u.type === 'sub') {
                    let spd = 1.0 * terrainMult * factionMult * auraSpeed; u.x += advanceDir * spd;
                    if (u.stealthTimer > 0) { u.stealthTimer--; if(u.stealthTimer <= 0) { u.isStealth = true; u.el.style.opacity = 0.4; } } 
                    else if (Math.random() < 0.03 + auraFire) { u.isStealth = false; u.el.style.opacity = 1; u.stealthTimer = 60; fire(u.x + (u.side === 'left' ? 30 : -10), u.y + 5, u.side === 'left', 'bullet-torpedo', arena); playSound('cannon'); }
                    if ((u.side === 'left' && u.x >= arenaW - 30) || (u.side === 'right' && u.x <= 10)) borderCrossed = true;
                    u.el.style.left = u.x + 'px'; return; 
                }

                if (u.isSuper) {
                    let spd = (u.type === 'juggernaut' ? 0.8 : 0.6) * terrainMult * factionMult * auraSpeed * era.speed; u.x += advanceDir * spd;
                    if (era.cannon && Math.random() < (u.type === 'juggernaut' ? 0.08 : 0.1) + auraFire) { fire(u.x + (u.side === 'left' ? 40 : -10), u.y + 10, u.side === 'left', 'bullet-cannon', arena); }
                    
                    battleState.units.forEach(eu => {
                        if (!eu.isDead && eu.side !== u.side && !eu.isSuper && eu.type !== 'bunker') {
                            if (Math.abs(u.x - eu.x) < (u.w/2 + eu.w/2) && Math.abs(u.y - eu.y) < (u.h/2 + eu.h/2)) {
                                eu.isDead = true; eu.el.remove();
                                if(u.side === 'left') d.deadD++; else d.deadA++; 
                                if (eu === controlledEnemyUnit) controlledEnemyUnit = null; if (eu === controlledPlayerUnit) controlledPlayerUnit = null;
                                if (eu.type === 'general') finishBattle(u.side === 'left' ? 'win' : 'lose', `¡General aplastado!`);
                                updateBattleHUD();
                            }
                        }
                    });

                    if ((u.side === 'left' && u.x >= arenaW - 40) || (u.side === 'right' && u.x <= 10)) borderCrossed = true;
                    u.el.style.left = u.x + 'px'; return; 
                }

                let stagger = Math.abs(Math.sin(time * u.wobbleSpeed + u.phase)), angle = Math.sin(time * u.wobbleSpeed + u.phase) * 45; 
                
                if(u === controlledPlayerUnit) {
                    let s = (u.type === 'tank' || u.type === 'ship') ? CONFIG.speeds.playerTank : CONFIG.speeds.playerBase; s *= terrainMult * factionMult * auraSpeed * era.speed;
                    if(keys.w) u.y -= s * (0.5 + stagger); if(keys.s) u.y += s * (0.5 + stagger); 
                    if(keys.a) u.x -= s * (0.5 + stagger); if(keys.d) u.x += s * (0.5 + stagger);
                    if(keys.z && time - lastShotZ > (CONFIG.cooldowns.bullet / (hasAura?2:1))) { fire(u.x, u.y, true, era.projectile, arena); playSound(era.fireSound); lastShotZ = time; } 
                    if(era.cannon && keys.x && time - lastShotX > (CONFIG.cooldowns.cannon / (hasAura?2:1))) { fire(u.x, u.y, true, 'bullet-cannon', arena); playSound('cannon'); lastShotX = time; }
                } else if(u === controlledEnemyUnit) {
                    let s = (u.type === 'tank' || u.type === 'ship') ? CONFIG.speeds.playerTank : CONFIG.speeds.playerBase; s *= terrainMult * factionMult * auraSpeed * era.speed;
                    if(keys.arrowup) u.y -= s * (0.5 + stagger); if(keys.arrowdown) u.y += s * (0.5 + stagger); 
                    if(keys.arrowleft) u.x -= s * (0.5 + stagger); if(keys.arrowright) u.x += s * (0.5 + stagger);
                    if(keys['1'] && time - lastShot1 > (CONFIG.cooldowns.bullet / (hasAura?2:1))) { fire(u.x, u.y, false, era.projectile, arena); playSound(era.fireSound); lastShot1 = time; } 
                    if(era.cannon && keys['2'] && time - lastShot2 > (CONFIG.cooldowns.cannon / (hasAura?2:1))) { fire(u.x, u.y, false, 'bullet-cannon', arena); playSound('cannon'); lastShot2 = time; }
                } else {
                    let speedX = advanceDir * CONFIG.speeds.aiBase * terrainMult * factionMult * auraSpeed * era.speed;
                    const enemy = getNearestEnemy(u);
                    u.x += (speedX * (0.2 + stagger * 2)) + ((Math.random() - 0.5) * 0.4);
                    u.y += u.vy * terrainMult;
                    if (enemy && Math.abs(enemy.y - u.y) > 8) u.y += Math.sign(enemy.y - u.y) * 0.35 * terrainMult;
                    if(Math.random() < era.rangedChance + auraFire) fire(u.x, u.y, u.side === 'left', era.projectile, arena);
                }

                if(u.y < 20 || u.y > arenaH - 10) u.vy *= -1;
                if ((u.side === 'left' && u.x >= arenaW - 20) || (u.side === 'right' && u.x <= 20)) borderCrossed = true;

                u.el.style.left = u.x + 'px'; u.el.style.top = u.y + 'px'; u.el.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
            });

            resolveMeleeCombat(arena, era);

            battleState.bullets.forEach(b => {
                if(b.isDead) return;
                b.x += b.vx;
                if(b.x < 0 || b.x > arenaW) { b.isDead = true; b.el.remove(); return; }
                
                for (let i = 0; i < battleState.units.length; i++) {
                    let u = battleState.units[i];
                    if (u.isDead || u.side === b.side || u.isStealth) continue; 
                    if (Math.abs(b.x - u.x) < (6 + u.w/2) && Math.abs(b.y - u.y + (u.h/2)) < (b.h/2 + u.h/2)) {
                        b.isDead = true; b.el.remove();
                        if (u.isSuper) {
                            u.hp -= b.damage || 1; if (u.hp <= 0) markUnitDead(u, b.side, 'General abatido.');
                        } else { markUnitDead(u, b.side, 'General abatido.'); }
                        
                        if (u.isDead) {
                            markUnitDead(u, b.side, '¡General abatido! La moral se derrumba.');
                            updateBattleHUD();
                        }
                        break; 
                    }
                }
                if(!b.isDead) b.el.style.left = b.x + 'px';
            });

            battleState.units = battleState.units.filter(u => !u.isDead); battleState.bullets = battleState.bullets.filter(b => !b.isDead); battleState.bombs = battleState.bombs.filter(b => !b.isDead);

            if (borderCrossed) {
                battleState.units.forEach(u => {
                    if (u.isDead) return;
                    const edgeMargin = Math.max(22, u.w || 8);
                    if ((u.side === 'left' && u.x >= arenaW - edgeMargin) || (u.side === 'right' && u.x <= edgeMargin)) redirectEdgeUnit(u, arenaW, arenaH);
                });
            }
            if (d.deadA >= d.totalA) finishBattle('lose', "¡Aniquilación! Tus tropas han caído."); else if (d.deadD >= d.totalD) finishBattle('win', "¡Aniquilación! Enemigo destruido.");
        }

        function finishBattle(result, reasonText) {
            if(battleLoop) clearInterval(battleLoop);
            let d = currentBattleData, s = document.getElementById('battle-status');
            playSound(result === 'win' ? 'win' : 'lose');
            
            if (d.type === 'defense') {
                let survivorsA = d.totalA - d.deadA; if (survivorsA > 0) d.attNat.bat = Math.max(0, (d.attNat.bat - d.totalA) + survivorsA); else d.attNat.bat = Math.max(0, d.attNat.bat - d.totalA);
                let survivorsD = d.totalD - d.deadD; if (survivorsD > 0) d.defNat.bat = Math.max(0, (d.defNat.bat - d.totalD) + survivorsD); else d.defNat.bat = Math.max(0, d.defNat.bat - d.totalD);

                if (result === 'win') {
                    s.style.color = "#2ecc71"; s.innerHTML = cleanText(`${reasonText}<br>¡DEFENSA EXITOSA! Has protegido ${d.prov.name}.`);
                    logEvent(`ðŸ›¡ï¸ Â¡Victoria defensiva de ${d.attNat.name} en ${d.prov.name}!`);
                } else {
                    s.style.color = "#e74c3c"; s.innerHTML = cleanText(`${reasonText}<br>La ciudad ha caído en manos enemigas.`);
                    let attackerId = pendingDefenses[d.defenseIndex].attackerId;
                    const oldOwner = d.prov.owner;
                    d.prov.owner = attackerId; d.prov.isColony = true; d.prov.forts = 0;
                    handleProvinceCaptured(d.prov, oldOwner, attackerId);
                    logEvent(`ðŸš¨ DERROTA: ${d.attNat.name} ha perdido ${d.prov.name} a manos de ${d.defNat.name}.`);
                }
                pendingDefenses.splice(d.defenseIndex, 1);
            } 
            else {
                let survivorsA = d.totalA - d.deadA; if (survivorsA > 0) d.attNat.bat = Math.max(0, (d.attNat.bat - d.totalA) + survivorsA); else d.attNat.bat = Math.max(0, d.attNat.bat - d.totalA);
                if (d.type === 'army') { let survivorsD = d.totalD - d.deadD; if (survivorsD > 0) d.defNat.bat = Math.max(0, (d.defNat.bat - d.totalD) + survivorsD); else d.defNat.bat = Math.max(0, d.defNat.bat - d.totalD); }

                if(result === 'win') { 
                    s.style.color = "#2ecc71"; d.attNat.money += 500000; 
                    d.attNat.stability = Math.min(100, (d.attNat.stability || 70) + 3);
                    if (d.defNat && d.defNat.id !== 9) d.defNat.stability = Math.max(0, (d.defNat.stability || 70) - 4);
                    if (d.type === 'army') {
                        s.innerHTML = cleanText(`${reasonText}<br>Fase 1 completada.<br>💰 ¡Botín de guerra: +500.000$!`); 
                        const oldOwner = d.prov.owner; d.prov.owner = d.attNat.id; d.prov.isColony = true; handleProvinceCaptured(d.prov, oldOwner, d.attNat.id); logEvent(`Conquista: ${d.attNat.name} asaltÃ³ ${d.prov.name}. (+500kðŸ’°)`);
                    } else if (d.type === 'civilian') {
                        s.innerHTML = cleanText(`${reasonText}<br>¡ASIMILACIÓN COMPLETADA!<br>💰 ¡Botín de guerra: +500.000$!`); 
                        d.prov.isColony = false; logEvent(`AsimilaciÃ³n: ${d.prov.name} es de ${d.attNat.name}. (+500kðŸ’°)`);
                    }
                } else { 
                    s.style.color = "#e74c3c"; s.innerHTML = cleanText(`${reasonText}`); 
                    d.attNat.stability = Math.max(0, (d.attNat.stability || 70) - 5);
                    if (d.defNat && d.defNat.id !== 9) d.defNat.stability = Math.min(100, (d.defNat.stability || 70) + 2);
                    logEvent(`Fracaso: El asalto de ${d.attNat.name} en ${d.prov.name} fue repelido.`);
                    if(d.defNat.name && d.defNat.name.includes("Clipo")) { d.attNat.money = Math.max(0, d.attNat.money - 5000); }
                }
            }
            
            updateHUD();
            setTimeout(() => { document.getElementById('battle-screen').classList.add('hidden'); document.getElementById('game-screen').classList.remove('hidden'); drawMap(); checkGameOver(); }, 3500); 
        }

        window.onload = () => { sanitizeVisibleText(); initDynamicTexts(); populatePlayerEmpireSelect(); applyActiveFlagUI(); applyActiveContinentUI(); updateAudioButton(); updateAudioForScreen('menu-screen'); }


