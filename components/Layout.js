import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/" passHref>
            <h1 className='books-nav'>
              <span>Just Join</span>
              <span>the Sci-Fi Space</span>
            </h1>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 Sci-Fly :)</p>
      </footer>
    </div>
  )
}