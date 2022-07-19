import Head from 'next/head'

export default function Layout({ children }) {
    return (
        <div className='bg-[#000426] min-h-screen'>
        {/* <div className="bg-gradient-to-br from-[#27235f] to-[#ea088c] h-screen"> */}
        {/*Colors for covalent: LightblueLogo:#26abe2, PinkLogo:#ea088c, DarkBlueLogo:#27235f, DArkBackgroundWebsite:#000426 */}
            <Head>
                <title>Exposed</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <div className='max-w-3xl mx-auto py-4'>
                <header className="text-center">
                    <h1 className="text-white text-3xl">Has your address been exposed?</h1>
                    <h6 className="text-[#dbe1e8] text-md mt-4">Enter your addresses and check which are linked with each other</h6>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}