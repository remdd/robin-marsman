/**
 * External links configuration
 * Single source of truth for all external URLs
 */

/** Social media profile URLs */
export const socialLinks = {
  bandcamp: "https://robinmarsman.bandcamp.com/",
  mixcloud: "https://www.mixcloud.com/robinmarsman/",
  facebook: "https://www.facebook.com/people/Robin-Marsman/61587173637583/",
  email: "mailto:robinmarsman@proton.me",
} as const;

/** Album/release URLs */
export const albumLinks = {
  redWorldDawning: "https://robinmarsman.bandcamp.com/album/red-world-dawning",
} as const;

/** Bandcamp embed widget URLs */
export const bandcampEmbeds = {
  redWorldDawning:
    "https://bandcamp.com/EmbeddedPlayer/album=3202784042/size=large/bgcol=ffffff/linkcol=de270f/transparent=true/",
} as const;

/** Mixcloud embed widget URLs */
export const mixcloudEmbeds = {
  blobbysPlagueWeekender:
    "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fdj-set-recorded-live-blobbys-creamy-plague-weekender-2021%2F",
  redMarsRadio0:
    "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fred-mars-radio-0%2F",
  polycyclicBisturbilism:
    "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fpolycyclic-bisturbilism%2F",
  covidcoreFishHeadband:
    "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F",
} as const;

export type SocialLinkKey = keyof typeof socialLinks;
export type AlbumLinkKey = keyof typeof albumLinks;
export type BandcampEmbedKey = keyof typeof bandcampEmbeds;
export type MixcloudEmbedKey = keyof typeof mixcloudEmbeds;
