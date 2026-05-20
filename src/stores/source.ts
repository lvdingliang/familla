import { defineStore } from "pinia";
import { useSettingStore } from "@/stores";

/**
 * 音乐源类型
 */
export type MusicSource = "netease" | "qqmusic";

/**
 * 音源信息
 */
export interface MusicSourceInfo {
  key: MusicSource;
  name: string;
  icon: string;
  color: string;
  description: string;
}

/** 音源列表 */
export const MUSIC_SOURCES: Record<MusicSource, MusicSourceInfo> = {
  netease: {
    key: "netease",
    name: "网易云音乐",
    icon: "NeteaseCloudMusic",
    color: "#ec4141",
    description: "网易云音乐在线服务",
  },
  qqmusic: {
    key: "qqmusic",
    name: "QQ音乐",
    icon: "QQMusic",
    color: "#31c27c",
    description: "QQ音乐在线服务",
  },
};

/**
 * 音源管理 Store
 */
export const useSourceStore = defineStore("source", {
  state: () => ({
    /** 当前激活的音源 */
    activeSource: "netease" as MusicSource,
  }),
  getters: {
    /** 当前音源信息 */
    currentSource(state): MusicSourceInfo {
      return MUSIC_SOURCES[state.activeSource];
    },
    /** 是否为网易云音乐 */
    isNetease(state): boolean {
      return state.activeSource === "netease";
    },
    /** 是否为QQ音乐 */
    isQQMusic(state): boolean {
      return state.activeSource === "qqmusic";
    },
  },
  actions: {
    /** 切换音源 */
    switchSource(source: MusicSource) {
      if (this.activeSource === source) return;
      this.activeSource = source;
      const settingStore = useSettingStore();
      settingStore.musicSource = source;
    },
    /** 从设置初始化 */
    initFromSetting() {
      const settingStore = useSettingStore();
      if (settingStore.musicSource) {
        this.activeSource = settingStore.musicSource;
      }
    },
  },
  // 持久化
  persist: {
    key: "source-store",
    storage: localStorage,
  },
});
