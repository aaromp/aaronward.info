import React, { useState, Fragment } from "react";
import PropTypes from 'prop-types'

// Styles
import '../../styles/app.css'

function MastLetter({ char }) {
  const [hoverClass, setHoverClass] = useState("mast-letter");
  return (
    <span
      className={hoverClass}
      onMouseOver={() => setHoverClass("mast-letter hovered")}
      onMouseLeave={() => setHoverClass("mast-letter unhovered")}
    >
      {char}
    </span>
  );
}

function MastWord({ word }) {
  return (
    <span style={{ display: "inline-block" }} className="mast-word">
      {word.split("").map((letter, letterIndex) => (
        <MastLetter index={letterIndex} char={letter} />
      ))}
    </span>
  );
}

function MastText({ children, isHome }) {
  return (
      <h1 className={`mast-text ${isHome ? "is-home" : ""}`}>
        {children.split(" ").map((word, wordIndex) => (
          <Fragment>
            <MastWord key={wordIndex} word={word} />
            <span className="mast-space"> </span>
          </Fragment>
        ))}
      </h1>
  );
}

MastText.propTypes = {
    children: PropTypes.node.isRequired,
    isHome: PropTypes.bool,
}

export default MastText
