import Link from "next/link"

export default function Footer() {
    return (
        <>
        <footer className="w-11/12 sm:w-5/6 max-w-[800px] 
                        py-8 px-2
                        flex mx-auto justify-between content-between items-center
                        border-t border-pink-200">
            <p className="w-1/2">
                <Link href="http://www.producthunt.com" passHref>
                    <a className="ml-1 underline" target="_blank">
                        Product Hunt
                    </a>
                </Link>
            </p>
            <p className="w-1/2 text-right">
                Made with <span className="text-red-500">&#10084;</span> from 🇪🇪
            </p>
        </footer>
        </>
    )
}