import React, { useEffect }  from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { ReactComponent as Turbulence } from '../filters/turbulence.svg';

import Prism from 'prismjs'
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.js"
import "prismjs/plugins/toolbar/prism-toolbar.js"
import "prismjs/plugins/toolbar/prism-toolbar.css"
import "prismjs/plugins/show-language/prism-show-language.js"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"

import mediumZoom from 'medium-zoom'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const html = post.html.replace(
        new RegExp("<pre><code", "g"), '<pre class="line-numbers"><code'
    );

    useEffect(() => {
      setTimeout(() => {
        mediumZoom('.kg-image');
        mediumZoom('.kg-gallery-image img');
        Prism.highlightAll();
      }, 0);
    });

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={ post.feature_image } alt={ post.title } />
                            </figure> : null }
                        <Turbulence />
                        <section className="post-full-content">
                            <h1 className="content-title">{ post.title }</h1>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
