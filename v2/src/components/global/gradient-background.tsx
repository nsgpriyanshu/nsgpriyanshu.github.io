"use client";

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import AnimationContainer from './animation';

const GradientBackground = ({ children }: { children: React.ReactNode }) => {
    const controls = useAnimation();

    useEffect(() => {
        let animationCancelled = false;

        const startAnimation = async () => {
            while (!animationCancelled) {
                await controls.start({
                    x: [0, 80, 0, -80, 0],
                    y: [0, -80, 0, 80, 0],
                    transition: { duration: 8, repeat: Infinity },
                });
            }
        };

        startAnimation();

        return () => {
            animationCancelled = true;
            controls.stop();
        };
    }, [controls]);

    return (
        <AnimationContainer>
            <div className="min-h-screen w-full">
                <div className="absolute inset-0 bg-grid-neutral-600/20 hidden lg:flex"></div>

                <div className="absolute inset-0 items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)] hidden lg:flex"></div>

                {/* Red Gradient Blob */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    animate={controls}
                    className="z-[15] w-[30rem] left-[45%] top-[5rem] absolute h-[18rem] blur-[11rem] rounded-full hidden lg:flex"
                    style={{
                        background: "radial-gradient(circle, rgb(246, 4, 1) 0%, rgba(246, 4, 1, 0) 70%)",
                    }}
                />

                {/* Gold Gradient Blob */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    animate={controls}
                    className="z-[15] absolute w-[30rem] right-[45%] top-[5rem] h-[18rem] mt-[5rem] blur-[11rem] rounded-full hidden lg:flex"
                    style={{
                        background: "radial-gradient(circle, rgb(203, 185, 143) 0%, rgba(203, 185, 143, 0) 70%)",
                    }}
                />

                {children}
            </div>
        </AnimationContainer>
    );
};

export default GradientBackground;
