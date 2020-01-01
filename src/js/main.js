import d3 from './util/d3.js';
import dataCsv from '../data/embodied-carbon.csv';
import dataJson from '../data/story.json';
import { dataSection, domain } from './util/store.js';
import DataOverlay from './components/DataOverlay.svelte';

const overlay = new DataOverlay({
  target: document.body,
});

let division = {};

dataCsv
  .filter(function (d) {
    return d.entry === 'Total' && d.division !== 'Total';
  })
  .map(function (d) {
    if (typeof division[d.division] === 'undefined') {
      division[d.division] = [];
    }
    division[d.division].push(d);
  })

Object.keys(division).forEach(function(v){
  division[v] = division[v].reduce(function(a,b){return a+b.carbon_kgCO2eq}, 0);
});

export const scale = d3.scaleOrdinal(d3.schemeTableau10).domain(Object.keys(division));

domain.set(Object.keys(division));

export function getDivision() {
  return division;
}

export function getScale() {
  return scale;
}

const arc = d3.arc()
  .outerRadius('250')
  .innerRadius('200');

const pie = d3.pie()
  .value(function(d){
    return d.value;
  });

const data = pie(Object.keys(division).map(function(v){ return {label:v, value:division[v]} }));

const g = d3.select('#container')
  .attr('width', 500)
  .attr('height', 500)
  .append('g')
    .attr('transform', 'translate(250,250)');

g.selectAll('path')
  .data(data)
  .join('path')
  .attr('d', arc)
  .attr('fill', function(d){
    return scale(d.data.label);
  })
  .on('mouseenter', function(d){
    const filtered = dataCsv.filter(function(e){
      return e.division === d.data.label;
    });
    dataSection.set(filtered);
  });

const extent = d3.extent(dataCsv.map(function(d){
  return d.carbon_kgCO2eq;
}));
