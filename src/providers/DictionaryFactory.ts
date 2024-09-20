import type { Dictionary, Word } from '../interfaces';
import { FetchClient } from '../lib/FetchClient';
import { CambridgeDictionary, type CambridgeWord } from './CambridgeDictionary';

export enum DictionaryNames {
	Cambridge = 'cambridge',
}

export type ValidDictionaryNames = `${DictionaryNames}`;

export class DictionaryFactory {
	static createDictionary<T extends Word>(
		dictionaryName: ValidDictionaryNames,
	): Dictionary<T> {
		switch (dictionaryName) {
			case DictionaryNames.Cambridge:
				return new CambridgeDictionary(
					new FetchClient(),
				) as unknown as Dictionary<T>;
			default:
				throw new Error(`${dictionaryName} is not supported`);
		}
	}
}
