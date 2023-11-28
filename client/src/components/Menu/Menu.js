import './Menu.css';

const Menu = ({ startTrivia }) => {
  return (
    <div>
      <img src="logo.png" alt="Trivia Game Show Logo"></img>
      <button onClick={startTrivia}>Play Trivia</button>
    </div>
  );
}

export default Menu;
