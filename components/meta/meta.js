import Head from 'next/head'
import Script from 'next/script'

export default function Meta() {
    return (
        <>
            <Head>
                <title>FounderSmash | Pass or Smash on Top Founders</title>
                <meta name="description" content="Pass or Smash on Top Founders" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <link rel="icon" href="/favicon.png" />
                <meta property="og:title" content="FounderSmash | Pass or Smash on Top Founders" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://foundersmash.vercel.app/" />
                <meta property="og:image" content="https://foundersmash.vercel.app/og.jpg" />
                <meta name="twitter:title" content="FounderSmash" />
                <meta name="twitter:description" content="Pass or Smash on Top Founders" />
                <meta name="twitter:image" content="https://foundersmash.vercel.app/og.jpg" />
                <meta name="twitter:card" content="summary_large_image"></meta>
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                        ga('create', 'UA-238969693-3', 'auto');
                        ga('send', 'pageview');
                    `}
                </Script>
            </Head>
        </>
    )
}
