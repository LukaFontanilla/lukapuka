import React from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const Footer: React.FC = () => {
    return (
        <>
        <div style={{padding: "4rem 10rem 4rem 10rem"}}>
          <footer style={{borderTop: '1px solid #eaeaea'}}>
          {/* <div className={styles.footerRow}>
            <div className={styles.footerColumn}>
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            </div>
            <footer className={styles.footerColumn}>
            <a
              href="https://github.com/LukaFontanilla"
              target="_blank"
              rel="noopener noreferrer"
            >Github
            </a>
            </footer>
        </div> */}
        <br/>
        <br/>
        <text className="footerText">
        ┏(＾0＾)┛  ꕥ  ┗(＾0＾) ┓
        </text>
        </footer>
      </div>
      </>
    );
};

export default Footer;