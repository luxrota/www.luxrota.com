import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import RehypeReact from 'rehype-react'

import Heading from '../components/heading'
import Layout from '../components/layout'
import List from '../components/list'
import ListItem from '../components/listItem'
import Paragraph from '../components/paragraph'
import Table from '../components/table'
import TableCell from '../components/tableCell'
import TableHeading from '../components/tableHeading'
import TableRow from '../components/tableRow'

/* eslint-disable react/display-name, react/prop-types */
const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: Heading,
    h2: (props) => React.createElement(Heading, {level: 2}, props.children),
    h3: (props) => React.createElement(Heading, {level: 3}, props.children),
    h4: (props) => React.createElement(Heading, {level: 4}, props.children),
    h5: (props) => React.createElement(Heading, {level: 5}, props.children),
    h6: (props) => React.createElement(Heading, {level: 6}, props.children),
    li: ListItem,
    ol: List,
    p: Paragraph,
    table: Table,
    td: TableCell,
    th: TableHeading,
    tr: TableRow,
    ul: List,
  }
}).Compiler
/* eslint-enable react/display-name, react/prop-types */


export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path }}) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      fields {
        slug
      }
    }
  }
`

const ArticleTemplate = ({data}) => {
  const {markdownRemark} = data
  const {frontmatter, htmlAst} = markdownRemark
  return (
    <Layout heading={frontmatter.title}>
      <div className="blog-post-container">
        <div className="blog-post">
          <Heading level={2}>{frontmatter.date}</Heading>
          <div className="blog-post-content">
            {renderAst(htmlAst)}
          </div>
        </div>
      </div>
    </Layout>
  )
}
ArticleTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}
export default ArticleTemplate
