import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="error-title">404</h1>
                <section className="content-body">
                    <p className="content-title">page not found</p>
                    <Link to="/">return home</Link>
                </section>
            </article>
        </div>
    </Layout>
)

export default NotFoundPage
