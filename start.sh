truffle migration --reset

truffle console

let instance = await Freedom.deployed()

instance.addCanzone("{\"name\":\"Per me è importante\", \"description\" : \"Brano dei tiromancinio, versione cantata insieme a Tiziano Ferro\", \"image\" : \"https://open.spotify.com/track/0itxSlqC1bRMhp9S1Y8v2W?si=8ed44db1608346ae\", \"attributes\" : [{\"album\" : \"Fino a qui\", \"copertina\" : \"https://a6p8a2b3.stackpathcdn.com/_o4NgDd8PMESFvVrAFpjzsam58g=/500x500/smart/rockol-img/img/foto/upload/fino-a-qui-tiromancino-cover-ts1538097994.jpeg\"}] }")

instance.addCanzone("{\"name\":\"Rumors\", \"description\" : \"Brano dei Kings of Convenience del 2021\", \"image\" : \"https://open.spotify.com/track/0Brzu8MFxLwh3R57bImH2r?si=28cbe657894542e9\", \"attributes\" : [{\"album\" : \"Peace or Love\", \"copertina\" : \"https://a6p8a2b3.stackpathcdn.com/v8AU85AN_4fqVe7TrcjcSRyDceo=/500x500/smart/rockol-img/img/foto/upload/kings-of-convenience-peace-or-love-album-2021-786x786.jpg\"}] }")

instance.addCanzone("{\"name\":\"Begin the blues\", \"description\" : \"Brano di Barney Kessel\", \"image\" : \"https://open.spotify.com/track/6RzlnAcDVxIxVa5tMLf2lJ?si=d216317ba3784509\", \"attributes\" : [{\"album\" : \"To swing or not to swing\", \"copertina\" : \"https://img.discogs.com/ui-szuw0zo3ZUD9nfh0SwIgRsXM=/fit-in/600x594/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-3786121-1344358106-2683.jpeg.jpg\"}] }")

instance.addCanzone("{\"name\":\"Rotolando Respirando\", \"description\" : \"Brano dei Pooh nella versione live del loro ultimo concerto\", \"image\" : \"https://open.spotify.com/track/1pQzlwA27DyrWJJYa6Rv8q?si=7699f9cdb4c5456e\", \"attributes\" : [{\"album\" : \"L'ultimo abbraccio\", \"copertina\" : \"https://m.media-amazon.com/images/I/71Yi7VWCsjL._AC_SY450_.jpg\"}] }")

instance.addCanzone("{\"name\":\"Homesick\", \"description\" : \"Brano dei Kings of Convenience del 2004\", \"image\" : \"https://open.spotify.com/track/0WeqauIUZSjsupDGXsXWsP?si=979d516f623249e7\", \"attributes\" : [{\"album\" : \"Riot On An Empty Street\", \"copertina\" : \"https://lastfm.freetls.fastly.net/i/u/770x0/2b44a3a8fac142d6c252ec6b218a26a4.jpg\"}] }")

instance.addCanzone("{\"name\":\"Four on Six\", \"description\" : \"Brano interpretato da Wes Montgomery\", \"image\" : \"https://open.spotify.com/track/2Mq2Fzc9HBgvsijVFdSXUl?si=8e720242f2b44fef\", \"attributes\" : [{\"album\" : \"Incredible Jazz Guitar\", \"copertina\" : \"https://m.media-amazon.com/images/I/71WtZB7+UxL._AC_SL1400_.jpg\"}] }")

