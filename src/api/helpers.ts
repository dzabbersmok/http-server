const bannedWords = ["kerfuffle", "sharbert", "fornax"];

export function filterMessage(message: string): any {
    return message
                .split(" ")
                .reduce((acc, word): string[] => {
                    const lowerCaseWord = word.toLocaleLowerCase();
                    if (bannedWords.includes(lowerCaseWord)) {
                        acc.push("****");
                        return acc;
                    }

                    acc.push(word);
                    return acc;
                }, [])
                .join(" ");
}