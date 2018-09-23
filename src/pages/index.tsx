import { graphql } from "gatsby";
import * as React from "react";
import { injectGlobal } from "react-emotion";

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #eee;
  }
`;

const Header = () => (
  <header
    css={{
      padding: "0 40px"
    }}
  >
    <h1>Coeuvre's Blog</h1>
  </header>
);

const Main = (props: any) => (
  <main css={{ display: "flex", flexDirection: "row" }}>
    <Posts {...props} />
    <Menu />
  </main>
);

const Posts = ({ data }: any) => (
  <section css={{ flex: "1 1 auto", padding: "0 40px" }}>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }: any) => (
      <Post key={node.id} node={node} />
    ))}
  </section>
);

const Post = ({ node }: any) => (
  <article>
    <h3>
      {node.frontmatter.title} — {node.frontmatter.date}
    </h3>
    <p>{node.excerpt}</p>
  </article>
);

const Menu = () => (
  <aside css={{ margin: 0, padding: 0, width: 200, flex: "0 0 auto" }}>
    aaa
  </aside>
);

export default (props: any) => {
  return (
    <div
      css={{
        width: 1000,
        margin: "0 auto",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />
      <Main {...props} />
    </div>
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
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;
