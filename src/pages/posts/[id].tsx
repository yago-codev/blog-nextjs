import { useRouter } from 'next/router'

export default function Post() {
  const { query: { id }, asPath } = useRouter()

  return (
    <>
      <h1>Post {id}</h1>
      <h2>Rota atual: {asPath}</h2>
    </>
  )
}
