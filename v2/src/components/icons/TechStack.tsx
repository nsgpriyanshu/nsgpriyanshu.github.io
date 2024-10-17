"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { 
    SiHtml5, SiJavascript, SiCss3, SiNextdotjs, SiNodedotjs, 
    SiReact, SiTailwindcss, SiTypescript, SiMarkdown 
} from "react-icons/si";

const TechStacks = () => {
    const animation = {
        hide: { x: -8, opacity: 0 },
        show: { x: 0, opacity: 1 },
    };

    return (
        <>
            <motion.p
                initial={animation.hide}
                animate={animation.show}
                transition={{ delay: 0.2 }}
                className="mb-3 text-base text-center lg:text-start"
            >
                My current tech stack
            </motion.p>

            <TooltipProvider delayDuration={0}>
                <motion.ul
                    initial="hide"
                    animate="show"
                    transition={{ delayChildren: 0.2, staggerChildren: 0.05 }}
                    className="flex flex-wrap items-center justify-center mx-auto gap-x-5 lg:mx-0"
                >
                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-black dark:hover:text-white">
                                    <SiNextdotjs className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next.js</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#61DAFB]">
                                    <SiReact className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>React</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#3178C6]">
                                    <SiTypescript className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Typescript</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#38B2AC]">
                                    <SiTailwindcss className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tailwind CSS</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#8CC84B]">
                                    <SiNodedotjs className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Node.js</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#E34F26]">
                                    <SiHtml5 className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>HTML5</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#1572B6]">
                                    <SiCss3 className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>CSS3</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-[#F7DF1E]">
                                    <SiJavascript className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>JavaScript</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>

                    <motion.li variants={animation} className="opacity-100">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="transition duration-300 ease-out text-neutral-700 hover:text-orange-400">
                                    <SiMarkdown className="w-6 h-6 md-w-8 md-h-8" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>MDX</p>
                            </TooltipContent>
                        </Tooltip>
                    </motion.li>
                </motion.ul>
            </TooltipProvider>
        </>
    );
};

export default TechStacks;
