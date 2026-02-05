<template>
  <div class="default-layout">
    <header>
      <h1>로봇 제어 시스템</h1>
      </header>
    
    <main>
      <RouterView /> 
    </main>
  </div>
</template>

<style scoped>
.default-layout { padding: 20px; }
header { border-bottom: 1px solid #ccc; margin-bottom: 20px; }
</style>