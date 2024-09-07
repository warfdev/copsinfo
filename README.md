# copsinfo
#### Critical Ops - API Wrapper

- install;
```sh
npm install copsinfo@latest
```

- A module that allows you to extract player/server data from the Cops game.


## Example Usage (functions);
```js
(async () => {
    
    const { CopsInfo, ServerInfo } = require("./index");
    
    
    try {
        const copsinfo = new CopsInfo();
        const player = await copsinfo.getPlayer("ivyte");

        // Oyuncu fonksiyonları örnek kullanım:
        console.log("User ID:", player.getUserID());
        console.log("Username:", player.getUsername());
        console.log("Player Level:", player.getPlayerLevel());
        console.log("Current XP:", player.getPlayerXP());
        console.log("Next Level XP:", player.getNextLevelXP());
        console.log("Friend Status:", player.getFriendStatus());
        console.log("Clan Name:", player.getClanName());
        console.log("Clan Tag:", player.getClanTag());
        console.log("Clan ID:", player.getClanID());
        console.log("Ranked MMR:", player.getRankedMMR());
        console.log("Ranked Kills:", player.getRankedKills());
        console.log("Ranked Deaths:", player.getRankedDeaths());
        console.log("Ranked Assists:", player.getRankedAssists());
        console.log("Ranked Wins:", player.getRankedWins());
        console.log("Ranked Losses:", player.getRankedLosses());
        console.log("Total Custom Kills:", player.getCustomKills());
        console.log("Total Casual Kills:", player.getCasualKills());
        console.log("Normal KDA:", player.getNormalKD());
        console.log("Ranked KDA:", player.getRankedKD());
        console.log("Kalan XP:", player.getNextLevelXP(1));
        console.log("Profile Picture ID:", player.getIconID());
        console.log("is blocked friend requests?:", player.isBlockedFriendReqs()); // returns boolean
        console.log("is blocked clan requests?:", player.isBlockedClanReqs()); // returns boolean
        console.log("is banned?:", player.isBanned());

        // Sunucu bilgileri fonksiyonları örnek kullanım:
        const serverInfo = new ServerInfo();

        const serverStatus = await serverInfo.getServerStatus(8);  // Turkey/TR-1
        console.log("Server Status (Turkey/TR-1):", serverStatus);

        const serverName = await serverInfo.getServerName(8);  // Turkey/TR-1
        console.log("Server Name (Turkey/TR-1):", serverName);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
})();
```