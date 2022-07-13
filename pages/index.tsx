import type { NextPage } from 'next'
import Layout from '../components/layout'
import AddressFields from '../components/addressFields'

const Home: NextPage = () => {
  return (
    <Layout>
      <p>Hello World!</p>
      <AddressFields />
    </Layout>
  )
}

export default Home
