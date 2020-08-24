import React, { useEffect }  from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Commento, Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { TableOfContents } from '../components/common/toc'

import Prism from 'prismjs'
import config from '../utils/siteConfig'

import mediumZoom from 'medium-zoom'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    var toc = post.childHtmlRehype && post.childHtmlRehype.tableOfContents || []
    toc = toc.concat([{"id":"comments", "heading":"Comments"}]);

    useEffect(() => {
        mediumZoom('.content-body img[src*="blog.aaronward.info"]');
        Prism.highlightAll();
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
                        <h1 className="content-title">{ post.title }</h1>
                        <section className="post-full-content">
                            <TableOfContents toc={ toc } url={ post.url }/>
                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                        <section>
                            <h1 id="comments">Comments</h1>
                            <Commento id={post.id} url={config.commentsUrl} />
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
