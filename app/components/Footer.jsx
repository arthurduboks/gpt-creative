import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/arthurduboks" target="_blank">
              <FaGithub className="text-xl" />
            </a>
          </div>
        </nav>
      </footer>
      <div className="relative">
        <div className="bg-primary h-6"></div>
        <div className="bg-primary h-5 mt-1"></div>
        <div className="bg-primary h-4 mt-2"></div>
        <div className="bg-primary h-3 mt-3"></div>
        <div className="bg-primary h-2 mt-4"></div>
        <div className="bg-primary h-1 mt-5"></div>
      </div>
    </>
  );
};

export default Footer;
