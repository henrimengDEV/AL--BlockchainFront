export const todayAsString: string = new Date().toString();

export const getImageProfile = (): string => {
    const images = [
        "https://ssb.wiki.gallery/images/7/7f/WarioHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/9/93/YoshiHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/2/20/RyuHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/b/be/ROBHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/c/cf/PiranhaPlantHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/1/14/PeachHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/c/c9/FoxHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/9/9d/LuigiHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/0/0c/IceClimbersHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/e/e3/IncineroarHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/f/fe/KingDededeHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/2/20/LucarioHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/9/9d/LuigiHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/2/26/MegaManHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/d/d7/PitHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/b/b7/SonicHeadSSBUWebsite.png",
        "https://ssb.wiki.gallery/images/4/4f/SteveHeadSSBUWebsite.png"
    ]

    const random = Math.floor(Math.random() * images.length)
    return images[random]
}