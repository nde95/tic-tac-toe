import "./gameboard.styles.css";
import Cell from "../../Cells/cell.component";


const Gameboard = () => {
    return (
    <div className="game-board">
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </div>
    )
}

export default Gameboard;