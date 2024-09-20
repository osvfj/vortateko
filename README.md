# Vortateko

The Open Library For Dictionaries: extract information from multiple dictionaries online.

The main goal of this project is to have an easy to use library with an standarized interface/API for others to build on top of it and create cool projects.

### What is the origin of the name?

Vortateko is the portmanteau of _"Vortaroj"_ (dictionaries in Esperanto) and _"Biblioteko"._ (Library in Esperanto)

## How to use?

**Install the package**
```shell
pnpm add vortateko --save-exact
```

**ESM**
```typescript
import { Vortateko } from "vortateko";

const vortateko = new Vortateko();
const word = await vortateko.cambridge.meaning("hello");

console.log(word);
```

**CommonJS**

```typescript
const { Vortateko } = require("vortateko");

const vortateko = new Vortateko();
const word = await vortateko.cambridge.meaning("hello");

console.log(word);
```
You can choose from which supported library you want to get the information!

### Interface response

```typescript
/**
    - Base response from vortateko.provider.meaning().
    - Each provider may have their own interface extended from this one.
**/

interface Word {
	word: string;
	type: string;
	pronuntiations: Pronuntiation[];
	audios: Audio[];
	definitions: Definition[];
}

interface Pronuntiation {
	region: string;
	phonetic: string;
}

interface Audio {
	type: 'audio/mpeg' | 'audio/ogg';
	uri: string;
	region: string;
}

interface Definition {
	definition: string;
	examples: string[];
}
```

## LICENSE

Vortateko is licesed under the MIT license. 