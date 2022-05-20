class CommandArgument {
    name = null;
    description = null;
    value = null;
    min = null;
    max = null;
    regex = null;
    optional = false;
    type = 'word';
    constructor(commandOptions) {
        if (commandOptions?.optional)
            this.optional = true;
        if (commandOptions?.type === 'paragraph')
            this.type = 'paragraph';
    }
    setValue(value) {
        if (this.value)
            throw new Error('Cannot redeclare "value" property on CommandArgument object.');
        this.value = value;
        return this;
    }
    setName(name) {
        if (this.name)
            throw new Error('Cannot redeclare "name" property on CommandArgument object.');
        this.name = name;
        return this;
    }
    setDescription(description) {
        if (this.description)
            throw new Error('Cannot redeclare "description" property on CommandArgument object.');
        this.description = description;
        return this;
    }
    setMin(min) {
        if (this.min)
            throw new Error('Cannot redeclare "min" property on CommandArgument object.');
        this.min = min;
        return this;
    }
    setMax(max) {
        if (this.max)
            throw new Error('Cannot redeclare "max" property on CommandArgument object.');
        this.max = max;
        return this;
    }
    setRegex(regex) {
        if (this.regex)
            throw new Error('Cannot redeclare "regex" property on CommandArgument object.');
        this.regex = regex;
        return this;
    }
}
export default CommandArgument;
