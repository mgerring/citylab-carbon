<script>

import { dataSection, domain } from '../util/store.js';
import { scale, getDivision} from '../main.js'
let section_total = 0;
let sorted_domain = [];
const unsubscribe = dataSection.subscribe(value => {
  section_total = value.filter(function(e, idx){
    return e.entry === "Total";
  })[0];
});

const unsubscribeDoman = domain.subscribe(value => {
  const division = getDivision();
  sorted_domain = Object.keys(value).map(function(item){
    return [division[item], value[item]];
  });
  /*.sort(function(a,b){
    return a[1]-b[1];
  });*/

  console.log(sorted_domain);
});
const total = 8040340.15695356;
</script>
<div>
<ul>
{#each sorted_domain as color}
  <li>
    <div style="
      background-color:{scale(color)};
      height:1em;
      width:1em;
      display:inline-block;"></div>
    {color[0]}
    {((parseFloat(getDivision()[color[1]])/total) * 100).toFixed(2)} %<br /><br />
  </li>
{/each}
</ul>
</div>
