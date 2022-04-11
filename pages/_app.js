import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(checkUser)
    checkUser()
    return () => {
      authListener?.unsubscribe()
    };
  }, [])
  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
  <div>
    <div>
      <Component {...pageProps} />
    </div>
  </div>
  )
}

export default MyApp


/* 
{ user ? (
    <nav className="p-6 border-b border-gray-300">
      <Link href="/">
        <a className="m-6">Home</a>
      </Link>
        
          <Link href="/create-post">
            <a className="m-6">Create Post</a>
          </Link>
          <Link href="/my-posts">
            <a className="m-6">My Posts</a>
          </Link>
    </nav>
    ) : (
      <div>
       
      </div>
    )}
*/