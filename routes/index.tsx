import { Head } from "$fresh/runtime.ts";
import { IconLink } from "../components/IconLink.tsx";
import {
  FaGitHub,
  FaTwitter,
  FaBook,
  FaFileLines,
} from "../components/Icons.tsx";
import { siteMetadata } from "../const.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        {/* OGPの設定 */}
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteMetadata.title} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:site_name" content={siteMetadata.title} />
        <meta
          property="og:image"
          content={`${siteMetadata.siteUrl}/snork.webp`}
        />
        {/* TwitterのOGPの設定 */}
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta name="twitter:site" content={`@${siteMetadata.twitter}`} />
        <meta name="twitter:creator" content={`@${siteMetadata.twitter}`} />
        {/* URLの正規化 */}
        <link rel="canonical" href={siteMetadata.siteUrl} />
      </Head>
      <main class="w-full pt-24 flex flex-col justify-center items-center">
        <img
          class="w-32 h-32 shadow-2xl rounded"
          width={640}
          height={640}
          src="/snork.webp"
        ></img>
        <h1 class="text-4xl mt-8 font-bold text-orange-500">nissy.dev</h1>
        <p class="text-xl my-6 text-orange-400 text-center w-3/5 md:w-full">
          I'm a software engineer with particular expertise in front-end 🇯🇵 👋
        </p>
        <div class="grid grid-cols-2 grid-flow-row md:flex md:flex-row">
          <IconLink
            href={`https://github.com/${siteMetadata.github}`}
            name="GitHub"
            icon={<FaGitHub class="w-16 h-16" />}
          />
          <IconLink
            href={siteMetadata.blogLink}
            name="Blog"
            icon={<FaBook class="w-16 h-16" />}
          />
          <IconLink
            href={siteMetadata.resumeLink}
            name="Resume"
            icon={<FaFileLines class="w-16 h-16" />}
          />
          <IconLink
            href={`https://twitter.com/${siteMetadata.twitter}`}
            name="Twitter"
            icon={<FaTwitter class="w-16 h-16" />}
          />
        </div>
      </main>
    </>
  );
}
