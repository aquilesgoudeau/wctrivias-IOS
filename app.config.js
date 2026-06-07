import 'dotenv/config';

export default () => {
  return{
  expo: {
    name: "wctrivias",
    slug: "wctrivias",
    version: "1.1.7",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      bundleIdentifier: "com.leo1978.wctrivias",
      supportsTablet: true,
      infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSUserTrackingUsageDescription: "Este identificador se usará para mostrarte anuncios personalizados.",
       SKAdNetworkItems: [
  // Facebook / Meta
  { SKAdNetworkIdentifier: "v9wttpbfk9.skadnetwork" },
  { SKAdNetworkIdentifier: "n38lu8286q.skadnetwork" },
  { SKAdNetworkIdentifier: "7ug5zh24hu.skadnetwork" },
  { SKAdNetworkIdentifier: "cstr6suwn9.skadnetwork" },
  { SKAdNetworkIdentifier: "4fzdc2evr5.skadnetwork" },
  { SKAdNetworkIdentifier: "ppxm28t8ap.skadnetwork" },
  { SKAdNetworkIdentifier: "ludvb6z3bs.skadnetwork" },
  { SKAdNetworkIdentifier: "yclnxrl5pm.skadnetwork" },
  { SKAdNetworkIdentifier: "t38b2kh725.skadnetwork" },
  { SKAdNetworkIdentifier: "238da6jt44.skadnetwork" },

  // AdMob y redes populares (tu lista .env expandida)
  { SKAdNetworkIdentifier: "c6k4g5qg8m.skadnetwork" },
  { SKAdNetworkIdentifier: "3qy4746246.skadnetwork" },
  { SKAdNetworkIdentifier: "f38h382jlk.skadnetwork" },
  { SKAdNetworkIdentifier: "22mmun2rn5.skadnetwork" },
  { SKAdNetworkIdentifier: "4468km3ulz.skadnetwork" },
  { SKAdNetworkIdentifier: "4pfyvq9l8r.skadnetwork" },
  { SKAdNetworkIdentifier: "4w7y6s5ca2.skadnetwork" },
  { SKAdNetworkIdentifier: "5tjdwbrq8w.skadnetwork" },
  { SKAdNetworkIdentifier: "6g9af3uyq4.skadnetwork" },
  { SKAdNetworkIdentifier: "8s468mfl3y.skadnetwork" },
  { SKAdNetworkIdentifier: "9rd848q2bz.skadnetwork" },
  { SKAdNetworkIdentifier: "av6w8kgt66.skadnetwork" },
  { SKAdNetworkIdentifier: "n66cz3y3bx.skadnetwork" },
  { SKAdNetworkIdentifier: "kbmxgpxpgc.skadnetwork" },
  { SKAdNetworkIdentifier: "prcb7njmu6.skadnetwork" },
  { SKAdNetworkIdentifier: "r26jy69rpl.skadnetwork" },
  { SKAdNetworkIdentifier: "u679fj5vs4.skadnetwork" },
  { SKAdNetworkIdentifier: "wzmmz9fp6w.skadnetwork" },
  { SKAdNetworkIdentifier: "y5ghdn5j9k.skadnetwork" },
  { SKAdNetworkIdentifier: "zq492l623r.skadnetwork" },
  { SKAdNetworkIdentifier: "3sh42y64q3.skadnetwork" },
  { SKAdNetworkIdentifier: "8c4e2ghe7u.skadnetwork" },
  { SKAdNetworkIdentifier: "hs6bdukanm.skadnetwork" },
  { SKAdNetworkIdentifier: "mp6xlyr22a.skadnetwork" },
  { SKAdNetworkIdentifier: "e5fvkxwrpn.skadnetwork" },
  { SKAdNetworkIdentifier: "lr83yxwka7.skadnetwork" },
  { SKAdNetworkIdentifier: "7rz58n8ntl.skadnetwork" },
  { SKAdNetworkIdentifier: "klf5c3l5u5.skadnetwork" },
  { SKAdNetworkIdentifier: "v79kvwwj4g.skadnetwork" },
  { SKAdNetworkIdentifier: "n9x2a789qt.skadnetwork" },
  { SKAdNetworkIdentifier: "rx5hdcabgc.skadnetwork" },
  { SKAdNetworkIdentifier: "gta9lk7p23.skadnetwork" },
  { SKAdNetworkIdentifier: "9t245vhmpl.skadnetwork" },
  { SKAdNetworkIdentifier: "x44k69ngh6.skadnetwork" },
  { SKAdNetworkIdentifier: "zmvfpc5aq8.skadnetwork" }
]
      
      
    }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
 
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
      projectId: process.env.PROJECT_ID
      },
      compartirIos: process.env.SHARE_IOS,
      bannerIdIos: process.env.BANNER_ID_IOS,
      rewardUnitIdIos:process.env.REWARD_UNIT_IOS
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: process.env.UPDATE_URL
    },
    plugins: [
      [
        "react-native-fbsdk-next",
        {
          appID:process.env.FB_APP_ID,
          clientToken: process.env.FB_TOKEN,
          displayName: "wctrivias",
          scheme: `fb${process.env.FB_APP_ID}`,
          advertiserIDCollectionEnabled: true,
          autoLogAppEventsEnabled: true,
          isAutoInitEnabled: true,
          iosUserTrackingPermission: "This identifier will be used to deliver personalized ads to you."
        }
      ],
      [
        "react-native-google-mobile-ads", {

          iosAppId:process.env.GOOGLE_ADMOB_IOS,
          userTrackingUsageDescription: "This identifier will be used to deliver personalized ads to you."
        }
      ],
      "expo-tracking-transparency"
  ]
 }
 } 
}
