import React from "react";

class Grid extends React.Component {
  render() {
    const { ticksY, scaleX, scaleY, height, gridColor } = this.props;

    return ticksY.map(value => {
      const ypos = scaleY(value);
      const [xpos1, xpos2] = scaleX.range();
      return (
        <line
          x1={xpos1}
          y1={height - ypos}
          x2={xpos2}
          y2={height - ypos}
          stroke={gridColor}
        />
      );
    });
  }
}

Grid.defaultProps = {
  ticksY: [],
  scaleX: i => i,
  scaleY: i => i,
  height: 0,
  gridColor: "#FFF"
};

export default Grid;
