import Footer from '../footer/footer'
import Header from '../header/header'
import Meta from '../meta/meta'

export default function Layout({ children }) {
    return (
        <>
            <Meta></Meta>
            <div className="h-screen flex flex-col">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        </>
    )
}