import Link from "next/link"

export default function Footer() {
    return (
        <>
        <footer className="w-11/12 sm:w-5/6 max-w-[800px] 
                        py-8 px-2
                        flex mx-auto justify-between content-between items-center
                        border-t border-pink-200">
            <p className="w-1/2">
                <Link href="https://www.producthunt.com/posts/foundersmash?utm_source=badge-featured&#38;utm_medium=badge&#38;utm_souce=badge-foundersmash" passHref>
                        <a target="_blank">
                            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=362069&#38;theme=neutral" alt="FounderSmash | Product Hunt" style={{width: '250px', height: '54px'}} />
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