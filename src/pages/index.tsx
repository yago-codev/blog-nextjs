import { useEffect, useState } from 'react'
import { api } from '../services'

import styles from '../styles/home.module.scss'

interface IPost {
  id: string
  title: string
}

export default function Home() {
  const { postsUrl } = api;
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    fetch(postsUrl)
      .then(response => {
        response.json()
          .then(data => setPosts(data))
      })
  }, [])

  return (
    <>
      <h1>
        Posts
      </h1>
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>
            {title}
          </li>
        ))}
      </ul>
    </>
  )
}
