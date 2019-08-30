import hljs from 'highlight.js/lib/highlight'
import hlpy from 'highlight.js/lib/languages/python'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React, { createElement } from 'react'
import RehypeReact from 'rehype-react'

import Article from '../components/article'
import Aside from '../components/aside'
import Heading from '../components/heading'
import Layout from '../components/layout'
import List from '../components/list'
import ListItem from '../components/listItem'
import Paragraph from '../components/paragraph'
import Preformat from '../components/preformat'
import Section from '../components/section'
import Table from '../components/table'
import TableCell from '../components/tableCell'
import TableHeading from '../components/tableHeading'
import TableRow from '../components/tableRow'

import 'highlight.js/styles/solarized-light.css'


/* eslint-disable react/display-name, react/prop-types */
const renderAst = new RehypeReact({
  createElement,
  components: {
    article:  Article,
    aside:    Aside,
    h1:       Heading,
    h2:       (props) => createElement(Heading, {level: 2}, props.children),
    h3:       (props) => createElement(Heading, {level: 3}, props.children),
    h4:       (props) => createElement(Heading, {level: 4}, props.children),
    h5:       (props) => createElement(Heading, {level: 5}, props.children),
    h6:       (props) => createElement(Heading, {level: 6}, props.children),
    li:       ListItem,
    ol:       List,
    p:        Paragraph,
    pre:      Preformat,
    section:  Section,
    table:    Table,
    td:       TableCell,
    th:       TableHeading,
    tr:       TableRow,
    ul:       List,
  }
}).Compiler
/* eslint-enable react/display-name, react/prop-types */

// markdown code snippet highlighting
hljs.registerLanguage('python', hlpy);
hljs.initHighlightingOnLoad();

// template metadata query
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
        readingTime {
          text
        }
      }
    }
  }
`


/**
 * Article Template
 */
const ArticleTemplate = ({data}) => {
  const {markdownRemark} = data
  const {fields, frontmatter, htmlAst} = markdownRemark
  return (
    <Layout heading={frontmatter.title}>
      <div>{frontmatter.date}</div>
      <div>{fields.readingTime.text}</div>
      <div>
        {renderAst(htmlAst)}
      </div>
    </Layout>
  )
}
ArticleTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ArticleTemplate
