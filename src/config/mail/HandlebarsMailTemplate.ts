import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
    public async parse({
        file,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const fileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = Handlebars.compile(fileContent);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplate;
