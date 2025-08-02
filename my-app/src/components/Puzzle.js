// PuzzleGame.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import './Puzzle.css';

const GRID_SIZE = 3; // 3x3 puzzle
const IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mughal_miniature_painting%2C_c._1620.jpg";

function shuffle(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const PuzzleGame = () => {
  const originalPieces = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      originalPieces.push({ id: `${r}-${c}`, row: r, col: c });
    }
  }

  const [pieces, setPieces] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    setPieces(shuffle(originalPieces));
  }, []);

  useEffect(() => {
    const solved = pieces.every(
      (piece, idx) => piece.id === originalPieces[idx].id
    );
    setIsSolved(solved);
  }, [pieces]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newPieces = Array.from(pieces);
    const [removed] = newPieces.splice(result.source.index, 1);
    newPieces.splice(result.destination.index, 0, removed);
    setPieces(newPieces);
  };

  return (
    <div className="puzzle-container">
      <h2 className="puzzle-title">Puzzle the Painting</h2>
      <div className="puzzle-subtitle">
        Rearrange the pieces to restore the artwork. <br />
        <span style={{ fontStyle: "italic" }}>
          Styles: Pattachitra, Tanjore, Mughal miniatures
        </span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {pieces.length > 0 && (
         <Droppable
  droppableId="puzzle"
  direction="vertical"
  isDropDisabled={false}
  isCombineEnabled={false}
  ignoreContainerClipping={false} // ✅ Add this to fix the error
>
  {(provided) => (
    <div
      className="puzzle-grid"
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={{
        pointerEvents: isSolved ? "none" : "auto",
        opacity: isSolved ? 0.8 : 1,
        display: "flex",
        flexWrap: "wrap",
        width: `${GRID_SIZE * 100}px`,
        height: `${GRID_SIZE * 100}px`,
      }}
    >
      {pieces.map((piece, idx) => (
        <Draggable
          key={piece.id}
          draggableId={piece.id}
          index={idx}
          isDragDisabled={isSolved}
        >
          {(provided) => (
            <div
              className="puzzle-piece"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${IMAGE_URL})`,
                backgroundSize: `${GRID_SIZE * 100}px ${GRID_SIZE * 100}px`,
                backgroundPosition: `-${piece.col * 100}px -${piece.row * 100}px`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "#fff",
                border: "1px solid #333",
                boxSizing: "border-box",
                ...provided.draggableProps.style,
              }}
            ></div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>

        )}
      </DragDropContext>

      {isSolved && (
        <div className="puzzle-message">
          🎉 You solved the puzzle!
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;

export const artStyles = [
  {
    name: "Pattachitra",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Pattachitra_Art.jpg"
  },
  {
    name: "Tanjore",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tanjore_painting.jpg"
  },
  {
    name: "Mughal miniatures",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mughal_miniature_painting%2C_c._1620.jpg"
  },
  {
    name: "Madhubani",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Madhubani_Art.jpg"
  },
  {
    name: "Warli",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Warli_Painting.jpg"
  },
  {
    name: "Kalamkari",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/13/Kalamkari_art.jpg"
  }
];
