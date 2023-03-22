import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  return (
    <main>
      <h1>BookDetails {id}</h1>
    </main>
  );
};

export default BookDetails;
