import Layout from "../components/layout/layout"
import { useState, useEffect } from "react"
import Link from "next/link"
import { v4 } from "uuid"
import Cookie from "js-cookie"
import { parseCookies } from "../lib/parseCookies"
import { supabase } from "../utils/supabaseClient"

export default function Index({ initialRememberValue }) {

  const voterID = v4()
  const [voter, setVoter] = useState("")
  const [rememberVoter, setRememberVoter] = useState(initialRememberValue)

  const createVoter = async () => {
    try {
      const { data, error } = await supabase
        .from("voters")
        .insert([
          {
            id: voterID
          },
        ])
        .single();
      if (error) throw error;
      console.log("The Voter ID has been saved in Supabase.");
      console.log(voterID);
      Cookie.set("rememberVoter", voterID);
      setVoter(voterID);
    } catch (error) {
      console.log("An error occurred while inserting a Voter ID into Supabase.");
    }
  };

  return (
    <>
      <div className="h-fit w-11/12 sm:w-5/6 max-w-[800px]  
                  mx-auto py-5 sm:py-20
                  flex flex-col sm:flex-row justify-center content-between items-center
                  text-center sm:text-left">
        <div className="w-full p-4 text-center">
          <h3 className="my-4 text-5xl sm:text-7xl font-regular leading-tight sm:leading-tight">
            Pass 🙅 or Smash 😈 on Silicon Valley&#39;s 💸 top founders 👀
          </h3>

          {
            initialRememberValue &&
            <Link href="/voting">
              <button className="mt-3 sm:mt-6 sm:mb-3 py-4 
                            w-full sm:w-[300px]
                            rounded-full 
                            bg-pink-500 text-white 
                            hover:bg-pink-600 active:bg-pink-600 
                            focus:outline-none focus:ring focus:ring-slate-300 
                            disabled:bg-slate-200 disabled:text-slate-500"
              >
                Get Started
              </button>
            </Link>
          }

          {
            !initialRememberValue &&
            <Link href="/voting">
              <button className="mt-3 sm:mt-6 sm:mb-3 py-4 
                            w-full sm:w-[300px]
                            rounded-full 
                            bg-pink-500 text-white 
                            hover:bg-sky-500 active:bg-sky-500  
                            focus:outline-none focus:ring focus:ring-slate-300 
                            disabled:bg-slate-200 disabled:text-slate-500"
                disabled={initialRememberValue}
                onClick={() => { createVoter() }}
              >
                Get Started
              </button>
            </Link>
          }
        </div>
      </div>
    </>
  )
}

Index.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberVoter
  };
};

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
