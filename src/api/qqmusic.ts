import request from "@/utils/request";

/**
 * QQ 音乐模糊匹配歌词响应
 */
export interface QQMusicMatchResponse {
  code: number;
  song?: {
    id: string;
    mid: string;
    name: string;
    artist: string;
    album: string;
    duration: number;
  };
  /** LRC 格式歌词 */
  lrc?: string;
  /** QRC 逐字歌词原始内容 */
  qrc?: string;
  /** 翻译歌词 */
  trans?: string;
  /** 罗马音歌词 */
  roma?: string;
  message?: string;
}

/**
 * QQ 音乐模糊匹配获取歌词
 * @param keyword 搜索关键词（建议格式：歌曲名-歌手名）
 * @returns 歌词数据
 */
export const qqMusicMatch = (keyword: string): Promise<QQMusicMatchResponse> => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/match",
    params: { keyword },
  });
};

/**
 * QQ 音乐搜索歌曲
 * @param keyword 搜索关键词
 * @param page 页码
 * @param pageSize 每页数量
 */
export const qqMusicSearch = (keyword: string, page = 1, pageSize = 20) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/search",
    params: { keyword, page, pageSize },
  });
};

/**
 * QQ 音乐获取歌词
 * @param id 歌曲 ID（数字）
 * @param name 歌曲名称
 * @param artist 歌手名称
 */
export const qqMusicLyric = (id: number, name?: string, artist?: string) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/lyric",
    params: { id, name, artist },
  });
};

/**
 * QQ 音乐获取歌曲播放链接
 * @param id 歌曲 ID (songmid)
 * @param quality 音质等级: low | medium | high | flac | hires
 */
export const qqMusicSongUrl = (id: string, quality: string = "high") => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/song/url",
    params: { id, quality },
  });
};

/**
 * QQ 音乐获取歌曲详情
 * @param id 歌曲 ID (songmid)
 */
export const qqMusicSongDetail = (id: string) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/song/detail",
    params: { id },
  });
};

/**
 * QQ 音乐排行榜/热歌榜
 * @param type 榜单类型: 0=热歌榜, 1=新歌榜, 2=飙升榜
 */
export const qqMusicTopList = (type: number = 0) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/toplist",
    params: { type },
  });
};

/**
 * QQ 音乐推荐歌单
 */
export const qqMusicRecommend = () => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/recommend",
  });
};

/**
 * QQ 音乐获取歌单详情
 * @param id 歌单 ID
 */
export const qqMusicPlaylistDetail = (id: string) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/playlist/detail",
    params: { id },
  });
};

/**
 * QQ 音乐获取歌手详情
 * @param mid 歌手 mid
 */
export const qqMusicArtistDetail = (mid: string) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/artist/detail",
    params: { mid },
  });
};

/**
 * QQ 音乐获取专辑详情
 * @param id 专辑 ID
 */
export const qqMusicAlbumDetail = (id: string) => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/album/detail",
    params: { id },
  });
};

/**
 * QQ 音乐获取歌曲下载链接
 * @param id 歌曲 ID (songmid)
 * @param quality 音质等级
 */
export const qqMusicSongDownloadUrl = (id: string, quality: string = "high") => {
  return request({
    baseURL: "/api/qqmusic",
    url: "/song/download",
    params: { id, quality },
  });
};
