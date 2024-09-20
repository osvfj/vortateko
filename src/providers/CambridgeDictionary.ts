import * as cheerio from 'cheerio';
import type {
	Audio,
	Client,
	Definition,
	Dictionary,
	Pronuntiation,
	Word,
} from '../interfaces';

export interface CambridgeWord extends Word {
	topic: {
		uri: string;
		text: string;
	};
	related: string[];
}

export class CambridgeDictionary implements Dictionary<CambridgeWord> {
	private MAIN_URI = 'https://dictionary.cambridge.org/dictionary/english';

	constructor(private client: Client) {}

	async meaning(word: string): Promise<CambridgeWord> {
		const html = await this.client.getHtml(`${this.MAIN_URI}/${word}`);
		const $ = cheerio.load(html);

		const getDefinitions = (): Definition[] => {
			return $('.def-block.ddef_block')
				.map((_index, element) => ({
					id: $(element).data('wl-senseid'),
					definition: $(element).find('.def.ddef_d.db').text().trim(),
					examples: $(element)
						.find('.def-body.ddef_b>div.examp.dexamp')
						.map((_i, $def) => $($def).text())
						.get(),
				}))
				.get();
		};

		const getRelatedWords = () => {
			return $('.lc.lc1.lc-xs6-12.lpb-5.lpr-10')
				.map((_index, $word) => $($word).find('.haf').text())
				.get();
		};

		const getAudios = (): Audio[] => {
			const audios = $('.dpron-i')
				.map((_i, el) => ({
					region: $(el).find('.region').text().trim(),
					uri:
						new URL(this.MAIN_URI).origin +
						String($(el).find('source').attr('src')),
					type: String($(el).find('source').attr('type')) as
						| 'audio/mpeg'
						| 'audio/ogg',
				}))
				.get();
			const uniqueAudios = audios.filter(
				(audio, index, self) =>
					index === self.findIndex((a) => a.uri === audio.uri),
			);
			return uniqueAudios;
		};

		const getPronuntiantions = (): Pronuntiation[] => {
			const pronuntiations = $('.dpron-i')
				.map((_i, el) => ({
					region: $(el).find('.region').text().trim(),
					phonetic: $(el).find('.pron.dpron').text().trim(),
				}))
				.get();

			const uniquePronuntianions = pronuntiations.filter(
				(pronuntiation, index, self) =>
					index ===
					self.findIndex((p) => p.phonetic === pronuntiation.phonetic),
			);
			return uniquePronuntianions;
		};

		return {
			word: $('.di-title>span>span').first().text().trim(),
			type: $('.posgram>span.pos.dpos').first().text().trim().toUpperCase(),
			pronuntiations: getPronuntiantions(),
			audios: getAudios(),
			topic: {
				uri: String($('.daccord_lt>a').attr('href')),
				text: $('.daccord_lt').text().trim(),
			},
			definitions: getDefinitions(),
			related: getRelatedWords(),
		};
	}
}
