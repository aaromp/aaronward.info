import React, { useEffect }  from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { TableOfContents } from '../components/common/toc'

import Prism from 'prismjs'
import "prismjs/plugins/autoloader/prism-autoloader"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.js"
import "prismjs/plugins/toolbar/prism-toolbar.js"
import "prismjs/plugins/toolbar/prism-toolbar.css"
import "prismjs/plugins/show-language/prism-show-language.js"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"
import "prismjs/themes/prism-tomorrow.css"

import mediumZoom from 'medium-zoom'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage
    const toc = page.childHtmlRehype && page.childHtmlRehype.tableOfContents || []

    const html = page.html.replace(
        new RegExp("<pre><code", "g"), '<pre class="line-numbers"><code'
    );

    useEffect(() => {
        mediumZoom('.kg-image');
        mediumZoom('.kg-gallery-image img');
        Prism.highlightAll();
    });

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container content">
                    <h1 className="content-title">{page.title}</h1>
                    <article className="post-full-content">
                        <TableOfContents toc={ toc } url={ page.url }/>
                        {/* The main page content */}
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </article>
                </div>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
