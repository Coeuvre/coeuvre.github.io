import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

export default ({ data }: any) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article
        css={{ width: "100%", boxSizing: "border-box", padding: "0 40px" }}
      >
        <h1>{post.frontmatter.title}</h1>
        <hr />
        <section
          css={{
            h1: {
              display: "none"
            },
            code: {
              backgroundColor: "#eee",
              padding: "0 0.2rem"
            },
            "pre code": {
              display: "block",
              whiteSpace: "pre-wrap",
              padding: "1rem"
            }
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
