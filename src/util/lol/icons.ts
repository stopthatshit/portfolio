import { latestVersion } from "./common";
import type { Role } from "./roles";

export const ROLE_ICONS: Record<Role, string> = {
    TOP: "https://static.wikia.nocookie.net/leagueoflegends/images/e/ef/Top_icon.png",
    JUNGLE: "https://static.wikia.nocookie.net/leagueoflegends/images/1/1b/Jungle_icon.png",
    MID: "https://static.wikia.nocookie.net/leagueoflegends/images/9/98/Middle_icon.png",
    BOT: "https://static.wikia.nocookie.net/leagueoflegends/images/9/97/Bottom_icon.png",
    SUPPORT:
        "https://static.wikia.nocookie.net/leagueoflegends/images/e/e0/Support_icon.png",
};

export function getChampionIcon(champ: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champ}.png`;
}
