import Layout from '../components/layout/layout'
import VotingCards from '../components/founders/cards'
import { parseCookies } from "../lib/parseCookies";
import { useState } from 'react';

export default function Voting({ initialRememberValue, votingState }) {

  const [rememberVoter, setRememberVoter] = useState(initialRememberValue)

  return (
    <>
      <VotingCards cookie={{voter: initialRememberValue, votingstate: votingState}}></VotingCards>
    </>
  )
}

Voting.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberVoter,
    votingState: cookies.votingStatus
  };
};

Voting.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
