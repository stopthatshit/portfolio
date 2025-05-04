import type CHAMPIONS from "./champions";

const getLatestVersion = async () => {
    const res = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json",
    );
    const data: string[] = await res.json();
    return data[0];
};

export const latestVersion = await getLatestVersion();

export type Champion = keyof typeof CHAMPIONS;
