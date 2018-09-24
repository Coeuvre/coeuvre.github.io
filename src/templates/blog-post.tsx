import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

export default ({ data }: any) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article css={{ margin: "0 40px" }}>
        <h1>{post.frontmatter.title}</h1>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
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
