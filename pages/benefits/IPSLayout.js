import Image from 'next/image'
import Link from 'next/link'
import src from '../../assets/header-logo.png'
export default function IPSLayout({children}) {
    return (
      <>
      <nav className='header'>
        <h1 className='logo'>
          <a href='#'>iProtectSmart</a>
        </h1>
        <Image
        src={src}
        height={30}
        width={160}
        style={{alignSelf:"center"}}
        alt='header-logo'
        />
        <ul className={`main-nav`}>
          <li>
            <Link href='/' legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/' legacyBehavior>
              <a>Claims Center</a>
            </Link>
          </li>
          <li>
            <Link href='/' legacyBehavior>
              <a>Translate</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="page-content">
        { children }
      </div>
      </>
  )
}