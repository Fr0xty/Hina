export default `

# get manga info from anilist by name
query ($name: String) {
    Media(search: $name, type: MANGA) {
        idMal
        title {
            english
            native
        }
        description(asHtml: false)
        format
        status
        chapters
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
