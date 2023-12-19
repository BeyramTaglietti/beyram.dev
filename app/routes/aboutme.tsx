const AboutMe = () => {
  return (
    <div className="flex justify-center flex-col p-3">
      <h1 className="text-4xl xl:text-6xl mb-5 font-bold">Hi there 👋🏻</h1>
      <p className="mb-4">
        I&apos;m a <strong>Software Engineer</strong> from 🇮🇹 who{" "}
        <strong>LOVES</strong> coding and staying in touch with the latest news
        in the frontend world
      </p>
      <p className="mb-4">
        Other than coding I also enjoy traveling 🌍 and playing video games 🎮
        (mainly first person shooters)
      </p>
      <p className="mb-4">
        I really love web design and designing a beatiful website is always a
        priority... but I value performance, development speed and security a
        lot more 👻 (can&apos;t you tell from this website? I did my best ok??
        😤)
      </p>

      <img
        src="https://media1.tenor.com/m/W7O9HyghmRAAAAAC/shrek-angry.gif"
        alt="gif representation of my current mood"
        className="rounded-xl w-[500px]"
      />
    </div>
  );
};

export default AboutMe;
