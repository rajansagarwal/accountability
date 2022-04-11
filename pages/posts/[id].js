import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../api'

export default function Post({ post }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className="mt-20" style={{
        paddingLeft: '15%',
    }}>
      <h1 className="text-4xl text-black mt-4 font-bold tracking-wide">{post.title}</h1>
      <p className="text-lg text-black font-mono font-light my-4">{post.subtitle}</p>
      <div className="mt-8">
        <ReactMarkdown className='prose font-sans'>
        {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('id')
  const paths = data.map(post => ({ params: { id: JSON.stringify(post.id) }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const { data } = await supabase
    .from('posts')
    .select()
    .filter('id', 'eq', id)
    .single()
  return {
    props: {
      post: data
    }
  }
}