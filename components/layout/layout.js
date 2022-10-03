import Footer from '../footer/footer'
import Header from '../header/header'
import Meta from '../meta/meta'
import Script from 'next/script'

export default function Layout({ children }) {
    return (
        <>
            <Meta></Meta>
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
            <div className="h-screen flex flex-col">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        </>
    )
}