import {
	type CambridgeWord,
	CambridgeDictionary,
} from './providers/CambridgeDictionary';
import { DictionaryFactory } from './providers/DictionaryFactory';

export class Vortateko {
	private dictionaryFactory = DictionaryFactory;

	get cambridge() {
		return this.dictionaryFactory.createDictionary<CambridgeWord>('cambridge');
	}
}

export { CambridgeDictionary };
