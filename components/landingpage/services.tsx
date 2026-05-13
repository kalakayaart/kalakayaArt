"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ActiveIndexType = {
    [key: number]: number;
};

export default function Services() {
    const [activeIndex, setActiveIndex] = useState<ActiveIndexType>({});
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const intervals = useRef<(NodeJS.Timeout | null)[]>([]);
    const timeouts = useRef<(NodeJS.Timeout | null)[]>([]);

    const services = [
        {
            images: ["/services/service1.png", "/services/bell.png"],
            title: "ART AND HERITAGE CONSULTING",
        },
        {
            images: ["/services/service4.png"],
            title: "RESEARCH AND DOCUMENTATION",
        },
        {
            images: ["/services/service3.png"],
            title: "CULTURAL PROGRAMMING",
        },
        {
            images: ["/services/service2.png", "/services/bell2.png"],
            title: "ARTIST REPRESENTATION",
        },
    ];

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    const hasMultiple = services[index].images.length > 1;

                    if (entry.isIntersecting && hasMultiple) {
                        // ⏳ Start only after delay
                        if (!timeouts.current[index]) {
                            timeouts.current[index] = setTimeout(() => {
                                if (!intervals.current[index]) {
                                    intervals.current[index] = setInterval(() => {
                                        setActiveIndex((prev) => {
                                            const current = prev[index] || 0;
                                            const total = services[index].images.length;

                                            return {
                                                ...prev,
                                                [index]: (current + 1) % total,
                                            };
                                        });
                                    }, 2);
                                }
                            }, 1000); // delay before starting slide
                        }
                    } else {
                        // ❌ stop everything when not visible
                        if (timeouts.current[index]) {
                            clearTimeout(timeouts.current[index]!);
                            timeouts.current[index] = null;
                        }

                        if (intervals.current[index]) {
                            clearInterval(intervals.current[index]!);
                            intervals.current[index] = null;
                        }
                    }
                },
                {
                    threshold: 0.6, // require more visibility before triggering
                }
            );

            observer.observe(card);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
            intervals.current.forEach((i) => i && clearInterval(i));
            timeouts.current.forEach((t) => t && clearTimeout(t));
        };
    }, [services]);

    const handleTouchStart = (index: number) => {
        if (intervals.current[index]) {
            clearInterval(intervals.current[index]!);
            intervals.current[index] = null;
        }
    };

    return (
        <section className="w-full bg-white py-12 md:py-20">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-24">

                {/* Heading */}
                <div className="mb-8 md:mb-10">
                    <h2 className="font-semibold text-[24px] md:text-[28px] font-[Mustica_Pro]">
                        What We Do
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20 lg:gap-28">
                    {services.map((service, index) => {
                        const current = activeIndex[index] || 0;

                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                className="flex flex-col gap-4 w-full"
                            >
                                {/* Image Slider */}
                                <div
                                    className="relative w-full h-[250px] overflow-hidden"
                                    onTouchStart={() => handleTouchStart(index)}
                                >
                                    <div
                                        className="flex h-full transition-transform duration-700 ease-in-out"
                                        style={{
                                            transform: `translateX(-${current * 100}%)`,
                                        }}
                                    >
                                        {service.images.map((img, i) => (
                                            <div
                                                key={i}
                                                className="min-w-full h-full flex items-center justify-center"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={service.title}
                                                    width={500}
                                                    height={500}
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Text */}
                                <p className="text-center uppercase text-[16px] md:text-[18px] font-[EB_Garamond] hover:underline cursor-pointer text-black">
                                    {service.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
