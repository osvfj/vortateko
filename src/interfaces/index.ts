export interface Client {
	getHtml(url: string): Promise<string>;
}

export interface Dictionary<T extends Word> {
	meaning(word: string): Promise<T>;
}

export interface Pronuntiation {
	region: string;
	phonetic: string;
}

export interface Audio {
	type: 'audio/mpeg' | 'audio/ogg';
	uri: string;
	region: string;
}

export interface Definition {
	definition: string;
	examples: string[];
}

export interface Word {
	word: string;
	type: string;
	pronuntiations: Pronuntiation[];
	audios: Audio[];
	definitions: Definition[];
}
