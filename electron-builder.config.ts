import type { Configuration } from "electron-builder";

const config: Configuration = {
  appId: "com.lvdingliang.familla",
  productName: "Familla",
  copyright: "Copyright © 2026 lvdingliang",
  directories: {
    buildResources: "build",
  },
  files: [
    "public/**",
    "out/**",
    "!**/.vscode/*",
    "!src/*",
    "!electron.vite.config.{js,ts,mjs,cjs}",
    "!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}",
    "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
  ],
  asarUnpack: ["public/**"],
  extraResources: [
    {
      from: "native/external-media-integration",
      to: "native",
      filter: ["*.node"],
    },
    {
      from: "native/taskbar-lyric",
      to: "native",
      filter: ["*.node"],
    },
    {
      from: "native/tools",
      to: "native",
      filter: ["*.node"],
    },
  ],
  win: {
    executableName: "Familla",
    icon: "public/icons/logo.ico",
    artifactName: "${productName}-${version}-${arch}.${ext}",
    target: [
      {
        target: "nsis",
        arch: ["x64", "arm64"],
      },
      {
        target: "portable",
        arch: ["x64", "arm64"],
      },
    ],
    protocols: [
      {
        name: "Orpheus Protocol",
        schemes: ["orpheus"],
      },
    ],
  },
  nsis: {
    oneClick: false,
    artifactName: "${productName}-${version}-${arch}-setup.${ext}",
    shortcutName: "${productName}",
    uninstallDisplayName: "${productName}",
    createDesktopShortcut: "always",
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    installerIcon: "public/icons/favicon.ico",
    uninstallerIcon: "public/icons/favicon.ico",
  },
  portable: {
    artifactName: "${productName}-${version}-${arch}-portable.${ext}",
  },
  mac: {
    executableName: "Familla",
    icon: "public/icons/icon.icns",
    artifactName: "${productName}-${version}-${arch}.${ext}",
    identity: null,
    hardenedRuntime: false,
    notarize: false,
    gatekeeperAssess: false,
    darkModeSupport: true,
    category: "public.app-category.music",
    extendInfo: {
      NSCameraUsageDescription: "Application requests access to the device's camera.",
      NSMicrophoneUsageDescription: "Application requests access to the device's microphone.",
      NSDocumentsFolderUsageDescription: "Application requests access to the user's Documents folder.",
      NSDownloadsFolderUsageDescription: "Application requests access to the user's Downloads folder.",
      CFBundleURLTypes: [
        {
          CFBundleURLName: "Orpheus Protocol",
          CFBundleURLSchemes: ["orpheus"],
        },
      ],
    },
    target: [
      {
        target: "dmg",
        arch: ["x64", "arm64"],
      },
      {
        target: "zip",
        arch: ["x64", "arm64"],
      },
    ],
  },
  linux: {
    executableName: "Familla",
    icon: "public/icons/favicon-512x512.png",
    artifactName: "${name}-${version}-${arch}.${ext}",
    target: [
      {
        target: "pacman",
        arch: ["x64", "arm64"],
      },
      {
        target: "AppImage",
        arch: ["x64", "arm64"],
      },
      {
        target: "deb",
        arch: ["x64", "arm64"],
      },
      {
        target: "rpm",
        arch: ["x64", "arm64"],
      },
      {
        target: "tar.gz",
        arch: ["x64", "arm64"],
      },
    ],
    maintainer: "lvdingliang",
    category: "Audio;Music;AudioVideo;",
    desktop: {
      entry: {
        MimeType: "x-scheme-handler/orpheus;",
      },
    },
  },
  appImage: {
    artifactName: "${name}-${version}-${arch}.${ext}",
  },
  npmRebuild: false,
  electronDownload: {
    mirror: "https://npmmirror.com/mirrors/electron/",
  },
  publish: [
    {
      provider: "github",
      owner: "lvdingliang",
      repo: "familla",
      releaseType: "release",
    },
  ],
};

export default config;
