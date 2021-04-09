export namespace StringUtils {
  export const isValidString = (input: string, allowWhiteSpace: boolean = true): boolean => {
    if (typeof input === 'undefined')
        return false;
    if (allowWhiteSpace) {
        return (/^[A-Za-z\s]*$]/).test(input);
    } else {
        return (/^[A-Za-z]*$]/).test(input);
    }
  };

  export const sanitizeString = (input: string, allowWhiteSpace: boolean = true, allowAccentMark: boolean = false ): string => {
    if (typeof input === 'undefined')
        return '';
    
    let regex: string = "[^a-zA-Z0-9";
    if (allowWhiteSpace) {
        regex += "\\s";
        // return input.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    if (allowAccentMark) {
        regex += "áÁéÉíÍóÓúÚñÑ";
    }
    regex += "]";
    return input.replace(new RegExp(regex, 'g'), "");
  };

  export const slugify = (input: string): string => {
      return input.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
  };

  export const parsePriceDecimals = (input: number): string => (input > 9) ? input.toString() : "0" + input;
};