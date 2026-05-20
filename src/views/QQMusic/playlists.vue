<template>
  <div class="qqmusic-playlists">
    <div class="header">
      <n-h2 prefix="bar">
        <n-text>QQ音乐歌单</n-text>
      </n-h2>
      <n-text depth="3">浏览QQ音乐热门歌单，一键导入到本地</n-text>
    </div>

    <n-card size="small" :bordered="false" class="import-card">
      <n-space vertical>
        <n-text strong>导入QQ音乐歌单</n-text>
        <n-input-group>
          <n-input
            v-model:value="importId"
            placeholder="输入QQ音乐歌单ID或链接..."
            clearable
            @keyup.enter="handleImport"
          />
          <n-button type="primary" :loading="importing" @click="handleImport">
            导入歌单
          </n-button>
        </n-input-group>
        <n-text depth="3" style="font-size: 12px">
          支持QQ音乐歌单链接或歌单ID，例如：https://y.qq.com/n/ryqq/playlist/123456
        </n-text>
      </n-space>
    </n-card>

    <div class="section">
      <n-h3 prefix="bar">
        <n-text>热门榜单</n-text>
      </n-h3>
      <n-spin :show="loading">
        <CoverList
          v-if="charts.length > 0"
          :data="charts"
          type="playlist"
          :loading="loading"
          @click-cover="handleCoverClick"
        />
        <n-empty v-else-if="!loading" description="暂无数据" />
      </n-spin>
    </div>

    <div class="section">
      <n-h3 prefix="bar">
        <n-text>推荐歌单</n-text>
      </n-h3>
      <n-spin :show="loading">
        <CoverList
          v-if="recommendList.length > 0"
          :data="recommendList"
          type="playlist"
          :loading="loading"
          @click-cover="handleCoverClick"
        />
        <n-empty v-else-if="!loading" description="暂无推荐" />
      </n-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  NH2, NH3, NText, NCard, NInput, NButton, NInputGroup, NSpace, NSpin, NEmpty,
} from "naive-ui";
import CoverList from "@/components/List/CoverList.vue";
import {
  qqMusicTopList,
  qqMusicRecommend,
  qqMusicPlaylistDetail,
} from "@/api/qqmusic";
import { useLocalStore } from "@/stores";
import type { SongType } from "@/types/main";

const localStore = useLocalStore();
const loading = ref(false);
const importId = ref("");
const importing = ref(false);
const charts = ref<any[]>([]);
const recommendList = ref<any[]>([]);

const handleCoverClick = (item: any) => {
  importId.value = String(item.id);
  handleImport();
};

const extractPlaylistId = (input: string): string => {
  const urlMatch = input.match(/playlist[=/](\d+)/i);
  if (urlMatch) return urlMatch[1];
  if (/^\d+$/.test(input.trim())) return input.trim();
  return "";
};

const handleImport = async () => {
  const id = extractPlaylistId(importId.value.trim());
  if (!id) {
    window.$message.warning("请输入有效的QQ音乐歌单ID或链接");
    return;
  }
  importing.value = true;
  try {
    const res: any = await qqMusicPlaylistDetail(id);
    if (res?.code !== 200 || !res?.data) {
      window.$message.error("获取歌单失败，请检查ID是否正确");
      return;
    }
    const playlistData = res.data;
    const songList = playlistData.songlist || playlistData.song_list || [];
    if (songList.length === 0) {
      window.$message.warning("该歌单中没有歌曲");
      return;
    }

    const songIds: string[] = [];
    const newSongs: SongType[] = [];
    const existingIds = new Set(localStore.localSongs.map((s: SongType) => s.id));

    for (const item of songList) {
      const songInfo = item.songInfo || item.musicData || item;
      const songId = Number(songInfo.id || item.songid || 0);
      const artistName = songInfo.singer
        ? Array.isArray(songInfo.singer)
          ? songInfo.singer.map((s: any) => s.name).join(" / ")
          : String(songInfo.singer)
        : "未知歌手";

      const song: SongType = {
        id: songId,
        name: songInfo.name || songInfo.songname || songInfo.title || "未知歌曲",
        artists: artistName,
        album: songInfo.album?.name || songInfo.albumname || "未知专辑",
        cover: songInfo.album?.pic || songInfo.cover || "",
        duration: (songInfo.interval || 0) * 1000,
        type: "song",
        free: 0 as const,
        mv: null,
        source: "streaming",
      };

      if (song.id) {
        songIds.push(String(song.id));
        if (!existingIds.has(song.id)) {
          newSongs.push(song);
        }
      }
    }

    if (songIds.length === 0) {
      window.$message.warning("无法解析歌单中的歌曲");
      return;
    }

    if (newSongs.length > 0) {
      const mergedSongs = [...localStore.localSongs, ...newSongs];
      await localStore.updateLocalSong(mergedSongs);
    }

    const playlistName = playlistData.dirinfo?.title || playlistData.title || "QQ音乐导入歌单";
    const playlistDesc = playlistData.dirinfo?.desc || playlistData.desc || "";

    const newPlaylist = await localStore.createLocalPlaylist(playlistName, playlistDesc);
    await localStore.addSongsToLocalPlaylist(newPlaylist.id, songIds);
    window.$message.success(`歌单「${playlistName}」导入成功，共 ${songIds.length} 首歌曲`);
    importId.value = "";
  } catch (e: any) {
    console.error("导入歌单失败:", e);
    window.$message.error(e?.message || "导入失败，请重试");
  } finally {
    importing.value = false;
  }
};

const loadData = async () => {
  loading.value = true;
  try {
    const chartTypes = [0, 1, 2, 3, 4];
    const chartNames = ["热歌榜", "新歌榜", "流行榜", "内地榜", "欧美榜"];
    const chartResults = await Promise.allSettled(
      chartTypes.map(async (type) => {
        const res: any = await qqMusicTopList(type);
        return { type, data: res?.data || null };
      }),
    );
    const allCharts: any[] = [];
    chartResults.forEach((r) => {
      if (r.status === "fulfilled") {
        const data = r.value.data;
        if (data?.topinfo) {
          allCharts.push({
            id: String(data.topinfo.topID || chartTypes[r.value.type]),
            name: data.topinfo.ListName || chartNames[r.value.type] || "榜单",
            cover: data.topinfo.pic || data.topinfo.pic_album || "",
            artists: `${data.total_song_num || 0} 首歌曲`,
          });
        }
      }
    });
    charts.value = allCharts;

    const recRes: any = await qqMusicRecommend().catch(() => null);
    if (recRes?.data?.list || recRes?.data?.playlists) {
      const list = recRes.data.list || recRes.data.playlists || [];
      recommendList.value = list.map((item: any) => ({
        id: String(item.id || item.dissid || item.tid),
        name: item.title || item.name || item.dissname,
        cover: item.picurl || item.picUrl || item.cover || item.imgurl || "",
        artists: item.creator?.name || item.nickname || "",
      }));
    }
  } catch {
    // ignore
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.qqmusic-playlists {
  width: 100%;
}

.header {
  margin-bottom: 24px;
}

.import-card {
  margin-bottom: 32px;
}

.section {
  margin-bottom: 32px;
}
</style>
