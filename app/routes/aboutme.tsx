import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About Me" },
    {
      name: "description",
      content: "Software Engineer from Italy specialized in web development",
    },
  ];
};

const AboutMe = () => {
  return (
    <div className="flex justify-center flex-col p-3">
      <h1 className="text-4xl xl:text-6xl mb-5 font-bold">Hi there 👋🏻</h1>
      <p className="mb-4">
        I&apos;m a <strong>Software Engineer</strong> from 🇮🇹 who{" "}
        <strong>LOVES</strong> coding and staying in touch with the latest news
        in the field
      </p>
      <p className="mb-4">
        Other than coding I also enjoy traveling 🌍 and talking to people who I
        find interesting
      </p>
      <p className="mb-4">
        I really love web design and designing a beatiful website is always a
        priority... but I value performance, development speed and security a
        lot more 👻 (can&apos;t you tell from this website? I did my best ok??
        😤)
      </p>

      <img
        src="https://media.tenor.com/EvNCyjP1IxQAAAAd/feliz-alegre.gif"
        width={0}
        height={0}
        alt="gif representation of my current mood"
        className="rounded-xl h-full w-full md:1/2 lg:w-2/4"
      />
    </div>
  );
};

export default AboutMe;
