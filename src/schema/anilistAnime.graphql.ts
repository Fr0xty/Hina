export default `

# get anime info from anilist by name
query ($name: String) {
    Media(search: $name, type: ANIME) {
        idMal
        title {
            english
            native
        }
        description(asHtml: false)
        season
        seasonYear
        format
        status
        episodes
        duration
        genres
        averageScore
        popularity
        source
        coverImage {
            extraLarge
        }
    }
}

`;
