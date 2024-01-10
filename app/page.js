import Link from "next/link";
import { CiLocationArrow1 } from "react-icons/ci";

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">
            GPT <span className="underline">Creative</span>
          </h1>
          <p className="py-6 text-lg leading-loose">
            Your new marketing assistant. Powered by OpenAI. Create content, and
            more!
          </p>
          <Link href="/chat" className="btn btn-secondary">
            Get Started
            <CiLocationArrow1 className="text-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
