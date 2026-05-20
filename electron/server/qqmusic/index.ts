import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import { serverLog } from "../../main/logger";
import { decryptQrc } from "./qrc";

/**
 * QQ 音乐移动端 API 配置
 */
const QM_API_URL = "https://u.y.qq.com/cgi-bin/musicu.fcg";

const QM_HEADERS = {
  "Content-Type": "application/json",
  "Accept-Encoding": "gzip",
  "User-Agent": "okhttp/3.14.9",
  Cookie: "tmeLoginType=-1;",
};

const getCommonParams = () => ({
  ct: 11,
  cv: "1003006",
  v: "1003006",
  os_ver: "15",
  phonetype: "24122RKC7C",
  tmeAppID: "qqmusiclight",
  nettype: "NETWORK_WIFI",
  udid: "0",
});

let sessionCache: {
  uid?: string;
  sid?: string;
  userip?: string;
  expireTime?: number;
} = {};

async function initSession(): Promise<void> {
  if (sessionCache.uid && sessionCache.expireTime && Date.now() < sessionCache.expireTime) {
    return;
  }
  try {
    const response = await axios.post(
      QM_API_URL,
      {
        comm: getCommonParams(),
        request: {
          method: "GetSession",
          module: "music.getSession.session",
          param: { caller: 0, uid: "0", vkey: 0 },
        },
      },
      { headers: QM_HEADERS },
    );
    const data = response.data;
    if (data.code === 0 && data.request?.code === 0) {
      const session = data.request.data.session;
      sessionCache = {
        uid: session.uid,
        sid: session.sid,
        userip: session.userip,
        expireTime: Date.now() + 3600000,
      };
      serverLog.log("🔑 QQ 音乐会话初始化成功");
    }
  } catch {
    serverLog.warn("⚠️ QQ 音乐会话初始化失败，将使用默认参数");
  }
}

async function qmRequest(method: string, module: string, param: Record<string, any>): Promise<any> {
  await initSession();
  const comm = {
    ...getCommonParams(),
    ...(sessionCache.uid ? { uid: sessionCache.uid } : {}),
    ...(sessionCache.sid ? { sid: sessionCache.sid } : {}),
    ...(sessionCache.userip ? { userip: sessionCache.userip } : {}),
  };
  const response = await axios.post(
    QM_API_URL,
    { comm, request: { method, module, param } },
    { headers: QM_HEADERS },
  );
  const data = response.data;
  if (data.code !== 0 || data.request?.code !== 0) {
    throw new Error(`QM API 错误: ${data.code || data.request?.code}`);
  }
  return data.request.data;
}

/**
 * 发送多个并行请求
 */
async function qmBatchRequest(
  requests: Array<{ method: string; module: string; param: Record<string, any> }>,
): Promise<any> {
  await initSession();
  const comm = {
    ...getCommonParams(),
    ...(sessionCache.uid ? { uid: sessionCache.uid } : {}),
    ...(sessionCache.sid ? { sid: sessionCache.sid } : {}),
    ...(sessionCache.userip ? { userip: sessionCache.userip } : {}),
  };
  const response = await axios.post(
    QM_API_URL,
    {
      comm,
      request: requests.map((r) => ({ method: r.method, module: r.module, param: r.param })),
    },
    { headers: QM_HEADERS },
  );
  const data = response.data;
  if (data.code !== 0) {
    throw new Error(`QM 批量请求错误: ${data.code}`);
  }
  return data.request;
}

interface LyricResponse {
  code: number;
  lrc?: string;
  qrc?: string;
  trans?: string;
  roma?: string;
  message?: string;
}

interface SearchResponse {
  code: number;
  songs?: Array<{
    id: string;
    mid: string;
    name: string;
    artist: string;
    album: string;
    duration: number;
  }>;
  total?: number;
  message?: string;
}

async function getQQMusicLyric(
  songId: number,
  songName = "",
  singerName = "",
  albumName = "",
  duration = 0,
): Promise<LyricResponse> {
  try {
    const b64encode = (str: string) => Buffer.from(str, "utf8").toString("base64");
    const param = {
      albumName: b64encode(albumName),
      crypt: 1,
      ct: 19,
      cv: 2111,
      interval: duration,
      lrc_t: 0,
      qrc: 1,
      qrc_t: 0,
      roma: 1,
      roma_t: 0,
      singerName: b64encode(singerName),
      songID: songId,
      songName: b64encode(songName),
      trans: 1,
      trans_t: 0,
      type: 0,
    };
    const response = await qmRequest("GetPlayLyricInfo", "music.musichallSong.PlayLyricInfo", param);
    const result: LyricResponse = { code: 200 };
    const lyric = response.lyric;
    if (lyric && lyric.length > 0) {
      try {
        result.qrc = decryptQrc(lyric);
      } catch (error: any) {
        serverLog.error("QRC 歌词解密失败:", error.message);
      }
    }
    if (response.qrc_t === 0 && lyric) {
      try {
        result.lrc = decryptQrc(lyric);
      } catch { /* ignore */ }
    } else {
      try {
        const lrcParam = { ...param, qrc: 0, qrc_t: 0 };
        const lrcResponse = await qmRequest(
          "GetPlayLyricInfo",
          "music.musichallSong.PlayLyricInfo",
          lrcParam,
        );
        if (lrcResponse.lyric && lrcResponse.lyric.length > 0) {
          result.lrc = decryptQrc(lrcResponse.lyric);
        }
      } catch { /* ignore */ }
    }
    const trans = response.trans;
    if (trans && trans.length > 0) {
      try {
        result.trans = decryptQrc(trans);
      } catch { /* ignore */ }
    }
    const roma = response.roma;
    if (roma && roma.length > 0) {
      try {
        result.roma = decryptQrc(roma);
      } catch { /* ignore */ }
    }
    return result;
  } catch (error: any) {
    serverLog.error("QQ 音乐歌词获取失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

async function searchQQMusic(
  keyword: string,
  page = 1,
  pageSize = 20,
): Promise<SearchResponse> {
  try {
    const param = {
      search_id: String(
        Math.floor(Math.random() * 20) * 18014398509481984 +
          Math.floor(Math.random() * 4194304) * 4294967296 +
          (Date.now() % 86400000),
      ),
      remoteplace: "search.android.keyboard",
      query: keyword,
      search_type: 0,
      num_per_page: pageSize,
      page_num: page,
      highlight: 0,
      nqc_flag: 0,
      page_id: 1,
      grp: 1,
    };
    const response = await qmRequest("DoSearchForQQMusicLite", "music.search.SearchCgiService", param);
    const songList = response.body?.item_song || [];
    const songs = songList.map((song: any) => ({
      id: String(song.id),
      mid: song.mid,
      name: song.title,
      artist: song.singer?.map((s: any) => s.name).filter(Boolean).join(" / ") || "未知歌手",
      album: song.album?.name || "",
      duration: (song.interval || 0) * 1000,
    }));
    return { code: 200, songs, total: response.meta?.sum || songs.length };
  } catch (error: any) {
    serverLog.error("QQ 音乐搜索失败:", error);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取歌曲 URL（通过 vkey）
 */
async function getSongUrl(
  songMid: string,
  quality: string = "high",
): Promise<{ url?: string; code: number; message?: string }> {
  try {
    const qualityMap: Record<string, { filenamePrefix: string; type: number }> = {
      low: { filenamePrefix: "M500", type: 128 },
      medium: { filenamePrefix: "M500", type: 192 },
      high: { filenamePrefix: "M800", type: 320 },
      flac: { filenamePrefix: "F000", type: 0 },
      hires: { filenamePrefix: "A000", type: 0 },
    };
    const q = qualityMap[quality] || qualityMap["high"];
    const filename = `${q.filenamePrefix}${songMid}.mp3`;

    const response = await qmRequest("CgiGetVkey", "music.vkey.GetVkey", {
      guid: String(Math.floor(Math.random() * 10000000000)),
      songmid: [songMid],
      songtype: [q.type],
      uin: String(sessionCache.uid || "0"),
      loginflag: 1,
      platform: "20",
    });

    const midInfo = response.midurlinfo?.[0];
    if (!midInfo?.purl || midInfo.purl === "") {
      return { code: 404, message: "暂无可用音源" };
    }
    const purl = midInfo.purl;
    const url = `http://dl.stream.qqmusic.qq.com/${purl}`;
    return { code: 200, url };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取歌曲URL失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取歌单详情
 */
async function getPlaylistDetail(disstId: string, songBegin = 0, songNum = 100): Promise<any> {
  try {
    const response = await qmRequest("GetPlaylistDetail", "music.musicasset.PlaylistDetail", {
      disstid: Number(disstId),
      userinfo: 1,
      tag: 1,
      is_pc: 1,
      guid: String(Math.floor(Math.random() * 10000000000)),
      onlysonglist: 0,
      song_begin: songBegin,
      song_num: songNum,
    });
    return { code: 200, data: response };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取歌单详情失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取排行榜
 */
async function getTopList(type = 0): Promise<any> {
  try {
    const toplistIds: Record<number, number> = {
      0: 26, 1: 27, 2: 4, 3: 5, 4: 28, 5: 3,
    };
    const topId = toplistIds[type] || 26;

    const response = await qmRequest("GetToplist", "music.musicToplist.Toplist", {
      topid: topId,
      userinfo: 1,
      tag: 1,
      is_pc: 1,
      guid: String(Math.floor(Math.random() * 10000000000)),
      onlysonglist: 0,
      song_begin: 0,
      song_num: 100,
    });
    return { code: 200, data: response };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取排行榜失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取推荐歌单
 */
async function getRecommend(): Promise<any> {
  try {
    const response = await qmRequest("GetRecommendPlaylist", "music.recommend.RecommendPlaylist", {
      userinfo: 1,
      tag: 1,
      is_pc: 1,
      guid: String(Math.floor(Math.random() * 10000000000)),
      page: 1,
      num: 30,
    });
    return { code: 200, data: response };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取推荐歌单失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取歌曲详情
 */
async function getSongDetail(songMid: string): Promise<any> {
  try {
    const response = await qmRequest("GetTrackInfo", "music.trackInfo.UniformRuleCtrl", {
      mids: [songMid],
      types: [0],
      musicinfo: 1,
      userinfo: 1,
      tag: 1,
      is_pc: 1,
      guid: String(Math.floor(Math.random() * 10000000000)),
    });
    return { code: 200, data: response };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取歌曲详情失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取歌手详情
 */
async function getArtistDetail(mid: string): Promise<any> {
  try {
    const results = await qmBatchRequest([
      {
        method: "GetSingerInfo",
        module: "music.singer.SingerInfo",
        param: {
          singer_mid: mid,
          userinfo: 1,
          tag: 1,
          is_pc: 1,
          guid: String(Math.floor(Math.random() * 10000000000)),
        },
      },
      {
        method: "GetSingerSongList",
        module: "music.singer.SingerSongList",
        param: {
          singer_mid: mid,
          begin: 0,
          num: 50,
          order: 0,
        },
      },
    ]);

    const singerInfo = results?.req_0?.data;
    const songList = results?.req_1?.data;

    return {
      code: 200,
      data: {
        singer: singerInfo,
        songs: songList?.songList || [],
        total: songList?.total || 0,
      },
    };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取歌手详情失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取专辑详情
 */
async function getAlbumDetail(albumMid: string): Promise<any> {
  try {
    const response = await qmRequest("GetAlbumInfo", "music.album.AlbumInfo", {
      albummid: albumMid,
      userinfo: 1,
      tag: 1,
      is_pc: 1,
      guid: String(Math.floor(Math.random() * 10000000000)),
    });
    return { code: 200, data: response };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取专辑详情失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

/**
 * 获取QQ音乐用户收藏的歌单
 */
async function getUserPlaylists(uin: string): Promise<any> {
  try {
    const response = await qmRequest("GetUserPlaylists", "music.musicasset.PlaylistBaseInfo", {
      uin,
      userinfo: 1,
      tag: 1,
      is_pc: 1,
      guid: String(Math.floor(Math.random() * 10000000000)),
      page: 1,
      num: 50,
    });
    return { code: 200, data: response };
  } catch (error: any) {
    serverLog.error("QQ 音乐获取用户歌单失败:", error.message);
    return { code: 500, message: error.message || "服务器错误" };
  }
}

export const initQQMusicAPI = async (fastify: FastifyInstance) => {
  initSession().catch(() => {});

  fastify.get("/qqmusic", (_, reply) => {
    reply.send({
      name: "QQMusicAPI",
      description: "QQ 音乐完整 API",
      author: "@imsyy",
      routes: [
        { path: "/api/qqmusic/lyric", method: "GET", description: "获取歌词（LRC 和逐字歌词）" },
        { path: "/api/qqmusic/search", method: "GET", description: "搜索歌曲" },
        { path: "/api/qqmusic/match", method: "GET", description: "模糊匹配获取歌词" },
        { path: "/api/qqmusic/song/url", method: "GET", description: "获取歌曲播放链接" },
        { path: "/api/qqmusic/song/detail", method: "GET", description: "获取歌曲详情" },
        { path: "/api/qqmusic/song/download", method: "GET", description: "获取歌曲下载链接" },
        { path: "/api/qqmusic/toplist", method: "GET", description: "获取排行榜" },
        { path: "/api/qqmusic/recommend", method: "GET", description: "获取推荐歌单" },
        { path: "/api/qqmusic/playlist/detail", method: "GET", description: "获取歌单详情" },
        { path: "/api/qqmusic/artist/detail", method: "GET", description: "获取歌手详情" },
        { path: "/api/qqmusic/album/detail", method: "GET", description: "获取专辑详情" },
        { path: "/api/qqmusic/user/playlists", method: "GET", description: "获取用户歌单列表" },
      ],
    });
  });

  // 获取歌词
  fastify.get(
    "/qqmusic/lyric",
    async (
      req: FastifyRequest<{ Querystring: { id: string; name?: string; artist?: string; album?: string; duration?: string } }>,
      reply: FastifyReply,
    ) => {
      const { id, name = "", artist = "", album = "", duration = "0" } = req.query;
      if (!id) return reply.status(400).send({ code: 400, message: "id 参数是必须的" });
      const songId = parseInt(id, 10);
      if (isNaN(songId)) return reply.status(400).send({ code: 400, message: "id 必须是有效的数字" });
      const result = await getQQMusicLyric(songId, name, artist, album, parseInt(duration, 10) || 0);
      return reply.send(result);
    },
  );

  // 搜索歌曲
  fastify.get(
    "/qqmusic/search",
    async (
      req: FastifyRequest<{ Querystring: { keyword: string; page?: string; pageSize?: string } }>,
      reply: FastifyReply,
    ) => {
      const { keyword, page = "1", pageSize = "20" } = req.query;
      if (!keyword) return reply.status(400).send({ code: 400, message: "keyword 参数是必须的" });
      const result = await searchQQMusic(keyword, parseInt(page, 10) || 1, parseInt(pageSize, 10) || 20);
      return reply.send(result);
    },
  );

  // 模糊匹配获取歌词
  fastify.get(
    "/qqmusic/match",
    async (req: FastifyRequest<{ Querystring: { keyword: string } }>, reply: FastifyReply) => {
      const { keyword } = req.query;
      if (!keyword) return reply.status(400).send({ code: 400, message: "keyword 参数是必须的" });
      const searchResult = await searchQQMusic(keyword, 1, 1);
      if (!searchResult.songs || searchResult.songs.length === 0) {
        return reply.status(404).send({ code: 404, message: "未找到匹配的歌曲" });
      }
      const song = searchResult.songs[0];
      const lyricResult = await getQQMusicLyric(
        parseInt(song.id, 10), song.name, song.artist, song.album, Math.floor(song.duration / 1000),
      );
      const { code: _code, ...lyrics } = lyricResult;
      return reply.send({ code: 200, song: { id: song.id, mid: song.mid, name: song.name, artist: song.artist, album: song.album, duration: song.duration }, ...lyrics });
    },
  );

  // 获取歌曲播放链接
  fastify.get(
    "/qqmusic/song/url",
    async (
      req: FastifyRequest<{ Querystring: { id: string; quality?: string } }>,
      reply: FastifyReply,
    ) => {
      const { id, quality = "high" } = req.query;
      if (!id) return reply.status(400).send({ code: 400, message: "id 参数是必须的" });
      const result = await getSongUrl(id, quality);
      return reply.send(result);
    },
  );

  // 获取歌曲下载链接
  fastify.get(
    "/qqmusic/song/download",
    async (
      req: FastifyRequest<{ Querystring: { id: string; quality?: string } }>,
      reply: FastifyReply,
    ) => {
      const { id, quality = "high" } = req.query;
      if (!id) return reply.status(400).send({ code: 400, message: "id 参数是必须的" });
      const result = await getSongUrl(id, quality);
      return reply.send(result);
    },
  );

  // 获取歌曲详情
  fastify.get(
    "/qqmusic/song/detail",
    async (req: FastifyRequest<{ Querystring: { id: string } }>, reply: FastifyReply) => {
      const { id } = req.query;
      if (!id) return reply.status(400).send({ code: 400, message: "id 参数是必须的" });
      const result = await getSongDetail(id);
      return reply.send(result);
    },
  );

  // 获取排行榜
  fastify.get(
    "/qqmusic/toplist",
    async (req: FastifyRequest<{ Querystring: { type?: string } }>, reply: FastifyReply) => {
      const { type = "0" } = req.query;
      const result = await getTopList(parseInt(type, 10) || 0);
      return reply.send(result);
    },
  );

  // 获取推荐歌单
  fastify.get("/qqmusic/recommend", async (_, reply: FastifyReply) => {
    const result = await getRecommend();
    return reply.send(result);
  });

  // 获取歌单详情
  fastify.get(
    "/qqmusic/playlist/detail",
    async (
      req: FastifyRequest<{ Querystring: { id: string; page?: string; pageSize?: string } }>,
      reply: FastifyReply,
    ) => {
      const { id, page = "0", pageSize = "100" } = req.query;
      if (!id) return reply.status(400).send({ code: 400, message: "id 参数是必须的" });
      const songBegin = (parseInt(page, 10) || 0) * (parseInt(pageSize, 10) || 100);
      const result = await getPlaylistDetail(id, songBegin, parseInt(pageSize, 10) || 100);
      return reply.send(result);
    },
  );

  // 获取歌手详情
  fastify.get(
    "/qqmusic/artist/detail",
    async (req: FastifyRequest<{ Querystring: { mid: string } }>, reply: FastifyReply) => {
      const { mid } = req.query;
      if (!mid) return reply.status(400).send({ code: 400, message: "mid 参数是必须的" });
      const result = await getArtistDetail(mid);
      return reply.send(result);
    },
  );

  // 获取专辑详情
  fastify.get(
    "/qqmusic/album/detail",
    async (req: FastifyRequest<{ Querystring: { id: string } }>, reply: FastifyReply) => {
      const { id } = req.query;
      if (!id) return reply.status(400).send({ code: 400, message: "id 参数是必须的" });
      const result = await getAlbumDetail(id);
      return reply.send(result);
    },
  );

  // 获取用户歌单列表
  fastify.get(
    "/qqmusic/user/playlists",
    async (req: FastifyRequest<{ Querystring: { uin: string } }>, reply: FastifyReply) => {
      const { uin } = req.query;
      if (!uin) return reply.status(400).send({ code: 400, message: "uin 参数是必须的" });
      const result = await getUserPlaylists(uin);
      return reply.send(result);
    },
  );

  serverLog.info("🌐 Register QQMusicAPI successfully");
};
