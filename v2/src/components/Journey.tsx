import React from 'react';
import { Timeline } from './ui/timeline';
import AnimationContainer from './global/animation';

const Experience = () => {
  const data = [
    {
      title: '2021',
      content: (
        <div className="flex gap-4 items-start">
          <p className="text-sm md:text-md font-normal mb-8">
          I began exploring software development in 2021. My first projects were a Discord bot and a basic website built using only HTML and CSS. These were my initial creations.
          </p>
        </div>
      ),
    },
    {
      title: '2022',
      content: (
        <div className="flex gap-4 items-start">
          <p className="text-sm md:text-md font-normal mb-8">
          In 2022, I delved into JavaScript and created more projects. At the same time, I started learning other technologies like TypeScript (TS) and Markdown (MD). I also gained experience in community moderation, taking on roles as an admin and moderator in various Discord servers.
          </p>
        </div>
      ),
    },
    {
      title: '2023',
      content: (
        <div className="flex gap-4 items-start">
          <p className="text-sm md:text-md font-normal mb-8">
          In 2023, I was in the 12th grade with a science stream focus. Although my studies demanded most of my time, I continued exploring web development whenever I could.
          </p>
        </div>
      ),
    },
    {
      title: '2024',
      content: (
        <div className="flex gap-4 items-start">
          <p className="text-sm md:text-md font-normal mb-8">
          This year marked the final days of my school journey, giving me more time before joining an institution. During this period, I deepened my knowledge in the areas mentioned earlier, released my first public npm package, and contributed to several open-source projects.
          </p>
        </div>
      ),
    },
  ];

  return (
    <AnimationContainer>
      <div className="bg-transparent">
        <Timeline data={data} />
      </div>
    </AnimationContainer>

  );
};

export default Experience;
