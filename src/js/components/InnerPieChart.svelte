<script>
  import {draw} from '../proportion.js';
  import storyJson from '../../data/story.json';

  let percent_embodied = storyJson['2080'].embodied;
  let percent_operational = storyJson['2080'].operational;

  let absolute_embodied = Math.round(storyJson.embodied.total / 1000);
  let absolute_operational = Math.round((storyJson.total * (percent_operational/100)) / 1000);

  let years = 60;
</script>
<div id="outer-thing">
  <div id="inner-thing">
    <h3>Estimated carbon emissions over <strong>{years} years</strong> from a 6-story apartment building, built in California in 2020.</h3>

    <p><strong class="operational">{percent_operational}%</strong> of emissions are from <strong class="operational">Operational Carbon</strong>: emissions from estimated energy use.</p>

    <p><strong class="embodied">{percent_embodied}%</strong> of emissions are from <strong class="embodied">Embodied Carbon</strong>: emissions from the manufacture, transport, maintenance and "end-of-life" of building materials and construction.</p>


    <div class="button-container">
      <strong>See results for</strong>

      {#if years === 60}
      <button on:click={() => {
        years = 10;
        percent_embodied = storyJson['2030'].embodied;
        percent_operational = storyJson['2030'].operational;
        absolute_operational = Math.round((storyJson.total * (percent_operational/100)) / 1000);
        draw(2030);
      }}>
        <strong>the next ten years</strong>
      </button>
      {/if}

      {#if years === 10}
      <button on:click={() => {
        years = 60;
        percent_embodied = storyJson['2080'].embodied;
        percent_operational = storyJson['2080'].operational;
        absolute_operational = Math.round((storyJson.total * (percent_operational/100)) / 1000);
        draw(2080);
      }}>
        <strong>the lifetime of the building</strong>
      </button>
      {/if}
    </div>
  </div>
</div>
