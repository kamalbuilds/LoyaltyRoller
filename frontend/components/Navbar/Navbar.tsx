import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect } from "react";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/" className={styles.link}>
              LoyaltyRoller
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
          <ConnectWallet
            theme={"dark"}
            modalTitle={"Welcome"}
            welcomeScreen={{
              title: "Welcome to Commercial NFTs",
              subtitle: "Connect Wallet to Onboard",
              img: {
                src: "https://alexablockchain.com/wp-content/uploads/2021/08/How-To-Launch-A-White-label-NFT-Marketplace.jpg",
                width: 250,
                height: 150,
              },
            }}
          />
          </div>
        </div>
      </nav>
    </div>
  );
}
