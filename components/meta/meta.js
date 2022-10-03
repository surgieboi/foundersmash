import Head from 'next/head'

export default function Meta() {
    return (
        <>
            <Head>
                <title>FounderSmash | Pass or Smash on Top Founders</title>
                <meta name="description" content="FounderSmash | Pass or Smash on Top Founders" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <link rel="icon" href="/favicon.png" />
                <meta property="og:title" content="FounderSmash" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://foundersmash.vercel.app/" />
                <meta property="og:image" content="https://foundersmash.vercel.app/og.jpg" />
                <meta name="twitter:title" content="FounderSmash" />
                <meta name="twitter:description" content="Pass or Smash on Top Founders" />
                <meta name="twitter:image" content="https://foundersmash.vercel.app/og.jpg" />
                <meta name="twitter:card" content="summary_large_image"></meta>
            </Head>
        </>
    )
}
