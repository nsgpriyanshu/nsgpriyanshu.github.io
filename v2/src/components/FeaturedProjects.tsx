import AnimationContainer from "./global/animation";
import Link from "next/link";
import MagicCard from "./ui/magic-card";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import projects from "@/data/projects.json";

function FeaturedProjects() {
  return (
    <>
      <AnimationContainer customClassName="w-full py-12 lg:py-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-center lg:text-start">
          Featured Projects
        </h2>
        <p className="w-full text-base font-normal leading-7 text-justify">
          Here are some of my creations — open-source projects where I aimed to build something unique and meaningful.
        </p>
      </AnimationContainer>

      <AnimationContainer
        customDelay={0.2}
        customClassName="w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2"
      >
        {projects.map((project) => (
          <MagicCard key={project.id} className="rounded-lg p-6">
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-start">
              {project.name}
            </h3>
            <p className="w-full mb-4 text-base font-normal leading-7 text-justify">
              {project.description || "No description available."}
            </p>
            <Button variant={"outline"}>
              <Link href={project.git_url} target="_blank">
                <p className="gap-2 text-neutral-800 dark:text-neutral-400 flex text-base font-normal leading-7 text-justify">
                  <GitHubLogoIcon className="h-4 w-4 text-foreground dark:text-foreground" />{" "}
                  GitHub
                </p>
              </Link>
            </Button>
          </MagicCard>
        ))}
      </AnimationContainer>
    </>
  );
}

export default FeaturedProjects;
