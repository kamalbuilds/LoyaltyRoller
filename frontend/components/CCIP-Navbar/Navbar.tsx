import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect } from "react";
import ChainSelect from "../ChainSelect";
import { Button } from "@chakra-ui/react";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function CCIPNavbar() {
  
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>

          <div className={styles.navMiddle}>
            <Link href="/" className={styles.link}>
              Manage Liquidity Across On Dexes across Chains
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
          
          </div>
          <Button
              className='p-4 m-2 hover:cursor-pointer border-purple-800'
              bgColor="green"
            >
                Monitor Liquidity Postitions
          </Button>
        </div>
      </nav>
    </div>
  );
}
