import React from "react";
import { nullLiteral } from "@babel/types";

class Tooltip extends React.Component {
  render() {
    const { ticksY, scaleX, scaleY, height, width, values } = this.props;
    const barXPos = scaleX(4) + scaleX.bandwidth() / 2;
    const barYPos = height - scaleY(values[4]);
    const halfContainerWidth = width / 2;
    console.log(
      barYPos,
      height,
      barXPos > halfContainerWidth,
      width - barXPos <= 100
    );

    const isLeft = width - barXPos <= 100;
    const pathR = "0,0 100,0 100,42 14,42 0,60";
    const pathL = "0,0 100,0 100,60 86,42 0,42";
    const path = isLeft ? pathL : pathR;

    const xPos = isLeft ? barXPos - 100 : barXPos;
    const yPos = barYPos - 60 > height ? 60 : barYPos - 60;
    return (
      <g transform={`translate(${xPos},${yPos})`}>
        <polygon points={path} fill="#FFF" stroke="rgba(0,0,0,.1)" />
        <text
          x={50 / 2}
          dy={15}
          dx={15}
          alignmentBaseline="middle"
          textAnchor="middle"
          stroke={"green"}
          strokeWidth={1}
        >
          {`${1999} ton`}
        </text>
        <text
          x={50 / 2}
          dy={30}
          dx={15}
          alignmentBaseline="middle"
          textAnchor="middle"
          stroke={"red"}
          strokeWidth={1}
        >
          {`${19999} lbs`}
        </text>
      </g>
    );
  }
}

Tooltip.defaultProps = {
  ticksY: [],
  scaleX: i => i,
  scaleY: i => i,
  height: 0,
  values: []
};

export default Tooltip;
