import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import Grid from "./Grid";
import Tooltip from "./Tooltip";

class BarChar extends React.Component {
  state = {
    tooltip: null
  };
  render() {
    const { data } = this.props;
    const { values, labels, colors, yMax, xMax } = data;
    const height = 600;
    const width = 800;
    const columPaddingInner = 0.1;
    const columPaddingOuter = 0.1;
    const columsLeftOffset = 54;
    const columsRightOffset = 10;
    const columsBottomOffset = 30;
    const xLabesFontSize = 16;
    const xLabelsVerticalOffset = 6;
    const yScaleMaxValue = height - 30;
    const yScaleMinValue = columsBottomOffset;
    const xScaleMaxValue = width - columsRightOffset;
    const xScaleMinValue = columsLeftOffset;
    const maxValueY = yMax || max(values.map(value => value.y));
    const minValueY = 0;
    const maxValueX = xMax || max(values.map(value => value.x));
    const minValueX = 0;
    const gridColor = "rgba(0, 0, 0, .1)";
    const labelsColor = "rgba(0, 0, 0, .3)";

    const scaleY = scaleLinear()
      .domain([minValueY, maxValueY])
      .range([yScaleMinValue, yScaleMaxValue]);

    const scaleX = scaleLinear()
      .domain([minValueX, maxValueX])
      .range([xScaleMinValue, xScaleMaxValue]);
   

    return (
      <div className="App">
        <svg
          height="600"
          width="800"
          viewBox={`0 0 ${width} ${height}`}
          style={{
            border: "1px solid rgba(0, 0,0, .1)",
            margin: "1em 0 1em calc(50vw - 400px)"
          }}
        >
          {values.map(({x, y}) => {
            const ypos = scaleY(y);
            const xpos = scaleX(x);
            return (
              <text
                x={xpos - xLabesFontSize - 30}
                y={height - ypos}
                font-family="Verdana"
                font-size={xLabesFontSize}
                dominantBaseline="middle"
                fill={labelsColor}
              >
                {x + ' ' + y}
              </text>
            );
          })}
          
        </svg>
      </div>
    );
  }
}

BarChar.defaultProps = {
  data: {
    values: [
      { x: 600, y: 1600 },
      { x: 870, y: 1000 },
      { x: 100, y: 400 },
      { x: 300, y: 850 },
      { x: 360, y: 760 },
      { x: 500, y: 900 },
      { x: 700, y: 1500 }
    ],
    yMax: null,
    labels: ["a", "b", "c", "d", "e", "f", "g"],
    colors: [
      "#FF6384",
      "#36A2EB",
      "#FFCD56",
      "#4BC0C0",
      "#FF9F40",
      "#9966FF",
      "#C9CBCF"
    ]
  }
};

export default BarChar;
