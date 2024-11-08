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
        Other than coding I also enjoy traveling 🌍, which I built an app for,
        and not much else really... maybe memes? 🤷🏻‍♂️
      </p>

      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWJ1NHIycHg0dnpyMjduZjM1Z3BuZjIyb3F4eGN3OHRjYnlnanppNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxYcwi3hCVbzNYqY/giphy.webp"
        alt="american flag waving"
        className="rounded-xl"
      />
    </div>
  );
};

export default AboutMe;
