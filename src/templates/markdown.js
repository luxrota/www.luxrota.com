import { graphql } from 'gatsby'
import hljs from 'highlight.js/lib/highlight'
import hlBash from 'highlight.js/lib/languages/bash'
import hlCpp from 'highlight.js/lib/languages/cpp'
import hlJavascript from 'highlight.js/lib/languages/javascript'
import hlPython from 'highlight.js/lib/languages/python'
import PropTypes from 'prop-types'
import React from 'react'
import RehypeReact from 'rehype-react'

import Article from '../components/article'
import Aside from '../components/aside'
import Code from '../components/code'
import Heading from '../components/heading'
import Image from '../components/image'
import Layout from '../components/layout'
import Link from '../components/link'
import List from '../components/list'
import ListItem from '../components/listItem'
import Paragraph from '../components/paragraph'
import Preformat from '../components/preformat'
import Section from '../components/section'
import SEO from '../components/seo'
import Table from '../components/table'
import TableCell from '../components/tableCell'
import TableHeading from '../components/tableHeading'
import TableRow from '../components/tableRow'

import 'highlight.js/styles/default.css'


// to convert markdown html => react components
/* eslint-disable react/display-name, react/prop-types */
const createHeading = (props, level) => {
  return React.createElement(Heading, {...props, level}, props.children)
}
const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    a:        Link,
    article:  Article,
    aside:    Aside,
    code:     Code,
    h1:       Heading,
    h2:       (props) => createHeading(props, 2),
    h3:       (props) => createHeading(props, 3),
    h4:       (props) => createHeading(props, 4),
    h5:       (props) => createHeading(props, 5),
    h6:       (props) => createHeading(props, 6),
    img:      Image,
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

// markdown code highlighting
hljs.registerLanguage('bash', hlBash);
hljs.registerLanguage('cpp', hlCpp);
hljs.registerLanguage('javascript', hlJavascript);
hljs.registerLanguage('python', hlPython);

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
 * Markdown Template
 */
const MarkdownTemplate = ({data}) => {
  const {markdownRemark} = data
  const {fields, frontmatter, htmlAst} = markdownRemark
  return (
    <Layout date={frontmatter.date}
            readtime={fields.readingTime.text}
            title={frontmatter.title}
            >
      <SEO title={frontmatter.title} keywords={frontmatter.keywords} />
      {renderAst(htmlAst)}
    </Layout>
  )
}
MarkdownTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MarkdownTemplate
