import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import Grid from "./Grid";

class BarChar extends React.Component {
  render() {
    const { data } = this.props;
    const { values, labels, colors } = data;
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
    const maxValue = max(values);
    const minValue = 0;
    const gridColor = "rgba(0, 0, 0, .1)";
    const labelsColor = "rgba(0, 0, 0, .3)";

    const scaleY = scaleLinear()
      .domain([minValue, maxValue])
      .range([yScaleMinValue, yScaleMaxValue])
      .nice(5);

    const scaleX = scaleBand()
      .domain(values.map((x, index) => index))
      .range([xScaleMinValue, xScaleMaxValue])
      .paddingInner(columPaddingInner)
      .paddingOuter(columPaddingOuter);

    const ticksY = scaleY.ticks(5);

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
          <Grid
            ticksY={ticksY}
            gridColor={gridColor}
            scaleX={scaleX}
            scaleY={scaleY}
            height={height}
          />
          {ticksY.map(value => {
            const ypos = scaleY(value);
            const [xpos] = scaleX.range();
            return (
              <text
                x={xpos - xLabesFontSize - 30}
                y={height - ypos}
                font-family="Verdana"
                font-size={xLabesFontSize}
                dominantBaseline="middle"
                fill={labelsColor}
              >
                {value}
              </text>
            );
          })}
          {values.map((value, index) => {
            const bandwidth = scaleX.bandwidth();
            const columX = scaleX(index);
            const [rangeMin] = scaleY.range();
            return (
              <rect
                x={columX}
                y={height - scaleY(value)}
                width={bandwidth}
                height={scaleY(value) - rangeMin}
                fill={colors[index]}
              />
            );
          })}
          {labels.map((label, index) => {
            const columX = scaleX(index);
            const bandwidth = scaleX.bandwidth();
            const [ypos] = scaleY.range();

            return (
              <text
                x={columX + bandwidth / 2}
                y={height - ypos + xLabesFontSize + xLabelsVerticalOffset}
                font-family="Verdana"
                font-size={xLabesFontSize}
                textAnchor="middle"
                fill={labelsColor}
              >
                {label}
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
    values: [10, 20, 28, 400, 566, 30, 1000],
    labels: ["20", "20", "28", "400", "566", "30", "500"],
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
