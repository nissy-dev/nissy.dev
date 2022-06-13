import { FaGithub, FaTwitter, FaBook, FaFileAlt } from "react-icons/fa";

import icon from "../../public/images/icon-192x192.png";

const meta = {
  githubLink: "https://github.com/nissy-dev",
  twitterLink: "https://twitter.com/nissy_dev",
  blogLink: "https://blog.nissy.dev",
  resumeLink: "https://github.com/nissy-dev/resume",
};

export default function Index() {
  return (
    <div className="w-full h-full">
      <main className="w-full pt-24 flex flex-col justify-center items-center">
        <img className="w-32 shadow-2xl rounded" src={icon} alt="" />
        <h1 className="text-4xl mt-8 font-bold text-orange-500">nissy.dev</h1>
        <p className="text-xl my-6 text-orange-400 text-center w-3/5 md:w-full">
          I’m a software engineer from Japan 👋
        </p>
        <div className="grid grid-cols-2 grid-flow-row md:flex md:flex-row">
          <a
            className="py-4 px-8 text-orange-500"
            href={meta.githubLink}
            title="GitHub"
          >
            <FaGithub className="w-16 h-16" />
            <span className="inline-block w-full py-2 text-center">GitHub</span>
          </a>
          <a
            className="py-4 px-8 text-orange-500"
            href={meta.blogLink}
            title="Blog"
          >
            <FaBook className="w-16 h-16" />
            <span className="inline-block w-full py-2 text-center">Blog</span>
          </a>
          <a
            className="py-4 px-8 text-orange-500"
            href={meta.resumeLink}
            title="Resume"
          >
            <FaFileAlt className="w-16 h-16" />
            <span className="inline-block w-full py-2 text-center">Resume</span>
          </a>
          <a
            className="py-4 px-8 text-orange-500"
            href={meta.twitterLink}
            title="Twitter"
          >
            <FaTwitter className="w-16 h-16" />
            <span className="inline-block w-full py-2 text-center">
              Twitter
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}
