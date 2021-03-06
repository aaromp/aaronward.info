import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <Link to={url} className="post-card" aria-label={`${post.title} post`} style={post.feature_image && {
            backgroundImage: `url(${post.feature_image})` ,
        }}>
            <header className="post-card-header">
                {post.tags.length && <div className="post-card-tags goo">
                    <Tags post={post} visibility="public" autolink={false} />
                </div>}
                {post.featured && <span className="post-card-featured goo">📍</span>}
            </header>
            <footer className="post-card-footer">
                <p className="post-card-metadata goo"><span>{post.published_at_pretty}</span> • <span>{readingTime}</span></p>
                <h2 className="post-card-title goo">{post.title}</h2>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
