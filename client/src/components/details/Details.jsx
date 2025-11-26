import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import CreateComment from './create-comment/CreateComment.jsx';
import DetailsComments from '../edit/details-comments/DetailsComments.jsx';

const Base_URL = `http://localhost:3030/jsonstore/games`;

export default function Details({ user }) {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${Base_URL}/${gameId}`)
      .then((response) => response.json())
      .then((result) => setGame(result))
      //  .then(setGame)
      .catch((err) => alert(err.message));
  }, [gameId]);

  const deleteGameHandler = async () => {
    const isConfirmed = confirm(`Are you sure you want to delete game: ${game.title}`);

    if (!isConfirmed) {
      return;
    }
    try {
      await fetch(`${Base_URL}/${gameId}`, {
        method: 'DELETE',
      });

      navigate('/');
    } catch (err) {
      alert('Unable to delete game: ', err.message);
    }
  };

  const refreshHandler = () => {
    setRefresh((state) => !state);
  };

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="header-and-image">
          <img className="game-img" src={game.imageUrl} alt="Elden Ring Cover Art" />

          <div className="meta-info">
            <h1 className="game-name">{game.title}</h1>

            <p className="data-row">
              <span className="label">Genre:</span>
              <span className="value">{game.genre}</span>
            </p>

            <p className="data-row">
              <span className="label">Active Players:</span>
              <span className="value">{game.players}</span>
            </p>

            <p className="data-row">
              <span className="label">Release Date:</span>
              <span className="value">{game.date}</span>
            </p>
          </div>
          <div className="summary-section">
            <h2>Summary:</h2>
            <p className="text-summary">{game.summary}</p>
          </div>
        </div>

        {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
        <div className="buttons">
          <Link to={`/games/${gameId}/edit`} className="button">
            Edit
          </Link>
          {/* <Link to={`/games/${gameId}/delete`} className="button">Delete</Link> */}
          <button className="button" onClick={deleteGameHandler}>
            Delete
          </button>
        </div>

        <DetailsComments refresh={refresh} />
      </div>
      {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
      {user && <CreateComment user={user} onCreate={refreshHandler} />}
    </section>
  );
}
