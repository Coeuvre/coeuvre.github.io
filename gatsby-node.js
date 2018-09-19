const path = require(`path`);
const moment = require(`moment`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const regex = /^\/([0-9]{4}-[0-9]{2}-[0-9]{2})-(.*)/g;
    const path = createFilePath({
      node,
      getNode,
      basePath: `./posts`
    });
    const match = regex.exec(path);
    const date = moment(match[1]).format("YYYY/MM/DD");
    const name = match[2];
    const slug = `/blog/${date}/${name}`;
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.tsx`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug
          }
        });
      });
      resolve();
    });
  });
};
