import CommandArgument from '../res/models/CommandArgument';

/**
 * validate the argument with its laid out checks.
 */
export const validateArgument = (argument: string, schema: CommandArgument): Boolean => {
    try {
        if (schema.min && Number(argument) < schema.min) throw new Error();
        if (schema.max && Number(argument) > schema.max) throw new Error();
        if (schema.regex && !schema.regex.test(argument)) throw new Error();
        return true;
    } catch {
        return false;
    }
};
