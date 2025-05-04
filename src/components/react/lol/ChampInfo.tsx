import champions from "~/util/lol/champions";
import type { Role } from "~/util/lol/roles";

const SITES = ["UGG", "OPGG", "Mobalytics", "LOLAlytics"] as const;

type Site = (typeof SITES)[number];

const SITE_LOGOS: Record<Site, string> = {
    UGG: "https://static.bigbrain.gg/assets/lol/performance_analysis/images/UGG_Logo_Blue_3.svg",
    OPGG: "https://s-lol-web.op.gg/images/reverse.rectangle.png",
    Mobalytics:
        "https://cdn.mobalytics.gg/assets/common/icons/mobalytics-logo/logo-mobalytics-expanded.svg",
    LOLAlytics: "https://cdn5.lolalytics.com/logo/lolalytics35.webp",
} as const;

const COMMON_MAPPING: Record<Role, string> = {
    TOP: "top",
    JUNGLE: "jungle",
    MID: "mid",
    BOT: "adc",
    SUPPORT: "support",
} as const;

const ROLE_MAPPING: Record<Site, Record<Role, string>> = {
    UGG: COMMON_MAPPING,
    OPGG: COMMON_MAPPING,
    Mobalytics: COMMON_MAPPING,
    LOLAlytics: {
        ...COMMON_MAPPING,
        BOT: "bottom",
    },
} as const;

function siteUrl(champ: string, role: Role, site: Site) {
    switch (site) {
        case "UGG":
            return `https://u.gg/lol/champions/${champ}/build/${ROLE_MAPPING["UGG"][role]}`;
        case "OPGG":
            return `https://www.op.gg/champions/${champ}/build/${ROLE_MAPPING["OPGG"][role]}`;
        case "Mobalytics":
            return `https://mobalytics.gg/lol/champions/${champ}/build/${ROLE_MAPPING["Mobalytics"][role]}`;
        case "LOLAlytics":
            return `https://lolalytics.com/lol/${champ}/build/?lane=${ROLE_MAPPING["LOLAlytics"][role]}`;
    }
}

export default function ChampInfo({
    champ,
    role,
}: {
    champ: keyof typeof champions;
    role: Role;
}) {
    const data = champions[champ];

    return (
        <div className="flex max-w-4xl flex-row gap-16">
            <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-bold">{data.name}</div>
                <div className="text-sm text-gray-400">{data.title}</div>
                <div>{data.lore}</div>
            </div>
            <div className="flex w-1/4 flex-shrink-0 flex-col items-center gap-8">
                <div className="text-xl font-bold">Builds</div>
                <div className="flex flex-col items-center gap-4">
                    {SITES.map((site) => (
                        <a
                            key={site}
                            href={siteUrl(data.name, role, site)}
                            target="_blank"
                            rel="noreferrer"
                            className="h-12"
                        >
                            <img
                                src={SITE_LOGOS[site]}
                                alt={site}
                                className="aspect-auto h-12"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
