import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Chat.module.css';

export default function Chat() {
  const router = useRouter();
  
  useEffect(() => {
    // Add profile button to the sidebar
    const userInfo = document.querySelector(`.${styles.userInfo}`);
    if (userInfo) {
      userInfo.style.cursor = 'pointer';
      userInfo.addEventListener('click', () => {
        router.push('/profile');
      });
    }
  }, [router]);
  
  // Rest of the chat component remains the same
  // This update just adds the ability to navigate to the profile page
  // by clicking on the user avatar in the sidebar
}
