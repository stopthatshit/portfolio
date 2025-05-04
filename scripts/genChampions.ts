// Generates src/util/lol/champions.ts from the league api

import { writeFileSync } from "fs";
import prettier from "prettier";
import path from "path";
import { latestVersion, type Champion } from "~/util/lol/common";

interface ChampionData {
    id: string;
    key: string;
    name: string;
    title: string;
    image: object;
    skins: object[];
    lore: string;
    blurb: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: object;
    stats: object;
    spells: object[];
    passive: object;
    recommended: object[];
}

type OutData = Pick<ChampionData, "name" | "title" | "lore">;

const championFull = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/championFull.json`,
);
const championFullData = (await championFull.json()) as {
    type: "champion";
    format: "full";
    version: string;
    data: Record<Champion, ChampionData>;
};

const outData: Record<string, OutData> = {};

for (const [champ, value] of Object.entries(championFullData.data)) {
    const { name, title, lore } = value;
    outData[champ] = { name, title, lore };
}

const outScript = `export default ${JSON.stringify(outData)} as const;`;

const options = await prettier.resolveConfig(
    path.resolve(process.cwd(), ".prettierrc.yml"),
);
const formatted = await prettier.format(outScript, {
    ...options,
    parser: "typescript",
});

writeFileSync(
    path.resolve(process.cwd(), "src/util/lol/champions.ts"),
    formatted,
);
