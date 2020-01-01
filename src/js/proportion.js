import d3 from './util/d3.js';
import dataCsv from '../data/proportion.csv';
import InnerPieChart from './components/InnerPieChart.svelte';

const overlay = new InnerPieChart({
  target: document.body,
});

const arc = d3.arc()
  .outerRadius(300)
  .innerRadius(250);

const pie = d3.pie()
  .value(function(d){
    return d.value;
  })
  .sort(null)
  .sortValues(null);

const scale = d3.scaleOrdinal(d3.schemeTableau10);

function yearFilter(year) {
  const filteredData = dataCsv.filter(entry => {
    return entry.year === year
  });
  return pie(filteredData);
}

const g = d3.select('#container')
  .attr('width', 600)
  .attr('height', 600)
  .append('g')
    .attr('transform', 'translate(300,300)');

function arcTween(d) {
    var i = d3.interpolate(this._current, d);
    this._current = i(0);
    return function(t) { return arc(i(t)); };
}

let theYear = 2080;

export function draw(year) {
  const data = yearFilter(year);

  g.selectAll('path')
    .data(data)
    .join('path')
        .attr('fill', function(d) {
          return (d.data.type === 'operational') ? '#bc7705' : '#0171bc';
        })
        .on('click', function(d){
          const filtered = dataCsv.filter(function(e){
            return e.division === d.data.label;
          });
        })
        .transition()
          .duration(2000)
          .attrTween('d', arcTween)
}
draw(theYear);
