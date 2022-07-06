import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import { getAllPageData } from '../../../lib/pages'
import { getAllAuthorIDs, getAuthorData } from '../../../lib/authors'
import { getAllBookData } from '../../../lib/books'
import { getLayout } from '../../../components/Layout/Layout'

import styles from '../../../styles/AuthorID.module.css'
import bookStyles from '../../../styles/BookID.module.css'
import booksStyles from '../../../styles/Books.module.css'

import ArrowIcon from '../../../components/UI/ArrowIcon'
import { SocialIcon } from 'react-social-icons';
import ShowMoreText from '../../../components/UI/ShowMoreText'

const Author = ({authorData, bookData}) => {
    console.log(authorData, bookData)

    const authorsName = `${authorData.first_name} ${authorData.last_name}`
    const bookReviews = bookData[0].book_reviews.map((review, index) => {
      return <li className={bookStyles.review} key={index}>
        <span className={bookStyles.reviewContent}>{`"${review.review}"`}</span>&nbsp;
        <span className={bookStyles.reviewAuthor}>{review.by}</span>
      </li>

    })
    const releasedBooks = bookData.map((book_release) => {
      console.log(book_release.bookid)
        return <Link href={`/${book_release.id}`} className={booksStyles.gridItem} key={book_release.bookid}>
                <a>
                    <Image 
                        src={book_release.image}
                        alt={`${book_release.title}`}
                        width={400}
                        height={500}
                    />
                </a>
        </Link>
    })
    
    return ( <Fragment>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/assets/tva_logo.png" />
        </Head>
        <section className={styles.authorWrapper}>
            <div className={styles.col_1}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={authorData.image} 
                  alt={authorsName}
                  layout="fill"
                  />

              </div>
            </div>
            <div  className={styles.col_2}>
              <h1 className={`${styles.headerLg} ${styles.headerBlue}`}>
                {authorsName}
              </h1>
              <h3 className={`${styles.headerSm} ${styles.headerGrey}`}>Author</h3>
              <ShowMoreText content={authorData.markdownBody}/>
            </div>
            <div  className={styles.col_3}>
              <h3 className={`${styles.headerSm} ${styles.headerBlue}`}>Social Links</h3>
              <ul className={styles.socialLinks}>
                {authorData.twitter && <li className={styles.listItem}><SocialIcon url="https://twitter.com" bgColor="#39778B" network="twitter" style={{ height: 40, width: 40 }}/><span className={styles.paddingLft}>{authorData.twitter}</span></li>}
                {authorData.instagram && <li className={styles.listItem}><SocialIcon url="https://instagram.com" bgColor="#39778B" network="instagram" style={{ height: 40, width: 40 }}/><span className={styles.paddingLft}>{authorData.instagram}</span></li>}
                {authorData.url && <li className={styles.listItem}><SocialIcon url="https://instagram.com" bgColor="#39778B" network="dribbble" style={{ height: 40, width: 40 }}/><span className={styles.paddingLft}>{authorData.url}</span></li>}
              </ul>
            </div>
        </section> 
        <section className={bookStyles.greyColourContainer}>
            <ArrowIcon className={styles.arrow} />
          <div className={bookStyles.bookWrapper}>
            <div className={bookStyles.col_2}>
              <div className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={bookData[0].image} 
                    alt={authorsName}
                    layout="fill"
                    />
              </div>
              <span className={bookStyles.tag}>Genre: {bookData[0].genre}</span>
            </div>
            <div className={bookStyles.col_1}>
              <h2 className={`${bookStyles.headerLg} ${styles.headerBlue}`}>Latest Release</h2>
              <h3 className={`${styles.headerSm} ${styles.headerGrey}`}><span className={styles.bold}>{bookData[0].title}</span> by {authorsName}</h3>
              <p className={styles.text}>
                {bookData[0].markdownBody}
              </p>
              <ul className={bookStyles.reviewWrapper}>
                {bookReviews}
              </ul>
            </div>
          </div>
        </section>
        <section className={booksStyles.blueColourContainer}>
          <div className={booksStyles.allBooks}>
              <h2 className={`${bookStyles.headerLg} ${styles.headerBlue}`}>Other Publications</h2>
              <h3 className={`${styles.headerSm} ${styles.headerDark}`}>by {authorsName}</h3>
              <ul className={booksStyles.gridWrapper}>
                  {releasedBooks}
              </ul>
          </div>
        </section>
    </Fragment>
    )
}

const getStaticPaths = async () => {
    const paths = getAllAuthorIDs();
    console.log(paths)
    return {
        paths,
        fallback: false,
    };
}
const getStaticProps = async ({params}) => {
  const allPageData = getAllPageData();
  const authorData = getAuthorData(params.authorID)
  let dateObj = new Date(authorData.date)
  const uniqueID = `${dateObj.getDate()}${dateObj.getHours()}${dateObj.getMinutes()}`;
  authorData.date = uniqueID;

  const bookData = getAllBookData(authorData)
  bookData.map((book_release) => {
    const dateObj = new Date(book_release.publish_date)
    const dateString = dateObj.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })
    book_release.publish_date = dateString;
    return book_release;
  })
  return {
      props: {
        allPageData,
        authorData,
        bookData
      } 
  }
}

Author.getLayout = getLayout; 
export {Author as default, getStaticProps, getStaticPaths};