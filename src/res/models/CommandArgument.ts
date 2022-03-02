class CommandArgument {
    name: String | null = null;
    description: String | null = null;

    value: String | null = null;

    min: Number | null = null;
    max: Number | null = null;
    regex: RegExp | null = null;

    readonly optional: Boolean = false;
    readonly type: 'word' | 'paragraph' = 'word';

    constructor(commandOptions?: { optional?: Boolean; type?: String }) {
        if (commandOptions?.optional) this.optional = true;
        if (commandOptions?.type === 'paragraph') this.type = 'paragraph';
    }

    setValue(value: String) {
        if (this.value) throw new Error('Cannot redeclare "value" property on CommandArgument object.');
        this.value = value;
        return this;
    }

    setName(name: String) {
        if (this.name) throw new Error('Cannot redeclare "name" property on CommandArgument object.');
        this.name = name;
        return this;
    }

    setDescription(description: String) {
        if (this.description) throw new Error('Cannot redeclare "description" property on CommandArgument object.');
        this.description = description;
        return this;
    }

    setMin(min: Number) {
        if (this.min) throw new Error('Cannot redeclare "min" property on CommandArgument object.');
        this.min = min;
        return this;
    }

    setMax(max: Number) {
        if (this.max) throw new Error('Cannot redeclare "max" property on CommandArgument object.');
        this.max = max;
        return this;
    }

    setRegex(regex: RegExp) {
        if (this.regex) throw new Error('Cannot redeclare "regex" property on CommandArgument object.');
        this.regex = regex;
        return this;
    }
}

export default CommandArgument;
