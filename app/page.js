import Link from "next/link";
import { CiLocationArrow1 } from "react-icons/ci";

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <div className="flex flex-col sm:flex-row justify-center rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20 gap-2 mb-5">
            Experience Next-Level AI-Driven Content Creation.{" "}
            <a href="#" className="font-semibold text-white">
              <span className="inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <h1 className="text-6xl font-bold text-primary">
            GPT{" "}
            <span className="underline">
              <span className="text-white bg-gradient-to-r from-red-400 to-blue-600 px-2 rounded-lg shadow-md transform hover:scale-110 transition-transform duration-300 uppercase">
                Creative
              </span>
            </span>
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
