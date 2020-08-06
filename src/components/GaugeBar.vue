<template>
  <section id="gaugeBar">
    <svg xmlns="http://www.w3.org/2000/svg" width="246" height="382" viewBox="0 0 246 382" fill="none">
      <path d="M21.8501 128.374C21.8501 128.374 41.6843 368.108 42.844 374.554C44.0036 381 50.4318 381 50.4318 381H198.679C205.677 381 206.266 376.903 206.856 372.797C207.446 368.69 227.85 128.374 227.85 128.374" fill="url(#paint0_linear)" fill-opacity="0.2"/>
      <path d="M21.8501 128.374C21.8501 128.374 41.6843 368.108 42.844 374.554C44.0036 381 50.4318 381 50.4318 381H198.679C205.677 381 206.266 376.903 206.856 372.797C207.446 368.69 227.85 128.374 227.85 128.374" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path :d="`M${50-(50-29)*this.achievement} ${374-(374-136)*this.achievement}L50 374H200L${200+(221-200)*this.achievement} ${374-(374-136)*this.achievement}H${50-(50-29)*this.achievement}Z`" fill="url(#paint1_linear)"/>
      <image v-if="achievement >= 0.1 && achievement < 0.3" x="53" y="356" xlink:href="../assets/images/10to30.svg" />
      <image v-else-if="achievement >= 0.3 && achievement < 0.6" x="53" y="343" xlink:href="../assets/images/30to60.svg" />
      <image v-else-if="achievement >= 0.6 && achievement <= 1.0" x="49" y="328" xlink:href="../assets/images/60to100.svg" />
      <image v-if="achievement >= 0.1" :x="50-(50-29)*this.achievement+12" :y="374-(374-136)*this.achievement" xlink:href="../assets/images/overmilk.svg" />
      <image v-if="achievement >= 0.6" :x="200+(221-200)*this.achievement-60" :y="374-(374-136)*this.achievement-30" xlink:href="../assets/images/strawberries.svg" />
      <text v-if="achievement < 0.9" :x="50-(50-29)*this.achievement" :y="374-(374-136)*this.achievement-8" fill="white" font-size="1em">{{ achievement * 100 }}%</text>
      <text v-else-if="achievement >= 0.9" x="123" :y="70" text-anchor="middle" fill="white" font-size="2em">{{ achievement * 100 }}%</text>
      <path d="M245 117.288H1V129.318H245V117.288Z" fill="#F2F2F2" fill-opacity="0.2" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M231 101.249H15V117.288H231V101.249Z" fill="#F2F2F2" fill-opacity="0.2" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M23 101.248C23.2629 74.5693 33.9144 49.0733 52.6395 30.3017C71.3646 11.5301 96.6499 1 123 1C149.35 1 174.635 11.5301 193.36 30.3017C212.086 49.0733 222.737 74.5693 223 101.248" fill="#F2F2F2" fill-opacity="0.2"/>
      <path d="M23 101.248C23.2629 74.5693 33.9144 49.0733 52.6395 30.3017C71.3646 11.5301 96.6499 1 123 1C149.35 1 174.635 11.5301 193.36 30.3017C212.086 49.0733 222.737 74.5693 223 101.248" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <defs>
        <linearGradient id="paint1_linear" x1="125.005" y1="374" x2="125.005" y2="136" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF5A5A"/>
          <stop offset="0.05" stop-color="#FF7373"/>
          <stop offset="0.14" stop-color="#FFA1A1"/>
          <stop offset="0.24" stop-color="#FFC5C5"/>
          <stop offset="0.32" stop-color="#FFDFDF"/>
          <stop offset="0.4" stop-color="#FFEFEF"/>
          <stop offset="0.46" stop-color="#FFF4F4"/>
          <stop offset="0.68" stop-color="#FFF2F2"/>
          <stop offset="0.76" stop-color="#FFEBEB"/>
          <stop offset="0.82" stop-color="#FFE0E0"/>
          <stop offset="0.87" stop-color="#FFCFCF"/>
          <stop offset="0.91" stop-color="#FFB9B9"/>
          <stop offset="0.94" stop-color="#FF9D9D"/>
          <stop offset="0.97" stop-color="#FF7E7E"/>
        <stop offset="1" stop-color="#FF5A5A"/>
        </linearGradient>
      </defs>
    </svg>
  </section>
</template>

<script>
export default {
  name: 'GaugeBar',
  props: {
    achievement: Number,
  },
  data: function() {
    return {
      // d: `M${17-(17-7)*this.achievement} ${95-(95-30)*this.achievement}H${53+(63-53)*this.achievement}L53 95H17L${17-(17-7)*this.achievement} ${95-(95-30)*this.achievement}Z`,
      // d: `M29 136L50 374H200L221 136H29Z`,
      lattePathData: `M${50-(50-29)*this.achievement} ${374-(374-136)*this.achievement}L50 374H200L${200+(221-200)*this.achievement} ${374-(374-136)*this.achievement}H${50-(50-29)*this.achievement}Z`,
    }
  }
}
</script>

<style scoped>
#gaugeBar {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
svg {
  height: 100%;
}
</style>
