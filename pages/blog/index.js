import Head from 'next/head'
import Link from 'next/link'

import { getAllPosts } from '../../lib/api'

import styles from '../../styles/Home.module.css'
import blogStyles from '../../styles/Blog.module.css'

const Blog = ({ allPosts: { edges } }) => (
  <div className={styles.container}>
    <Head>
      <title>Blog articles page</title>
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Latest blog articles</h1>
      <hr />
      <section>
        {edges.map(({ node }) => (
          <div className={blogStyles.listitem} key={node.id}>
            <div className={blogStyles.listitem__content}>
              <h2>{node.title}</h2>
              <Link href={`/blog/${node.slug}`}>
                <a>Read more</a>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  </div>
)

export default Blog

export const getStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: {
      allPosts
    }
  }
}
