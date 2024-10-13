import SectionContainer from '@/components/global/section-containers';
import Hero from '../Hero';
import AbuotMe from '../About';

const HomeSection = () => {
    return (
        <SectionContainer>
            <div className="flex flex-col items-start w-full">
                <Hero />
                <AbuotMe />
            </div>
        </SectionContainer>
    )
};

export default HomeSection