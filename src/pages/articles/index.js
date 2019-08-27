import {graphql, Link} from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Heading from '../../components/heading'
import Layout from '../../components/layout'
import Paragraph from '../../components/paragraph'


export const query = graphql`{
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
}`

const ArticlesPage = ({data}) => {
  return (
    <Layout heading="Articles">
      <div>
        <Heading level={4}>
          {data.allMarkdownRemark.totalCount} Posts
        </Heading>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <Heading level={3}>
              <Link to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
              {" "}
              <span>
                —{node.frontmatter.date}
              </span>
            </Heading>
            <Paragraph>
              {node.excerpt}
            </Paragraph>
          </div>
        ))}
      </div>
    </Layout>
  )
}
ArticlesPage.propTypes = {
  data: PropTypes.object.isRequired,
}
export default ArticlesPage
