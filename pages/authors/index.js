import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Authors.module.css'
import { getAllAuthorData } from '../../lib/authors'
import { getAllPageData } from '../../lib/pages'
import { getLayout } from '../../components/Layout/Layout'
import { Fragment } from 'react'
import PageHeader from '../../components/UI/PageHeader'
import HeaderPractice from '../../components/UI/HeaderPractice'

const Authors = ({ allAuthorData }) => {
    // console.log(allAuthorData)
    const authors = allAuthorData.map((author) => {
        console.log(author)
        return (
            <Link href={`/authors/${author.id}`} className={styles.gridItem} key={author.id}>
                <a>
                    <Image 
                        src={author.image}
                        alt={`${author.first_name} ${author.last_name}`}
                        width={400}
                        height={500}
                    />
                    <h2 className={styles.authorTitle}>{author.first_name} {author.last_name}</h2>
                </a>
            </Link>
        )
    })
    console.log('authors', authors)
    
    return (
        <Fragment>

            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/assets/tva_logo.png" />
            </Head>
            <HeaderPractice title="Meet our authors"/>
            {/* <PageHeader title='Meet our authors'/> */}
            <div className={styles.gridWrapper}>
                    {authors}
            </div>
        </Fragment>
  )
}

const getStaticProps = async () => {
    const allAuthorData = getAllAuthorData();
    allAuthorData.map((author) => {
        console.log('author', author)
        author.book_releases.map((book_release) => {
            const dateObj = new Date(book_release.release_date)
            const dateString = dateObj.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })
            book_release.release_date = dateString;
            return book_release;
        })
        const dateObj = new Date(author.date)
        const dateString = dateObj.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })
        author.date = dateString;
        return author;
    })
    const allPageData = getAllPageData()
    return {
        props: {
            allPageData,
            allAuthorData
        } 
    }
}

Authors.getLayout = getLayout; 
export { Authors as default, getStaticProps }