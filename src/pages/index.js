import {graphql, Link} from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Heading from '../components/heading'
import Layout from '../components/layout'
import Paragraph from '../components/paragraph'
import SEO from '../components/seo'

import Article from '../components/article'
import Aside from '../components/aside'
import Section from '../components/section'

export const query = graphql`{
  site {
    siteMetadata {
      description
    }
  }
}`

const IndexPage = ({data}) => {
  const {description} = data.site.siteMetadata
  return (
    <Layout heading={description}>
      <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
      <Section>
        <Article>
          <Paragraph>
            Eu nulla consectetur pariatur incididunt sunt do qui irure. Nulla
            consequat dolore aute tempor consectetur. Laborum ex ad consectetur
            pariatur adipisicing consectetur quis anim amet et id consequat ea
            nulla. Dolore duis veniam ipsum mollit non pariatur id.
          </Paragraph>
          <Link to='/articles'>Articles</Link>
        </Article>
        <Aside>
          <img src="http://via.placeholder.com/500x250"
               style={{maxWidth: "100%"}}
               />
        </Aside>
      </Section>
      <Section>
        <Article>
          <Paragraph>
            Eu nulla consectetur pariatur incididunt sunt do qui irure. Nulla
            consequat dolore aute tempor consectetur. Laborum ex ad consectetur
            pariatur adipisicing consectetur quis anim amet et id consequat ea
            nulla. Dolore duis veniam ipsum mollit non pariatur id.
          </Paragraph>
        </Article>
        <Aside>
          <img src="http://via.placeholder.com/500x250"
               style={{maxWidth: "100%"}}
               />
        </Aside>
      </Section>

    </Layout>
  )
}
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}
export default IndexPage
