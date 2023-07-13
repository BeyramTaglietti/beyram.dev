import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Software Developer from Italy specialized in frontend web development',
};

const AboutMe = () => {
  return (
    <div>
      <h1 className="text-4xl mb-5">Hi there 👋🏻</h1>
      <p className="mb-4">
        I&apos;m a <strong>Frontend Developer</strong> from 🇮🇹 who{' '}
        <strong>LOVES</strong> his job and is on his path of being a developer
        capable of anything he wants to develop 😎 (is it ever gonna happen?)
      </p>
      <p className="mb-4">
        Other than coding I also enjoy traveling 🌍 and talking to people who I
        find interesting (I enjoy listening more than talking btw)
      </p>
      <p className="mb-4">
        Even though I also can develop backend code, I enjoy frontend
        development a lot more, I really love web design and designing a
        beatiful website is always a priority... but I value a fast website more
        than a beatifull one 👻 (can&apos;t you tell from this website? I did my
        best ok?? 😤)
      </p>
      <p className="mb-3">Here are my hot takes to break the ice:</p>
      <ul className="list-disc list-inside">
        <li>Apple &gt; Google</li>
        <li>Code editor &gt; IDE</li>
        <li>Cryptocurrencies are a no no</li>
        <li>Anything &gt; Angular</li>
        <li>I&apos;m gonna stop here...</li>
      </ul>
    </div>
  );
};

export default AboutMe;
