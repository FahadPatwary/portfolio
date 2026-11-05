/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // fully static: Cloudflare Pages serves the `out/` folder
  trailingSlash: true,
  images: { unoptimized: true }, // no image optimizer on static hosting
};
export default nextConfig;
