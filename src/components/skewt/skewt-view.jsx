import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
// import './skewt-style.css';
import IndexView from './index-view';

export class SkewtView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const _this = this;
        axios
            .post(
                'https://api.shyftwx.com/getProduct/getSkewT',
                {
                    time: '2019-08-06T02:00:00Z',
                    lat: this.props.latitude,
                    lon: this.props.longitude
                },
                {
                    withCredentials: true
                }
            )
            .then(function (response) {
                debugger;
                _this.setState({
                    data: response.data.data
                });
                _this.drawSkewT();
            });
    }

    drawSkewT() {
        const renderData = this.state.data;
        console.log(renderData);
        let topp = 100;
        const tlinetest = [];
        const interpdots = [];
        const barbstest = [];
        const temp2 = [];
        const temp3 = [];
        const obj = renderData;
        const parsedCSV = obj.filter(function (d) {
            return d[2] > -1000 && d[3] > -1000;
        });
        const barbs = parsedCSV.filter(function (d) {
            return d[4] >= 0 && d[5] >= 0 && d[0] >= topp;
        });

        temp2.push(parsedCSV);
        temp3.push(barbs);

        tlinetest.push(temp2);
        barbstest.push(temp3);

        // need this for dots for some reason
        const mouseoverdata = tlinetest[0].slice(0).reverse();
        const pressureValues = [];
        mouseoverdata[0].forEach(function (element) {
            pressureValues.push(element[0]);
        });
        pressureValues.reverse();

        console.log('data parsed');

        const node = this.node;
        const m = [30, 40, 20, 35];
        const w = 300;
        const // 700 - m[1] - m[3],
            h = 300; // 700 - m[0] - m[2];
        const deg2rad = Math.PI / 180;
        const tan = Math.tan(55 * deg2rad);
        const basep = 1050;
        topp = 100;
        const plines = [1000, 850, 700, 500, 300, 200, 100];
        const pticks = [950, 900, 800, 750, 650, 600, 550, 450, 400, 350, 250, 150];
        const barbsize = 25;
        const x = d3.scaleLinear().range([0, w]).domain([-45, 50]);
        const y = d3.scaleLog().range([0, h]).domain([topp, basep]);
        const y2 = d3.scaleLinear();
        const xAxis = d3.axisBottom().scale(x).tickSize(0, 0).ticks(10);
        const // .orient("bottom"),
            yAxis = d3.axisLeft().scale(y).tickSize(0, 0).tickValues(plines).tickFormat(d3.format('.0d'));
        const // .orient("left")
            yAxis2 = d3.axisRight().scale(y).tickSize(5, 0).tickValues(pticks); // .orient("right"); // just for ticks

        const bisectTemp = d3.bisector(function (d) {
            return d;
        }).left;

        const line = d3
            .line()
            .x(function (d, i) {
                return x(d[2]) + (y(basep) - y(d[0])) / tan;
            })
            .y(function (d, i) {
                return y(d[0]);
            });

        const line2 = d3
            .line()
            .x(function (d, i) {
                return x(d[3]) + (y(basep) - y(d[0])) / tan;
            })
            .y(function (d, i) {
                return y(d[0]);
            });

        const svg = d3.select(node).append('g').attr('class', 'skewtbg');

        const dryline = d3
            .line()
            .x(function (d, i) {
                return x((273.15 + d) / Math.pow(1000 / pp[i], 0.286) - 273.15) + (y(basep) - y(pp[i])) / tan;
            })
            .y(function (d, i) {
                return y(pp[i]);
            });

        svg.append('clipPath')
            .attr('id', 'clipper')
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', w)
            .attr('height', h);

        // Skewed temperature lines
        svg.selectAll('gline')
            .data(d3.range(-100, 45, 10))
            .enter()
            .append('line')
            .attr('x1', function (d) {
                return x(d) - 0.5 + (y(basep) - y(100)) / tan;
            })
            .attr('x2', function (d) {
                return x(d) - 0.5;
            })
            .attr('y1', 0)
            .attr('y2', h)
            .attr('class', function (d) {
                if (d == 0) {
                    return 'tempzero';
                } else {
                    return 'gridline';
                }
            })
            .attr('clip-path', 'url(#clipper)');

        // Logarithmic pressure lines
        svg.selectAll('gline2')
            .data(plines)
            .enter()
            .append('line')
            .attr('x1', 5)
            .attr('x2', w)
            .attr('y1', function (d) {
                return y(d);
            })
            .attr('y2', function (d) {
                return y(d);
            })
            .attr('class', 'gridline');

        // create array to plot dry adiabats
        var pp = d3.range(topp, basep + 1, 10);
        var dryad = d3.range(-30, 240, 20);
        var all = [];
        for (var i = 0; i < dryad.length; i++) {
            var z = [];
            for (var j = 0; j < pp.length; j++) {
                z.push(dryad[i]);
            }
            all.push(z);
        }

        // Draw dry adiabats
        svg.selectAll('.dryline')
            .data(all)
            .enter()
            .append('path')
            .attr('class', 'gridline')
            .attr('clip-path', 'url(#clipper)')
            .attr('d', dryline);

        // Line along right edge of plot
        svg.append('line')
            .attr('x1', w - 0.5)
            .attr('x2', w - 0.5)
            .attr('y1', 0)
            .attr('y2', h)
            .attr('class', 'gridline');

        // Add axes
        svg.append('g').attr('class', 'y axis').attr('transform', 'translate(0,0)').call(yAxis);
        svg.append('g').attr('class', 'y axis ticks').attr('transform', 'translate(0,0)').call(yAxis2);
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (h - 0.5) + ')')
            .call(xAxis);

        console.log('got background');

        var speeds = d3.range(5, 105, 5);
        var barbdef = svg.append('defs');
        speeds.forEach(function (d) {
            var thisbarb = barbdef.append('g').attr('id', 'barb' + d);

            var flags = Math.floor(d / 50);
            var pennants = Math.floor((d - flags * 50) / 10);
            var halfpennants = Math.floor((d - flags * 50 - pennants * 10) / 5);
            var px = barbsize;

            // Draw wind barb stems
            thisbarb.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', barbsize);

            // Draw wind barb flags and pennants for each stem
            for (i = 0; i < flags; i++) {
                thisbarb
                    .append('polyline')
                    .attr('points', '0,' + px + ' -10,' + px + ' 0,' + (px - 4))
                    .attr('class', 'flag');
                px -= 7;
            }
            // Draw pennants on each barb
            for (i = 0; i < pennants; i++) {
                thisbarb
                    .append('line')
                    .attr('x1', 0)
                    .attr('x2', -10)
                    .attr('y1', px)
                    .attr('y2', px + 4);
                px -= 3;
            }
            // Draw half-pennants on each barb
            for (i = 0; i < halfpennants; i++) {
                thisbarb
                    .append('line')
                    .attr('x1', 0)
                    .attr('x2', -5)
                    .attr('y1', px)
                    .attr('y2', px + 2);
                px -= 3;
            }
        });
        console.log('got barbs');

        var skewtgroup = svg.append('g').attr('class', 'skewt'); // put skewt lines in this group
        var barbgroup = svg.append('g').attr('class', 'windbarb');
        barbgroup
            .on('mouseover', function () {
                d3.select(this).attr('stroke-width', '2px');
            })
            .on('mouseout', function () {
                d3.select(this).attr('stroke-width', '0.75px');
            }); // put barbs in this group

        var focus = skewtgroup.append('g').attr('class', 'focus tmpc').style('display', 'none');
        focus.append('circle').attr('r', 6);
        focus.append('text').attr('x', 9).attr('dy', '.35em');

        var focus2 = skewtgroup.append('g').attr('class', 'focus dwpc').style('display', 'none');
        focus2.append('circle').attr('r', 6);
        focus2.append('text').attr('x', -9).attr('text-anchor', 'end').attr('dy', '.35em');

        var focus3 = skewtgroup.append('g').attr('class', 'focus').style('display', 'none');
        focus3.append('text').attr('x', 0).attr('text-anchor', 'start').attr('dy', '.35em');

        var focus4 = skewtgroup.append('g').attr('class', 'focus').style('display', 'none');
        focus4.append('text').attr('x', 0).attr('text-anchor', 'start').attr('dy', '.35em');

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', w)
            .attr('height', h)
            .on('mouseover', function () {
                focus.style('display', null);
                focus2.style('display', null);
                focus3.style('display', null);
                focus4.style('display', null);
            })
            .on('mouseout', function () {
                focus.style('display', 'none');
                focus2.style('display', 'none');
                focus3.style('display', 'none');
                focus4.style('display', 'none');
            })
            .on('mousemove', mousemove);

        function mousemove() {
            var hieghtBase = mouseoverdata[0][0][1];
            var y0 = y.invert(d3.mouse(this)[1]); // get y value of mouse pointer in pressure space
            var i = pressureValues.length - 1 - bisectTemp(pressureValues, y0, 1, pressureValues.length - 1);
            var d0 = mouseoverdata[0][i - 1];
            var d1 = mouseoverdata[0][i];
            if (i != 0) {
                var d = y0 - d0[0] < d1[0] - y0 ? d1 : d0;
            } else {
                var d = d1;
            }
            focus.attr('transform', 'translate(' + (x(d[2]) + (y(basep) - y(d[0])) / tan) + ',' + y(d[0]) + ')');
            focus2.attr('transform', 'translate(' + (x(d[3]) + (y(basep) - y(d[0])) / tan) + ',' + y(d[0]) + ')');
            focus3.attr('transform', 'translate(0,' + y(d[0]) + ')');
            focus4.attr('transform', 'translate(305,' + y(d[0]) + ')');
            focus.select('text').text(Math.round(d[2]) + '°C');
            focus2.select('text').text(Math.round(d[3]) + '°C');
            focus3.select('text').text('--' + Math.round((d[1] - hieghtBase) * 3.28) + 'ft');
            focus4.select('text').text(Math.round(d[5]) + ' MPH');
        }
        console.log('got tool tips');

        var tlines = skewtgroup
            .selectAll('tlines')
            .data(tlinetest[0])
            .enter()
            .append('path')
            .attr('class', function (d, i) {
                return i < 10 ? 'temp member' : 'temp mean';
            })
            .attr('clip-path', 'url(#clipper)')
            .attr('d', line);

        var tdlines = skewtgroup
            .selectAll('tdlines')
            .data(tlinetest[0])
            .enter()
            .append('path')
            .attr('class', function (d, i) {
                return i < 10 ? 'dwpt member' : 'dwpt mean';
            })
            .attr('clip-path', 'url(#clipper)')
            .attr('d', line2);

        barbgroup
            .selectAll('barbs')
            .data(barbstest[0][0])
            .enter()
            .append('use')
            .attr('xlink:href', function (d) {
                return '#barb' + Math.round(d[5] / 5) * 5;
            })
            .attr('transform', function (d, i) {
                return 'translate(' + w + ',' + y(d[0]) + ') rotate(' + (d[4] + 180) + ')';
            });

        console.log('first hour drawn');
    }

    render() {
        return (
            <div className="header">
                <svg ref={(node) => (this.node = node)} width={350} height={350} />
                <IndexView data={this.state.data} width={200} />
            </div>
        );
    }
}
export default SkewtView;
