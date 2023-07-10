import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
};

const AboutMe = () => {
  return (
    <div>
      <h1 className="text-4xl mb-5">Hi there 👋🏻</h1>
      <p className="mb-4">
        As you&apos;ve already known by now, I&apos;m a{' '}
        <strong>Frontend Developer</strong> from 🇮🇹 who <strong>LOVES</strong>{' '}
        his job and is on his path of being a developer capable of anything he
        wants to develop 😎 (is it ever gonna happen?)
      </p>
      <p className="mb-4">
        Other than coding I also enjoy traveling 🌍 and talking to people who I
        find interesting (you&apos;re really gonna like me, I&apos;m the type of
        person who enjoys listening more than talking 🤯)
      </p>
      <p className="mb-4">
        Even though I also can develop backend code, I enjoy frontend
        development a lot more, I really love web design and designing a
        beatiful website is always a priority... but I value a fast website more
        than a beatifull one 👻 (can&apos;t you tell from this website? I did my
        best ok?? 😤)
      </p>
      <p className="mb-3">
        If there&apos;s even the slightest chance that you started to like me,
        let me drop my hot takes:
      </p>
      <ul className="list-disc list-inside">
        <li>Apple &gt; Google (like you haven&apos;t noticed 😒)</li>
        <li>Code editor &gt; IDE</li>
        <li>I don&apos;t like cryptocurrencies</li>
        <li>Coding on paper &gt; Angular</li>
        <li>I&apos;m gonna stop here...</li>
      </ul>
    </div>
  );
};

export default AboutMe;
