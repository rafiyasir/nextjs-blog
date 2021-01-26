import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

import {useState} from "react";
import {useRouter} from "next/router";

import { getSortedPostsData } from '../lib/posts'

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData, action="/search"}) {

    const router = useRouter()
    const [query, setQuery] = useState('')
 
    const handleParam = setValue => e => setValue(e.target.value)
 
    const handleSubmit = preventDefault(() => {
      router.push({
        pathname: action,
        query: {q: query},
      })
    })

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I am Rafi Uzzaman I can write JavaScript and Know function is also an object in JavaScript.
        </p>
        <p>
          (This is a sample website.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Form</h2>
        <form onSubmit={handleSubmit}>
        <input className={`${utilStyles.input}`}
          type='text'
          name='q'
          value={query}
          onChange={handleParam(setQuery)}
          placeholder='Search'
          aria-label='Search'
        />
      </form>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          <Link href="/editor"><a>Go To Editor Page</a></Link>
        </h2>
      </section>
    </Layout>
  )
}