/*
            Critical Ops API Wrapper - Node.js
                        v1.0.4
        
        - Türkçe, C-OPS oyunu içerisinden oyuncu ve sunucu verisi çekme modülüdür.

            (C) warfdev | discord: zsdot#0
*/

const axios = require("axios");

// main
class CopsInfo {
    constructor() {}

    async getPlayer(username) {
        try {
            const response = await axios.get(`https://1-44-1.prod.copsapi.criticalforce.fi/api/public/profile?usernames=${username}`);
            if (response.data.length === 0 || response.data === "Error 53") {
                throw new Error("Kullanıcı Bulunamadı");
            }
            return new Player(response.data[0]);
        } catch (error) {
            console.error("Hata: ", error.message);
            return null;
        }
    }
}

// user
class Player {
    constructor(data) {
        this.data = data;
    }

    getUserID() {
        return this.data.basicInfo?.userID || "Sonuç bulunamadı";
    }

    getUsername() {
        return this.data.basicInfo?.name || "Sonuç bulunamadı";
    }

    getPlayerLevel() {
        return this.data.basicInfo?.playerLevel?.level || "Sonuç bulunamadı";
    }

    getPlayerXP() {
        return this.data.basicInfo?.playerLevel?.current_xp || "Sonuç bulunamadı";
    }

    getNextLevelXP(option = 0) {
        if (option == 0) {
            return this.data.basicInfo?.playerLevel?.next_level_xp || "Sonuç bulunamadı";
        } else if (option == 1) {
            const w = this.data.basicInfo?.playerLevel?.next_level_xp - this.data.basicInfo?.playerLevel?.current_xp;
            return w || "Sonuç bulunamadı";
        } else return "Hatalı opsiyon, Dogru opsiyonlar <player>.getNextLevelXP(0 || 1)";
    }

    getFriendStatus() {
        return this.data.friendStatus !== undefined ? this.data.friendStatus : "Sonuç bulunamadı";
    }

    getClanName() {
        return this.data.clan?.basicInfo?.name || "Klan bulunamadı";
    }

    getClanTag() {
        return this.data.clan?.basicInfo?.tag || "Klan tag bulunamadı";
    }

    getClanID() {
        return this.data.clan?.id || "Klan ID bulunamadı";
    }

    getRankedMMR() {
        return this.data.stats?.ranked?.mmr || "Sonuç bulunamadı";
    }

    getRankedKills() {
        return this.data.stats?.ranked?.k || "Sonuç bulunamadı";
    }

    getRankedDeaths() {
        return this.data.stats?.ranked?.d || "Sonuç bulunamadı";
    }

    getRankedAssists() {
        return this.data.stats?.ranked?.a || "Sonuç bulunamadı";
    }

    getRankedWins() {
        return this.data.stats?.ranked?.w || "Sonuç bulunamadı";
    }

    getRankedLosses() {
        return this.data.stats?.ranked?.l || "Sonuç bulunamadı";
    }

    getCustomKills() {
        if (!this.data.stats?.seasonal_stats) {
            return "Sonuç bulunamadı";
        }
        return this.data.stats.seasonal_stats.reduce((acc, season) => acc + season.custom?.k || 0, 0);
    }

    getCasualKills() {
        if (!this.data.stats?.seasonal_stats) {
            return "Sonuç bulunamadı";
        }
        return this.data.stats.seasonal_stats.reduce((acc, season) => acc + season.casual?.k || 0, 0);
    }

    getCustomDeaths() {
        if (!this.data.stats?.seasonal_stats) {
            return "Sonuç bulunamadı";
        }
        return this.data.stats.seasonal_stats.reduce((acc, season) => acc + season.custom?.d || 0, 0);
    }

    getCasualDeaths() {
        if (!this.data.stats?.seasonal_stats) {
            return "Sonuç bulunamadı";
        }
        return this.data.stats.seasonal_stats.reduce((acc, season) => acc + season.casual?.d || 0, 0);
    }


    getRankedKD() {
        const kills = this.getRankedKills();
        const deaths = this.getRankedDeaths();

        if (kills === "Sonuç bulunamadı" || deaths === "Sonuç bulunamadı") {
            return "Ranked KD hesaplanamadı";
        }

        if (deaths == 0) {
            return kills > 0 ? Infinity : 0;
        }

        return (kills / deaths).toFixed(2); // KD oranını 2 ondalık basamakla döner
    }

    getNormalKD() {
        const customKills = this.getCustomKills();
        const customDeaths = this.getCustomDeaths();
        const casualKills = this.getCasualKills();
        const casualDeaths = this.getCasualDeaths();

        if (customKills === "Sonuç bulunamadı" || customDeaths === "Sonuç bulunamadı" ||
            casualKills === "Sonuç bulunamadı" || casualDeaths === "Sonuç bulunamadı") {
            return "Normal KD hesaplanamadı";
        }

        const totalKills = customKills + casualKills;
        const totalDeaths = customDeaths + casualDeaths;

        if (totalDeaths == 0) {
            return totalKills > 0 ? Infinity : 0;
        }

        return (totalKills / totalDeaths).toFixed(2); // KD oranını 2 ondalık basamakla döner
    }
    
    getIconID() {
      return this.data.basicInfo?.iconID || "Sonuç bulunamadı";
    }
    
    isBlockedFriendReqs() {
      return this.data.userSettings?.blockFriendRequests || "Sonuç bulunamadı";
    }
    
    isBlockedClanReqs() {
      return this.data.userSettings?.block_clan_requests || "Sonuç bulunamadı";
    }
    
    isBanned() {
      return this.data.ban;
    }
}

// server
class ServerInfo {
    constructor() {}

    async getServers() {
        try {
            const response = await axios.get('https://api-cops.criticalforce.fi/api/public/status/servers');
            return response.data;
        } catch (error) {
            console.error("Hata:", error.message);
            return null;
        }
    }

    async getServerStatus(serverID) {
        try {
            const servers = await this.getServers();
            if (!servers) {
                return "Sunucu bilgisi alınamadı";
            }
            return servers[serverID] ? servers[serverID].status : "Geçersiz Sunucu ID";
        } catch (error) {
            console.error("Hata:", error.message);
            return "Sunucu durumu alınamadı";
        }
    }

    async getServerName(serverID) {
        try {
            const servers = await this.getServers();
            if (!servers) {
                return "Sunucu bilgisi alınamadı";
            }
            return servers[serverID] ? servers[serverID].name : "Geçersiz Sunucu ID";
        } catch (error) {
            console.error("Hata:", error.message);
            return "Sunucu ismi alınamadı";
        }
    }
}

module.exports = { CopsInfo, Player, ServerInfo };