import { WaifuImImageObject } from 'hina-general-types';
import ImageChoices from '../res/ImageChoices.js';
import { EmbedBuilder } from '@discordjs/builders';
import Hina from '../res/HinaClient.js';

/**
 * build waifu.im api url from tag and whether it is nsfw
 * @returns waifu.im api url
 */
const _waifuImURL = (tag: string, isNSFW: boolean = false): string => {
    return `https://api.waifu.im/search?included_tags=${tag}&is_nsfw=${isNSFW}&many=true`;
};

/**
 * build waifu.pics api url from tag and whether it is nsfw
 * @returns waifu.pics api url
 */
const _waifuPicsURL = (tag: string, isNSFW: boolean = false): string => {
    return `https://api.waifu.pics/many/${isNSFW ? 'nsfw' : 'sfw'}/${tag}`;
};

/**
 * exchange ImagesChoices.SFW value for tag
 * @param enumValue value of ImageChoices.SFW enum
 * @returns tag usable in url
 */
const _SFWEnumValueToURL = (enumValue: number): string | null => {
    switch (enumValue) {
        case ImageChoices.SFW.Waifu:
            return _waifuImURL('waifu');
        case ImageChoices.SFW.Maid:
            return _waifuImURL('maid');
        case ImageChoices.SFW.MarinKitagawa:
            return _waifuImURL('marin-kitagawa');
        case ImageChoices.SFW.MoriCalliope:
            return _waifuImURL('mori-calliope');
        case ImageChoices.SFW.RaidenShogun:
            return _waifuImURL('raiden-shogun');
        case ImageChoices.SFW.Oppai:
            return _waifuImURL('oppai');
        case ImageChoices.SFW.Selfies:
            return _waifuImURL('selfies');
        case ImageChoices.SFW.Uniform:
            return _waifuImURL('uniform');
        case ImageChoices.SFW.Neko:
            return _waifuPicsURL('neko');
        case ImageChoices.SFW.Shinobu:
            return _waifuPicsURL('shinobu');
        case ImageChoices.SFW.Megumin:
            return _waifuPicsURL('megumin');

        default:
            return null;
    }
};

/**
 * exchange ImagesChoices.NSFW value for tag
 * @param enumValue value of ImageChoices.NSFW enum
 * @returns tag usable in url
 */
const _NSFWEnumValueToURL = (enumValue: number): string | null => {
    switch (enumValue) {
        case ImageChoices.NSFW.Ass:
            return _waifuImURL('ass', true);
        case ImageChoices.NSFW.Hentai:
            return _waifuImURL('hentai', true);
        case ImageChoices.NSFW.Milf:
            return _waifuImURL('milf', true);
        case ImageChoices.NSFW.Oral:
            return _waifuImURL('oral', true);
        case ImageChoices.NSFW.Paizuri:
            return _waifuImURL('paizuri', true);
        case ImageChoices.NSFW.Ecchi:
            return _waifuImURL('ecchi', true);
        case ImageChoices.NSFW.Ero:
            return _waifuImURL('ero', true);
        case ImageChoices.NSFW.Neko:
            return _waifuImURL('neko', true);
        case ImageChoices.NSFW.Waifu:
            return _waifuPicsURL('waifu', true);
        case ImageChoices.NSFW.Trap:
            return _waifuPicsURL('trap', true);
        case ImageChoices.NSFW.Blowjob:
            return _waifuPicsURL('blowjob', true);
        case ImageChoices.NSFW.Maid:
            return _waifuImURL('maid', true);
        case ImageChoices.NSFW.MarinKitagawa:
            return _waifuImURL('marin-kitagawa', true);
        case ImageChoices.NSFW.MoriCalliope:
            return _waifuImURL('mori-calliope', true);
        case ImageChoices.NSFW.RaidenShogun:
            return _waifuImURL('raiden-shogun', true);
        case ImageChoices.NSFW.Oppai:
            return _waifuImURL('oppai', true);
        case ImageChoices.NSFW.Selfies:
            return _waifuImURL('selfies', true);
        case ImageChoices.NSFW.Uniform:
            return _waifuImURL('uniform', true);
        case ImageChoices.NSFW.Shinobu:
            return _waifuImURL('shinobu', true);
        case ImageChoices.NSFW.Megumin:
            return _waifuImURL('megumin', true);

        default:
            return null;
    }
};

const _waifuImImagesToPaginable = async (images: WaifuImImageObject[]) => {
    const pages: EmbedBuilder[] = [];

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const decColor = parseInt(image.dominant_color.slice(1), 16);
        const titleTags = image.tags.map((tag) => tag.name);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${Hina.user!.username} Page ${i + 1} / ${images.length}` })
            .setColor(decColor)
            .setTitle(titleTags.join(', '))
            .setDescription(`[source](${image.source})`)
            .setImage(image.url)
            .setTimestamp();

        pages.push(embed);
    }
    return pages;
};

const _waifuPicsImagesToPaginable = async (images: string[]) => {
    const pages: EmbedBuilder[] = [];

    for (let i = 0; i < images.length; i++) {
        const imageURL = images[i];

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${Hina.user!.username} Page ${i + 1} / ${images.length}` })
            .setColor(Hina.color)
            .setTitle('Image(s):')
            .setImage(imageURL)
            .setTimestamp();

        pages.push(embed);
    }
    return pages;
};

export const fetchImage = async (type: number, isNSFW: boolean = false): Promise<EmbedBuilder[] | null> => {
    const url = isNSFW ? _NSFWEnumValueToURL(type) : _SFWEnumValueToURL(type);
    if (!url) return null;

    /**
     * waifu.im case
     */
    if (url.includes('https://api.waifu.im/')) {
        const res = await fetch(url, {
            headers: {
                'Accept-Version': 'v4',
            },
        });
        if (res.status !== 200) return null;

        const images = (await res.json()).images as WaifuImImageObject[];
        return await _waifuImImagesToPaginable(images);
    }

    /**
     * waifu.pics case
     */
    {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: isNSFW }),
        });
        if (res.status !== 200) return null;

        const images = (await res.json()).files as string[];
        return await _waifuPicsImagesToPaginable(images);
    }
};
