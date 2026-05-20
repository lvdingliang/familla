<div align="center">
<img alt="logo" height="100" width="100" src="public/icons/favicon.png" />
<h2> SPlayer </h2>
<p> 涓€涓畝绾︾殑闊充箰鎾斁鍣?</p>

[API Docs](https://splayer.github.com/lvdingliang/familla/api.html) | [寮€鍙戠増](https://github.com/lvdingliang/familla/actions) | [鍙戣鐗圿(https://splayer.github.com/lvdingliang/familla/download.html)

<br />

[![Stars](https://img.shields.io/github/stars/lvdingliang/familla?style=flat)](https://github.com/lvdingliang/familla/stargazers)
[![Version](https://img.shields.io/github/v/release/lvdingliang/familla)](https://github.com/lvdingliang/familla/releases)
[![Build Release](https://github.com/lvdingliang/familla/actions/workflows/release.yml/badge.svg)](https://github.com/lvdingliang/familla/actions/workflows/release.yml)
[![License](https://img.shields.io/github/license/lvdingliang/familla)](https://github.com/lvdingliang/familla/blob/dev/LICENSE)
[![Issues](https://img.shields.io/github/issues/lvdingliang/familla)](https://github.com/lvdingliang/familla/issues)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/lvdingliang/familla)

</div>

![main](/screenshots/SPlayer.jpg)

## 璇存槑

![鎻愮ず](/screenshots/gitcodes.png)

> [!IMPORTANT]
>
> ### 涓ヨ們璀﹀憡
>
> - 璇峰姟蹇呴伒瀹?[GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 璁稿彲鍗忚
> - 鍦ㄦ偍鐨勪慨鏀广€佹紨缁庛€佸垎鍙戞垨娲剧敓椤圭洰涓紝蹇呴』鍚屾牱閲囩敤 **AGPL-3.0** 璁稿彲鍗忚锛?*骞跺湪閫傚綋鐨勪綅缃寘鍚湰椤圭洰鐨勮鍙拰鐗堟潈淇℃伅**
> - 鑻ユ偍鐢ㄤ簬鍞崠鎴栧叾浠栫泩鍒╃敤閫旓紝**蹇呴』鎻愪緵鏈」鐩殑婧愪唬鐮佸強鍘熼」鐩摼鎺?*銆傚彟澶栫敱浜庢湰椤圭洰娑夊強绗笁鏂癸紝**鍞崠鍚庡彲鑳介伃鍙楁硶寰嬫垨璇夎椋庨櫓**銆傚鑻ュ彂鐜拌繚鍙嶈鍙崗璁紝浣滆€呬繚鐣欒拷绌舵硶寰嬭矗浠荤殑鏉冨埄
> - 绂佹鍦ㄤ簩寮€椤圭洰涓慨鏀圭▼搴忓師鐗堟潈淇℃伅锛?鎮ㄥ彲浠ユ坊鍔犱簩寮€浣滆€呬俊鎭?锛?> - 鎰熻阿鎮ㄧ殑灏婇噸涓庣悊瑙?
- 鏈」鐩噰鐢?[Vue 3](https://cn.vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Na茂ve UI](https://www.naiveui.com/) + [Electron](https://www.electronjs.org/zh/docs/latest/) 寮€鍙?- Node.js 鐗堟湰瑕佹眰锛?= 20锛屽寘绠＄悊鍣細pnpm >= 10
- 榛樿浼氭瀯寤哄師鐢熸ā鍧楋紝闇€鍑嗗 Rust 宸ュ叿閾撅紱濡備粎闇€瑕佺綉椤电鏋勫缓鎴栨殏鏃惰烦杩囷紝鍙缃幆澧冨彉閲?`SKIP_NATIVE_BUILD=true`
- 鏀寔缃戦〉绔笌瀹㈡埛绔紝鐢变簬璁惧鏈夐檺锛岀洰鍓嶄粎淇濊瘉 Windows 绯荤粺鐨勯€傞厤锛屽叾浠栧钩鍙板閬囬棶棰樺彲浠ユ彁 Issue 鎴栬嚜琛岃В鍐冲悗閫夋嫨鎻?PR
<!-- - 浠呭绉诲姩绔仛浜嗗熀纭€閫傞厤锛?*涓嶄繚璇佸姛鑳藉叏閮ㄥ彲鐢?* -->

<!--  > 璇锋敞鎰忥紝鏈▼搴忎笉鎵撶畻寮€鍙戠Щ鍔ㄧ锛屼篃涓嶄細瀵圭Щ鍔ㄧ杩涜瀹岀編閫傞厤锛屼粎淇濊瘉鍩虹鍙敤鎬?-->

- 娆㈣繋鍚勪綅澶т浆 `Star` 馃槏

## 馃鈥嶐煉?寮€鍙?
### 蹇€熷紑濮?
1. 瀹夎渚濊禆锛歚pnpm install`
2. 澶嶅埗 `.env.example` 涓?`.env` 骞舵寜闇€淇敼
3. 鍚姩寮€鍙戯細`pnpm dev`
4. 鏋勫缓锛?   - `pnpm build`
   - `pnpm build:win`

### 璺宠繃鍘熺敓妯″潡鏋勫缓

榛樿浼氱紪璇?`native/*` 涓嬬殑鍘熺敓妯″潡锛堥渶瑕?Rust锛夈€傚鏋滀綘鐨勫満鏅笉闇€瑕佸師鐢熻兘鍔涳紝鍙缃?`SKIP_NATIVE_BUILD=true` 鍚庡啀鎵ц `pnpm dev` / `pnpm build`銆?
## 馃憖 Demo

- 鍦ㄧ嚎婕旂ず锛歔SPlayer](https://splayer.20100907.xyz)

  > 濡傛墦涓嶅紑锛岃鏄庡凡缁忓け鏁堣鑷鍓嶅線 [鑾峰彇](#锔?鑾峰彇)

## 馃帀 鍔熻兘

- 鉁?鏀寔鎵爜鐧诲綍
- 馃摫 鏀寔鎵嬫満鍙风櫥褰?- ~~馃搮 鑷姩杩涜姣忔棩绛惧埌鍙婁簯璐濈鍒皛~
- 馃捇 鏀寔妗岄潰姝岃瘝
- 馃捇 鏀寔鍒囨崲涓烘湰鍦版挱鏀惧櫒锛屾妯″紡灏嗕笉浼氳繛鎺ョ綉缁?- 馃帹 灏侀潰涓婚鑹茶嚜閫傚簲锛屾敮鎸佸叏绔欑潃鑹?- 馃寶 Light / Dark / Auto 妯″紡鑷姩鍒囨崲
- 馃搧 鏈湴姝屾洸绠＄悊鍙婂垎绫伙紙寤鸿鍏堜娇鐢?[闊充箰鏍囩](https://www.cnblogs.com/vinlxc/p/11347744.html) 杩涜鍖归厤鍚庡啀浣跨敤锛?- 馃搧 鏈湴闊充箰鏍囩缂栬緫鍙婂皝闈慨鏀?- 鉃?鏂板缓姝屽崟鍙婃瓕鍗曠紪杈?- 鉂わ笍 鏀惰棌 / 鍙栨秷鏀惰棌姝屽崟鎴栨瓕鎵?- 鈽侊笍 浜戠洏闊充箰涓婁紶
- 馃搨 浜戠洏鍐呮瓕鏇叉挱鏀?- 馃攧 浜戠洏鍐呮瓕鏇茬籂姝?- 馃棏锔?浜戠洏姝屾洸鍒犻櫎
- 馃寪 鏀寔 Subsonic / Navidrome 绛夋祦濯掍綋鏈嶅姟锛堝鏈嶅姟鍣ㄦ敮鎸併€佽嚜鍔ㄨ繛鎺ワ級
- 馃摑 鏀寔閫愬瓧姝岃瘝
- 馃攧 姝岃瘝婊氬姩浠ュ強姝岃瘝缈昏瘧
- 馃摴 MV 涓庤棰戞挱鏀?- 馃幎 闊充箰棰戣氨鏄剧ず
- 鈴笍 闊充箰娓愬叆娓愬嚭
- 馃攧 鏀寔 PWA
- 馃挰 鏀寔璇勮鍖?- 馃幍 鏀寔 Last.fm Scrobble锛堟挱鏀捐褰曚笂鎶ワ級
- 馃摫 绉诲姩绔熀纭€閫傞厤

## 馃柤锔?鐣岄潰灞曠ず

> 寮€鍙戜腑锛屼粎渚涘弬鑰?
<details>
<summary> 涓婚〉闈?</summary>

![涓婚〉闈(/screenshots/SPlayer%20-%20涓婚〉闈?jpg)

</details>

<details>
<summary> 鎾斁椤甸潰 </summary>

![鎾斁椤甸潰](/screenshots/SPlayer%20-%20鎾斁椤甸潰.jpg)

</details>

<details>
<summary> 鍙戠幇椤甸潰 </summary>

![鍙戠幇椤甸潰](/screenshots/SPlayer%20-%20鍙戠幇椤甸潰.jpg)

</details>

<details>
<summary> 姝屽崟椤甸潰 </summary>

![鍙戠幇椤甸潰](/screenshots/SPlayer%20-%20姝屽崟椤甸潰.jpg)

</details>

<details>
<summary> 璇勮椤甸潰 </summary>

![鍙戠幇椤甸潰](/screenshots/SPlayer%20-%20璇勮椤甸潰.jpg)

</details>

<details>
<summary> 鏈湴闊充箰 </summary>

![鍙戠幇椤甸潰](/screenshots/SPlayer%20-%20鏈湴闊充箰.jpg)

</details>

## 馃摝锔?鑾峰彇

### 浜岃繘鍒跺畨瑁呮柟妗?
#### 绋冲畾鐗?
閫氬父鎯呭喌涓嬶紝鍙互鍦?[Releases](https://github.com/lvdingliang/familla/releases) 涓幏鍙栫ǔ瀹氱増

涔熷彲鍓嶅線 [SPlayer 瀹樼綉](https://splayer.github.com/lvdingliang/familla/) 鑾峰彇绋冲畾鐗?
#### 寮€鍙戠増

鍙互閫氳繃 GitHub Actions 宸ヤ綔娴佽幏鍙栨渶鏂扮殑寮€鍙戠増

[Dev Workflow](https://github.com/lvdingliang/familla/actions/workflows/dev.yml)

### 鑷閮ㄧ讲鏂规

#### 鈿欙笍 Docker 閮ㄧ讲

> 瀹夎鍙婇厤缃?`Docker` 灏嗕笉鍦ㄦ澶勮鏄庯紝璇疯嚜琛岃В鍐?
##### 鏈湴鏋勫缓

> 璇峰敖閲忔媺鍙栨渶鏂板垎鏀悗浣跨敤鏈湴鏋勫缓鏂瑰紡锛屽湪绾块儴缃茬殑浠撳簱鍙兘鏇存柊涓嶅強鏃?
```bash
# 鏋勫缓
docker build -t splayer .

# 杩愯
docker run -d --name SPlayer -p 25884:25884 splayer
# 鎴栦娇鐢?Docker Compose
docker-compose up -d
```

Docker 闀滃儚鍐呭寘鍚綉椤电浠ュ強杩愯鎵€闇€鐨勬湇鍔★紝榛樿閫氳繃 `25884` 绔彛璁块棶銆?
##### 鍦ㄧ嚎閮ㄧ讲

```bash
# 浠?Docker Hub 鎷夊彇
docker pull lvdingliang/familla:latest
# 浠?GitHub ghcr 鎷夊彇
docker pull ghcr.io/lvdingliang/familla:latest

# 杩愯
docker run -d --name SPlayer -p 25884:25884 lvdingliang/familla:latest
```

浠ヤ笂姝ラ鎴愬姛鍚庯紝灏嗕細鍦ㄦ湰鍦?[localhost:25884](http://localhost:25884/) 鍚姩锛屽闇€鏇存崲绔彛锛岃鑷淇敼鍛戒护琛屼腑鐨勭涓€涓鍙ｅ彿

#### 鈿欙笍 Vercel 閮ㄧ讲

> 鍏朵粬閮ㄧ讲骞冲彴澶ц嚧鐩稿悓锛屽湪姝や笉鍋氳鏄?
1. 鏈▼搴忎緷璧?[NeteaseCloudMusicApi](https://github.com/neteasecloudmusicapienhanced/api-enhanced) 杩愯锛岃纭繚鎮ㄥ凡鎴愬姛閮ㄧ讲璇ラ」鐩垨鍏煎鐨勯」鐩紝骞舵垚鍔熷彇寰楀湪绾胯闂湴鍧€
2. 鐐瑰嚮鏈粨搴撳彸涓婅鐨?`Fork`锛屽鍒舵湰浠撳簱鍒颁綘鐨?`GitHub` 璐﹀彿
3. 澶嶅埗 `/.env.example` 鏂囦欢骞堕噸鍛藉悕涓?`/.env`
4. 灏?`.env` 鏂囦欢涓殑 `VITE_API_URL` 鏀逛负绗竴姝ュ緱鍒扮殑 API 鍦板潃

   ```js
   VITE_API_URL = "https://example.com";
   ```

5. 灏?`Build and Output Settings` 涓殑 `Output Directory` 鏀逛负 `out/renderer`

   ![build](/screenshots/build.jpg)

6. 鐐瑰嚮 `Deploy`锛屽嵆鍙垚鍔熼儴缃?
#### 鈿欙笍 鏈嶅姟鍣ㄩ儴缃?
1. 閲嶅 `鈿欙笍 Vercel 閮ㄧ讲` 涓殑 1 - 4 姝ラ
2. 鍏嬮殕浠撳簱

   ```bash
   git clone https://github.com/lvdingliang/familla.git
   ```

3. 瀹夎渚濊禆

   ```bash
   pnpm install
   ```

4. 缂栬瘧鎵撳寘

   ```bash
   pnpm build
   ```

5. 灏嗙珯鐐硅繍琛岀洰褰曡缃负 `out/renderer` 鐩綍

#### 鈿欙笍 鏈湴閮ㄧ讲

1. 鏈湴閮ㄧ讲闇€瑕佺敤鍒?`Node.js`锛?= 20锛夛紝鍙墠寰€ [Node.js 瀹樼綉](https://nodejs.org/zh-cn/) 涓嬭浇瀹夎鍖咃紝璇蜂笅杞芥渶鏂扮ǔ瀹氱増
2. 瀹夎 pnpm锛?= 10锛?
   ```bash
   corepack enable
   # 鎴?   npm install pnpm -g
   ```

3. 鍏嬮殕浠撳簱骞舵媺鍙栬嚦鏈湴锛屾澶勪笉鍐嶈禈杩?4. 浣跨敤 `pnpm install` 瀹夎椤圭洰渚濊禆锛堣嫢瀹夎杩囩▼涓亣鍒扮綉缁滈敊璇紝璇蜂娇鐢ㄥ浗鍐呴暅鍍忔簮鏇夸唬锛屾澶勪笉鍐嶈禈杩帮級
5. 澶嶅埗 `.env.example` 鏂囦欢骞堕噸鍛藉悕涓?`.env` 骞朵慨鏀归厤缃紙濡傞渶璺宠繃鍘熺敓妯″潡鏋勫缓锛屽彲璁剧疆 `SKIP_NATIVE_BUILD=true`锛?6. 鎵撳寘瀹㈡埛绔紝璇蜂緷鎹綘鐨勭郴缁熺被鍨嬫潵閫夋嫨锛屾墦鍖呮垚鍔熷悗锛屼細杈撳嚭瀹夎鍖呮垨鍙墽琛屾枃浠跺湪 `/dist` 鐩綍涓紝鍙嚜琛屽畨瑁?
   > 榛樿鎯呭喌涓嬶紝鏋勫缓鍛戒护浠呬細鏋勫缓褰撳墠绯荤粺鏋舵瀯鐨勭増鏈€傚闇€鏋勫缓鐗瑰畾鏋舵瀯锛堝 x64 + arm64锛夛紝璇峰湪鍛戒护鍚庤拷鍔犲弬鏁帮紝渚嬪锛歚pnpm build:win -- --x64 --arm64`

   | 鍛戒护               | 绯荤粺绫诲瀷 |
   | ------------------ | -------- |
   | `pnpm build:win`   | Windows  |
   | `pnpm build:linux` | Linux    |
   | `pnpm build:mac`   | macOS    |

## 馃槝 楦ｈ阿

鐗规鎰熻阿涓烘湰椤圭洰鎻愪緵鏀寔涓庣伒鎰熺殑椤圭洰锛?
- [NeteaseCloudMusicApi](https://github.com/neteasecloudmusicapienhanced/api-enhanced)
- [YesPlayMusic](https://github.com/qier222/YesPlayMusic)
- [UnblockNeteaseMusic](https://github.com/UnblockNeteaseMusic/server)
- [applemusic-like-lyrics](https://github.com/Steve-xmh/applemusic-like-lyrics)
- [Vue-mmPlayer](https://github.com/maomao1996/Vue-mmPlayer)
- [refined-now-playing-netease](https://github.com/solstice23/refined-now-playing-netease)
- [material-color-utilities](https://github.com/material-foundation/material-color-utilities)

## 馃椇锔?璐＄尞鑰呰仈鐩?
娆㈣繋鍔犲叆鎴戜滑 馃グ! 涓€璧蜂负 SPlayer 璐＄尞涓€浠藉姏閲忋€?鎰熻阿浠ヤ笅鎵€鏈夎础鐚€?馃挅

<a href="https://github.com/lvdingliang/familla/graphs/contributors" target="_blank" rel="noopener">
  <img src="https://contrib.rocks/image?repo=lvdingliang/familla&max=30&anon=1&v=1"
    alt="SPlayer 椤圭洰璐＄尞鑰?
    width="650"
    loading="lazy"
  />
</a>

## 馃摙 鍏嶈矗澹版槑

鏈」鐩儴鍒嗗姛鑳戒娇鐢ㄤ簡缃戞槗浜戦煶涔愮殑绗笁鏂?API 鏈嶅姟锛?*浠呬緵涓汉瀛︿範鐮旂┒浣跨敤锛岀姝㈢敤浜庡晢涓氬強闈炴硶鐢ㄩ€?*

鍚屾椂锛屾湰椤圭洰寮€鍙戣€呮壙璇?**涓ユ牸閬靛畧鐩稿叧娉曞緥娉曡鍜岀綉鏄撲簯闊充箰 API 浣跨敤鍗忚锛屼笉浼氬埄鐢ㄦ湰椤圭洰杩涜浠讳綍杩濇硶娲诲姩銆?* 濡傚洜浣跨敤鏈」鐩€屽紩璧风殑浠讳綍绾犵悍鎴栬矗浠伙紝鍧囩敱浣跨敤鑰呰嚜琛屾壙鎷呫€?*鏈」鐩紑鍙戣€呬笉鎵挎媴浠讳綍鍥犱娇鐢ㄦ湰椤圭洰鑰屽鑷寸殑浠讳綍鐩存帴鎴栭棿鎺ヨ矗浠伙紝骞朵繚鐣欒拷绌朵娇鐢ㄨ€呰繚娉曡涓虹殑鏉冨埄**

璇蜂娇鐢ㄨ€呭湪浣跨敤鏈」鐩椂閬靛畧鐩稿叧娉曞緥娉曡锛?*涓嶈灏嗘湰椤圭洰鐢ㄤ簬浠讳綍鍟嗕笟鍙婇潪娉曠敤閫斻€傚鏈夎繚鍙嶏紝涓€鍒囧悗鏋滅敱浣跨敤鑰呰嚜璐熴€?* 鍚屾椂锛屼娇鐢ㄨ€呭簲璇ヨ嚜琛屾壙鎷呭洜浣跨敤鏈」鐩€屽甫鏉ョ殑椋庨櫓鍜岃矗浠汇€傛湰椤圭洰寮€鍙戣€呬笉瀵规湰椤圭洰鎵€鎻愪緵鐨勬湇鍔″拰鍐呭鍋氬嚭浠讳綍淇濊瘉

鎰熻阿鎮ㄧ殑鐞嗚В

## 馃摐 寮€婧愯鍙?
- **鏈」鐩粎渚涗釜浜哄涔犵爺绌朵娇鐢紝绂佹鐢ㄤ簬鍟嗕笟鍙婇潪娉曠敤閫?*
- 鏈」鐩熀浜?[GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 璁稿彲杩涜寮€婧?  1. **淇敼鍜屽垎鍙戯細** 浠讳綍瀵规湰椤圭洰鐨勪慨鏀瑰拰鍒嗗彂閮藉繀椤诲熀浜?AGPL-3.0 杩涜锛屾簮浠ｇ爜蹇呴』涓€骞舵彁渚?  2. **娲剧敓浣滃搧锛?* 浠讳綍娲剧敓浣滃搧蹇呴』鍚屾牱閲囩敤 AGPL-3.0锛屽苟鍦ㄩ€傚綋鐨勫湴鏂规敞鏄庡師濮嬮」鐩殑璁稿彲璇?  3. **娉ㄦ槑鍘熶綔鑰咃細** 鍦ㄤ换浣曚慨鏀广€佹淳鐢熶綔鍝佹垨鍏朵粬鍒嗗彂涓紝蹇呴』鍦ㄩ€傚綋鐨勪綅缃槑纭敞鏄庡師浣滆€呭強鍏惰础鐚?  4. **鍏嶈矗澹版槑锛?* 鏍规嵁 AGPL-3.0锛屾湰椤圭洰涓嶆彁渚涗换浣曟槑绀烘垨鏆楃ず鐨勬媴淇濄€傝璇︾粏闃呰 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 浠ヤ簡瑙ｅ畬鏁寸殑鍏嶈矗澹版槑鍐呭
  5. **绀惧尯鍙備笌锛?* 娆㈣繋绀惧尯鐨勫弬涓庡拰璐＄尞锛屾垜浠紦鍔卞紑鍙戣€呬竴鍚屾敼杩涘拰缁存姢鏈」鐩?  6. **璁稿彲璇侀摼鎺ワ細** 璇烽槄璇?[GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 浜嗚В鏇村璇︽儏

## 猸?Star History

[![Star History Chart](https://api.star-history.com/svg?repos=lvdingliang/familla&type=Date)](https://star-history.com/#lvdingliang/familla&Date)
