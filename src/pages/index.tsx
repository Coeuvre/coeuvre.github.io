import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

const Posts = ({ data }: any) => (
  <section css={{ flex: "1 1 auto", padding: "0 40px" }}>
    {/* <h4>{data.allMarkdownRemark.totalCount} Posts</h4> */}
    {data.allMarkdownRemark.edges.map(({ node }: any) => (
      <Post key={node.id} node={node} />
    ))}
  </section>
);

const Post = ({ node }: any) => (
  <article css={{ marginBottom: "2rem" }}>
    <h2 css={{ fontSize: "1.5rem", margin: 0 }}>{node.frontmatter.title}</h2>
    <p css={{ fontSize: "1rem", fontStyle: "italic", margin: 0 }}>
      <span>{node.frontmatter.date.toUpperCase()}</span>
      <span css={{ marginLeft: "0.5rem" }}>
        /
        {node.frontmatter.tags.map((tag: string) => (
          <span key={tag} css={{ marginLeft: "0.5rem" }}>
            {tag.toUpperCase()}
          </span>
        ))}
      </span>
    </p>
    <section css={{ marginTop: "0.5rem" }}>{node.excerpt}</section>
    <p css={{ margin: 0, marginTop: "0.5rem" }}>
      <Link to={node.fields.slug}>READ MORE</Link>
    </p>
  </article>
);

export default (props: any) => {
  return (
    <Layout>
      <Posts {...props} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;
