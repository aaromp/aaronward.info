import React, { useState, Fragment } from "react";
import PropTypes from 'prop-types'

// Styles
import '../../styles/app.css'

function MastLetter({ letter }) {
    const [hoverClass, setHoverClass] = useState("mast-letter");
    return (
        <span
          className={hoverClass}
          onMouseOver={() => setHoverClass("mast-letter hovered")}
          onMouseLeave={() => setHoverClass("mast-letter unhovered")}
        >
          {letter}
        </span>
    );
}

function MastWord({ word }) {
    return (
        <span style={{ display: "inline-block" }} className="mast-word">
            { word.split("").map((letter, letterIndex) => (
              <MastLetter key={ letterIndex } letter={ letter } />
            )) }
        </span>
    );
}

function MastText({ children, isHome }) {
    return (
        <h1 className={ `mast-text ${isHome ? "is-home" : ""}` }>
            {children.split(" ").map((word, wordIndex) => (
                <Fragment key={ wordIndex }>
                    <MastWord word={ word } key={ wordIndex } />
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
