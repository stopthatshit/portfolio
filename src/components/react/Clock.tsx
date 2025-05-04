import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div className="absolute bottom-2 left-4">
            <div className="text-xs text-gray-400" suppressHydrationWarning>
                {time.toLocaleTimeString("de-DE", {
                    timeStyle: "medium",
                })}
            </div>
        </div>
    );
}
