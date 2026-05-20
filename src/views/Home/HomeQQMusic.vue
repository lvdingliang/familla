<template>
  <div class="home-qqmusic">
    <!-- 搜索入口 -->
    <div class="qq-search-area">
      <n-card size="small" :bordered="false">
        <n-h3 prefix="bar">
          <n-text>QQ音乐</n-text>
        </n-h3>
        <n-text depth="3">搜索你喜欢的音乐，支持歌曲、歌手、专辑搜索</n-text>
        <div class="qq-search-box">
          <n-input
            v-model:value="searchKeyword"
            placeholder="搜索QQ音乐歌曲..."
            round
            clearable
            size="large"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <n-icon :component="Search" />
            </template>
            <template #suffix>
              <n-button
                v-if="searchKeyword"
                type="primary"
                size="small"
                round
                @click="handleSearch"
              >
                搜索
              </n-button>
            </template>
          </n-input>
        </div>
      </n-card>
    </div>

    <!-- 推荐列表 -->
    <div v-if="qqRecData.length > 0" class="qq-rec">
      <div v-for="(item, index) in qqRecData" :key="index" class="rec-section">
        <n-flex
          class="title"
          align="center"
          justify="space-between"
        >
          <n-h3 prefix="bar">
            <n-text>{{ item.name }}</n-text>
          </n-h3>
        </n-flex>
        <CoverList
          :data="item.list"
          :type="item.type"
          :loading="loading"
          :hiddenCover="settingStore.hiddenCovers.home"
        />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!loading" class="qq-empty">
      <n-empty description="QQ音乐功能需要配合后端API使用">
        <template #extra>
          <n-text depth="3">
            请确保已启动 QQ音乐 API 服务，<br />
            默认地址：http://localhost:3300
          </n-text>
        </template>
      </n-empty>
    </div>

    <!-- 搜索弹窗 -->
    <n-modal v-model:show="showSearchModal" preset="card" title="搜索结果" style="width: 800px; max-width: 95vw;">
      <div v-if="searchResults.length > 0" class="search-results">
        <n-data-table
          :columns="searchColumns"
          :data="searchResults"
          :row-key="(row: any) => row.id"
          :bordered="false"
          :single-line="false"
          size="small"
        />
      </div>
      <n-empty v-else-if="!searchLoading" description="未找到相关歌曲" />
      <n-spin v-if="searchLoading" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { NInput, NCard, NH3, NText, NIcon, NButton, NEmpty, NModal, NDataTable, NSpin, NFlex } from "naive-ui";
// 内联搜索图标
const Search = {
  render() {
    return {
      tag: "svg",
      props: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: "18", height: "18", fill: "currentColor" },
      children: [{ tag: "path", props: { d: "M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3ZM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8Z" } }]
    } as any;
  },
};
import type { DataTableColumns } from "naive-ui";
import { useSettingStore } from "@/stores";
import { useSourceStore } from "@/stores/source";
import CoverList from "@/components/List/CoverList.vue";
import { qqMusicSearch, qqMusicTopList, qqMusicRecommend } from "@/api/qqmusic";

const settingStore = useSettingStore();
const sourceStore = useSourceStore();

const searchKeyword = ref("");
const loading = ref(false);
const searchLoading = ref(false);
const showSearchModal = ref(false);
const qqRecData = reactive<Array<{ name: string; list: any[]; type: "playlist" | "album" | "video" | "radio" }>>([]);
const searchResults = ref<any[]>([]);

// 搜索表格列
const searchColumns: DataTableColumns<any> = [
  {
    title: "#",
    key: "index",
    width: 50,
    render: (_, index) => index + 1,
  },
  {
    title: "歌曲",
    key: "name",
    render: (row) => row.name || row.songname,
  },
  {
    title: "歌手",
    key: "singer",
    render: (row) => {
      const singers = row.singer || row.singers;
      if (!singers) return "未知";
      return Array.isArray(singers)
        ? singers.map((s: any) => s.name).join(" / ")
        : singers;
    },
  },
  {
    title: "专辑",
    key: "album",
    render: (row) => row.album || row.albumname || "未知",
  },
];

const handleSearch = async () => {
  if (!searchKeyword.value.trim()) return;
  searchLoading.value = true;
  showSearchModal.value = true;
  try {
    const res: any = await qqMusicSearch(searchKeyword.value.trim());
    if (res?.data?.list) {
      searchResults.value = res.data.list;
    } else if (res?.list) {
      searchResults.value = res.list;
    } else if (Array.isArray(res)) {
      searchResults.value = res;
    } else {
      searchResults.value = [];
    }
  } catch {
    searchResults.value = [];
  } finally {
    searchLoading.value = false;
  }
};

// 加载QQ音乐内容
const loadQQMusicContent = async () => {
  loading.value = true;
  try {
    // 尝试获取热歌榜
    const topRes: any = await qqMusicTopList().catch(() => null);
    if (topRes?.data?.list || topRes?.list) {
      const list = topRes.data?.list || topRes.list || [];
      qqRecData.push({
        name: "QQ音乐热歌榜",
        list: list.map((item: any) => ({
          id: item.id || item.mid,
          name: item.name || item.songname || item.title,
          cover: item.cover || item.pic || item.album_pic || "",
          artists: item.singer || item.singers || "未知",
        })),
        type: "playlist",
      });
    }

    // 尝试获取推荐
    const recRes: any = await qqMusicRecommend().catch(() => null);
    if (recRes?.data?.list || recRes?.list) {
      const list = recRes.data?.list || recRes.list || [];
      qqRecData.push({
        name: "为你推荐",
        list: list.map((item: any) => ({
          id: item.id || item.mid,
          name: item.name || item.songname || item.title,
          cover: item.cover || item.pic || item.album_pic || "",
          artists: item.singer || item.singers || "未知",
        })),
        type: "playlist",
      });
    }
  } catch {
    // 静默处理
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (sourceStore.isQQMusic) {
    loadQQMusicContent();
  }
});
</script>

<style lang="scss" scoped>
.home-qqmusic {
  width: 100%;
}

.qq-search-area {
  margin-bottom: 24px;
}

.qq-search-box {
  margin-top: 12px;
  max-width: 480px;
}

.rec-section {
  margin-bottom: 32px;

  .title {
    margin-bottom: 12px;
    cursor: default;

    .n-h3 {
      margin: 0;
      font-size: 18px;
    }
  }
}

.qq-empty {
  padding: 60px 0;
}

.search-results {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
