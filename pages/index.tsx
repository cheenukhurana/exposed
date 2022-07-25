import type { NextPage } from 'next'
import Layout from '../components/layout'
import AddressFields from '../components/addressFields'

const Home: NextPage = () => {
  return (
    <Layout>
      <AddressFields />
    </Layout>
  )
}

export default Home
