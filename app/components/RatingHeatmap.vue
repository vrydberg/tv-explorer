<script setup>

import * as d3 from "d3";

const svg = ref(null)
const tooltip = ref(null)

const props = defineProps(['ratings'])

const heatmap = props.ratings.map(season => season.episodes).flat()
// const seasonsTotal = props.ratings.length()

const setSeasons = new Set(heatmap.map(d => d.season_number))
const arraySeasons = [...setSeasons]
const maxSeasons = arraySeasons.length

console.log(maxSeasons)

const setEpisodes = new Set(heatmap.map(d => d.episode_number))
const arrayEpisodes = [...setEpisodes]
const maxEpisodes = arrayEpisodes.length


const cellSize = 45
// const innerHeight = cellSize * maxEpisodes
// const innerWidth = cellSize * maxSeasons

const innerHeight = cellSize * maxSeasons
const innerWidth = cellSize * maxEpisodes
const height = marginTop + innerHeight + marginBottom
const width = marginLeft + innerWidth + marginRight


// const width = 640;
// const height = 640;
const marginTop = 40;
const marginRight = 20;
const marginBottom = 20;
const marginLeft = 40;


const drawHeatmap = () => {

  const svgEl = d3.select(svg.value)
  const tooltipEl = d3.select(tooltip.value)
  svgEl.selectAll('*').remove()

  const x = d3
    .scaleBand()
    .domain(arrayEpisodes)
    .range([marginLeft, marginLeft + innerWidth])
    .padding(0.10)

  const y = d3
    .scaleBand()
    .domain(arraySeasons)
    .range([marginTop, marginTop + innerHeight])
    .padding(0.10)


  svgEl.attr("width", width).attr("height", height);

  svgEl.append("g")
    .attr("class", "text-xs font-medium text-white")
    .attr("transform", `translate(0, ${marginTop})`)
    .call(d3.axisTop(x).tickSize(0).tickPadding(8).tickFormat(d => `E${d}`))
    .select(".domain").remove()

  svgEl.append("g")
      .attr("class", "text-xs font-medium text-white")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(8).tickFormat(d => `S${d}`))
      .select(".domain").remove()

  const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)

  const getColor = (rating) => {
    if (rating == 0) return "grey"
    return colorScale(rating)
  }
  

  const normalizeRating = (rating, min, max) => {
    return (rating - min) / (max - min)
  }
  
  const getCellText = (episode) => {
    const now = new Date()
    const episodeAirDate = new Date(episode.air_date)

    if (now < episodeAirDate) return "_"
    
    return episode.rating.toFixed(1)
  }

  tooltipEl
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
  
  const mouseover = function(event,d) {
    tooltipEl
      .style("opacity", 1)
  }
  const mousemove = function(event,d) {
    tooltipEl
      .html("The exact value of<br>this cell is: " + d.rating)
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2 + "px")
  }
  const mouseleave = function(event,d) {
    tooltipEl
      .style("opacity", 0)
  }

  svgEl.selectAll()
    .data(heatmap)
    .join("rect")
    .attr("x", d => x(d.episode_number) )
    .attr("y", d => y(d.season_number) )
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    .attr("class", "hover:stroke-indigo-500 hover:opacity-100 stroke-2 stroke-none opacity-80")
    .style("fill", d => getColor(normalizeRating(d.rating, 0, 10)))
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

  svgEl.selectAll(".cell-label")
    .data(heatmap)
    .join("text")
    .attr("class", "cell-label fill-white text-xs pointer-events-none")
    .attr("x", d => x(d.episode_number) + x.bandwidth() / 2)
    .attr("y", d => y(d.season_number) + y.bandwidth() / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(d => getCellText(d));
}


onMounted(() => {
  drawHeatmap()
})

</script>

<template>

  <div class="max-h-[400px] overflow-y-auto p-1 overflow-x-auto border border-eigengrau-700 rounded-md">
  <!-- <div class="overflow-y-auto p-1 overflow-x-auto border border-eigengrau-700 rounded-md"> -->
      <svg ref="svg"></svg>
  </div>
  
</template>

<!-- Still need to add tooltip -->
<style></style>

