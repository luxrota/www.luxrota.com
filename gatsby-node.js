const {createFilePath} = require('gatsby-source-filesystem')
const path = require('path')


/**
 * Create pages from markdown files.
 */
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/markdown.js`)
  const query = `
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `
  return graphql(query).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: template,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

/**
 *  Add url slugs to markdown pages.
 */
exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions
  // markdown
  if (node.internal.type === `MarkdownRemark`) {
    // add url slugs
    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
      trailingSlash: false,
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
