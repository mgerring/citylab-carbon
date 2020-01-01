import {select, selectAll} from 'd3-selection';
import {geoPath, geoTransform} from 'd3-geo';
import {scaleOrdinal} from 'd3-scale';
import {interpolate, interpolateHcl} from 'd3-interpolate';
import {extent, range} from 'd3-array';
import {transition} from 'd3-transition';
import {csvParse} from 'd3-dsv';
import {arc, pie, stack} from 'd3-shape';
import {schemeTableau10} from 'd3-scale-chromatic';

export default {
  select: select,
  selectAll: selectAll,
  geoPath: geoPath,
  geoTransform: geoTransform,
  scaleOrdinal: scaleOrdinal,
  interpolate: interpolate,
  interpolateHcl: interpolateHcl,
  extent: extent,
  range: range,
  //csvParse: csvParse,
  pie: pie,
  arc: arc,
  stack: stack,
  schemeTableau10: schemeTableau10
}
