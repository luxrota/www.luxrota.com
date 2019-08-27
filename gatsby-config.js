module.exports = {
  siteMetadata: {
    title: 'Lux Rota',
    description: 'Machine Intelligence',
    author: '@luxrota',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/luxrota.svg', // relative to site root
      },
    },
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          // ordered
          require('postcss-import')(),
          require('postcss-nested')(),
          // alphabetical
          require('autoprefixer')(),
          require('postcss-at2x')(),
          require('postcss-css-variables')(),
          require('postcss-custom-media')(),
          require('postcss-normalize')({ browsers: 'last 2 versions' }),
          require('stylelint')({ configFile: '.stylelintrc' }),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Quattrocento Sans',
            variants: ['400'],
          },
          {
            family: 'Lustria',
            variants: ['400'],
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
  ],
}
