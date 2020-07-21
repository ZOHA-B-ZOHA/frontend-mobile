<template>
  <div>
    <div>main page</div>
    <div>
      <svg width="300" height="500">
        <defs>
          <radialGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="hsl(0, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(0, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="15%" stop-color="hsl(36, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(36, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="29%" stop-color="hsl(72, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(72, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="52%" stop-color="hsl(108, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(108, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="54%" stop-color="hsl(124, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(144, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="65%" stop-color="hsl(180, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(180, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="74%" stop-color="hsl(216, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(216, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="82%" stop-color="hsl(252, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(252, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="89%" stop-color="hsl(288, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(288, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="95%" stop-color="hsl(324, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(324, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
            <stop offset="100%" stop-color="hsl(340, 100%, 50%)">
              <!-- <animate attributeName="stop-color" type="" values="pink; hsl(360, 100%, 50%); pink;" dur="1s" /> -->
            </stop>
          </radialGradient>

          <radialGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(0, 100%, 50%); pink;" begin="0ms" dur="0.50s" />
            </stop>
            <stop offset="10%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(36, 100%, 50%); pink;" begin="5ms" dur="0.55s" />
            </stop>
            <stop offset="20%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(72, 100%, 50%); pink;" begin="10ms" dur="0.60s" />
            </stop>
            <stop offset="30%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(108, 100%, 50%); pink;" begin="15ms" dur="0.65s" />
            </stop>
            <stop offset="40%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(144, 100%, 50%); pink;" begin="20ms" dur="0.70s" />
            </stop>
            <stop offset="50%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(180, 100%, 50%); pink;" begin="25ms" dur="0.75s" />
            </stop>
            <stop offset="60%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(216, 100%, 50%); pink;" begin="30ms" dur="0.80s" />
            </stop>
            <stop offset="70%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(252, 100%, 50%); pink;" begin="35ms" dur="0.85s" />
            </stop>
            <stop offset="80%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(288, 100%, 50%); pink;" begin="40ms" dur="0.90s" />
            </stop>
            <stop offset="90%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(324, 100%, 50%); pink;" begin="45ms" dur="0.95s" />
            </stop>
            <stop offset="100%" stop-color="pink">
              <animate attributeName="stop-color" type="" values="pink; hsl(360, 100%, 50%); pink;" begin="50ms" dur="1.00s" />
            </stop>
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="400" rx="70" ry="35" fill="pink" />
        <polygon points="50 100, 250 100, 220 400, 80 400" fill="pink" />
        <ellipse cx="150" cy="100" rx="100" ry="50" stroke-width="4" fill="url(#grad1)" />
        <!-- 위의 이거 무지개 그러데이션 수치 더 보기 좋게 수정할 것 -->
        <!-- <ellipse cx="150" cy="210" rx="100" ry="50" stroke-width="4" fill="url(#grad2)" /> -->
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>
