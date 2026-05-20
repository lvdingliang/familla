<template>
  <div class="source-switcher">
    <div class="source-tabs">
      <button
        v-for="source in sources"
        :key="source.key"
        :class="['source-tab', { active: sourceStore.activeSource === source.key }]"
        @click="handleSwitch(source.key)"
      >
        <span class="source-dot" :style="{ background: source.color }" />
        <span class="source-label">{{ source.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSourceStore, MUSIC_SOURCES, type MusicSource } from "@/stores/source";

const sourceStore = useSourceStore();

const sources = Object.values(MUSIC_SOURCES);

const handleSwitch = (source: MusicSource) => {
  sourceStore.switchSource(source);
};
</script>

<style lang="scss" scoped>
.source-switcher {
  margin-bottom: 20px;
}

.source-tabs {
  display: flex;
  gap: 8px;
  background: var(--n-color-embedded);
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
}

.source-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--n-text-color-2);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: var(--n-text-color);
    background: var(--n-color-hover);
  }

  &.active {
    background: var(--n-color);
    color: var(--n-text-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

.source-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.source-label {
  white-space: nowrap;
}
</style>
