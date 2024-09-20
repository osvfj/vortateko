import type { Client } from '../interfaces';

export class FetchClient implements Client {
	getHtml(url: string): Promise<string> {
		const html = fetch(url)
			.then((res) => {
				if (!res.ok) {
					throw Error(
						`Something went wrong fetching your word: ${res.statusText}`,
					);
				}
				return res.text();
			})
			.catch((w) => {
				throw Error('There was an error fetching your word');
			});
		return html;
	}
}
