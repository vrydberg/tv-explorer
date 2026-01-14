<script setup>

import * as d3 from "d3";

const props = defineProps(['ratings', 'show'])

const svg = ref(null)
let resizeObserver = null;

const now = new Date()

const seasonsAvg = computed(() => {
  return props.ratings.map( (season, index) => {
    const filteredEpisodes = season.episodes.filter(ep => now >= new Date(ep.air_date))
    const avg = filteredEpisodes.reduce( (sum, ep) => sum + ep.rating, 0) / filteredEpisodes.length
    return { rating: avg, index: index, season_number: season.season_number}
  })
})

const processedEpisodes = computed(() => {
  const episodes = props.ratings.map(season => season.episodes.filter(ep => now >= new Date(ep.air_date))).flat()
  return episodes.map( (ep, index) => {
    return {rating: ep.rating, index: index, episode_number: ep.episode_number, season_number: ep.season_number}
  })
})

const sparklineData = computed(() => {
  return processedEpisodes.value.length > 150 ? seasonsAvg.value : processedEpisodes.value
})

const sparklineSeasonView = computed(() => {
  return processedEpisodes.value.length > 150
})

const drawSparkline = () => {

  if (!svg.value) return;

  const { width, height } = svg.value.getBoundingClientRect();
  const marginTop = 20

  // Read theme colors from CSS custom properties
  const styles = getComputedStyle(document.documentElement)
  const strokeColor = styles.getPropertyValue('--sparkline-stroke').trim()
  const fillColor = styles.getPropertyValue('--sparkline-fill').trim()
  const markerColor = styles.getPropertyValue('--sparkline-marker').trim()

  const svgEl = d3.select(svg.value)
  svgEl.selectAll('*').remove()

  
  const xAccessor = (d) => d.index
  const yAccessor = (d) => d.rating.toFixed(1)

  const xDomain = [0, sparklineData.value.length - 1]
  const yDomain = [0, d3.max(sparklineData.value, yAccessor)]
  
  const xScale = d3.scaleLinear()
    .domain(xDomain)
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([height, marginTop])

  const areaGenerator = d3.area()
    .x( (d) => xScale(xAccessor(d)))
    .y1( (d) => yScale(yAccessor(d)))
    .y0(height)
    .curve(d3.curveBumpX)

  const area = svgEl
    .append('path')
    .datum(sparklineData.value)
    .attr('d', areaGenerator)
    .attr('fill', fillColor)
  
  const lineGenerator = d3.line()
    .x( (d) => xScale(xAccessor(d)))
    .y( (d) => yScale(yAccessor(d)))
    .curve(d3.curveBumpX)

  const line = svgEl
    .append('path')
    .datum(sparklineData.value)
    .attr('d', lineGenerator)
    .attr('stroke', strokeColor)
    .attr('stroke-width', 3)
    .attr('stroke-linejoin', 'round')
    .attr('fill', 'none')
                          
  const markerLine = svgEl
    .append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', height)
    .attr('stroke-width', 3)
    .attr('stroke', markerColor)
    .attr('opacity', 0)

  const markerDot = svgEl
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
    .attr('fill', markerColor)
    .attr('opacity', 0)

  const bisect = d3.bisector(xAccessor)
  
  svgEl.on('mousemove', (e) => {
    const pointerCoords = d3.pointer(e)
    const [posX, posY] = pointerCoords
    
    const dataIndex = xScale.invert(posX)
    const index = bisect.center(sparklineData.value, dataIndex)

	  const d = sparklineData.value[index]

    const x = xScale(xAccessor(d))
    const y = yScale(yAccessor(d))

    markerLine
      .attr('x1', x)
      .attr('x2', x)
      .attr('opacity', 1)

    markerDot
      .attr('cx', x)
      .attr('cy', y)
      .attr('opacity', 1)

    d3.select('[sparkline-info]').text(getText(sparklineData.value, d))
		d3.select('[sparkline-rating]').text(yAccessor(d))
  })

  const getText = (sparklineData, d) => {
    const index = xAccessor(d)
    
    const episode = sparklineData[index]
    const season = sparklineData[index]
  
    if (sparklineSeasonView.value) {  
      return `S${season.season_number}`
    }
    return `S${episode.season_number}E${episode.episode_number}`
  }
}

onMounted(() => {
  drawSparkline()

  resizeObserver = new ResizeObserver( (entries) => {
    // Each time we observe that the svg size has changed, we need to draw it again
    drawSparkline()
  })

  if (svg.value) {
    resizeObserver.observe(svg.value)
  }  
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})


</script>

<template>  
  <div class="w-full h-full flex items-end gap-3 border-b-0 border-b-accent-300/25">
    
    <svg class="h-full flex-1 min-w-0" ref="svg"></svg>
    
    <div class="w-20 flex flex-col justify-end items-end border-white border-0 shrink-0">
      <p sparkline-info class="text-gray-400 text-xs font-medium leading-none mb-1">Avg</p>
      <h4 sparkline-rating class="text-3xl border-0 p-0 m-0 text-accent-500 font-bold leading-none">
        {{ props.show.rating.toFixed(1)}}
      </h4>
      
    </div>
    
  
  </div>
  
</template>

<style></style>