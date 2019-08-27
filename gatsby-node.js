const {createFilePath} = require('gatsby-source-filesystem')
const path = require('path')


/**
 *
 *  - create article posts from markdown files
 */
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`src/templates/article.js`)
  const articleQuery = `
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
  return graphql(articleQuery).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: articleTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

/**
 *
 *  - add url slugs to markdown articles
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

