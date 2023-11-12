import React, { useEffect } from "react";
import * as d3 from "d3";

// Please run npm install d3 in terminal
// Utilise the link below and Assignment 1 as reference
//https://www.influxdata.com/blog/guide-d3js-react/
//https://stackoverflow.com/questions/37812922/grouped-category-bar-chart-with-different-groups-in-d3
//https://gist.github.com/nanu146/f48ffc5ec10270f55c9e1fb3da8b38f0
const BarChart = (props) => {

    const data = props.summaryCountryEmissionData
    useEffect(() => {

        if (!data) {
            return; // Data is null, skip rendering
        }
        const margin = { top: 300, right: 20, bottom: 100, left: 80 };
        const width = 960 - margin.left - margin.right;
        const height = 770 - margin.top - margin.bottom;

        const svg = d3
            .select(".bar-chart svg")
            //.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Define color scale for different years
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const coordinate = [- margin.top / 2.5, - margin.top / 3.8];
        const textCoordinate = [- margin.top / 3, - margin.top / 5];

        const x = d3.scaleBand().range([0, width]).padding(0.1);
        //const y = d3.scaleLinear().range([height, 0]);
        const y = d3.scaleLinear().range([height, 0]);


        x.domain(
            data.map(function (d) {
                return d.element;
            })
        );
        //y.domain([
        //    d3.min(data, function (d) {
        //        return Math.min(0, d.totalValue);
        //    }),
        //    d3.max(data, function (d) {
        //        return Math.max(0, d.totalValue);
        //    }),
        //]);
        //y.domain([
        //    data.map(function (d) {
        //        return d.element;
        //    })
        //]);
        y.domain([
            d3.min(data, function (d) {
                return Math.min(0, d.totalValue);
            }),
            d3.max(data, function (d) {
                return Math.max(0, d.totalValue);
            }),
        ]);
        // Draw bars for each year
        const barWidth = x.bandwidth() / data.length;
        data.forEach((d, index) => {
            const isNegative = d.totalValue < 0;
            const bar = svg
                .append("rect")
                .attr("class", "bar")
                .attr("x", x(d.element) + x.bandwidth() / data.length * (data.length / 2) * (d.year - data[0].year)) // Multiply with data.length / 2 so that it looks better, since element's name are duplicated, x-axis only shows half of them

                .attr("width", barWidth * (data.length / 2 - 0.5)) // Multiply to get rid of the space because domain is only based on element's name
                //.attr("y", isNegative ? y(d.totalValue) : y(0))
                //.attr("height", isNegative ? Math.abs(y(0) - y(d.totalValue)) : Math.abs(y(d.totalValue) - y(0)))

                //.attr("y", y(d.totalValue))
                //.attr("height", height - y(d.totalValue))

                //.attr("y", isNegative ? y(d.totalValue) : y(0))
                //.attr("height", isNegative ? Math.abs(y(0) - y(d.totalValue)) : Math.abs(y(d.totalValue) - y(0)))

                .attr("y", y(Math.max(0, d.totalValue)))

                .attr("height", Math.abs(y(d.totalValue) - y(0)))

                //.attr("y", y(d.totalValue))
                //.attr("height", Math.abs(y(0) - y(d.totalValue)))
                
                .attr("fill", color(d.year - data[0].year));

            // Bar transition
            //bar.transition()
            //    .duration(1000)
            //    .delay((index + 1) * 200)
            //    .attr("width", barWidth * (data.length / 2 - 0.5))
            //    .attr("y", isNegative ? y(d.totalValue) - 10 : y(d.totalValue) + 10)
            //    .attr("height", height - y(d.totalValue));

            // Set bar text
            svg.append('text')
                .attr("text-anchor", "middle")
                .attr("x", x(d.element) + x.bandwidth() / data.length * (data.length / 2) * (d.year - data[0].year) + barWidth * (data.length / 2 - 0.5) / 2)
                //.attr("y", y(d.totalValue) - 10) // Change whether bar text will appear inside or outside bar, 20 makes it stay inside bar
                .attr("y", y(Math.max(0, d.totalValue)) - 10)

                .attr('fill', 'black')
                .style('font-size', '1em')
                .text(Number(d.totalValue).toFixed(2));

            // Set year color and text
            svg.append('rect')
                .attr('x', width - 70)
                .attr('y', coordinate[d.year - data[0].year])
                .attr('width', 30)
                .attr('height', 30)
                .attr('fill', color(d.year - data[0].year));

            svg
                .append('text')
                .attr('x', width - 30)
                .attr('y', textCoordinate[d.year - data[0].year])
                .attr('fill', 'black')
                .style('font-size', '0.8em')
                .text(d.year);
        });

        // Set size for element on x axis
        svg
            .append("g")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "middle")
            .attr("dx", "-0.8em")
            .attr("dy", "1em")
            .style("font-size", "1.5em");

        svg.append("g").call(d3.axisLeft(y));

        // Set chart title
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', - margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '1.5em')
            .text(`Country Emissions by Element Graph`);


        // Clean up the chart 
        return () => {
            svg.remove();
        };
    }, [data]);

    // Content to be rendered
    return <div className="bar-chart" ><svg></svg></div>;

};

export default BarChart;
