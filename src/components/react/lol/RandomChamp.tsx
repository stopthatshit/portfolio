import { useEffect, useMemo, useState } from "react";
import { getChampionIcon, ROLE_ICONS } from "~/util/lol/icons";
import { CHAMPION_ROLES, ROLES, type Role } from "~/util/lol/roles";
import cn from "classnames";
import { getRandomItem } from "~/util/random";
import { Swiper, SwiperSlide } from "swiper/react";
import { type SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "~/styles/swiper.css";
import shuffle from "~/util/shuffle";
import { Autoplay, FreeMode } from "swiper/modules";
import ChampInfo from "./ChampInfo";
import RerollIcon from "./RerollIcon";
import type CHAMPIONS from "~/util/lol/champions";

function RoleButton({
    role,
    setRole,
    icon,
    selectedRole,
}: {
    role: Role;
    setRole: React.Dispatch<React.SetStateAction<Role | null>>;
    icon: string;
    selectedRole: Role | null;
}) {
    return (
        <button
            className={cn(
                "flex flex-row items-center gap-2 rounded-sm bg-slate-600 hover:bg-teal-100",
                selectedRole === role && "bg-teal-200",
            )}
            onClick={() => setRole(role)}
        >
            <img src={icon} className="aspect-square w-20" alt={role} />
        </button>
    );
}

export default function RandomChamp() {
    const [role, setRole] = useState<Role | null>(null);
    const [champ, setChamp] = useState<keyof typeof CHAMPIONS | null>(null);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);

    const champList = useMemo(() => {
        if (role === null) return [];
        return Object.entries(CHAMPION_ROLES)
            .filter(([_champ, lanes]) => lanes.includes(role))
            .map(([champ, _lanes]) => champ);
    }, [role]);

    const shuffledChampList = useMemo(() => {
        const newChampList = champList.slice();
        shuffle(newChampList);
        return newChampList;
    }, [champList]);

    useEffect(() => {
        setChamp(null);
        swiper?.autoplay.start();
    }, [role]);

    return (
        <div className="flex flex-col items-center gap-16">
            <div className="flex flex-row gap-4">
                <div className="w-20" />
                <div className="flex flex-row gap-1">
                    <RoleButton
                        role="TOP"
                        setRole={setRole}
                        icon={ROLE_ICONS.TOP}
                        selectedRole={role}
                    />
                    <RoleButton
                        role="JUNGLE"
                        setRole={setRole}
                        icon={ROLE_ICONS.JUNGLE}
                        selectedRole={role}
                    />
                    <RoleButton
                        role="MID"
                        setRole={setRole}
                        icon={ROLE_ICONS.MID}
                        selectedRole={role}
                    />
                    <RoleButton
                        role="BOT"
                        setRole={setRole}
                        icon={ROLE_ICONS.BOT}
                        selectedRole={role}
                    />
                    <RoleButton
                        role="SUPPORT"
                        setRole={setRole}
                        icon={ROLE_ICONS.SUPPORT}
                        selectedRole={role}
                    />
                </div>
                <button
                    onClick={() => setRole(getRandomItem(ROLES))}
                    className="w-20"
                >
                    <RerollIcon className="w-16 fill-gray-300 hover:fill-teal-100" />
                </button>
            </div>
            <div className="flex flex-col items-center gap-4">
                {role && (
                    <>
                        <Swiper
                            modules={[Autoplay, FreeMode]}
                            slidesPerView={"auto"}
                            centeredSlides={true}
                            spaceBetween={10}
                            loop={true}
                            loopPreventsSliding={true}
                            loopAddBlankSlides={false}
                            allowTouchMove={true}
                            freeMode={true}
                            autoplay={{
                                disableOnInteraction: false,
                                delay: 0,
                                stopOnLastSlide: false,
                            }}
                            autoHeight={true}
                            onSwiper={(swiper) => {
                                setSwiper(swiper);
                            }}
                        >
                            <div className="justify-center py-8">
                                {shuffledChampList.map((tchamp) => (
                                    <SwiperSlide
                                        key={tchamp}
                                        className={cn(
                                            "aspect-square h-48",
                                            champ === tchamp
                                                ? "shadow-xl shadow-white"
                                                : "opacity-50",
                                        )}
                                    >
                                        <img
                                            src={getChampionIcon(tchamp)}
                                            alt={tchamp}
                                        />
                                    </SwiperSlide>
                                ))}
                            </div>
                        </Swiper>
                        <button
                            onClick={() => {
                                if (!swiper) return;
                                const newChamp = Math.floor(
                                    Math.random() * champList.length,
                                );
                                setChamp(
                                    shuffledChampList[
                                        newChamp
                                    ] as keyof typeof CHAMPIONS,
                                );

                                swiper.slideToLoop(newChamp);
                                swiper.autoplay.stop();
                            }}
                            className="rounded-sm bg-slate-600 p-4 hover:bg-teal-100 hover:text-gray-600"
                        >
                            Select Champion
                        </button>
                    </>
                )}
            </div>
            {champ && role && <ChampInfo champ={champ} role={role} />}
        </div>
    );
}
