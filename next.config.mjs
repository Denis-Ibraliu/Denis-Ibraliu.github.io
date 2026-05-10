import { createMDX } from "fumadocs-mdx/next";

const config = {
  reactCompiler: true,
};

const withMDX = createMDX();

export default withMDX(config);
