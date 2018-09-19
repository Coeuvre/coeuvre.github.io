import { graphql } from "gatsby";
import * as React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  display: inline-block;
  border-bottom: 1px solid;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

const Span = styled.span`
  color: #bbb;
`;

export default ({ data }: any) => {
  return (
    <div>
      <H1>Coeuvre 的博客</H1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }: any) => (
        <div key={node.id}>
          <H3>
            {node.frontmatter.title} <Span>— {node.frontmatter.date}</Span>
          </H3>
          <p>{node.excerpt}</p>
        </div>
      ))}
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
