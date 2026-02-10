"use client";

import { useRef, useState } from "react";
import { Volume, VolumeX } from "lucide-react";

const backgrounds = [
    { type: "video", src: "/videos/vidgap_7506480973706530070_hd.mp4" },
];

export default function BackgroundVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            videoRef.current.play();
            setMuted(!muted);
        }
    };

    

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* === Видео === */}
            <video
                ref={videoRef}
                src={backgrounds[0].src}
                autoPlay
                loop
                muted={muted}
                playsInline
                className="w-full h-full object-cover"
            />

            {/* === Иконка управления звуком внизу справа === */}
            <div
                onClick={toggleSound}
                className="absolute bottom-5 text-[white] right-5 z-20 p-3 rounded-full cursor-pointer shadow-lg transition"
            >
                {muted ? <VolumeX size={28} /> : <Volume size={28} />}
            </div>
        </div>
    );
}
