import './Menu.css';

const Menu = ({ startTrivia }) => {
  return (
    <div className="menu-container">
      <img src="logo.png" alt="Trivia Game Show Logo" className="logo"></img>
      <button onClick={startTrivia} className="play-button">Play Trivia</button>
    </div>
  );
}

export default Menu;
